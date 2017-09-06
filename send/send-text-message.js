import { callSendAPI } from './call-send-api';

export const sendTextMessage = (pageId, recipientId, messageText, turnOffTyping) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
        text: `Bot: ${messageText}`
    }
  };

  callSendAPI(pageId, messageData, turnOffTyping);
}
