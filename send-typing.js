import { callSendAPI } from './call-send-api';

export const sendTyping = (recipientId, isTyping) => callSendAPI({recipient: { id: recipientId }, sender_action: (isTyping ? 'typing_on' : 'typing_off')});
export const sendTypingOn = recipientId => sendTyping(recipientId, true);
export const sendTypingOff = recipientId => sendTyping(recipientId, false);
