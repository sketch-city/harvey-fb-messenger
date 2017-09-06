import _ from 'lodash';
import winston from 'winston';
import { sendTextMessage } from '../send/send-text-message';
import { sendSheltersMessage } from '../send/send-shelters';
import { sendLocationRequest } from '../send/send-location-request';
import { sendQuickReply } from '../send/send-quick-reply';
import { sendDonationInfo } from '../send/send-donation-info';
import { sendVolunteerInfo } from '../send/send-volunteer-info';

import maps from '@google/maps';

const client = maps.createClient({
  key: process.env.GOOGLE_PLACES_API_KEY
});

export const receivedMessage = event => {
  const senderID = event.sender.id;
  const pageID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  winston.log('verbose', `Received message for user ${senderID} and page ${pageID} at ${timeOfMessage} with message`, message);

  const messageId = message.mid;

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    if(messageText.match(/shelter/i)) {
      const match = messageText.match(/shelters? +near(by)? +(.*)/i)
      if (match && match[2]) {
        const options = { query: match[2] };
        winston.log('verbose', 'Searching for google places', options);
        client.places(options, (err, response) => {
            if (err)
                winston.error('Error with Google Places query', err);
            else {
                const place = _.first(response.json.results);
                winston.log('verbose', 'Found Google Place', place);
                if (place)
                    sendSheltersMessage(pageID, senderID, place.geometry.location, place.formatted_address);
            }
        });
      }
      else
          sendLocationRequest(pageID, senderID);
    }
    else if(messageText.match(/(90999|donate)/i))
         sendDonationInfo(pageID, senderID);
    else if(messageText.match(/volunteer/i))
         sendVolunteerInfo(pageID, senderID);
    else if(messageText.match(/help/i))
         sendQuickReply(pageID, senderID, "We're so glad that you wanna help. Here's what you can do.");

  } else if (messageAttachments && messageAttachments[0].type === 'location') {
    sendSheltersMessage(pageID, senderID, messageAttachments[0].payload.coordinates);
  }
}
