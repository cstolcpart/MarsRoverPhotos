# MarsRoverPhotos
NASA Mars Rover Photo API to download photos from a given day

This app uses NASA's Mars Rover Photo API to download photos from a given day. It accepts a GET request with a single parameter "earth_date" with a value in the form YYYY-MM-DD. It uses NASA’s API to look for photos on that date. If that date contains any images, the app will download all of them and save them to a directory named as the date that they came from. The JSON response to the GET request return whether the api call to NASA was successful and how many images were downloaded and saved.

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
- The IMAGES_FOLDER is where the app will place the photos that are downloaded.  There will be a subfolder created for each earth date for which images are requested.  The "images" folder must exist prior to starting the server.
- The NASA_API_KEY of "DEMO_KEY" will work for a limited time.  To request your own API key, go to this web site: https://api.nasa.gov/index.html
- Execute 'npm install' from the app root to load dependencies
- Execute 'npm start' from the app root to start the server
- The following are some example URL's given port 9080 above:
  - http://localhost:9080/api/photos?earth_date=2015-10-04
  - http://localhost:9080/api/photos?earth_date=2015-10-05
  - http://localhost:9080/api/photos?earth_date=2015-10-06
- Documentation for the NASA Mars Rover Photo API can be found here: https://api.nasa.gov/index.html
