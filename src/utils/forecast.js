const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e4d436ba80e19f035e7ae3ade98ac128&query=' + latitude + ',' + longitude;

    //forecasting
    //get current weather
    request({url, json: true},(err,{body} = {}) => {
        if(err) {
            callback("Unable to connect to geocoding service!",undefined);
        }
        else if(body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                location: body.location.region
            });
        }
    })
}

module.exports = forecast