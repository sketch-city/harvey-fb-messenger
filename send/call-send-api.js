import request from 'request';
import winston from 'winston';
import { sendTypingOff } from './send-typing';

const PAGE = JSON.parse(process.env.PAGE) || {};

export const callSendAPI = (pageId, messageData, turnOffTyping, cb) => {
  turnOffTyping && sendTypingOff(messageData.recipient.id)
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE[pageId].pageAccessToken },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      winston.log('verbose', `Successfully sent generic message with id ${messageId} to recipient ${recipientId}`, messageData);
      cb && cb(pageId, messageData.recipient.id);
    } else {
      winston.error("Unable to send message.", { response, error });
    }
  });
}
