import { callSendAPI } from './call-send-api';

export const sendQuickReply = (pageId, recipientId, messageText) => callSendAPI(pageId, {
    recipient: { id: recipientId },
    message: {
      text: `Bot: ${messageText || "Here's what you can do." }`,
      quick_replies: [
        { content_type: 'text', title: 'Find Shelters', payload: 'FIND_SHELTERS' },
        { content_type: 'text', title: 'Donate', payload: 'DONATE' },
        { content_type: 'text', title: 'Volunteer', payload: 'VOLUNTEER' }
      ]
    }
});
