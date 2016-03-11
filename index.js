// Declare variables
var fs = require('fs'),
    obj,
    turf = require('turf'),
    _ = require('underscore'),
    lsq = require('./linearLeastSquare.js'),
    turfbboxclip = require('turf-bbox-clip'),
    turfpolygontoline  = require('turf-polygon-to-line'),
    N = [],
    e = []
    units = 'kilometers';


// Read the file and send to the callback
fs.readFile('./data/test.geojson', handleFile)

// Write the callback function
function handleFile(err, data) {
  if (err) throw err
  obj = JSON.parse(data)

  // get data extension
  var bbox = turf.extent(obj);
  // We are in a test
  // in the real scenario I'll already be dealing with roads (polylines)
  var lineFeat = turfpolygontoline(obj)
  //bboxclip requires feature NOT featurecollection, hence the transformation
  var line = turf.linestring(lineFeat.features[0].geometry.coordinates)

  // generate cellWidths range
  var cellWidths = _.range(100,1000,10)
  // for every width size check how many cells contain data
  // TODO: THIS MAP HAS TO BECOME THE "MAP" IN TILEREDUCE
  cellWidths.map(    function (c) {
    // create vector grid
    var cellWidth = c;
    var countCellWithData = 0
    var squareGrid = turf.squareGrid(bbox, cellWidth, units);
    // for each grid cell..
    _.each(squareGrid.features, function(x){
      // clip cell with line..
      var clipped = turfbboxclip(line,turf.extent(x))
      // check if clip is empty or cell contains data
      if (clipped.geometry.coordinates.length > 0) { countCellWithData += 1 }
    })
    // log tranform the data before pushing it to the N array
    N.push(Math.log(countCellWithData));
  })

  // calculate Fractal Dim.
  // log transofrm the cell width array
  e = cellWidths.map(function (val) {
      return Math.log(1/val)
  })
  console.log('Fractal dimension is ' + lsq(N, e));
}
