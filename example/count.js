'use strict';

module.exports = function(data, tile, writeData, done) {
  console.log(data);
  var count = 0;
  if (data.osm.roads) count += data.osm.roads.length;
  if (data.osm.buildings) count += data.osm.buildings.length;
  console.log(JSON.stringify(data.osm.roads.length,null,2));
  done(null, count);
};
