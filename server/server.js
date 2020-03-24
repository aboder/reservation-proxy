const path = require('path');
const express = require('express');
const redirectRequest = require('../utils/redirectRequest');

const DOMAINS = require('../constants/DOMAINS');

const proxyServer = express();

proxyServer.use('/*bundle.js', (req, res) => {
  const { service } = req.originalUrl.match(/\/(?<service>.+)bundle.js/i).groups;
  redirectRequest(req, DOMAINS[service])
    .then(({ data }) => {
      res.send(data);
    })
    .catch((reason) => {
      console.log(reason);
      res.status(500).send();
    });
});

proxyServer.use(express.static(
  path.resolve(__dirname, '..', 'public'),
));

proxyServer.use('/api/reservations', (req, res) => {
  const { reservations } = DOMAINS;
  redirectRequest(req, reservations)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((reason) => {
      console.log(reason);
      res.status(500).send();
    });
});

proxyServer.use('/api/reviews', (req, res) => {
  const { reviews } = DOMAINS;
  redirectRequest(req, reviews)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((reason) => {
      console.log(reason);
      res.status(500).send();
    });
});

module.exports = proxyServer;
