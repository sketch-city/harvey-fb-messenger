import { sendTextMessage } from '../send/send-text-message';
import { sendDonationItems } from '../send/send-donation-items';

export const receivedPostback = event => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  const payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

  const match = payload.match(/show_needs_start_([0-9+])/i, payload);
  if (match && match[1])
    sendDonationItems(senderID, match[1]);
  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  else
    sendTextMessage(senderID, "Postback called");
}
