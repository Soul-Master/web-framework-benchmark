const express = require('express'),
    http = require('http');

export function start(): any {
    const app = express();
    app.set('etag', false);
    app.use(express.static('../src'));

    return http.createServer(app).listen(3000, () => {
        return console.log(`HTTP/1 use http://localhost:3000`);
    });
}