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