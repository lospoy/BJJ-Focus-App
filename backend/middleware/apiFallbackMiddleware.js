const history = require('connect-history-api-fallback');
const express = require('express');

const apiRedirect = express();
apiRedirect.use(history({
    rewrites: [
        { from: /.*/, to: '/index.html' }
    ]
}));

module.exports = { apiRedirect }