const server = require('./server/server');

server.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
