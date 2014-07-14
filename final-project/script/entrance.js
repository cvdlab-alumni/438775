//texture used
var atriumWallPaper='redwallpaper.jpg';
var atriumWallPaperRotated='redwallpaperRotated.jpg';
var atriumWallPaperUpset='redwallpaperUpset.jpg';
var atriumRigthWallPaper='redwallpaperRigthRotated.jpg';
var atriumFloorTexture='floorRedBroccato.jpg';
//door & window texture
entranceDoor1='door-wood1.jpg';
entranceDoor2='door-wood2.jpg';
windowMetal='window-metal.jpeg';
windowHandleColor=0x1616161;
atriumDoorTexture='atrium-door.jpg';

//pattern of entrance dimension
entranceSize = [[spigolo, primoblocco, spigolo, xscala*2, spigolo], 
  [spigolo, yscala*2, spigolo, 3.10,spigolo, 1.64], 
  [spigolo, 3.,spigolo]];

var entrance= new THREE.Object3D();
house.add(entrance);

var entranceModel=loadObj('ingresso.obj',new THREE.MeshLambertMaterial({color: 0x2E1F0F, side: THREE.DoubleSide }));
entrance.add(entranceModel);
objects.push(entranceModel);

//the first window in the entrance
var innerFace=[ [(primoblocco*0.5-(xfinestra/2))+spigolo, xfinestra,(primoblocco*0.5-(xfinestra/2))].reverse(),[3*0.3, zfinestra, 3*0.7-zfinestra] ];
faceWall1=makeWallCover(innerFace,[[1,1]],entranceWallTexture);
faceWall1.rotation.y = Math.PI;
faceWall1.rotation.x = Math.PI/2;
faceWall1.position.set((primoblocco*0.5-(xfinestra/2)+spigolo+xfinestra+primoblocco*0.5-(xfinestra/2)), spigolo+margine,spigolo);
entrance.add(faceWall1);

var externalFace=[[xscala-xfinestra+spigolo/2, xfinestra, spigolo, xfinestra, xscala-xfinestra-spigolo/2].reverse(),[3*.3, zfinestra, 3*0.7-zfinestra]];
faceWall2=makeWallCover(externalFace,[[1,1],[3,1]],entranceWallTexture);
faceWall2.rotation.y = Math.PI;
faceWall2.rotation.x = Math.PI/2;
faceWall2.position.set((innerFace[0].reduce(somma)+externalFace[0].reduce(somma)), spigolo+0.0001,spigolo);
entrance.add(faceWall2);

var doorWallFace=[[spigolo*2+margine,xporta,(2.14-1)],[zporta,1]];
doorWall=makeWallCover(doorWallFace, [[1,0]], entranceWallTexture);
doorWall.rotation.x=Math.PI/2;
doorWall.position.set(spigolo+primoblocco,spigolo+yscala*2-margine,spigolo, spigolo);
entrance.add(doorWall);

//big wall
var simpleWallFace=[[3],[spigolo, 3.10,yscala*2]];
simpleWall=makeWallCover(simpleWallFace,[],entranceWallTexture);
simpleWall.rotation.y=-Math.PI/2;
simpleWall.position.set(spigolo+primoblocco-margine, (spigolo+yscala*2),spigolo);

entrance.add(simpleWall);

//little  bottom oustide wallin
var simpleWallFace1=[[spigolo, primoblocco],[3]];
simpleWall1=makeWallCover(simpleWallFace1,[],entranceWallTexture);
simpleWall1.rotation.x=Math.PI/2;
simpleWall1.position.set(0, entranceSize[1].reduce(somma)-margine, spigolo);
entrance.add(simpleWall1);

//wall next the door
var simpleWall2 = makeWallCover([[3],[yscala*2]],[],entranceWallTexture);
simpleWall2.rotation.y=-Math.PI/2;
simpleWall2.position.set(entranceSize[0].reduce(somma)-spigolo-margine,spigolo, spigolo);
entrance.add(simpleWall2);

