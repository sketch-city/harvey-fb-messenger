import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import winston from 'winston';

import { receivedMessage } from './receive/receive-message';
import { receivedPostback } from './receive/receive-postback';

import { consoleLogger, errorLogger } from './logger';

const app = express();

// parse application/json
app.use(bodyParser.json())

app.use(consoleLogger);
winston.level = process.env.LOG_LEVEL || 'debug';

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'hurricane-harvey-messenger';
const PORT = process.env.PORT || 8080;

// GET - verification
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFY_TOKEN) {
      winston.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
  } else {
      winston.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
  }
});

app.post('/webhook', function (req, res) {
  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    _.each(data.entry, entry => {
      const pageID = entry.id;
      const timeOfEvent = entry.time;

      // Iterate over each messaging event
      _.each(entry.messaging, event => {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event);
        } else {
          winston.warn("Webhook received unknown event", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

// express-winston errorLogger makes sense AFTER the router.
app.use(errorLogger);

app.listen(PORT, function () {
  winston.log(`app is listening on port ${PORT}`);
});
