const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express Config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Carlos Roberto'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Carlos Roberto'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Lore ipsum',
        name: 'Carlos Roberto'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress to search'
        })
    }
    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: data,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Sorry, this page don\'t exist :\(',
        error: 'Help article not found',
        name: 'Carlos Roberto'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Sorry, this page don\'t exist :\(',
        error: 'Page not found',
        name: 'Carlos Roberto'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000!')
})