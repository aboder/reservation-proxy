const path = require('path');
const express = require('express');
const redirectRequest = require('../utils/redirectRequest');

const DOMAINS = require('../constants/DOMAINS')

const proxyServer = express();

proxyServer.use(express.static(
    path.resolve(__dirname, '..', 'public'),
));

proxyServer.use('/api/reservations', (req, res) => {
    const reservations = { DOMAINS };
    redirectRequest(req, reservations)
        .then(({ data }) => {
            res.send(data);
        })
        .catch(console.err);
});

proxyServer.use('/api/reviews', (req, res) => {
    const reviews = { DOMAINS };
    redirectRequest(req, reviews)
        .then(({ data }) => {
            res.send(data);
        })
        .catch(console.err);
});

module.exports = proxyServer;
