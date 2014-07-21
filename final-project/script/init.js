var objects=[];

var toIntersect = [];

var stats = initStats();
 
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
camera.up.set(0,1,0)
camera.position.set(-100,20,-50);
// camera.lookAt(new THREE.Vector3(100,10,-30));

var ray = new THREE.Raycaster();
ray.ray.direction.set( 0, -1, 0);
var controls = new THREE.PointerLockControls( camera );
scene.add( controls.getObject() );

// create a render and set the size
var webGLRenderer = new THREE.WebGLRenderer();
// 0x0C0c0c
webGLRenderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);

var ambientLightColor =0xc0c0c0;
var ambientLight=new THREE.AmbientLight(ambientLightColor);
ambientLight.visible=false;
scene.add(ambientLight);

var pointColor = "#0xFFFFFF";
var directionalLight = new THREE.DirectionalLight(pointColor);
directionalLight.position.set(100, Math.sqrt(10000), 1000);
// directionalLight.castShadow = false;
// directionalLight.shadowCameraNear = 2;
// directionalLight.shadowCameraFar = 50;
// directionalLight.shadowCameraLeft = -20;
// directionalLight.shadowCameraRight = 20;
// directionalLight.shadowCameraTop = 20;
// directionalLight.shadowCameraBottom = -20;
// directionalLight.shadowMapWidth = 1024;
// directionalLight.shadowMapHeight = 1024;
directionalLight.intensity = 0.5;
directionalLight.visible=false;
scene.add(directionalLight);

hemisphereLight = new THREE.HemisphereLight('#E6FFFF', '#ffffff', 0.5); 
hemisphereLight.position.set(0, 600, 0);
scene.add(hemisphereLight);

// var simpleLight=new THREE.SpotLight(pointColor);
// simpleLight.position.set(100, 50, -100);
// scene.add(simpleLight);

// var simpleLight1=new THREE.SpotLight(pointColor);
// simpleLight1.position.set(10, 10, -50);
// scene.add(simpleLight1);

// var simpleLight2=new THREE.SpotLight(pointColor);
// simpleLight2.position.set(400, 50, -300);
// scene.add(simpleLight2);

var house = new THREE.Object3D();
house.rotation.x=-0.5*Math.PI;
var houseScale=20
var houseScalex=houseScale*1.3;
var houseScaley=houseScale*1.3;
var houseScalez=houseScale;
house.scale.set(houseScalex,houseScaley,houseScalez);
scene.add(house);

// var simpleLight3=new THREE.SpotLight(pointColor);
// simpleLight3.target.position.setatriumForniture.position.set((spigolo+primoblocco+spigolo+xscala*0.5)*houseScalex, spigolo*houseScalez,-(spigolo+ yscala*2+ spigolo+ 3.10*0.98)*houseScaley );
// scene.add(atriumForniture);
// scene.add(simpleLight2);

//hold all light usefull to set behavior
var lights = [];

var trackballControls = new THREE.TrackballControls(camera);

function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  $('body').append(stats.domElement);
  return stats;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	webGLRenderer.setSize( window.innerWidth, window.innerHeight );
}

function StoredObj(obj,fun){
	this.obj=obj;
	this.behave=fun;
	this.updatable=true;
}

var UpdateHandler = {
	currentID:0,
	toUpdates:[],

	add:function (updateObj, fun){
		var i;
		var j=true;
		for(i=0; i < this.toUpdates.length&&j;i++)
			if(this.toUpdates[i].obj.updateHandlerId===updateObj.updateHandlerId){
				this.toUpdates[i].updatable=true;
				j=false;				
			}

		if(i===this.toUpdates.length){
			updateObj.updateHandlerId=this.currentID;
			this.currentId++;
			var storeObj= new StoredObj(updateObj,fun)
			this.toUpdates.push(storeObj);
		}
	},

	remove:function (updateObj){
		var thatID = updateObj.updateHandlerId;
		var i;
		for(i=0; i<this.toUpdates.length&&this.toUpdates[i].obj.updateHandlerId!==thatID;i++);
		this.toUpdates[i].updatable=false;
	},

	update:function (){
		for (var i = 0; i < this.toUpdates.length; i++) {
			if(this.toUpdates[i].updatable){				
				if(this.toUpdates[i].behave){
					this.toUpdates[i].obj.update(this.toUpdates[i].behave());
				}
				else
					this.toUpdates[i].obj.update();
			}
		}
	}
}

var clock = new THREE.Clock();