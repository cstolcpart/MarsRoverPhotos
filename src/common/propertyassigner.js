const logger = require('./logger');

const LINE_DELIMITER = '\n';
const KEY_VALUE_DELIMETER = '=';
const COMMENT_CHARACTER = '#';

/**
 * A function that parses text read from a standard key/value pair property file and saves the keys and values to the specified targetObj.
 * This is useful for setting environment variables in process.env.
 * @function
 * @param {string} sourceData - A string of key/value properties in the format of key=value, with each pair separated by a new line (\n) and/or carriage return (\r)
 * @param {Object} targetObj - An object where the keys and values from the sourceData will be saved.
 * @example <caption>Example sourceData with comments and blank lines.</caption>
 * sourceData key1=value1\n\n#commentedKey=value2\nkey3=value3
 */
function assign(sourceData, targetObj) {
    // if no sourceData is supplied then there is nothing to process
    if (!sourceData) {
        return;
    }

    // make sure that targetObj is a valid object
    if (!targetObj) {
        throw Error('Missing parameter, targetObj');
    }
    if (typeof targetObj !== 'object') {
        throw Error('Invalid parameter, targetObj must be an object');
    }

    // start parsing the data by splitting into an array of lines
    const splitted = sourceData.split(LINE_DELIMITER);

    for (let i = 0; i<splitted.length; i++) {
        // split key and value into an array
        const splitLine = splitted[i].split(KEY_VALUE_DELIMETER);

        // exclude blank lines, comment lines, lines where there is a value but no property
        if (splitLine.length > 1 && splitLine[0].trim().length > 0 && splitLine[0].charAt(0) != COMMENT_CHARACTER) {
            // remove the extra carriage-return in windows systems
            const value = splitLine[1].replace(/\r/g, '');

            logger.log('debug', 'Setting environment variable: ' + splitLine[0]);

            // assign the value to the key on the supplied targetObj
            targetObj[splitLine[0]] = value;
        }
    }
}

exports.assign = assign;