const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=04465787c369d8d43e009df2b268aa6f&query=' + encodeURIComponent(address);

    //geocoding
    //get lat/long by location name using an api
    request({url, json: true},(err,{body} = {}) => {
        if(err) {
            callback("Unable to connect to geocoding service!",undefined);
        }
        else if(body.error) {
            callback("Unable to find location", undefined);
        } else {
            //!unhandled exception if you provide more information to location 
            //you might get more data to array, hence the index might change (i.e 1 not 0)!
            const resData = body.data[0];
            callback(undefined, {
                latitude: resData.latitude,
                longitude:resData.longitude,
                location:resData.name
            });
        }
    })
}

module.exports = geocode;