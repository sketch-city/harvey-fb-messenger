import request from 'request';
import { sendTypingOff } from './send-typing';

const PAGE = JSON.parse(process.env.PAGE) || {};

export const callSendAPI = (pageId, messageData, turnOffTyping, cb) => {
  turnOffTyping && sendTypingOff(messageData.recipient.id)
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE[pageId].pageAccessToken },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);

      cb && cb(pageId, messageData.recipient.id);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
