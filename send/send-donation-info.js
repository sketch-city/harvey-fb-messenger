import { callSendAPI } from './call-send-api';
import { sendQuickReply } from './send-quick-reply';

const PAGE = JSON.parse(process.env.PAGE) || {};

export const sendDonationInfo = (pageId, recipientId) => {
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
                    "item_url": "https://ghcf.org/",
                    buttons: [{
                      type: "web_url",
                      url: "https://ghcf.org/hurricane-relief/",
                      title: "Donate Now"
                    }]
                  },
                  {
                    "title": "Donation Map",
                    "subtitle": "Find verified places to drop off donations",
                    "item_url": PAGE[pageId].needsMapUrl,
                    buttons: [{
                      type: "web_url",
                      url: PAGE[pageId].needsMapUrl,
                      title: "View Map"
                    }]
                  },
                  {
                    "title": "One Click Relief",
                    "subtitle": "Donate needed supplies via Amazon",
                    "item_url": "http://oneclickrelief.com/",
                    buttons: [{
                      type: "web_url",
                      url: "http://oneclickrelief.com/",
                      title: "View Needs"
                    }]
                  },
              ],
            }
          }
        }
      };
      callSendAPI(pageId, messageData, false, sendQuickReply);
}
