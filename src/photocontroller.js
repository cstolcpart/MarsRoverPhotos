const standardResponse = require('./common/standardresponse');
const photoService = require('./photoservice');

/**
  * implements RESTful "list" method and calls method in the photo service to get all photos for a given earth date.
  * @param {Object} req - request object
  * @param {Object} res - response object
  */
async function list(req, res)  {
    let earthDate = req.query.earth_date;
    let numFound = await photoService.callNASAMarsRoverPhotoAPI(earthDate);

    standardResponse.sendSuccess(res, {photo_count:numFound});
}

exports.list = list;