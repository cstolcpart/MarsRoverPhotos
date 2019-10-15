const properties = require('./common/properties');
const logger = require('./common/logger');
const serverConfig = require('./common/serverconfig');
const expressApp = require('./common/expressapp');
const expressRouter = require('./common/expressrouter');
const expressRouteBinder = require('./common/expressroutebinder');

const photoController = require('./photocontroller');

/**
 * Starts the server
 * @function
 */
async function start() {
    await properties.configure(process.env).catch((err) => logger.log('error', err));

    const port = serverConfig.getPort(process.env);

    const app = expressApp.createApp(false);

    const apiRouter = expressRouter.createStandardApiRouter(app);

    // bind controller to RESTful routes
    const photoRouter = expressApp.createRouter('/photos', apiRouter);
    expressRouteBinder.bindRestController(photoRouter, photoController);

    // setup the 404 response for all other non-handled routes
    expressApp.applyCatchAllRoute(app, '(unhandled route)');

    serverConfig.startServer(app, port);
}

exports.start = start;