var externalFloorCover=[[spigolo+primoblocco, spigolo+xscala*2+spigolo],[spigolo+ yscala*2, spigolo+3.10+spigolo+1.64] ]
externalFloor=makeWallCover(externalFloorCover, [[1,1]], entranceFloorTexture)//da definire ancora
externalFloor.position.setZ(spigolo+margine)
entrance.add(externalFloor);

var atriumWallBottom = makeWallCover([[xscala*2],[3]],[], atriumWallPaper);
atriumWallBottom.rotation.x=Math.PI/2;
atriumWallBottom.position.set(spigolo*2+primoblocco,spigolo*2+yscala*2+3.10-margine,spigolo);
entrance.add(atriumWallBottom);

var atriumWallSide = makeWallCover([[3],[3.10]],[],atriumWallPaperRotated);
atriumWallSide.rotation.y=Math.PI/2;
atriumWallSide.position.set(spigolo*2+primoblocco+margine, spigolo*2+yscala*2,spigolo+3);
entrance.add(atriumWallSide);

var atriumMainEntranceWall = makeWallCover([[spigolo,xporta,(2.14-1)],[3-zporta,zporta]],[[1,1]],atriumWallPaperUpset);
atriumMainEntranceWall.rotation.x=-Math.PI/2;
atriumMainEntranceWall.position.set(spigolo*2+primoblocco, spigolo*2+yscala*2+margine, spigolo+3);
entrance.add(atriumMainEntranceWall);

var atriumNextDoorWall = makeWallCover([[zporta,3-zporta],[3.10-xporta-spigolo/2, xporta+spigolo/2]],[[0,1]],atriumRigthWallPaper);
atriumNextDoorWall.rotation.y=-Math.PI/2;
atriumNextDoorWall.position.set(spigolo*2+primoblocco+xscala*2-margine, (spigolo+yscala)*2, spigolo);
entrance.add(atriumNextDoorWall);

atriumFloor=makeWallCover([[xscala*2],[3.10]],[],atriumFloorTexture);
atriumFloor.position.set(spigolo*2+primoblocco, spigolo*2+yscala*2, spigolo+margine);
entrance.add(atriumFloor);

//**************setDoors & window
var mainDoor=mkDoor(xporta,zporta, spigolo, entranceDoor1, entranceDoor2);
mainDoor.position.set(spigolo*2+primoblocco+spigolo, spigolo+yscala*2, spigolo);
// door.getObjectByName(rotationNode, false).rotation.z=Math.PI/4;
toIntersect.push(mainDoor);
entrance.add(mainDoor);

var entranceWindow = mkWindowWithHandle(xfinestra,zfinestra,spigolo, windowMetal, windowHandleColor);
entranceWindow.position.set((primoblocco*0.5-(xfinestra/2))+spigolo,0,3*0.3+spigolo);
toIntersect.push(entranceWindow);
entranceWindow.getObjectByName(rotationNode).rotation.z=Math.PI/4;
entrance.add(entranceWindow);

var entranceWindow2 = mkWindowWithHandle(xfinestra,zfinestra,spigolo, windowMetal, windowHandleColor);
entranceWindow2.position.set(spigolo+primoblocco+xscala-xfinestra+spigolo/2,0,3*0.3+spigolo);
toIntersect.push(entranceWindow2);
entrance.add(entranceWindow2);

var entranceWindow3 = mkWindowWithHandle(xfinestra,zfinestra,spigolo, windowMetal, windowHandleColor);
entranceWindow3.position.set(spigolo*2.5+primoblocco+xscala,0,3*0.3+spigolo);
toIntersect.push(entranceWindow3);
entrance.add(entranceWindow3);

var doorAtrium = mkDoor(xporta+spigolo/2,zporta,spigolo, atriumDoorTexture);
doorAtrium.rotation.z=Math.PI/2;
doorAtrium.position.set(primoblocco+spigolo*3+xscala*2,spigolo*1.5+yscala*2+3.10-xporta,spigolo);
toIntersect.push(doorAtrium);
entrance.add(doorAtrium);