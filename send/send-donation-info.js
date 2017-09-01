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
              template_type: "list",
              top_element_style: "compact",
              elements: [
                  {
                    "title": "Volunteer and Donation Map",
                    "subtitle": "Find verified places seeking volunteers and donations.",
                    "buttons": [
                      {
                        "title": "View Map",
                        "type": "web_url",
                        "url": "https://sketch-city.github.io/harvey-needs/",
                      }
                    ]
                  },
                  {
                    "title": "One Click Relief",
                    "subtitle": "Donate needed supplies via Amazon",
                    "buttons": [
                      {
                        "title": "View Needs",
                        "type": "web_url",
                        "url": "http://oneclickrelief.com/",
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
