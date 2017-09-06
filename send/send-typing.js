import { callSendAPI } from './call-send-api';

export const sendTyping = (pageId, recipientId, isTyping) => callSendAPI(pageId, {recipient: { id: recipientId }, sender_action: (isTyping ? 'typing_on' : 'typing_off')});
export const sendTypingOn = (pageId, recipientId) => sendTyping(pageId, recipientId, true);
export const sendTypingOff = (pageId, recipientId) => sendTyping(pageId, recipientId, false);
