if (process.env.MAPBOX_TOKEN == null) {
  console.error('an environroment variable of MAPBOX_TOKEN needs to exist');
  console.error('i.e. - MAPBOX_TOKEN={private-token} node index.js');
  process.exit(1);
}
if (process.env.MAPBOX_USER == null) {
  console.error('an environroment variable of MAPBOX_USER needs to exist');
  console.error('i.e. - MAPBOX_USER={username} node index.js');
  process.exit(1);
}

var piped_data = '';


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  piped_data += chunk;
});

process.stdin.on('end', function() {
  var geojson = require('./lib/fc')(piped_data);
  var errors = require('@mapbox/geojsonhint').hint(geojson);
  if (errors.length !== 0) {
    console.error(errors);
    return;
  }
  require('./lib/upload')(geojson, function (err, res) {
    if (err) {
      console.error('something went wrong', err);
    } else {
      console.log('done!', res);
    }
  });
});