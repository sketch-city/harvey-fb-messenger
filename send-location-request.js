import { callSendAPI } from './call-send-api';

export const sendLocationRequest = (recipientId, messageText) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
        text: messageText || 'Please share your location so we can find shelters nearby:',
      quick_replies: [{ content_type: 'location' }]
    }
  };

  callSendAPI(messageData);
}
