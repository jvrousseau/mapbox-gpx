# Strava GPX -> Mapbox Tileset Conversion

 my strava runs provide me some elevation data as well as heartrate. I wanted to map those out. This is a basic script that converts each segment into a `lineString` with the available properties (time, elevation, heartrate, etc.). I also created a basic map to read and style the data.
 
 ## usage
 
 
 `MAPBOX_USER={username} MAPBOX_TOKEN={private-token**} cat run.gpx | node index.js` 
 
 
 ** - this needs to have write access to your Mapbox account