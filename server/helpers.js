const request = require('request');
const config = require('./config.js');


const getMeetupsByLatLon = (lat, lon, callback) => {
  const options = {
    url: `http://api.meetup.com//find/upcoming_events?\
    photo-host=public&fields=group_photo&page=20&key=${config.MEETINGS_API_KEY}&lat=${lat}&lon=${lon}`,
    headers: { 'User-Agent': 'request' },
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, body);
    }
  });
};

const getLatLon = (zipcode, callback) => {
  const options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}`,
    headers: {
      'User-Agent': 'request',
    },
  };
  request(options, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else {
      const place = JSON.parse(body);
      const lat = place.results[0].geometry.location.lat;
      const lon = place.results[0].geometry.location.lng;
      callback(null, lat, lon);
    }
  });
};

module.exports.getMeetupsByLatLon = getMeetupsByLatLon;
module.exports.getLatLon = getLatLon;
