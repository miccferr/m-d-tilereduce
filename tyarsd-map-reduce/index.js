var tilereduce = require('tile-reduce'),
    path = require('path'),
    turf = require('turf')

var opts = {
    zoom: 12,
    sources: [{
        name: 'osm',
        mbtiles: path.join(__dirname, '../data/malawi.mbtiles'),
        raw: true
    }],
    map: __dirname+'/map.js'
}

var tilereduce = tilereduce(opts)
.on('reduce', function(result, tile){
  // console.log('QUESTO E IL RISULTATO');
  // console.log(result);
})
.on('end', function() {
})
.on('error', function (error) {
    throw error;
})
