const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=366fc16809e084f3eb9d16a2ceb87bf1&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('The weather service is offline, try again later', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, { temperature: body.current.temperature, feelslike: body.current.feelslike, precip: body.current.precip, description: body.current.weather_descriptions[0].toLowerCase() })
        }
    })
}

module.exports = forecast