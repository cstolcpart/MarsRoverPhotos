const fs = require('fs');
const {promisify} = require('util');

/**
 * A function that loads the contents of a file.
 * It is a wrapper function around the standard fs.readFile method.
 * It adds the ability to work with the method using promises rather than callbacks.
 * @function
 * @param {string} file - A path to the file to be opened and read.
 * @returns {Promise}
 */
const readFileAsync = promisify(fs.readFile);

/**
 * A function that loads the contents of a folder.
 * It is a wrapper function around the standard fs.readdir method.
 * It adds the ability to work with the method using promises rather than callbacks.
 * @function
 * @param {string} folder - A path to the folder to be opened and read.
 * @returns {Promise}
 */
const readdirAsync = promisify(fs.readdir);

/**
 * A function that checks existence of file.
 * It is a wrapper function around the standard fs.stat method.
 * It adds the ability to work with the method using promises rather than callbacks.
 * @function
 * @param {string} file - A path to the file to get stats.
 * @returns {Promise}
 */
const statAsync = promisify(fs.stat);

/**
 * A function that creates a folder.
 * It is a wrapper function around the standard fs.mkdir method.
 * It adds the ability to work with the method using promises rather than callbacks.
 * @function
 * @param {string} folder - A path to the folder.
 * @returns {Promise}
 */
const mkdirAsync = promisify(fs.mkdir);

/**
 * A function that loads the contents of a utf8 text file and converts the byte data to a string.
 * @function
 * @param {string} file - A path to the file to be opened and read.
 * @returns {Promise.<string, Error>}
 */
async function readFileToString(file) {
    return readFileAsync(file, 'utf8').then(handleReadFileResult);
}

/**
 * A function that handles the async results of a completed readFile process.
 * @function
 * @param {string} data - The contents of the file that were read from the disk.
 * @param {Object} err - An object with the details of the error that occured during readFile.
 * @returns {string}
 */
function handleReadFileResult(data, err) {
    if (err) {
        // an error occurred while reading the file, so throw it so it can be handled
        throw new Error(err);
    }
    else {
        // convert the byte data to string
        return data.toString();
    }
}

/**
 * A function that checks if a file exists/.
 * @function
 * @param {string} file - A path to the file to check existence.
 * @returns {Promise.<boolean, Error>}
 */
async function fileExists(file) {
    return statAsync(file).then(handleStatFileResult).catch(err => {
        if (err.code == 'ENOENT') return false;
        else throw err;
    });
}

/**
 * A function that handles the async results of a statAsync process.
 * @function
 * @param {Object} stats - The contents of the file stats.
 * @param {Object} err - An object with the details of the error that occured when getting stats.
 * @returns {boolean}
 */
function handleStatFileResult(data, err) {
    if (err) {
        throw new Error(err);
    }
    else {
        // returns true if exists
        return true;
    }
}

exports.readFileAsync = readFileAsync;
exports.readFileToString = readFileToString;
exports.handleReadFileResult = handleReadFileResult;
exports.statAsync = statAsync;
exports.mkdirAsync = mkdirAsync;
exports.fileExists = fileExists;
exports.handleStatFileResult = handleStatFileResult;
exports.readdirAsync = readdirAsync;