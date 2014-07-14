var loader = new THREE.OBJLoader();

var objPath = 'assets/models/';


function loadObj(path, material){
  
  var parent= new THREE.Object3D();
  
  loader.load(objPath+path, function (obj) {
    if(material===undefined){
      material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
    }
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    parent.add(obj);
    // returnObject.children.push(obj);   
  });
  return parent;
}

//load the single bed with color as parameter
function loadSingleBed(generalColor, blanket, pillow, bedding){
  var parent= new THREE.Object3D();
  parent.name='singleBed';
  var path='single-bed.obj';
  loader.load(objPath+path, function (obj) {
   
    material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    var mesh =obj.getObjectByName('blanket');
    mesh.material= new THREE.MeshLambertMaterial({color:blanket,ambient:ambientLightColor, side: THREE.DoubleSide,opacity:0.8, transparent:true});

    var mesh =obj.getObjectByName('sof-back');
    mesh.material= new THREE.MeshLambertMaterial({color:pillow,ambient:ambientLightColor, side: THREE.DoubleSide });

    var mesh =obj.getObjectByName('Box01');
    mesh.material= new THREE.MeshLambertMaterial({color:bedding,ambient:ambientLightColor, side: THREE.DoubleSide });
    // mesh.getObjectByName = obj.getObjectByName(''); 
    
    });
    parent.add(obj);
  });
  return parent;
}

function loadKitchen(generalColor, handler, top,bottom, inner){
 var parent= new THREE.Object3D();
  parent.name='singleBed';
  var path='doppio.obj';
  loader.load(objPath+path, function (obj) {
   
    material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        // console.log(child.name);
      }
    var mesh =obj.getObjectByName('Loft16_1');
    mesh.material= new THREE.MeshLambertMaterial({color:handler,ambient:ambientLightColor, side: THREE.DoubleSide });

    var mesh =obj.getObjectByName('Loft17_2');
    mesh.material= new THREE.MeshLambertMaterial({color:handler,ambient:ambientLightColor, side: THREE.DoubleSide });
    
    var mesh = obj.getObjectByName('Line67_10');
    mesh.material= new THREE.MeshLambertMaterial({color:top,ambient:ambientLightColor, side: THREE.DoubleSide }); 
    
    var mesh = obj.getObjectByName('Box54_9');
    mesh.material= new THREE.MeshLambertMaterial({color:bottom,ambient:ambientLightColor, side: THREE.DoubleSide });

    var mesh = obj.getObjectByName('Box532_7');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide }); 

    var mesh = obj.getObjectByName('Box522_4');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide }); 
    });
    obj.position.set(-172,0,140);
    var doubleClone=obj.clone();
    doubleClone.position.set(-330,0,140);
    parent.add(obj);
    parent.add(doubleClone);
  });
  
  loader.load(objPath+'cucina.obj', function (obj){
    material = new THREE.MeshLambertMaterial({ color:0x79797D, ambient:ambientLightColor,side: THREE.DoubleSide });
   
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
      }
    });
    obj.children[0].material=new THREE.MeshLambertMaterial({color:top,ambient:ambientLightColor, side: THREE.DoubleSide });

    obj.children[4].material=new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide });

   obj.children[2].material=new THREE.MeshLambertMaterial({color:bottom,ambient:ambientLightColor, side: THREE.DoubleSide });

    var lastChild=8;
    for(i=5;i<lastChild;i++){
      child = obj.children[i];
      if(child instanceof THREE.Mesh)
        child.material=new THREE.MeshLambertMaterial({color:0x990000,ambient:ambientLightColor, side: THREE.DoubleSide });      
    }
    for(i=lastChild; i<obj.children.length;i++){
      child = obj.children[i];
      if(child instanceof THREE.Mesh)
        child.material=new THREE.MeshLambertMaterial({color:0x3f3f4b,ambient:ambientLightColor, side: THREE.DoubleSide });
    }
    
    parent.add(obj);
  });

loader.load(objPath+'mobilettoGrande.obj', function (obj){
    material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          console.log(child.name);
      }
    });
    var child;
    for(i=1; i<3;i++){
      child = obj.children[i];
      if(child instanceof THREE.Mesh)
        child.material=new THREE.MeshLambertMaterial({color:handler,ambient:ambientLightColor, side: THREE.DoubleSide });
    }

    var mesh =obj.getObjectByName('Loft24_15');
    mesh.material= new THREE.MeshLambertMaterial({color:handler,ambient:ambientLightColor, side: THREE.DoubleSide });

    var mesh =obj.getObjectByName('Loft25_16');
    mesh.material= new THREE.MeshLambertMaterial({color:handler,ambient:ambientLightColor, side: THREE.DoubleSide });
    
    var mesh =obj.getObjectByName('Box612_5');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide });
    var mesh =obj.getObjectByName('Box622_8');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide });
    var mesh =obj.getObjectByName('Box642_13');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide });
    var mesh =obj.getObjectByName('Box652_18');
    mesh.material= new THREE.MeshLambertMaterial({color:inner,ambient:ambientLightColor, side: THREE.DoubleSide });

    var mesh = obj.getObjectByName('Box63_10');
    mesh.material= new THREE.MeshLambertMaterial({color:bottom,ambient:ambientLightColor, side: THREE.DoubleSide });
    
    obj.position.set(-1110, 0, 140);
    parent.add(obj);
  });  
  
  return parent;  
}

function loadTableAndChairs (){
  var parent= new THREE.Object3D();
  parent.name='table&chair';
}