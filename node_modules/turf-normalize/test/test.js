var normalize = require('../');
var test = require('tape');

test('normalize', function (t) {
  var ptGeom = {
    "type": "Point",
    "coordinates": [
      35.859375,
      51.6180165487737
    ]
  };

  var ptFeature = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        35.859375,
        51.6180165487737
      ]
    }
  };

  var ptFeatureCollection = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.859375,
            51.6180165487737
          ]
        }
      }
    ]
  };

  t.deepEqual(normalize(ptGeom), ptFeatureCollection, 'geometry');
  t.deepEqual(normalize(ptFeature), ptFeatureCollection, 'feature');
  t.deepEqual(normalize(ptFeatureCollection), ptFeatureCollection, 'featurecollection');

  t.end();
});