const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// Setup for hbs
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware 
// Created using use(). Order of use's will execute in order below
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site is under maintenance',
//         welcomeMessage: 'We appologize for the inconvenience, and will be back up shortly.'
//     });
// })

app.use(express.static(__dirname + '/public'));


// Helper Functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Setup Pages
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        welcomeMessage: 'Portfolio page text goes here'
    })
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// Put app on port environment variable (for heroku's use)
app.listen(port, () => {
    console.log(`Server is up on port ${port}\n`);
});
