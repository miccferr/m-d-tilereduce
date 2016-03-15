'use strict';

// Declare variables
var tileReduce = require('tile-reduce'),
    path = require('path'),
    lsq = require('./linearLeastSquare.js');

// // vt to geojson stuff that's kinda working but needs to go into map section
// vtGeoJson(tileUri)
//   .on('data', function (feature) {
//     // console.log("it's a GeoJSON feature!", feature.geometry.type, feature.properties)
//     if (feature.geometry.type == "LineString" && feature.properties.highway == "motorway" ) {
//
//       // get data extension
//       var bbox = turf.extent(feature);
//       // We are in a test
//       // in the real scenario I'll already be dealing with roads (polylines)
//       // var lineFeat = turfpolygontoline(obj)
//       //bboxclip requires feature NOT featurecollection, hence the transformation
//       // var line = turf.linestring(lineFeat.features[0].geometry.coordinates)
//
//       cellWidths.map(    function (c) {
//         // create vector grid
//         var cellWidth = c;
//         var countCellWithData = 0
//         var squareGrid = turf.squareGrid(bbox, cellWidth, units);
//         // for each grid cell..
//         _.each(squareGrid.features, function(x){
//           // clip cell with line..
//           var clipped = turfbboxclip(feature,turf.extent(x))
//           // check if clip is empty or cell contains data
//           if (clipped.geometry.coordinates.length > 0) { countCellWithData += 1 }
//         })
//         // log tranform the data before pushing it to the N array
//         N.push(Math.log(countCellWithData));
//       })
//
//
//     }
//
//   })
//   .on('end', function () {
//     console.log('all done', N)
//   })






tileReduce({
  // bbox: [-122.05862045288086, 36.93768132842635, -121.97296142578124, 37.00378647456494],
  // zoom: 15,
  map: path.join(__dirname, '/mapTiles.js'),
  sources: [{name: 'osm', mbtiles: path.join(__dirname, './data/malawi.mbtiles'), raw: true}]
})
// .on('reduce', function(num) {
//   // push results to array
//   numFeatures += num;
// })
.on('end', function() {
  // calculate Minkowski dim
  console.log('Done!');
});
