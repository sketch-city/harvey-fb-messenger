import winston from 'winston';
import { callSendAPI } from './call-send-api';
import { sendTextMessage } from './send-text-message';
import { sendLocationRequest } from './send-location-request';
import { sendTypingOn, sendTypingOff } from './send-typing';
import { nearestPlace } from './nearest-place';
import request from 'request';
import _ from 'lodash';

const getMapsUrl = place => (`https://www.google.com/maps/search/?api=1&query=${place.shelter} ${place.address}`);
const getDirectionsUrl = place => (`https://www.google.com/maps/dir/?api=1&destination=${place.shelter} ${place.address}`);
const getImageUrl = place => ('');

const PAGE = JSON.parse(process.env.PAGE) || {};

export const sendSheltersMessage = (pageId, recipientId, coordinates, address) => {
  sendTypingOn(pageId, recipientId);
  const options = {
    uri: `${PAGE[pageId].apiUrl}/api/v1/shelters`,
    method: 'GET',
    json: true,
    qs: {
      accepting: true,
      lat: coordinates.lat,
      lng: coordinates.lng || coordinates.long,
      limit: 10,
    },
  };
  winston.log('verbose', 'Searching for shelters', options);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      winston.log('debug', 'found shelters', body.shelters);
      const places = coordinates ? nearestPlace(coordinates, body.shelters) : body.shelters;
      const elements = _.slice(_.map(places, place => ({
        title: place.shelter,
        subtitle: `${Math.ceil(place.distance)} mi - ${place.address}`,
        item_url: getMapsUrl(place),
        image_url: getImageUrl(place),
        buttons: [{
          type: "web_url",
          url: getDirectionsUrl(place),
          title: "Get Directions"
        }, {
          type: "phone_number",
          title: "Call",
          payload: place.phone.replace(/[^0-9]/g, ''),
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

      if (elements.length > 0) {
          sendTextMessage(pageId, recipientId, `${elements.length} shelters near ${address}`);
          callSendAPI(pageId, messageData, false);
      } else {
          sendTextMessage(pageId, recipientId, `No available shelters found near ${address}`)
      }
    } else {
      winston.error("Unable to get shelters", { response, error, options });
      sendTextMessage(pageId, recipientId, 'Houston! We have a problem.', false);
    }
  });

}
