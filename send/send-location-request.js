import { callSendAPI } from './call-send-api';

export const sendLocationRequest = (recipientId, messageText) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText || 'Type "Shelters near Discovery Green" or use the "Send Location" button',
      quick_replies: [{ content_type: 'location' }]
    }
  };

  callSendAPI(messageData);
}
