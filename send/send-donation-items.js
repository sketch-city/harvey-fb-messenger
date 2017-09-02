import _ from 'lodash';
import { callSendAPI } from './call-send-api';

import needs from './needs';

const sendShowMoreButton = (recipientId, start) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Would you like to see more?",
          buttons: [{
            "type": "postback",
            "title": "Show More",
            "payload": `SHOW_NEEDS_START_${start}`
          }]
        }
      }
    }
  };
  //console.log('shelters', JSON.stringify(shelters));
  //console.log('messageData', JSON.stringify(messageData));
  callSendAPI(messageData);
};

export const sendDonationItems = (recipientId, start) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: _.map(_.slice(needs.products, start, 10), product => ({
            "title": `Donate ${product.need}`,
            "subtitle": product.amazon_title,
            "item_url": "http://oneclickrelief.com", // TODO: get link from oneclickrelief.com/add.php?quantity&asin
          }))
        }
      }
    }
  };
  //console.log('shelters', JSON.stringify(shelters));
  //console.log('messageData', JSON.stringify(messageData));
  callSendAPI(messageData, false, recipientId => {
    if (needs.meta.result_count > start+10)
      sendShowMoreButton(recipientId, start+10)
  });
};

