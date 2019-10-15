const logger = require('./common/logger');
const fileUtility = require('./common/fileutility');
const axios = require('axios');
const imageDownloader = require('image-downloader');

/**
  * Query NASA's Mars Rover Photo API by earth date
  * @function
  * @param {String} earthDate - date formatted like YYYY-MM-DD
  * @returns {integer} - the number of photos for the specified earth date
  */
async function callNASAMarsRoverPhotoAPI(earthDate) {
    let photoCount = -1;
    if (isValidDate(earthDate)) {
        const imageFolder = process.env.IMAGES_FOLDER + earthDate;
        const imageFolderExists = await fileUtility.fileExists(imageFolder);
        const requestSpec = {
            method: 'GET',
            url: process.env.NASA_PHOTO_API + '?api_key=' + process.env.NASA_API_KEY + '&earth_date=' + earthDate,
            data: null,
            headers: null
        };
        let response = null;

        try {
            response = await axios(requestSpec);
            photoCount = response.data.photos.length;
            if (photoCount > 0) {
                if (!imageFolderExists) {
                    await fileUtility.mkdirAsync(imageFolder);
                    logger.log('info', 'created folder ' + imageFolder);
                }
                downloadAllImages(response.data.photos, imageFolder);
            }
        } catch (error) {
            if (error.response) {
                logger.log('error', 'HTTP Status ' + error.response.status + ' - Error Accessing ' + requestSpec.url);
            }
            else {
                logger.log('error', error.message + ' - Error Accessing ' + requestSpec.url);
            }
            photoCount = -2
        }
    }
    return photoCount;
}

/**
  * Tests a string and returns true if the date is valid and formatted YYYY-MM-DD
  * @function
  * @param {String} earthDate - date formatted like YYYY-MM-DD
  * @returns {boolean}
  */
function isValidDate(stringDate) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!stringDate.match(regEx)) {
        //format is invalid
        return false;
    }
    else {
        //format is valid...now test if the date itself is valid
        const d = new Date(stringDate);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false;
        return (d.toISOString().slice(0,10) === stringDate);
    }
}

/**
  * Download all images listed in the array
  * @function
  * @param {Array} imageArray - array of images from NASA's Mars Rover Photo API
  * @param {String} imageFolder - destination folder for all image files
  */
async function downloadAllImages(imageArray, imageFolder) {
    for (const item of imageArray) {
        await downloadImage(item.img_src, imageFolder);
    }
}

/**
  * Download a single image to a local folder
  * @function
  * @param {String} url - url of the image
  * @param {String} folder - destination folder for the image file
  */
async function downloadImage(url, folder) {
    const destfileName = folder + '/' + url.replace(/\//g, '_').replace(/:/g, '_');
    const fileExists = await fileUtility.fileExists(destfileName);
    if (!fileExists) {
        const downloadSpec = {
            url: url,
            dest: destfileName
        };

        try {
            logger.log('info', 'Downloading Image - ' + destfileName);
            await imageDownloader.image(downloadSpec);
        } catch (e) {
            logger.log('error', e.message);
        }
    }
    else {
        logger.log('info', 'File Exists - ' + destfileName);
    }
}

exports.callNASAMarsRoverPhotoAPI = callNASAMarsRoverPhotoAPI;
exports.downloadImage = downloadImage;
exports.downloadAllImages = downloadAllImages;