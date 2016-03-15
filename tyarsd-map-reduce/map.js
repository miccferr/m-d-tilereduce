var turf = require('turf'),
_ = require('underscore'),
cellWidths = _.range(0.010,1,0.2),
units = 'kilometers',
N = [],
e = [],
lsq = require('./linearLeastSquare.js'),
turfbboxclip = require('turf-bbox-clip'),
turfpolygontoline  = require('turf-polygon-to-line')

var roadTypes = [
        'primary',
        'secondary',
        'tertiary',
        'unclassified',
        'residential'
    ]
var boundaries = [
  'administrative'
]
module.exports = function (tileLayers, tile, writeData, done) {
  // console.log(tile);
  // console.log(tileLayers);

  // if (feature.geometry.type == "LineString" && feature.properties.highway == "motorway" ) {
  //
  // }
  //
    var fractalDim = []
    // if (feature.geometry.type !== 'Relation'){}else{

    // }

    // if (roadTypes.indexOf(feature.properties.highway) === -1) continue



    for (var i = 0; i < tileLayers.osm.osm.length; i++) {
         var feature = tileLayers.osm.osm.feature(i)


        if (boundaries.indexOf(feature.properties.boundary) === -1) continue
        if (feature.properties.boundary =='administrative') {
          var ft = feature.toGeoJSON(tile[0],tile[1],tile[2])

          var bbox = turf.extent(ft);
          cellWidths.map(    function (c) {
            // create vector grid
            var cellWidth = c;
            var countCellWithData = 0
            var squareGrid = turf.squareGrid(bbox, cellWidth, units);

            // for each grid cell..
            _.each(squareGrid.features, function(x){
              // clip cell with line..
              var clipped = turfbboxclip(ft,turf.extent(x))
              // check if clip is empty or cell contains data
              // .geometry.coordinates.length > 0
              if (clipped.geometry.coordinates.length > 0) countCellWithData += 1
            })

            // log tranform the data before pushing it to the N array
            // Number of cells containing object (N)
            N.push(Math.log(countCellWithData));

          })

          //just for clarity
          //Size of cells (e)
          e = cellWidths.map(function (val) {
            // console.log(val);
              return Math.log(1/val)
          });


          fractalDim.push({
              sizeOfCells: e,
              numberOfCellsContaingFeature: N
          })

          console.log(fractalDim);
        }
        // usa la sua parte di reduce per il calcolo della lsqn
        // ma fallo non qui bensi in reduce vero e proprio
        // console.log('Fractal dimension is ' + lsq(N, e));

// sue robe
        // if (roadTypes.indexOf(feature.properties.highway) === -1) continue //
        // if (feature.geometry.type == 'Point') continue //
        //
        // var roadLength = turf.lineDistance(feature, 'kilometers'),
        //     roadDist = turf.distance(
        //         turf.point(feature.geometry.coordinates[0]),
        //         turf.point(feature.geometry.coordinates.pop()) // can alter the geometry, as total length has already been calculated
        //     )
        // tortuosities.push({
        //     dist: roadDist,
        //     length: roadLength
        // })

    }

    // var tortuosity = tortuosities.reduce(function(prev, curr) {
    //     if (curr.dist > 0) { // ignore closed loops ?
    //         prev.len += curr.length
    //         prev.tort += Math.min(4, curr.length/curr.dist) * curr.length
    //     }
    //     return prev
    // }, { len:0, tort:0 })
//     tortuosity = tortuosity.tort / tortuosity.len
//

done(null, fractalDim);
}
