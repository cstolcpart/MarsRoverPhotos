const fileUtility = require('./fileutility');
const logger = require('./logger');
const propertyAssigner = require('./propertyassigner');

const DEFAULT_PROPERTIES_FILE = './properties.properties';

/**
 * A function that reads text from a key/value pair property file and saves the keys and values to processEnv object.
 * @function
 * @param {Object} processEnv - An object where the keys and values from the sourceData will be saved.
 * @example <caption>Example file with comments and blank lines.</caption>
 * key1=value1
 *
 * #commentedKey=value2
 * key3=value3
 */
async function configure(processEnv) {
    // make sure that targetObj is a valid object
    if (!processEnv) {
        throw Error('Missing parameter, processEnv');
    }
    if (typeof processEnv !== 'object') {
        throw Error('Invalid parameter, processEnv must be an object');
    }

    // set the file path to the supplied value or default if not provided
    const file = processEnv.PROPERTIES_FILE || DEFAULT_PROPERTIES_FILE;

    logger.log('info', 'Loading external properties from ' + file + '...');

    // read in the file contents
    const data = await fileUtility.readFileToString(file);

    if (data) {
        // parse the contents and save to processEnv
        propertyAssigner.assign(data, processEnv);

        logger.log('info', 'Properties loaded...');
    }
    else {
        logger.log('info', 'Property file is empty...');
    }
}

exports.configure = configure;