const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./functions/geo.js')
const forecast = require('./functions/forecast.js')

//setting paths to required files
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//using static files
app.use(express.static(publicPath))

//setting up hbs
app.set('view engine','hbs')

//customizing default path of views
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
	res.render('index',{
		title:'weather app',
		name:'dve'
	})
})


app.get('/about',(req,res)=>{
	res.render('about',{
		title:'about',
		name:'dve'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'help',
		name:'dve'
	})
})

app.get('/weather',(req,res)=>{

	const query = req.query

	if(!query.address){
		return res.send('barev cayr')
	}
	geocode(query.address,(error,{latitude,longitude,location} = {})=>{
		if(error !== undefined){
			return res.send({error})
		}

		forecast(latitude,longitude,(error,{description,temperature,wind_speed} = {})=>{
			if(error !== undefined){
				return res.send({error})
			}
			const forecast =description + '. It is ' + temperature +' degrees out.wind speed is '+wind_speed
			res.send({location,forecast})
		})
	})
})


app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'help',
		name:'dve'
	})
})


app.get('*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'dve'
	})
})

app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})