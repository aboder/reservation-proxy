const path = require('path');
const express = require('express');
const axios = require('axios');
const proxyServer = express();

const reservationServiceDomain = 'http://localhost:3002';
const reviewsServiceDomain = 'http://localhost:3001';

const redirectRequest = ({ originalUrl, headers, method, params, data }, domain) => (
    axios({
        url: `${domain}${originalUrl}`,
        params,
        method,
        data,
        headers: {
            ...headers,
            'Cache-Control': 'no-cache',
        },
    })
);

proxyServer.use(express.static(
    path.resolve(__dirname, '..', 'public'),
));

proxyServer.use('/api/reservations', (req, res) => {
    redirectRequest(req, reservationServiceDomain)
        .then(({ data }) => {
            res.send(data);
        })
        .catch(console.err);
});

proxyServer.use('/api/reviews', (req, res) => {
    redirectRequest(req, reviewsServiceDomain)
        .then(({ data }) => {
            res.send(data);
        })
        .catch(console.err);
});

module.exports = proxyServer;
