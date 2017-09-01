import request from 'request';
import { sendTypingOff } from './send-typing';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  || 'EAAcOL1VWhn8BAKeEVZB6YhNjrF5tAIeydJSduHkZCiCUP5EzSZAHRQoRDyEiPQ1IviVCxNnhN9ZC1H0wSyjuH2TNuNBJI1oYrUV7zjtZA7mZCiBZBVEYjuYQSCyvcYLcwqwxBRXjaWBOWT7rk9Qh0XGFIaWOOHXPZChPleRunq49FQZDZD';

export const callSendAPI = (messageData, turnOffTyping, cb) => {
  turnOffTyping && sendTypingOff(messageData.recipient.id)
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);

      cb && cb(messageData.recipient.id);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
