const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
	const url = `http://api.weatherstack.com/current?access_key=17828a8ea9f3c6013dcb0b8d6d803f0f&query=${encodeURIComponent(latitude+','+longitude)}`
	request({ url,json:true },(error, {body}) => {
		if(error){
			callback('you have a fucking problem right here',undefined)
		}else if(body.error){
			callback('another fucking error',undefined)
		}else {
			const current = body.current
			callback(undefined,current.observation_time + "." + current.weather_descriptions + '. It is ' + current.temperature + ' degrees out.wind speed is '+ current.wind_speed + ' m/s.local time is ' + body.location.localtime + '.')
		}
	})
}

module.exports = forecast