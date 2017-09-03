import { callSendAPI } from './call-send-api';

export const sendTextMessage = (recipientId, messageText, turnOffTyping) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
        text: `HarveyBot: ${messageText}`
    }
  };

  callSendAPI(messageData, turnOffTyping);
}
