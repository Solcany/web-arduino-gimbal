/* ––– p5 js ––– */

let w = window.innerWidth;
let h = window.innerHeight;

var yaw = 0;
var pitch, roll;

let axisArmLength = 100;
let axisoff = 25;
let iphone;

function preload() {
  iphone = loadModel("/models/iphone5.obj")
}


function setup() {
	let canvas = createCanvas(w, h, WEBGL);
	canvas.parent("canvasWrapper");
}

function draw() {
	clear();
	push();
	translate(250, 0, 0)
	rotateZ(mouseX)


	strokeWeight(3.0);
	stroke(255,0,0);
	line(-axisArmLength,0,axisoff, axisArmLength,0,axisoff)
	stroke(0,255,0);
	line(0,-axisArmLength,axisoff, 0,axisArmLength,axisoff)
	stroke(0,0,255);
	line(0,0, -axisArmLength, 0,0,axisArmLength)	


	stroke(0);
	strokeWeight(1);
	scale(4.0);
	fill('#ffeb16');
	model(iphone);


	pop();
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

  client.on('message', function(topic, message) {
    yaw = Math.round(Utf8ArrayToStr(message));
    console.log(yaw);
  })


  function easeToVal(currVal, newVal, time) {
  	var diff = currVal - newVal;

  }


  function Utf8ArrayToStr(array) {
	    var out, i, len, c;
	    var char2, char3;

	    out = "";
	    len = array.length;
	    i = 0;
	    while(i < len) {
		c = array[i++];
		switch(c >> 4)
		{ 
		  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
		    // 0xxxxxxx
		    out += String.fromCharCode(c);
		    break;
		  case 12: case 13:
		    // 110x xxxx   10xx xxxx
		    char2 = array[i++];
		    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
		    break;
		  case 14:
		    // 1110 xxxx  10xx xxxx  10xx xxxx
	        char2 = array[i++];
		    char3 = array[i++];
		    out += String.fromCharCode(((c & 0x0F) << 12) |
						   ((char2 & 0x3F) << 6) |
						   ((char3 & 0x3F) << 0));
		    break;
		}
	    }

	    return out;
	}
}
