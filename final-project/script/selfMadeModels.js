//the dimension are in italian because they are imported from another file
var xporta=1;
var zporta=2;

var xfinestra=0.5;
var zfinestra=1;
var spigolo=0.2;
var xscala=(2.24)/2;
var yscala=2./2;
var zscala=3.6/2;
var margine= 0.0001;
var primoblocco=(3.94-2.25-spigolo);

var texturePath='assets/textures/';
var entranceWallTexture='muroLatericium.jpg';
var entranceFloorTexture='piastrelleMarmo.jpg';
var rotationNode='rotationNode';
var rotationNode1='rotationNode1';
var interactNode='intercatNode';
var handleNode='handle';

  //patches are holes and they are coordinates of hole
function makeSimpleWallCover(pattern, patchs){
  var shape= new THREE.Shape();
  var length=pattern[0].reduce(somma);
  var width=pattern[1].reduce(somma);
  shape.moveTo(0,0);
  shape.lineTo(0,width);
  shape.lineTo(length,width);
  shape.lineTo(length,0);
  shape.lineTo(0,0);

  for(var i=0;i<patchs.length; i++){
    var aCPx;
    var aCPy;
    var aX;
    var aY;
    var face=patchs[i];

    aCPx = pattern[0].slice(0,face[0]+1).reduce(somma);

    if(face[0] === 0)
      aX=0;
    else
      aX=pattern[0].slice(0,face[0]).reduce(somma);
    

    aCPy = pattern[1].slice(0,face[1]+1).reduce(somma);
    if(face[1] === 0)
      aY=0;
    else
      aY=pattern[1].slice(0,face[1]).reduce(somma);

    var hole=new THREE.Path();
    hole.moveTo(aX,aY);
    hole.lineTo(aCPx,aY);
    hole.lineTo(aCPx,aCPy);
    hole.lineTo(aX,aCPy);
    hole.lineTo(aX,aY);     
    shape.holes.push(hole);
  }
  return shape;
}

function somma(prev, cur, index, array){
 return prev + cur;
}

function createTexturedMesh(geom, imageFile, mat, textureRepeatX, textureRepeatY) {
  var texture = THREE.ImageUtils.loadTexture(imageFile)
  // var mat = new THREE.MeshBasicMaterial();
  // var mat = new THREE.MeshLambertMaterial();
  if(mat === undefined)
    mat = new THREE.MeshLambertMaterial();
  
  if(textureRepeatX!== undefined){
    texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    texture.repeat.set(textureRepeatX, textureRepeatY);
  }

  mat.map = texture;
  var mesh = new THREE.Mesh(geom, mat);
  return mesh;
}

function scaleShape(pattern){
  var xScale = pattern[0].reduce(somma);
  p0=pattern[0].map(function(item, index, array){
    return item/xScale;
  });
  var yScale = pattern[1].reduce(somma);
  p1 = pattern[1].map(function(item, index, array){
    return item/yScale;
  });
  var res = {'pattern': [p0,p1], 'xScale':xScale, 'yScale':yScale}
  return res;
}

function makeWallCover(pattern, patchs, texture, material,textureRepeatX,textureRepeatY){
  var obj=scaleShape(pattern);
  var shape=makeSimpleWallCover(obj.pattern, patchs);
  var geometry = new THREE.ShapeGeometry( shape );
  var littleMesh=createTexturedMesh(geometry, texturePath+texture, material,textureRepeatX,textureRepeatY);
  littleMesh.scale.setX(obj.xScale);
  littleMesh.scale.setY(obj.yScale); 
  return littleMesh;
}

//support function to general door
function boxGenerator(measure,imageFile, textureRepeatX, textureRepeatY){
	var g = new THREE.BoxGeometry(measure[0],measure[1],measure[2]);
	mesh=createTexturedMesh(g, texturePath+imageFile, undefined,textureRepeatX,textureRepeatY);
	mesh.position.set(measure[0]/2, measure[1]/2,measure[2]/2);
	return mesh;
}

