const standardResponse = require('./standardresponse');

/**
 * Registers controller methods to RESTful routes
 * If method does not exist, a not found handler is registered
 * @function
 * @param {object} router - Express or Express.Router
 * @param {object} controller - A controller object
 */
function bindRestController(router, controller) {
    const notfound = (req, res) => { standardResponse.sendNotFound(res); };

    router.get('/:id', controller.get ? controller.get : notfound);

    router.get('/', controller.list ? controller.list : notfound);

    router.post('/', controller.create ? controller.create : notfound);

    router.put('/:id', controller.update ? controller.update : notfound);

    router.delete('/:id', controller.delete ? controller.delete : notfound);
}

exports.bindRestController = bindRestController;