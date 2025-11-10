// Convenience stuff
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const x = 0;
const y = 1;
var c = document.getElementById("graph-canvas");
var ctx = c.getContext("2d");

// Is it side length or radius?

// Round numbers
/*function round (num, p=0) {
    if (num == undefined) return 0;
    else return Math.round(num * 10 ** -p) / 10 ** -p;
}*/
function radian (num = 360) {
  return (Math.PI * num) / 180;
}

function interpret () {
  // Process input & clear canvas
	var val = Number(qs('#symbol').value);
  var l = Number(qs('#sideLength').value);
  ctx.clearRect(0, 0, 400, 400);
  // Variables
  var itm; // Intermediate
  
  var ang = {
    sum: 180 * (val - 2), // Sum of angle measures
    mes: ( 180 * (val - 2) ) / val, // Each interior angle
    ext: 360 / val // Each exterior angle
  }
  
  var coord = [Number(qs('#centre-x').value), Number(qs('#centre-y').value)];
  var coordOrig = coord;
  var radius = l / (2 * Math.sin(Math.PI / val));
  
  var i = 0;
  setInterval( function () {
    // Start at old coordinates
    // ctx.beginPath();
    ctx.moveTo(coord[x], coord[y]);

    // Modify old coordinates    
    coord[x] += radius * Math.cos( (i * 2 * Math.PI) / val);
    coord[y] += radius * Math.sin( (i * 2 * Math.PI) / val);

    // Draw line to new coordinates
    ctx.lineTo(coord[x], coord[y]);
    ctx.stroke();
    i += 1;
    if (coord[x] == coordOrig[x] && coord[y] == coordOrig[y] && i != 0) clearInterval();
  }, Number(qs('#draw-ms').value) );
  //(coord[x] != coordOrig[x] && coord[y] != coordOrig[y]);
  
  
  // Outputting
  var ans = round(itm);
  qs('#totalang').innerHTML = ang.sum.toString() + '°';
  qs('#singang').innerHTML = ang.mes.toString() + '°';
  qs('#sextang').innerHTML = ang.ext.toString() + '°';
}
