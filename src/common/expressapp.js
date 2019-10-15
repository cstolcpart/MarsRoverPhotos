const logger = require('./logger');
const standardResponse = require('./standardresponse');

/**
 * Creates an express app
 * @function
 * @returns {Express}
 */
function createApp() {
    const express = require('express');
    const app = express();

    app.use(function (req, res, next) {
        let logLevel = 'info';
        logger.log(logLevel, 'INBOUND REQUEST:', req.method, req.originalUrl);
        next();
    });

    app.use(function (err, req, res, next) {
        // return HTTP status 500 for server errors
        standardResponse.sendServerError(res);
    });

    return app;
}

/**
 * Creates an express router that handles requests a path.
 * @function
 * @param {string} path - A string representing the request path.
 * @param {object} useable - An object of type Express or Express.Router that implements a "use" method.
 * @returns {Express.Router}
 */
function createRouter(path, useable) {
    const express = require('express');
    const router = express.Router();

    // ensure object has a use method
    if (useable && useable.use) useable.use(path, router);

    return router;
}

/**
 * Adds a catchall route to respond with 404 to unhandled routes
 * @function
 * @param {object} app - Express or Express.Router
 * @param {string} logMessage - A string that will be logged when catchall route is requested
 */
function applyCatchAllRoute(app, logMessage) {
    app.all('*', (req, res) => {
        standardResponse.sendNotFound(res);

        logger.log('info', 'Not Found:', req.requestInfo, logMessage);
    });
}

exports.createRouter = createRouter;
exports.createApp = createApp;
exports.applyCatchAllRoute = applyCatchAllRoute;