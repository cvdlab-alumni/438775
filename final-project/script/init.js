var objects=[];

var toIntersect = [];

var stats = initStats();
 
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(10,7,10);

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
scene.add(ambientLight);

var pointColor = "#0xFFFFFF";
var directionalLight = new THREE.DirectionalLight(pointColor);
directionalLight.position.set(-40, 120, -10);
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
scene.add(directionalLight);

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-20,30,10);
spotLight.intensity=1;
scene.add(spotLight);

var house = new THREE.Object3D();
house.rotation.x=-0.5*Math.PI;
var houseScale=20
var houseScalex=houseScale*1.3;
var houseScaley=houseScale*1.3;
var houseScalez=houseScale;
house.scale.set(houseScalex,houseScaley,houseScalez);
scene.add(house);


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