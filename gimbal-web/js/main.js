/* ––– p5 js ––– */

let w = window.innerWidth;
let h = window.innerHeight;


let cube;

function preload() {
  cube = loadModel("/models/cube.obj")
}


function setup() {
	let canvas = createCanvas(w, h, WEBGL);
	canvas.parent("canvasWrapper");
}

function draw() {
	background(255, 0, 0);
	push();
	rotateY(millis() / 250)
	model(cube);
	pop();
	// translate(100, 0, 0);
}

window.onload = function() {

/* ––– MQTT ––– */



  var client = mqtt.connect('mqtt://msolcany~nodemcu@broker.shiftr.io', {
    clientId: 'browser-local'
  });
    
  var vals;
 
  var data = [];
  var y;
  var z;
   
  client.on('connect', function(){
    console.log('client has connected!');
  }); 

  client.subscribe('nodemcu/vals');

  client.on('message', function(topic, message) {
    document.getElementById('vals_content').innerHTML = message;
    console.log(message);
  })
}