function mkHandle(x,z,y, handleColor){
	if(handleColor===undefined)
		handleColor=0xDCDCDC;

	var material = new THREE.MeshPhongMaterial({ ambient: 0x030303, color: handleColor, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });
	var radius=z*0.02;
	var heigth= y*0.05;

	// var handle= new THREE.Object3D();

	//set the start position in the center point of contach with door
	var door2handle = new THREE.Mesh(new THREE.CylinderGeometry( radius,radius, heigth, 32 ), material);
	door2handle.position.setY(heigth/2);
	
	var knobG = new THREE.SphereGeometry( radius, 32, 32 );
	var knob = new THREE.Mesh(knobG,material);
	knob.position.set(0, radius+heigth/2,0 );
	door2handle.add(knob);

	var lastPart = new THREE.Mesh(new THREE.CylinderGeometry( radius*0.8, radius, x*0.15, 32 ), material);
	lastPart.position.setY(x*0.15/2);
	knob.add(lastPart);
 	knob.rotation.z=Math.PI/2;

 	door2handle.name=handleNode;
 	return door2handle;
}

function mkDoorHinge(x,z,y,outsideColor){
	var staticElement = new THREE.Object3D(); 

	var coverDown = makeWallCover([[x],[y]],[],outsideColor);
	staticElement.add(coverDown);

	var coverRigth = makeWallCover([[y],[z]],[],outsideColor);
	coverRigth.rotation.y=Math.PI/2;
	coverRigth.rotation.z=-Math.PI/2;
	coverRigth.position.set(0,y,z);
	staticElement.add(coverRigth);

	var coverLeft = makeWallCover([[y],[z]],[],outsideColor);
	coverLeft.rotation.y=-Math.PI/2;
	coverLeft.rotation.z=-Math.PI/2;
	coverLeft.position.set(x,y,0);
	staticElement.add(coverLeft);

	var coverUp = makeWallCover([[x],[y]],[],outsideColor);
	coverUp.rotation.x=Math.PI;
	coverUp.position.set(0,y,z);
	staticElement.add(coverUp);

	return staticElement;
}


//general Door
function mkDoor ( x,z,y,outsideColor, innerColor, handleColor) {
	if(outsideColor===undefined)
		outsideColor='door-wood1.jpg';
	if(innerColor===undefined)
		innerColor=outsideColor;
	
	var nodeUP = new THREE.Object3D();
	var orizontalPanelG =[x, y*0.5, z*0.4*0.2];
	var verticalPanelG = [x*0.2, y*0.5, z*0.4*0.8];
	var innerPanel = [x*0.6, y*0.3, z*0.4*0.8];
	var mesh = boxGenerator(orizontalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(0,0,z*0.4*0.8));
	nodeUP.add(mesh);
	mesh = boxGenerator(verticalPanelG,outsideColor);
	nodeUP.add(mesh);
	mesh= boxGenerator(verticalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(x*(0.2+0.6),0,0));
	nodeUP.add(mesh);
	mesh = boxGenerator(innerPanel, innerColor);
	mesh.position.add(new THREE.Vector3(x*0.2, y*0.1, 0));
	nodeUP.add(mesh);
	nodeUP.position.set(0,0,z*0.6);

	var nodeDown = new THREE.Object3D();
	var mesh = boxGenerator(orizontalPanelG, outsideColor);
	nodeDown.add(mesh);
	mesh = boxGenerator(verticalPanelG,outsideColor);
	mesh.position.add(new THREE.Vector3(0,0,z*0.4*0.2));
	nodeDown.add(mesh);
	mesh= boxGenerator(verticalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(x*(0.2+0.6),0,z*0.4*0.2));
	nodeDown.add(mesh);
	mesh = boxGenerator(innerPanel, innerColor);
	mesh.position.add(new THREE.Vector3(x*0.2, y*0.1, z*0.4*0.2));
	nodeDown.add(mesh);

	var middlePanel = [x, y*0.5, z*0.2];
	mesh= boxGenerator(middlePanel, outsideColor);
	mesh.position.add(new THREE.Vector3(0,0,z*0.4));

	//make the handle
	var handle=mkHandle(x,z,y);
	handle.position.set(x*0.8, y*0.5, z*0.5);

	var handle2=mkHandle(x,z,y);
	handle2.name+='1';
	handle2.rotation.x=Math.PI;
	handle2.position.set(x*0.8,0, z*0.5);

	var innerDoor = new THREE.Object3D();
	innerDoor.name=rotationNode;
	innerDoor.position.setY(y*0.1);
	innerDoor.add(mesh);
	innerDoor.add(nodeDown);
	innerDoor.add(nodeUP);
	innerDoor.add(handle);
	innerDoor.add(handle2);

	//con una rotazione di inner Door rispetto all'asse z dovrebbe generarsi l'apertura della porta
	var global=mkDoorHinge(x,z,y,outsideColor);
	global.name=interactNode;
	global.add(innerDoor);
	global.open=false;

	global.interact=doorAnimation;
	toIntersect.push(global);
	return global;
}

