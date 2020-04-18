const fs = require("fs");

let map = fs.readFileSync("BdMap.json").toString();

map = JSON.parse(map);
console.log(map.objects.bd.geometries);
