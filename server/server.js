const path = require('path');
const express = require('express');
const axios = require('axios');

const redirectRequest = require('../utils/redirectRequest');
const template = require('../utils/template');

const DOMAINS = require('../constants/DOMAINS');

const proxyServer = express();

proxyServer.use(express.static(
  path.resolve(__dirname, '..', 'public'),
));

proxyServer.get('/:roomId$', (req, res) => {
  const { roomId } = req.params;
  axios(`http://localhost:3002/${roomId}`)
    .then(({ rendered, preloadedState }) => {
      res.send(template(rendered, preloadedState));
    })
    .catch((reason) => {
      console.log(reason);
      res.status(500).send();
    });
});

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
