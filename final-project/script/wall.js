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
    mat = new THREE.MeshPhongMaterial();
  
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
