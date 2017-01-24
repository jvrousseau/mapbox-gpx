# GPX -> Mapbox Tileset Conversion

 This is a basic script that converts each segment of a GPX file into a `lineString` with the available properties (time, elevation, heartrate, etc.). I also created a basic map to read and style the data.
 
 ## usage
 
 
 `MAPBOX_USER={username} MAPBOX_TOKEN={private-token**} cat run.gpx | node index.js` 
 
 
 ** - the private token needs to have write access to your Mapbox account