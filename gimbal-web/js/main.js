/* ––– p5 js ––– */

let w = window.innerWidth;
let h = window.innerHeight;

var yaw = 0;
var roll = 0;
var pitch = 0;

// in radians
var yawComepnsation = 0;
var pitchCompensation = -0.09 //0.083;

let axisArmLength = 500;
let axisoff = 25;
let iphone;

var renderAxes = true;

function preload() {
  iphone = loadModel("/models/iphone5_3.obj")
}


function setup() {
	let canvas = createCanvas(w, h, WEBGL);
	canvas.parent("canvasWrapper");
}

function draw() {
	clear();
	// translate(250, 0, 0)
	rotateX(roll);
	rotateY(-yaw + yawComepnsation);
	rotateZ(pitch + pitchCompensation);

	if(renderAxes) {
		strokeWeight(3.0);
		stroke(255,0,0);
		line(-axisArmLength,0,0, axisArmLength,0,0)
		stroke(0,255,0);
		line(0,-axisArmLength,0, 0,axisArmLength,0)
		stroke(0,0,255);
		line(0,0, -axisArmLength, 0,0,axisArmLength)	
	}

	stroke(0);
	strokeWeight(1);
	// scale(1);
	fill('#ffeb16');
	model(iphone);


	// translate(100, 0, 0);
}

window.onload = function() {

/* ––– MQTT ––– */



  var client = mqtt.connect('mqtt://msolcany~ypr@broker.shiftr.io', {
    clientId: 'browser-local'
  });
    
  var vals;
 
  var data = [];
  var y;
  var z;
   
  client.on('connect', function(){
    console.log('client has connected!');
  }); 

  client.subscribe('ypr/yaw');
  client.subscribe('ypr/pitch');
  client.subscribe('ypr/roll');


  client.on('message', function(topic, message) {
  	if (topic == 'ypr/yaw') {
  			yaw = Number(message.toString()).round(2)
  			// yaw = map(yaw, 0, PI, 0, TWO_PI);
    } else if (topic == 'ypr/pitch') {
  			pitch = Number(message.toString()).round(2)
  			// pitch = map(pitch, 0, PI, 0, TWO_PI);
    } else {
  			roll = Number(message.toString()).round(2)
			// roll = map(roll, 0, PI, 0, TWO_PI);

  	}
  })


  function easeToVal(currVal, newVal, time) {
  	var diff = currVal - newVal;

  }

  Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}


 //  function Utf8ArrayToStr(array) {
	//     var out, i, len, c;
	//     var char2, char3;

	//     out = "";
	//     len = array.length;
	//     i = 0;
	//     while(i < len) {
	// 	c = array[i++];
	// 	switch(c >> 4)
	// 	{ 
	// 	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	// 	    // 0xxxxxxx
	// 	    out += String.fromCharCode(c);
	// 	    break;
	// 	  case 12: case 13:
	// 	    // 110x xxxx   10xx xxxx
	// 	    char2 = array[i++];
	// 	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	// 	    break;
	// 	  case 14:
	// 	    // 1110 xxxx  10xx xxxx  10xx xxxx
	//         char2 = array[i++];
	// 	    char3 = array[i++];
	// 	    out += String.fromCharCode(((c & 0x0F) << 12) |
	// 					   ((char2 & 0x3F) << 6) |
	// 					   ((char3 & 0x3F) << 0));
	// 	    break;
	// 	}
	//     }

	//     return out;
	// }
}
