const path = require('path');
const express = require('express');
const proxyServer = express();

proxyServer.use(express.static(
    path.resolve(__dirname, '..', 'public'),
));

module.exports = proxyServer;
