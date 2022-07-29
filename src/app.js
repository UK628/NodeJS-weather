const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define viewPath
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Utku Kurtulmuş'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Utku Kurtulmuş',
        prompt: "Help me"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Utku Kurtulmuş'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        res.send( {
            error: 'You must provide an address'
        })

        return;
    }

    const locationName = req.query.address;

    geocode(locationName, (err,{latitude,longitude,location} = {}) => {   
        if (err) {
            res.send( {
                error: err
            })
            return;
        }
    
        forecast(longitude, latitude, (error, data2) => {
            if (error) {
                res.send( {
                    error: err
                })
                return;
            }
                
            res.send({
                forecast: data2,
                location:location,
                //address: req.query.address
            })
        })
    } )     
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        prompt: "Help article not found",        
        title: '404',
        name: 'Utku Kurtulmuş'
        })
})

app.get('*', (req,res) => {
    res.render('404', {
        prompt: "Page not found",
        title: '404',
        name: 'Utku Kurtulmuş'
    })
})

app.listen(3000)