//the center of the window is down left
function mkSimpleWindow(x,z,y,outsideColor){

	if(outsideColor===undefined)
		outsideColor='window-metal.jpeg';
	
	var nodeUP = new THREE.Object3D();
	var orizontalPanelG =[x, y*0.2, z*0.1];
	var verticalPanelG = [x*0.1, y*0.2, z];
	
	var mesh = boxGenerator(orizontalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(0,0,z*0.9));
	nodeUP.add(mesh);
	mesh = boxGenerator(verticalPanelG,outsideColor);
	nodeUP.add(mesh);
	mesh= boxGenerator(verticalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(x*0.9,0,0));
	nodeUP.add(mesh);
	mesh=boxGenerator(orizontalPanelG,outsideColor);
	nodeUP.add(mesh);

	var glassPanelG =new  THREE.BoxGeometry(x*0.8, y*0.1, z*0.8);  
	var glassMaterial =new  THREE.MeshLambertMaterial({ ambient: 0x030303, color:0xFFFFFF,  shading: THREE.FlatShading, opacity:0.3, transparent:true });
	var glass=new THREE.Mesh(glassPanelG,glassMaterial);
	glass.position.set(x*0.5,y*0.05, z*0.5);
	nodeUP.add(glass);
	nodeUP.name=rotationNode;
	nodeUP.position.setY(0.4*y);
	return nodeUP;
}

function mkWindowWithHandle(x,z,y,outsideColor,handleColor){

	var nodeUP=mkSimpleWindow(x,z,y,outsideColor);

	var handle= mkHandle(x,z,y, handleColor)
	handle.position.set(x*0.95, y*0.2, z/2);
	nodeUP.add(handle);

	var hinge=mkDoorHinge(x,z,y, outsideColor);

	hinge.name=interactNode;
	hinge.add(nodeUP);
	hinge.open=false;

	//see animation.js
	hinge.interact = singleWindowAnimation;
	toIntersect.push(hinge);		
	return hinge;
}

