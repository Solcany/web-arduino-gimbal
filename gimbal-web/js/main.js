var isAppStarted = false;
var areAssetsLoaded = false;
var isConnectedToShiftr = false;
var testIfDataLoaded = true;
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
var yawCompensation = 1;
var delayedYawComp = 0.;

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
  libremModel = loadModel("/models/librem3.obj")
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
						650.0)

	librem = new yprModel(libremModel, 
					   {x: 300, y: 0, z: 0},
					   {fill: '#ff0000',
						stroke: '#000000',
						strokeWeight: 1.0},
						{yaw: yaw + yawCompensation, pitch: pitch, roll: roll})
	areAssetsLoaded = true;
}

function draw() {
	if(testIfDataLoaded && isConnectedToShiftr && areAssetsLoaded) {
		document.getElementById("startButton").disabled = false;
		hidePreloadOverlay('assetsPreloadOverlay');
		testIfDataLoaded = false;
	}

	clear();

	if(isAppStarted) { 
		iphone.update();
		librem.update();

		iphone.render(); // !!!!
		librem.render();
	}

	



}

function yprModel(preloadedModel, pos, style, yawPitchRoll, yawPitchRollRemappingDelay=null) {
	this.yaw = yawPitchRoll.yaw;
	this.pitch = yawPitchRoll.pitch;
	this.roll = yawPitchRoll.roll;

	this.lastRoll = this.roll;
	this.rollVel = 0;

	this.lastYaw = this.yaw;;
	this.yawVel = 0;


	this.lastPitch = this.pitch;
	this.pitchVel = 0;


	if( yawPitchRollRemappingDelay != null) {
		this.delay = yawPitchRollRemappingDelay;
		this.isDelayed = true;
	}

	this.render = function() {
		push()
			translate(pos.x, pos.y, pos.z);
			// rotateX(this.roll);
			if(this.isDelayed) {
				rotateY(-this.yaw + delayedYawComp)
			} else {
				rotateY(-this.yaw + yawCompensation)

			}
			// rotateZ(this.pitch + pitchCompensation);

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
	};

	this.renderAxises = function() {
		strokeWeight(2.0);
		stroke(255,0,0);
		line(-axisArmLength,0,0, axisArmLength,0,0)
		stroke(0,255,0);
		line(0,-axisArmLength,0, 0,axisArmLength,0)
		stroke(0,0,255);
		line(0,0, -axisArmLength, 0,0,axisArmLength)	
	};

	this.delayedRoll = function() {
		let rollRemapped = map(roll, -PI, PI, 0, TWO_PI);
			rollRemapped = rollRemapped.round(3);
			
			if(!isNaN(rollRemapped) && !isNaN(this.lastRoll)) {
				    let rollAcc = abs((rollRemapped - this.lastRoll)/this.delay);
				    	rollAcc = rollAcc.round(3)
				    	if(abs(rollRemapped - this.lastRoll) < 4.5) {
							if(rollAcc != 0) {
								this.rollVel += rollAcc;

					    		if( rollRemapped > this.lastRoll) {
									this.roll += this.rollVel;
								} else {
									this.roll -= this.rollVel;
								}
							}
						} else {
							console.log("roll cycle!");
						}

					this.lastRoll = rollRemapped;
				}
				console.log(this.roll);
	}


	this.delayedYaw = function() {
		let yawRemapped = map(yaw, -PI, PI, 0, TWO_PI);
			yawRemapped = yawRemapped.round(3);
			
			if(!isNaN(yawRemapped) && !isNaN(this.lastYaw)) {
				    let yawAcc = abs((yawRemapped - this.lastYaw)/this.delay);
				    	yawAcc = yawAcc.round(3)
				    	if(abs(yawRemapped - this.lastYaw) < 4.5) {
							if(yawAcc != 0) {
								this.yawVel += yawAcc;

					    		if( yawRemapped > this.lastYaw) {
									this.yaw += this.yawVel;
								} else {
									this.yaw -= this.yawVel;
								}
							}
						} else {
							console.log("yaw cycle!");
						}

					this.lastYaw = yawRemapped;
				}			
	}

	this.delayedPitch = function() {
		let pitchRemapped = map(pitch, -PI, PI, 0, TWO_PI);
			pitchRemapped = pitchRemapped.round(3);
			
			if(!isNaN(pitchRemapped) && !isNaN(this.lastPitch)) {
				    let pitchAcc = abs((pitchRemapped - this.lastPitch)/this.delay);
				    	pitchAcc = pitchAcc.round(3)
				    	if(abs(pitchRemapped - this.lastPitch) < 4.5) {
							if(pitchAcc != 0) {
								this.pitchVel += pitchAcc;

					    		if( pitchRemapped > this.lastPitch) {
									this.pitch += this.pitchVel;
								} else {
									this.pitch -= this.pitchVel;
								}
							}
						} else {
							console.log("pitch cycle!");
						}

					this.lastPitch = pitchRemapped;
				}			
	}

	this.delayedRotationUpdate = function() {
		this.delayedYaw()
		this.delayedRoll();
		this.delayedPitch();
	}


	this.update = function() {
		if( yawPitchRollRemappingDelay != null) {
			setInterval(this.delayedRotationUpdate(), 10)
		} else {
			this.yaw = yaw;
			this.pitch = pitch;
			this.roll = roll;
		}
	};


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

