const logger = require('./logger');

/**
 * Gets the configured port value.
 * @function
 * @param {object} properties - A key/value object of application configurations.
 * @returns {number}
 */
function getPort(properties) {
    // get the server port from the environment config
    return properties.SERVER_PORT;
}

/**
 * Starts the server on the specified port.
 * @function
 * @param {object} app - Something that can be started with listen() (e.g. an http server).
 * @param {number} port - The port where the server should listen for requests.
 */
async function startServer(app, port) {
    if (!port) {
        logger.log('error', 'Port is not defined. Server start cancelled.');
        return;
    }

    // start me up
    app.listen(port, () => {handleServerListening(port);});
}

/**
 * Logs a friendly message when the server starts.
 * @function
 * @param {number} port - The port that the server is listening on.
 */
async function handleServerListening(port) {
    logger.log('info', `Server listening on port ${ port }!`);
}

exports.handleServerListening = handleServerListening;
exports.getPort = getPort;
exports.startServer = startServer;