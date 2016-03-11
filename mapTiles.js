'use strict';
var turf = require('turf'),
    _ = require('underscore'),
    path = require('path'),
    cover = require('tile-cover'),
    vtGeoJson = require('vt-geojson'),
    turfbboxclip = require('turf-bbox-clip'),
    N = [],
    e = [],
    units = 'kilometers',
    numFeatures = 0    ,
    cellWidths = _.range(100,1000,10),
    cover = require('tile-cover'),
    vtGeoJson = require('vt-geojson')    ,
    tileUri = 'mbtiles://' + path.join(__dirname, '/data/malawi.mbtiles'),
    majorRoadsArr = [];

var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');


module.exports = function(data, tile, writeData, done) {

  var tile = new VectorTile(new Protobuf(data));
  console.log(tile);
  // Contains a map of all layers
  // tile.layers;

  // var landuse = tile.layers.landuse;
  //
  // // Amount of features in this layer
  // landuse.length;
  //
  // // Returns the first feature
  // landuse.feature(0);


// var feature = data.osm
//   vtGeoJson(tileUri)
//     .on('data', function (feature) {
//       console.log("it's a GeoJSON feature!", feature.geometry.type, feature.properties)
//     })
//     .on('end', function () {
//       console.log('all done')
//     })



  // console.log('data', data);
  // console.log('tile', tile);
    // vt to geojson stuff that's kinda working but needs to go into map section
    j = JSON.stringify(feature)
    console.log(tileUri);

    vtGeoJson(tileUri)
      .on('data', function (feature) {
        console.log(feature);

        // console.log("it's a GeoJSON feature!", feature.geometry.type, feature.properties)
        if (feature.geometry.type == "LineString" && feature.properties.highway == "motorway" ) {

          // get data extension
          var bbox = turf.extent(feature);
          // We are in a test
          // in the real scenario I'll already be dealing with roads (polylines)
          // var lineFeat = turfpolygontoline(obj)
          //bboxclip requires feature NOT featurecollection, hence the transformation
          // var line = turf.linestring(lineFeat.features[0].geometry.coordinates)

          cellWidths.map(    function (c) {
            // create vector grid
            var cellWidth = c;
            var countCellWithData = 0
            var squareGrid = turf.squareGrid(bbox, cellWidth, units);
            // for each grid cell..
            _.each(squareGrid.features, function(x){
              // clip cell with line..
              var clipped = turfbboxclip(feature,turf.extent(x))
              // check if clip is empty or cell contains data
              if (clipped.geometry.coordinates.length > 0) { countCellWithData += 1 }
            })
            // log tranform the data before pushing it to the N array
            N.push(Math.log(countCellWithData));
          })


        }

      })
      .on('end', function () {
        console.log('all done', N)
      })





  // var count = 0;
  // console.log(JSON.stringify(data.osm.roads));
  // console.log(tile);
  // if (data.osm.roads) count += data.osm.roads.length;
  // if (data.osm.buildings) count += data.osm.buildings.length;
  // done(null, count);
  //
  //
  // // get data extension
  // var bbox = turf.extent(obj);
  // // We are in a test
  // // in the real scenario I'll already be dealing with roads (polylines)
  // var lineFeat = turfpolygontoline(obj)
  // //bboxclip requires feature NOT featurecollection, hence the transformation
  // var line = turf.linestring(lineFeat.features[0].geometry.coordinates)



};
