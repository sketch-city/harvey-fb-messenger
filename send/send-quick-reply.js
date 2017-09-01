import { callSendAPI } from './call-send-api';

export const sendQuickReply = (recipientId, messageText) => callSendAPI({
    recipient: { id: recipientId },
    message: {
      text: messageText,
      quick_replies: [
        { content_type: 'text', title: 'Find Shelters', payload: 'FIND_SHELTERS' },
        { content_type: 'text', title: 'Donate', payload: 'DONATE' },
        { content_type: 'text', title: 'Volunteer', payload: 'VOLUNTEER' }
      ]
    }
});
