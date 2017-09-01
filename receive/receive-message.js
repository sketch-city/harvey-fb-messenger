import _ from 'lodash';
import { sendTextMessage } from '../send/send-text-message';
import { sendSheltersMessage } from '../send/send-shelters';
import { sendLocationRequest } from '../send/send-location-request';
import { sendQuickReply } from '../send/send-quick-reply';
import { sendDonationInfo } from '../send/send-donation-info';

import maps from '@google/maps';

const client = maps.createClient({
  key: process.env.GOOGLE_PLACES_API_KEY
});

export const receivedMessage = event => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  const messageId = message.mid;

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    if(messageText.match(/shelter/i)) {
      const match = messageText.match(/shelters? +near(by)? +(.*)/i)
      if (match[2]) {
        client.places({ query: match[2] }, (err, response) => {
            const place = _.first(response.json.results);
            place && sendSheltersMessage(senderID, place.geometry.location);
        });
      }
      else
          sendLocationRequest(senderID);
    }
    else if(messageText.match(/(donate|volunteer)/i))
         sendDonationInfo(senderID);
    else if(messageText.match(/help/i))
         sendQuickReply(senderID, "Here's what I can do");

  } else if (messageAttachments && messageAttachments[0].type === 'location') {
    sendSheltersMessage(senderID, messageAttachments[0].payload.coordinates);
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}
