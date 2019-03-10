var isAppStarted = false;
var areAssetsLoaded = false;
var isConnectedToShiftr = false;
var testDataLoaded = true;
//    hideOverlay('overlay');


/* ––– p5 js ––– */

let w = window.innerWidth;
let h = window.innerHeight;


var yaw = 0;
var roll = 0;
var pitch = 0;

// in radians
// var yawComepnsation = 0;
var pitchCompensation = -0.09
var yawCompensation = -1.05;

var axisArmLength = 500;
var axisoff = 25;
var iphoneModel, libremModel;

var DEBUG_RenderAxises = false;

var iphone, librem;
var font


function hideOverlay(overlayID) {
	let overlay = document.getElementById(overlayID);
	overlay.classList.remove("visible");
	overlay.classList.add("invisible");
}

function hidePreloadOverlay(overlayID) {
	let overlay = document.getElementById(overlayID);
	overlay.classList.add("invisible");
	setTimeout(function() {
		overlay.classList.add("seethrough");
	}, 10000);
}


function preload() {
  iphoneModel = loadModel("/models/iphone5_3.obj")
  // libremModel = loadModel("/models/librem3.obj")
  font = loadFont('/fonts/fndrs.otf')
}


function setup() {
	let canvas = createCanvas(w, h, WEBGL);
	canvas.parent("canvasWrapper");

	textAlign(CENTER, CENTER);
	textSize(50)
	textFont(font);

	iphone = new yprModel(iphoneModel, 
					   {x: -300, y: 0, z: 0},
					   {fill: '#ff0000',
						stroke: '#000000',
						strokeWeight: 1.0},
						{yaw: yaw, pitch: pitch, roll: roll},
						TWO_PI*10)

	// librem = new yprModel(libremModel, 
	// 				   {x: 300, y: 0, z: 0},
	// 				   {fill: '#ff0000',
	// 					stroke: '#000000',
	// 					strokeWeight: 1.0},
	// 					{yaw: yaw, pitch: pitch, roll: roll})
	iphone.update();
	// librem.update();
	areAssetsLoaded = true;
}

function draw() {
	if(isConnectedToShiftr && areAssetsLoaded && testDataLoaded) {
		document.getElementById("startButton").disabled = false;
		hidePreloadOverlay('assetsPreloadOverlay');
		testDataLoaded = false;
	}
	iphone.update();

	clear();
	if(isAppStarted) { 
		// librem.update();
	}

	
	iphone.render();


}

function yprModel(preloadedModel, pos, style, yawPitchRoll, yawPitchRollRemapping=null) {
	this.yaw = yawPitchRoll.yaw,
	this.pitch = yawPitchRoll.pitch,
	this.roll = yawPitchRoll.roll;

	this.render = function() {
		push()
			translate(pos.x, pos.y, pos.z);
			rotateX(roll);
			rotateY(-yaw + yawCompensation)
			rotateZ(pitch + pitchCompensation);

			stroke(style.stroke);
			strokeWeight(style.strokeWeight);
			fill(style.fill);


			model(preloadedModel);	

			// push()
			// translate(0,0,100)
			// text('p5.js', 0, 0);
			// pop()

			if(DEBUG_RenderAxises) {
				this.renderAxises();
			}
		pop();
	},

	this.renderAxises = function() {
		strokeWeight(2.0);
		stroke(255,0,0);
		line(-axisArmLength,0,0, axisArmLength,0,0)
		stroke(0,255,0);
		line(0,-axisArmLength,0, 0,axisArmLength,0)
		stroke(0,0,255);
		line(0,0, -axisArmLength, 0,0,axisArmLength)	
	}

	this.update = function() {
		this.yaw = yaw;
		this.pitch = pitch; 
		this.roll = roll;

		if(yawPitchRollRemapping != null) {

		}
	}

	this.remapYPR = function() {

	}
}


window.onload = function() {
let startButton = document.getElementById("startButton")
	startButton.disabled = true;

/* ––– MQTT ––– */
  var client = mqtt.connect('mqtt://msolcany~ypr@broker.shiftr.io', {
    clientId: 'browser-local'
  });
    
  client.on('connect', function(){
    console.log('client has connected!');
    isConnectedToShiftr = true;
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

  	  startButton.addEventListener("click", function() {
  	  	isAppStarted = true;
  	  	hideOverlay("overlay");
  	  })


  Number.prototype.round = function(places) {
  	return +(Math.round(this + "e+" + places)  + "e-" + places);
	}
}

