const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');


//load env vars
dotenv.config({path: './config/config.env'});

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
    httpAdapter: 'https'
};

console.log(options);

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
