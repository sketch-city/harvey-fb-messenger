import { callSendAPI } from './call-send-api';

export const sendTextMessage = (recipientId, messageText, turnOffTyping) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData, turnOffTyping);
}
