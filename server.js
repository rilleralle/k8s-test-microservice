"use strict";

const express = require('express');
const hbs = require('express-hbs');

const app = express();
const port = 3001;
const hostname = require("os").hostname();

let endpointSettings = getEnvVar("ENDPOINTS", ["liveness:200", "readiness:200"]);
let endpoints = endpointSettings.map((item) => {
    let content = item.split(":");
    return {"endpoint": content[0], "status": content.length === 2 ? content[1] : 200};
});

function getEnvVar(envVar, defaultValue) {
    const value = process.env[envVar];
    return value === undefined ? defaultValue : value.split(",");
}

// Setup
app.engine('hbs', hbs.express4({
    'defaultLayout': __dirname + '/views/layout'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('index',
        {
            "hostname": hostname,
            "endpoints": endpoints
        });
});

app.get('/exit/:status?', (request, response) => {
    let exitCode = 0;
    if(request.params.status !== undefined) {
        exitCode = request.params.status;
    }
    response.render('kill',
        {
            "hostname": hostname
        });
    setTimeout(() => process.exit(exitCode), 5000);
});

// Define endpoints
endpoints.forEach((item, i) => {
    app.get(`/${item.endpoint}/:status?`, (request, response) => {
        if(request.params.status !== undefined) {
            endpoints[i].status = request.params.status;
        }
        response.status(parseInt(endpoints[i].status));
        response.render('endpoint',
            {
                "hostname": hostname,
                "endpoint": "/" + item.endpoint,
                "statuscode": endpoints[i].status
            });
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Wuups...', err);
    }

    console.log(`server is listening on ${port}`)
});