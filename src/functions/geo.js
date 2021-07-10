const request = require('postman-request')

const geocode = (address,callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFuZWRhdmlkIiwiYSI6ImNrcW8xazJhbTBpa3QycG5wbXpvZXJodjYifQ.tsSSsqg0QOy-XT_QV9EdbA&limit=1`
	request({ url,json:true } ,(error, {body}) => {
		if(error){
			callback('some connection message',undefined)
		}else if(body.features.length === 0){
			callback('another fucking error(location)',undefined)
		}else{
			let cord = body.features[0]
			callback(undefined,{
				latitude: cord.center[1],
				longitude: cord.center[0],
				location: cord.place_name
			})
			
		}

	})
}

module.exports = geocode