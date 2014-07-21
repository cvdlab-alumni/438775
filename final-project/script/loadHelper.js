var loader = new THREE.OBJLoader();

var objPath = 'assets/models/';
var ambientLightColor='0xFFFFFF';


function loadObj(path, material){
  
  var parent= new THREE.Object3D();
  
  loader.load(objPath+path, function (obj) {
    if(material===undefined){
      var material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
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
   
    var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
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
   
    var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
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
    var material = new THREE.MeshLambertMaterial({ color:0x79797D, ambient:ambientLightColor,side: THREE.DoubleSide });
   
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
    var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
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

function loadTableAndChairs (tableColor, chairColor){
  var parent= new THREE.Object3D();
  parent.name='table&chair';

  loader.load(objPath+'tavolo&sedie.obj',function (obj){
    for (var i = obj.children.length - 2; i >= 0; i--) {
      obj.children[i].material= new THREE.MeshLambertMaterial({color:chairColor,ambient:ambientLightColor, side: THREE.DoubleSide });
    };
    obj.children[obj.children.length-1].material = new THREE.MeshLambertMaterial({color:tableColor,ambient:ambientLightColor, side: THREE.DoubleSide });  
    obj.position.set(25,0,50);
    parent.add(obj);
  } );

  return parent;
}

function loadCouch (generalColor, pillowColor){
  var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
  var parent= new THREE.Object3D();
  parent.name='couch';
  loader.load(objPath+'divano.obj',function (obj){
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
        // console.log(child.name);
      });
    var cilindrMaterial =  new THREE.MeshLambertMaterial({ color:pillowColor, ambient:ambientLightColor,side: THREE.DoubleSide });
    obj.getObjectByName('Cilindro01').material= cilindrMaterial;
    obj.getObjectByName('Cilindro02').material= cilindrMaterial;
           
    
    obj.position.set(0,7.6,0)
    parent.add(obj);
  });

  return parent;
}

function tvForniture (generalColor, handler,bottom){
  var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
  var parent= new THREE.Object3D();
  parent.name='tvForniture';
  loader.load(objPath+'tableBasse2/tableBasse2.obj',function (obj){
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
        // console.log(child.name);
      });
    obj.getObjectByName('Cube_8_11').material=new THREE.MeshLambertMaterial({ color:bottom, ambient:ambientLightColor,side: THREE.DoubleSide });
    
    var handlerMaterial=new THREE.MeshLambertMaterial({ color:handler, ambient:ambientLightColor,side: THREE.DoubleSide });
    obj.getObjectByName('pOIGNEE_10').material=handlerMaterial;
    obj.getObjectByName('pOIGNEE_1_12').material=handlerMaterial;

    obj.position.set(4,19.15,26);
    parent.add(obj);
  });
  return parent;
}

function loadDoubleBed (generalColor, blanket, pillow ){
  var parent= new THREE.Object3D();
  parent.name='doubleBed';
  var path='double-bed.obj';
  loader.load(objPath+path, function (obj) {
   
    var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        // console.log(child.name);
    }
    var mesh =obj.getObjectByName('Capsula01');
    mesh.material= new THREE.MeshLambertMaterial({color: pillow,ambient:ambientLightColor, side: THREE.DoubleSide});

    var mesh =obj.getObjectByName('Parallele3');
    mesh.material= new THREE.MeshLambertMaterial({color:blanket,ambient:ambientLightColor, side: THREE.DoubleSide });
    
    obj.position.set(0,33.3,0);

    });
    parent.add(obj);
  });
  return parent; 
}

function loadShower ( generalColor){
  var parent= new THREE.Object3D();
  parent.name='wc';
  var path='doccia.obj';
  loader.load(objPath+path, function (obj) {
   
    var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        // console.log(child.name);
    }
    var mesh =obj.getObjectByName('Cylinder17_1');
    mesh.material= new THREE.MeshPhongMaterial({color: 0x1e262d,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:50,shading:THREE.SmoothShading, specular:0x1e262d});

    var mesh =obj.getObjectByName('Rectangle06_2');
    mesh.material= new THREE.MeshPhongMaterial({color: 0xFFFFFF,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular:0x82888d});

    obj.position.set(-330,0,70);
    });
    parent.add(obj);
  });
  return parent;   
}

function loadWc(generalColor){
  
  var parent= new THREE.Object3D();
  parent.name='wc';
  var path='toiletsUnit.obj';
  loader.load(objPath+path, function (obj) {
   
    var material = new THREE.MeshPhongMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide,shininess:35,shading:THREE.SmoothShading, specular: 0x82888d});
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    parent.add(obj);
  });
  return parent;   
}

