if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var Sound = function ( sources, volume, thatCamera, radius ) {

	this.camera=thatCamera;

	var audio = document.createElement( 'audio' );

	for ( var i = 0; i < sources.length; i ++ ) {

		var source = document.createElement( 'source' );
		source.src = sources[ i ];

		audio.appendChild( source );

	}

	this.position = new THREE.Vector3();

	this.play = function () {

		audio.play();

	}

	this.update = function ( ) {

		var distance = this.position.distanceTo( this.camera.position );

		if ( distance <= radius ) {

			audio.volume = volume * ( 1 - distance / radius );

		} else {

			audio.volume = 0;

		}

	}

}


function animateDirectionalLight (directionalLight){
	directionalLight.rotation.x += 0.1;
	if(directionalLight.position.y< 0.1)
		if(directionalLight.intensity!==0)
		directionalLight.intensity -= 0.1;
	else
		if(directionalLight.intensity!==1)
		directionalLight.intensity += 0.1; 
}


//***object interact animateion
function singleWindowAnimation(){
	var windowMoveIn = new TWEEN.Tween(this.getObjectByName(rotationNode).rotation)
	  .to({z: Math.PI/3}, 1000)
	  .easing(TWEEN.Easing.Quadratic.Out)
	  // .onComplete(function(){
	  // 	updater.remove(soundOpen);
	  // });

	var windowMoveOut =  new TWEEN.Tween(this.getObjectByName(rotationNode).rotation)
	  .to({z: 0}, 1000)
	  .easing(TWEEN.Easing.Quadratic.In)
	  // .onComplete(function(){
	  // 	updater.remove(soundClose);
	  // });
	
	var handleMoveBack= new TWEEN.Tween(this.getObjectByName(handleNode,true).rotation)
		.easing(TWEEN.Easing.Quadratic.In)
		.to({y: 0}, 250)
		.chain(windowMoveIn);

	var handleMove = new TWEEN.Tween(this.getObjectByName(handleNode,true).rotation)
		.easing(TWEEN.Easing.Quadratic.In)
		.to({y: -Math.PI/4}, 250)
		.chain(handleMoveBack);

	var soundOpen = new Sound( [ 'assets/sound/window-open.mp3','assets/sound/window-open.ogg'], 1,houseScalex*zfinestra*3, controls.getObject());
	soundOpen.position.copy(this.position);

	var soundClose =new Sound( [ 'assets/sound/window-close.mp3','assets/sound/window-close.ogg'], 1, houseScalex*zfinestra*3, controls.getObject());
	soundClose.position.copy(this.position);

	if(this.open){
		// updater.add(soundOpen);
		soundClose.play();
		windowMoveOut.start();
		this.open=false;
	}else{
		// updater.add(soundClose);
		soundOpen.play();
		handleMove.start();
		this.open=true;
	}
}

function duobleWindowAnimation(){
	var rnode=this.getObjectByName(rotationNode).rotation;
	var rnode1=this.getObjectByName(rotationNode1).rotation;

	var windowMoveIn = new TWEEN.Tween({z1:rnode.z, z2:rnode1.z})
	  .to({z1: Math.PI/3, z2: -Math.PI/3}, 1000)
	  .easing(TWEEN.Easing.Quadratic.Out)
	  .onUpdate(function(){
	  	rnode.z=this.z1;
	  	rnode1.z=this.z2;
	  })
	  // .onComplete(function(){
	  // 	updater.remove(soundOpen);
	  // });

	var windowMoveOut =  new TWEEN.Tween({z1:rnode.z, z2:rnode1.z})
	  .to({z1: 0, z2:0}, 1000)
	  .easing(TWEEN.Easing.Quadratic.In)
	  .onUpdate(function(){
	  	rnode.z=this.z1;
	  	rnode1.z=this.z2;
	  })
	  // .onComplete(function(){
	  // 	updater.remove(soundClose);
	  // });
	
	var handleMoveBack= new TWEEN.Tween(this.getObjectByName(handleNode,true).rotation)
		.easing(TWEEN.Easing.Quadratic.In)
		.to({y: 0}, 250)
		.chain(windowMoveIn);

	var handleMove = new TWEEN.Tween(this.getObjectByName(handleNode,true).rotation)
		.easing(TWEEN.Easing.Quadratic.In)
		.to({y: -Math.PI/4}, 250)
		.chain(handleMoveBack);

	var soundOpen = new Sound( [ 'assets/sound/window-open.mp3','assets/sound/window-open.ogg'], 1,houseScalex*zfinestra*3, controls.getObject());
	soundOpen.position.copy(this.position);

	var soundClose =new Sound( [ 'assets/sound/window-close.mp3','assets/sound/window-close.ogg'], 1, houseScalex*zfinestra*3, controls.getObject());
	soundClose.position.copy(this.position);

	if(this.open){
		// updater.add(soundOpen);
		soundClose.play();
		windowMoveOut.start();
		this.open=false;
	}else{
		// updater.add(soundClose);
		soundOpen.play();
		handleMove.start();
		this.open=true;
	}
}

function doorAnimation(){
	var rnode=this.getObjectByName(rotationNode).rotation;
	var hnode =this.getObjectByName(handleNode,true).rotation;
	var hnode1= this.getObjectByName(handleNode+'1',true).rotation;

	var windowMoveIn = new TWEEN.Tween({z1:rnode.z})
	  .to({z1: Math.PI*0.4}, 1600)
	  .easing(TWEEN.Easing.Quadratic.Out)
	  .onUpdate(function(){
	  	rnode.z=this.z1;
	  })
	  // .onComplete(function(){
	  // 	updater.remove(soundOpen);
	  // });

	var windowMoveOut =  new TWEEN.Tween({z1:rnode.z})
	  .to({z1: 0}, 300)
	  .easing(TWEEN.Easing.Quadratic.In)
	  .onUpdate(function(){
	  	rnode.z=this.z1;
	  })
	  // .onComplete(function(){
	  // 	updater.remove(soundClose);
	  // });
	
	var handleMoveBack= new TWEEN.Tween({n1:hnode.y,n2:hnode1.y})
		.easing(TWEEN.Easing.Quadratic.In)
		.to({n1: 0, n2: 0}, 500)
		.chain(windowMoveIn)
		.onUpdate(function (){
			hnode.y=this.n1;
			hnode1.y=this.n2;
		});

	var handleMove = new TWEEN.Tween({n1:hnode.y,n2:hnode1.y})
		.easing(TWEEN.Easing.Quadratic.In)
		.to({n1: -Math.PI/4, n2: Math.PI/4}, 500)
		.onUpdate(function (){
			hnode.y=this.n1;
			hnode1.y=this.n2;
		})
		.chain(handleMoveBack);

	var soundOpen = new Sound( [ 'assets/sound/door_open.mp3','assets/sound/door_open.ogg'], 1,houseScalex*zfinestra*3, controls.getObject());
	soundOpen.position.copy(this.position);

	var soundClose =new Sound( [ 'assets/sound/door_close_2.mp3','assets/sound/door_close_2.ogg'], 1, houseScalex*zfinestra*3, controls.getObject());
	soundClose.position.copy(this.position);

	if(this.open){
		// updater.add(soundOpen);
		soundClose.play();
		windowMoveOut.start();
		this.open=false;
	}else{
		// updater.add(soundClose);
		soundOpen.play();
		handleMove.start();
		this.open=true;
	}	
}

function lightAnimation (){

	if(this.visible){
		this.visible=false;
	}else{
	  this.visible = true;
	}
	return this.visible;
}