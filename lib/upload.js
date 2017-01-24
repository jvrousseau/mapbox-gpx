var AWS = require('aws-sdk');
var MapboxClient = require('mapbox');
var client = new MapboxClient(process.env.MAPBOX_TOKEN);
var username = process.env.MAPBOX_USER

module.exports = function upload(fc) {
  client.createUploadCredentials(function(err, credentials, callback) {
    if (err) {
      return callback(err, null);
    }
    var s3 = new AWS.S3({
     accessKeyId: credentials.accessKeyId,
     secretAccessKey: credentials.secretAccessKey,
     sessionToken: credentials.sessionToken,
     region: 'us-east-1'
    });
    s3.putObject({
      Bucket: credentials.bucket,
      Key: credentials.key,
      Body: JSON.stringify(fc)
    }, function(err, tmp) {
      if (err) {
        return callback(err, null);
      }
      client.createUpload({
        tileset: username + '.' + 'upload-run',
        url: credentials.url,
        name: 'upload-run'
      }, function(err, upload) {
        if (err) {
          return callback(err, null);
        }
        callback(null, upload);
      });
    });
  });
}