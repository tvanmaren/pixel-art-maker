'use strict';
function setColor (id, color, cssIndex) {
  var pixel=document.getElementById(id);
  console.log('grabbed',pixel);
  // var cssContent='background-color: \''+color+'\';';
  pixel.style.backgroundColor=color;
}

// function paintPixel (event, color) {
//   var pixel=event.currentTarget;
//
// }
setColor('0-0','red', 5);
