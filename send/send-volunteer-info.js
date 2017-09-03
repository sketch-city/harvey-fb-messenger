import { callSendAPI } from './call-send-api';
import { sendQuickReply } from './send-quick-reply';

export const sendVolunteerInfo = recipientId => {
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
                    "title": "Volunteer Map",
                    "subtitle": "Find verified places to volunteer",
                    "item_url": "https://sketch-city.github.io/harvey-needs/",
                    buttons: [{
                      type: "web_url",
                      url: "https://sketch-city.github.io/harvey-needs/",
                      title: "View Map"
                    }]
                  },
                  {
                    "title": "Muck Map",
                    "subtitle": "Find places that need to be mucked",
                    "item_url": "https://www.texasrescuemap.com/muckmap",
                    buttons: [{
                      type: "web_url",
                      url: "https://www.texasrescuemap.com/muckmap",
                      title: "View Map"
                    }]
                  },
              ],
            }
          }
        }
      };
      //console.log('shelters', JSON.stringify(shelters));
      //console.log('messageData', JSON.stringify(messageData));
      callSendAPI(messageData, false, sendQuickReply);
}
