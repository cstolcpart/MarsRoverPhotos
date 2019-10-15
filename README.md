# MarsRoverPhotos
NASA Mars Rover Photo API to download photos from a given day

### Setup
Follow these steps to configure the properties locally.
- Edit the properties.properties file in the app root for your specific setup
*properties.properties*
```
SERVER_PORT=9080
NASA_PHOTO_API=https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos
NASA_API_KEY=DEMO_KEY
IMAGES_FOLDER=c:\Projects\MarsRoverPhotos\images\
```
- Documentation for the NASA Mars Rover Photo API can be found here: https://api.nasa.gov/index.html
- The IMAGES_FOLDER is where the app will place the photos that are downloaded.  There will be a subfolder created for each earth date for which images are requested.  This folder must exist prior to starting the server.
- The NASA_API_KEY of "DEMO_KEY" will work for a limited time.  To request your own API key, go to this web site: https://api.nasa.gov/index.html
- Execute 'npm install' from the app root to load dependencies
- Execute 'npm start' from the app root to start the server
- The following are some example URL's given port 9080 above:
- - http://localhost:9080/api/photos?earth_date=2015-10-04
- - http://localhost:9080/api/photos?earth_date=2015-10-05
- - http://localhost:9080/api/photos?earth_date=2015-10-06

