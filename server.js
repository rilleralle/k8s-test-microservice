"use strict";

const express = require('express');
const hbs = require('express-hbs');

const app = express();
const port = 3000;
const hostname = require("os").hostname();

let liveness = 200;
let readiness = 200;


// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('index', {"hostname" : hostname});
    //response.send(`Hello from "${hostname}"`);
});

app.get('/liveness', (request, response) => {
    response.status(liveness);
    response.render('endpoint',
        {
            "hostname": hostname,
            "endpoint": "/liveness",
            "statuscode": liveness
        });
});

app.get('/liveness/:status', (request, response) => {
    if(request.params.status !== undefined) {
        liveness = request.params.status;
    }
    response.render('endpoint',
        {
            "hostname": hostname,
            "endpoint": "/liveness",
            "statuscode": liveness
        });
});

app.get('/readiness', (request, response) => {
    response.status(readiness);
    response.render('endpoint',
        {
            "hostname": hostname,
            "endpoint": "/readiness",
            "statuscode": readiness
        });
});
app.get('/readiness/:status', (request, response) => {
    if(request.params.status !== undefined) {
        readiness = request.params.status;
    }
    response.render('endpoint',
        {
            "hostname": hostname,
            "endpoint": "/readiness",
            "statuscode": readiness
        });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Wuups...', err);
    }

    console.log(`server is listening on ${port}`)
});