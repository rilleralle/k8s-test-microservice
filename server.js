"use strict";

const express = require('express');
const app = express();
const port = 3000;
const hostname = require("os").hostname();
let liveness = 200;
let readiness = 200;

app.get('/', (request, response) => {
    response.send('Hello from '+ hostname)
});

app.get('/liveness', (request, response) => {
    response.status(liveness);
    response.send('Hello from Express! ' + hostname + ' ' + liveness);
});

app.get('/liveness/:status', (request, response) => {
    if(request.params.status != undefined) {
        liveness = request.params.status;
    }
    response.send('Hello from Express! ' + hostname + ' ' + liveness);
});

app.get('/readiness', (request, response) => {
    response.status(readiness);
    response.send('Hello from Express! ' + hostname + ' ' + readiness);
});
app.get('/readiness/:status', (request, response) => {
    if(request.params.status != undefined) {
        readiness = request.params.status;
    }
    response.send('Hello from Express! ' + hostname + ' ' + readiness);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});