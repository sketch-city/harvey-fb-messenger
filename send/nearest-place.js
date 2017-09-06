import _ from 'lodash';

const deg2rad = deg => deg * Math.PI / 180;

const getDistance = (lat1,lon1,lat2,lon2) => {
  const dlat1 = deg2rad(lat1);
  const dlat2 = deg2rad(lat2);
  const dlon1 = deg2rad(lon1);
  const dlon2 = deg2rad(lon2);
  const R = 6371; // km
  const x = (dlon2 - dlon1) * Math.cos((dlat1 + dlat2) / 2);
  const y = (dlat2 - dlat1);
  const d = Math.sqrt(x * x + y * y) * R;
  return d * 0.621371; // convert to miles
};

export const nearestPlace = (coordinates, places) => {
  return _.chain(places).map(place => {
    const distance = getDistance(coordinates.lat, coordinates.lng || coordinates.long, place.latitude, place.longitude);
    return Object.assign({}, place, { distance });
  }).sortBy('distance').value();
};
