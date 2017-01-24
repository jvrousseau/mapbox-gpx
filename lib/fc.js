var togeojson = require('@mapbox/togeojson');
var DOMParser = require('xmldom').DOMParser;
var meta = require('@turf/meta');
var turf = require('@turf/turf');
var datapoints = [];
var _ = {
  omit: require('lodash/omit')
};

module.exports = function gpxToGeoJSON(gpx) {
  gpx = new DOMParser().parseFromString(gpx);
  var geojson = togeojson.gpx(gpx);
  meta.coordEach(geojson, function (coord) {
    datapoints.push({
      coord: coord
    });
  });
  
  meta.propEach(geojson, function (prop) {
    Object.keys(prop).forEach(function (key) {
      if (Array.isArray(prop[key])) {
        prop[key].forEach(function (value, index) {
          if(datapoints[index]) {
            datapoints[index][key] = value;
          }
        })
      }
    });
  });
  var length = datapoints.length;
  var features = [];
  var feature = datapoints.map(function (point, index) {
    if (index < length - 1) {
      var next_point = datapoints[index + 1];
      var props = _.omit(point, ['coord']);
      if (point.coord.length === 3) {
        props.elevation = point.coord[2];
      }
      var units = 'kilometers';
      var linestring = turf.lineString([point.coord, next_point.coord]);
      var distance = turf.lineDistance(linestring, units);
      var cut_distance = 0.00005;
      if(distance > cut_distance) {
        var lineslice = turf.lineSliceAlong(linestring, 0, (distance - cut_distance), units);
        lineslice.properties = props;
        features.push(lineslice);
      }
    }
  });
  return turf.featureCollection(features);
}