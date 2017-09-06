import winston from 'winston';
import { sendTextMessage } from '../send/send-text-message';
import { sendLocationRequest } from '../send/send-location-request';

export const receivedPostback = event => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  const payload = event.postback.payload;
  const referral = event.postback.referral;

  winston.log('verbose', `Received postback for user ${senderID} and page ${recipientID} with payload '${payload}' at ${timeOfPostback}`, event.postback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  // sendTextMessage(senderID, "Postback called");
}
