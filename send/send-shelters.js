import { callSendAPI } from './call-send-api';
import { sendTextMessage } from './send-text-message';
import { sendLocationRequest } from './send-location-request';
import { sendTypingOn, sendTypingOff } from './send-typing';
import { nearestShelter } from './nearest-shelter';
import request from 'request';
import _ from 'lodash';

const getMapsUrl = shelter => (`https://www.google.com/maps/search/?api=1&query=${shelter.name} ${shelter.address}`);
const getDirectionsUrl = shelter => (`https://www.google.com/maps/dir/?api=1&destination=${shelter.name} ${shelter.address}`);
const getImageUrl = shelter => ('');

export const sendSheltersMessage = (recipientId, coordinates) => {
  sendTypingOn(recipientId);
  request({
    uri: 'http://www.collegehaxcess.com/houstonian/shelters.php',
    method: 'GET',
    json: true,
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const availableShelters = _.filter(body, { available: 'TRUE' });
      const shelters = coordinates ? nearestShelter(coordinates, availableShelters) : availableShelters;
      const elements = _.slice(_.map(shelters, shelter => ({
        title: shelter.name,
        subtitle: `${Math.ceil(shelter.distance)} mi - ${shelter.address}`,
        item_url: getMapsUrl(shelter),
        image_url: getImageUrl(shelter),
        buttons: [{
          type: "web_url",
          url: getDirectionsUrl(shelter),
          title: "Get Directions"
        }, {
          type: "phone_number",
          title: "Call",
          payload: shelter.phone_number.replace(/[^0-9]/g, ''),
        }],
      })), 0, 10);
      const messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements,
            }
          }
        }
      };
      //console.log('shelters', JSON.stringify(shelters));
      //console.log('messageData', JSON.stringify(messageData));
      sendTextMessage(recipientId, `${elements.length} shelters near this location`);
      callSendAPI(messageData, false, !coordinates && sendLocationRequest);
    } else {
      console.error("Unable to get shelters.");
      console.error(response);
      console.error(error);
      sendTextMessage(recipientId, 'Houston! We have a problem.', false);
    }
  });

}