//the x is the width of just one of 2 identical window
function mkDoubleWindow(x,z,y,outsideColor,handleColor){
		if(outsideColor===undefined)
		outsideColor='window-metal.jpeg';
	
	var nodeLeft = new THREE.Object3D();
	var orizontalPanelG =[x, y*0.2, z*0.1];
	var verticalPanelG = [x*0.1, y*0.2, z];
	
	var mesh = boxGenerator(orizontalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(-x,0,z*0.9));
	nodeLeft.add(mesh);
	mesh = boxGenerator(verticalPanelG,outsideColor);
	mesh.position.add(new THREE.Vector3(-x*0.1,0,0));
	nodeLeft.add(mesh);
	mesh= boxGenerator(verticalPanelG, outsideColor);
	mesh.position.add(new THREE.Vector3(-x*1,0,0));
	nodeLeft.add(mesh);
	mesh=boxGenerator(orizontalPanelG,outsideColor);
	mesh.position.add(new THREE.Vector3(-x,0,0));
	nodeLeft.add(mesh);
	var glassPanelG =new  THREE.BoxGeometry(x*0.8, y*0.1, z*0.8);  
	var glassMaterial =new  THREE.MeshLambertMaterial({ ambient: 0x030303, color:0xFFFFFF,  shading: THREE.FlatShading, opacity:0.3, transparent:true });
	var glass=new THREE.Mesh(glassPanelG,glassMaterial);
	glass.position.set(-x*0.5,y*0.05, z*0.5);
	nodeLeft.add(glass);
	nodeLeft.name=rotationNode1;
	nodeLeft.position.setX(2*x);
	nodeLeft.position.setY(0.4*y);

	var nodeRigth = mkSimpleWindow(x,z,y,outsideColor,handleColor);
	var handle= mkHandle(x,z,y, handleColor)
	handle.position.set(x*0.95, y*0.2, z/2);
	nodeRigth.add(handle);
	// nodeRigth.position.setX(x);

	var hinge=mkDoorHinge(x*2,z,y, outsideColor);
	hinge.name=interactNode;
	hinge.open=false;
	hinge.add(nodeRigth);
	hinge.add(nodeLeft);

	hinge.interact = duobleWindowAnimation;
	toIntersect.push(hinge);

	return hinge;
}

function videoTv (pattern){
	var $video = $('#video');
    var video = $video[0];
    $video.hide();
    
    var texture = new THREE.Texture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    obj = scaleShape(pattern);
    
    var geom= makeSimpleWallCover(obj.pattern, []);
    var shape = new THREE.ShapeGeometry(geom);
    var mat=new THREE.MeshPhongMaterial();
    mat.map = texture;
  	var mesh = new THREE.Mesh(shape, mat);
  	mesh.rotation.x=Math.PI/2;
  	mesh.position.set(-0.5,-0.10001,-0.5)
  	var tv = new THREE.BoxGeometry(1.1,0.1,1.1);
  	var tv = new THREE.Mesh(tv, new THREE.MeshLambertMaterial({color:0x100E0F}));
  	// tv.position.set(0.55,0.05,0.60);
  	tv.add(mesh);

  	var bottomTv = new THREE.Mesh(new THREE.BoxGeometry(0.55,0.1,0.1),new THREE.MeshLambertMaterial({color:0x100E0F}));
  	bottomTv.position.set(0,0,-.60);
  	tv.add(bottomTv);
  	tv.scale.setX(obj.xScale);
  	tv.scale.setY(obj.yScale);
  	tv.name=interactNode;
  	tv.on=false;
  	tv.interact = function(){
  		if (video.paused){ 
  		    video.play(); 
  		}else{ 
  		    video.pause();
  		}
  		this.on=!this.on;
  	}
  	tv.update=function (){
  		if (this.on && video.readyState === video.HAVE_ENOUGH_DATA) {
  		    if (texture) texture.needsUpdate = true;
  		}
  	}
  	UpdateHandler.add(tv);
	toIntersect.push(tv);
  	return tv;
}

function mkLight(distance,heigthScale,intensity){
    if(intensity===undefined)intensity=1.0;
    if(heigthScale===undefined)heigthScale=2.0;
    if(distance===undefined)distance=3.8*houseScale;
    var spotLight = new THREE.PointLight(0xffffff,intensity,distance);
    var tolook= new THREE.Object3D();
    tolook.position.setY(-1);
    spotLight.add(tolook);
    spotLight.target=tolook;
    spotLight.visible=true;
    spotLight.name=interactNode;
    spotLight.interact=lightAnimation;

    this.updateMatrixWorld();
    spotLight.position.setFromMatrixPosition(this.matrixWorld);
    spotLight.position.add(new THREE.Vector3(0,-6.7*heigthScale,0));
    return spotLight;
  }