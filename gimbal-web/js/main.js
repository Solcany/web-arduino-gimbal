// window.onload = function() {
	let w = window.innerWidth;
	let h = window.innerHeight;

	/* ––– p5 js ––– */

	let cube;

	function preload() {
	  cube = loadModel("/models/cube.obj")
	}


	function setup() {
		let canvas = createCanvas(w, h, WEBGL);
		canvas.parent("canvasWrapper");
		background(255, 0, 0);
		rotateY(millis() / 100)
		// canvas.translate(width/2, height/2);
		model(cube);
	}

	function draw() {
		background(255, 0, 0);
		rotateY(millis() / 100)
		// canvas.translate(width/2, height/2);
		model(cube);
	}
// }

window.onload = function() {

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
