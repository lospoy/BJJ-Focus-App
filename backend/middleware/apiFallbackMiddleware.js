const history = require('connect-history-api-fallback');

const apiRedirect = _ => {
    history({
        rewrites: [
            {
                from: /.*/,
                to: '/index.html'
            }
        ],
        logger: console.log.bind(console)
    })
};

module.exports = { apiRedirect }