'use strict'
// require("babel-core").transform("code", options);

import data from  './data/motherRussia.geojson';
import turf from 'turf';
// console.log(JSON.stringify(data.toString()));

let centroidPt = turf.centroid(data);
console.log('asdasd');
// console.log(centroidPt);
// let result = {
//   "type": "FeatureCollection",
//   "features": [data, centroidPt]
// };
