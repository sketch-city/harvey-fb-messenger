import { callSendAPI } from './call-send-api';

export const sendDonationInfo = recipientId => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              "title": "Greater Houston Community Foundation",
              "subtitle": "Donate to Mayor Turner & County Judge Emmett Establish Hurricane Harvey Relief Fund",
              "item_url": "https://ghcf.org/hurricane-relief/",
            },
            {
              "title": "Donation Map",
              "subtitle": "Find verified places to drop off donations",
              "item_url": "https://sketch-city.github.io/harvey-needs/",
            },
            {
              "title": "One Click Relief",
              "subtitle": "Donate needed supplies via Amazon",
              "item_url": "http://oneclickrelief.com/",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Show Needs",
                  "payload": "SHOW_NEEDS_START_0"
                }
              ]
            },
          ],
        }
      }
    }
  };
  //console.log('shelters', JSON.stringify(shelters));
  //console.log('messageData', JSON.stringify(messageData));
  callSendAPI(messageData);
}
