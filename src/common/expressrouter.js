const expressApp = require('./expressapp');
const API_PATH = '/api';

/**
 * Creates a router that has been configured to use our micro-service default routes for api and health.
 * @function
 * @param {Express} app - An object of type Express.
 * @returns {Express.Router}
 */
function createStandardApiRouter(app) {
    const apiRouter = expressApp.createRouter(API_PATH, app);

    return apiRouter;
}

exports.API_PATH = API_PATH;
exports.createStandardApiRouter = createStandardApiRouter;