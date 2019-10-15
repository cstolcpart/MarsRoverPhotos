const NOT_FOUND_RESPONSE = {status: 'error', error: 'not_found', reason: 'missing'};
const BAD_DATE_REQUEST_RESPONSE = {status: 'error', error: 'bad_request', reason: 'invalid_date'};
const SERVER_ERROR_RESPONSE = {status: 'error', error: 'internal_server_error'};

/**
 * Sends a standard 404 response to the client.
 * @function
 * @param {object} res - A response object.
 */
function sendNotFound(res) {
    if (res.status) {
        // when res comes from a express app it will have a status method
        res.status(404).json(NOT_FOUND_RESPONSE);
    }
    else {
        // otherwise it does not when it is just a plain http server response
        res.writeHead(404, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(NOT_FOUND_RESPONSE));
    }
}

/**
 * Sends a success response to the client along with the supplied data.
 * @function
 * @param {object} res - A response object.
 * @param {object} data - An object that can be serialized to json and sent to the client..
 */
function sendSuccess(res, data) {
    res.json({
        status:'ok',
        data: data
    });
}

/**
 * Sends an error 400 response to the client. Useful when bad data is sent in the request.
 * @function
 * @param {object} res - A response object.
 */
function sendBadDateRequest(res) {
    res.status(400).json(BAD_DATE_REQUEST_RESPONSE);
}

/**
 * Sends an error 500 response to the client. This will the error that gets returned when not 400 or 404.
 * @function
 * @param {object} res - A response object.
 */
function sendServerError(res) {
    res.status(500).json(SERVER_ERROR_RESPONSE);
}

exports.NOT_FOUND_RESPONSE = NOT_FOUND_RESPONSE;
exports.BAD_DATE_REQUEST_RESPONSE = BAD_DATE_REQUEST_RESPONSE;
exports.SERVER_ERROR_RESPONSE = SERVER_ERROR_RESPONSE;
exports.sendNotFound = sendNotFound;
exports.sendSuccess = sendSuccess;
exports.sendBadDateRequest = sendBadDateRequest;
exports.sendServerError = sendServerError;