function loadLavatory(generalColor,mirrorTop,mirrorBot,lampColor, armatureColor, handleColor ){
  var parent= new THREE.Object3D();
  parent.name='sing';
  
  var colorLight = new THREE.Color(lampColor);
  colorLight.lerp( 0xFFFFFF, 0.7 );

  parent.colorLight=colorLight.getHex();

  var path='lavandino.obj';
  loader.load(objPath+path, function (obj) {
    obj.position.set(-100,0,-137);

    var material = new THREE.MeshPhongMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide,shininess:35,shading:THREE.SmoothShading, specular: 0x82888d});   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        // console.log(child.name);
      }
    });

    var mesh =obj.getObjectByName('MIRROR01');
    mesh.material= new THREE.MeshLambertMaterial({color: mirrorTop,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('MIRRORGL01');
    mesh.material= new THREE.MeshLambertMaterial({color: mirrorBot,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('LAMP02');
    mesh.material= new THREE.MeshLambertMaterial({color: lampColor,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('LAMP03');
    mesh.material= new THREE.MeshLambertMaterial({color: lampColor,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('TOWEL01');
    mesh.material= new THREE.MeshLambertMaterial({color:0xc92f2f,ambient:ambientLightColor, side: THREE.DoubleSide,opacity:0.8, transparent:true}); 
    
    var mesh =obj.getObjectByName('SOAP01');
    mesh.material= new THREE.MeshLambertMaterial({color: 0xFFFFFF,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('TOOTHPAS01');
    mesh.material= new THREE.MeshLambertMaterial({color: 0x6294aa,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('CAPTP01');
    mesh.material= new THREE.MeshPhongMaterial({color: 0xdb0015,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: 0x82888d});
    parent.add(obj);

    var mesh =obj.getObjectByName('BRUSHIEO01');
    mesh.material= new THREE.MeshPhongMaterial({color: 0x00b016,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: 0x82888d,shading:THREE.SmoothShading});
    parent.add(obj);

    var mesh =obj.getObjectByName('BRUSHIEI01');
    mesh.material= new THREE.MeshLambertMaterial({color: 0xFFFFFF,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('BRUSHIEO02');
    mesh.material= new THREE.MeshPhongMaterial({color: 0xe38891,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: 0x82888d,shading:THREE.SmoothShading});
    parent.add(obj);

    var mesh =obj.getObjectByName('BRUSHIEI02');
    mesh.material= new THREE.MeshLambertMaterial({color: 0xFFFFFF,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('TBY01');
    mesh.material= new THREE.MeshLambertMaterial({color: 0x00b016,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('TBBL01');
    mesh.material= new THREE.MeshLambertMaterial({color: 0xe38891,ambient:ambientLightColor, side: THREE.DoubleSide});
    parent.add(obj);

    var mesh =obj.getObjectByName('ARMATURE01');
    mesh.material= new THREE.MeshPhongMaterial({color: armatureColor,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: 0x82888d,shading:THREE.SmoothShading});
    parent.add(obj);

    var mesh =obj.getObjectByName('GYR01');
    mesh.material= new THREE.MeshPhongMaterial({color: handleColor,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: handleColor,shading:THREE.SmoothShading});
    parent.add(obj);

    var mesh =obj.getObjectByName('REG01');
    mesh.material= new THREE.MeshPhongMaterial({color: handleColor,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: handleColor,shading:THREE.SmoothShading});
    parent.add(obj);
    
    var mesh =obj.getObjectByName('SINK01');
    mesh.material= new THREE.MeshPhongMaterial({color: 0xFFFFFF,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular:0x82888d});
    
    var mesh=obj.getObjectByName('MUGLFRAM01');
    mesh.material=new  THREE.MeshLambertMaterial({color:0x496a6a,  shading: THREE.FlatShading, opacity:0.95, transparent:true });
  });
  return parent;   
}

function loadBidet(generalColor, handleColor){
  
  var parent= new THREE.Object3D();
  parent.name='wc';
  var path='bidet.obj';
  loader.load(objPath+path, function (obj) {
   
    var material = new THREE.MeshPhongMaterial({color: generalColor,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular:0x82888d});
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
      // console.log(child.name);
    });
    for (var i=1; i<obj.children.length;  i++) {
      obj.children[i].material= new THREE.MeshPhongMaterial({color: handleColor,ambient:ambientLightColor, side: THREE.DoubleSide,shininess:40, specular: handleColor,shading:THREE.SmoothShading});
    }
    obj.position.set(50,0,27.5);
    parent.add(obj);
  });
  return parent;
}

function loadAtriumForniture (generalColor,top,handler){
  var parent= new THREE.Object3D();
  parent.name='atrium-forniture';
  var path='mobile-ingresso.obj';
  if (handler===undefined) handler=0xDDDDDD;
  loader.load(objPath+path, function (obj) {
   
    obj.traverse(function (child) {
      var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });

      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
      // console.log(child.name);
    });
    var handlerMaterial=new THREE.MeshPhongMaterial({color: handler,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular:handler});

    var mesh = obj.getObjectByName('TopTable_scale_22_48');
    mesh.material= new THREE.MeshLambertMaterial({color: top,ambient:ambientLightColor, side: THREE.DoubleSide});

    var mesh = obj.getObjectByName('nurbsSphere1_18_44');
    mesh.material= handlerMaterial;

    var mesh = obj.getObjectByName('nurbsSphere2_19_45');
    mesh.material= handlerMaterial;

    var mesh = obj.getObjectByName('nurbsSphere2_19_45');
    mesh.material= handlerMaterial;

    var mesh = obj.getObjectByName('nurbsSphere3_20_46');
    mesh.material= handlerMaterial;

    parent.add(obj);
  });

  loader.load(objPath+"candela-ingresso.obj", function (obj) {
   
    var material = new THREE.MeshPhongMaterial({color: 0x0a0a07,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular: 0x000011});
   
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
      // console.log(child.name);
    });
    for (var i = obj.children.length - 1; i >= 5; i--) {
      obj.children[i].material=new THREE.MeshLambertMaterial({color: 0xffff4a,ambient:ambientLightColor, side: THREE.DoubleSide});
    };
    obj.scale.set(10,10,10);
    obj.position.set(40,88,40)
    parent.add(obj);
  });
  return parent;   
}

function loadRailing(generalColor){
  var parent= new THREE.Object3D();
  parent.name='railing';
  var path='ringhiera.obj';

  loader.load(objPath+path, function (obj) {
   
    obj.traverse(function (child) {
      var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });

      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
      // console.log(child.name);
    });
    obj.position.set(12,-2,6.2);
    
    var obj1=obj.clone();
    obj1.rotation.y=-Math.PI/2;
    obj1.position.set(-3.8,-2,9.6);
    parent.add(obj1);

    var obj2=obj.clone();
    obj2.position.set(12,-2, 2.8);
    parent.add(obj2);
    // parent.add(obj);
  });
  parent.position.setX(1);
  return parent;      
}

// function loadWardrobe (generalColor,handler){
//   var parent= new THREE.Object3D();
//   parent.name='wardRobe';
//   var path='mobile-ingresso.obj';
//   if (handler===undefined) handler=0xDDDDDD;
//   loader.load(objPath+path, function (obj) {
   
//     obj.traverse(function (child) {
//       var material = new THREE.MeshLambertMaterial({ color:generalColor, ambient:ambientLightColor,side: THREE.DoubleSide });

//       if (child instanceof THREE.Mesh) {
//         child.material = material;
//       }
//       console.log(child.name);
//     });
//     // var handlerMaterial=new THREE.MeshPhongMaterial({color: handler,ambient:ambientLightColor, side: THREE.DoubleSide, shininess:40,shading:THREE.SmoothShading,specular:handler});
//     parent.add(obj);
//   });
    
//   return parent;      
// }

function loadWardrobe (path){
  var parent= new THREE.Object3D();
  parent.name='wardRobe';

  var loader = new THREE.OBJMTLLoader();
  var eventFunction =  function (event) {
    var mesh=event.content;
    mesh.position.set(-100,0,55);
    parent.add(mesh);
  }
  loader.addEventListener('load',eventFunction);

  loader.load(
    'assets/models/mobileAzzurro/mobileAzzurro.obj', 
    'assets/models/mobileAzzurro/'+path, 
    {side: THREE.DoubleSide}
  );

  return parent;      
}

function loadChandalier (path){
  var parent= new THREE.Object3D();
  parent.name='wardRobe';

  var loader = new THREE.OBJMTLLoader();
  loader.addEventListener('load', function (event) {
    var mesh=event.content;
    parent.add(mesh);
  });
  loader.load(
    'assets/models/lampadario/lampadario.obj', 
    'assets/models/lampadario/'+path, 
    {side: THREE.DoubleSide}
  );
  parent.position.setY(-6.7);
  parent.getLight=mkLight;

  return parent;        
}