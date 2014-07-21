var kitchenSize=[[spigolo, 3.73, spigolo, 3,spigolo],[spigolo, 5.88, spigolo]];

//texture used
var kitchenFloorTexture='kitchen-black-floor.jpg';
var kitchenBrickTexture = 'kitchenBricks.jpg';
var kitchenTopTexture = 'kitchenWallTop.jpg';
var livingRoomTexture = 'orange-living-room.jpg';
var lBRWindowTexture='bedroom-window.jpeg';


var kitchen = new THREE.Object3D();
kitchen.position.set(entranceSize[0].reduce(somma),0,spigolo); 
house.add(kitchen);

var rigthSideHouse=loadObj('salone.obj', new THREE.MeshLambertMaterial({color: 0x77ACAC, shading: THREE.FlatShading, side: THREE.DoubleSide }));
objects.push(rigthSideHouse);
house.add(rigthSideHouse);

var kitchenFloor=makeWallCover([[spigolo*4+3.37+3],[5.88]],[], kitchenFloorTexture, undefined, 4,4);
kitchenFloor.position.set(0,spigolo,margine);
kitchen.add(kitchenFloor);

var kitchenWallHeigth=3*0.5;

//south wall of the kitchen
var kitchenWall= makeWallCover([[3.73+spigolo+0.07],[kitchenWallHeigth]], [], kitchenBrickTexture, undefined, 2,1);
kitchenWall.rotation.x = -Math.PI/2;
kitchenWall.position.set(0, spigolo+margine, kitchenWallHeigth);
kitchen.add(kitchenWall);

var kitchenTopWall = makeWallCover([[3.73+spigolo+0.07],[3-kitchenWallHeigth]], [], kitchenTopTexture);
kitchenTopWall.rotation.x = -Math.PI/2;
kitchenTopWall.position.set(0, spigolo+margine, kitchenWallHeigth*2);
kitchen.add(kitchenTopWall);

//wall near the living room
var kitchenSideWall= makeWallCover([[kitchenWallHeigth],[(5.88-xporta*3)/2]],[], kitchenBrickTexture);
kitchenSideWall.rotation.y= -Math.PI/2;
kitchenSideWall.position.set(spigolo+3.73-margine*2, spigolo,0);
kitchen.add(kitchenSideWall);


var kitchenTopSideWall= makeWallCover([[zporta,3-zporta],[(5.88-xporta*3)/2, xporta*3,(5.88-xporta*3)/2]],[[0,1]], kitchenTopTexture);
kitchenTopSideWall.rotation.y= -Math.PI/2;
kitchenTopSideWall.position.set(spigolo+3.73-margine, spigolo,0);
kitchen.add(kitchenTopSideWall);


//wall near to atrium
var kitchenNextWall=makeWallCover([[kitchenWallHeigth],[yscala*2+spigolo+3-xporta]],[],kitchenBrickTexture, undefined, 1,3);
kitchenNextWall.rotation.y= Math.PI/2;
kitchenNextWall.position.set(margine,spigolo,kitchenWallHeigth);
kitchen.add(kitchenNextWall);

var kitchenTopNextWall=makeWallCover([[3-kitchenWallHeigth],[yscala*2+spigolo+3-xporta]],[],kitchenTopTexture);
kitchenTopNextWall.rotation.y= Math.PI/2;
kitchenTopNextWall.position.set(margine,spigolo,kitchenWallHeigth*2);
kitchen.add(kitchenTopNextWall);

var kitchenTopNextWall2=makeWallCover([[3-zporta,zporta],[xporta+spigolo, 5.88-(spigolo+yscala*2+3.10)]],[[1,0]],kitchenTopTexture);
kitchenTopNextWall2.rotation.y= Math.PI/2;
kitchenTopNextWall2.position.set(margine,yscala*2+spigolo+3.1-xporta, 3);
kitchen.add(kitchenTopNextWall2);


//wall between kitchen and bed room
var bedRoomWallCover = makeWallCover([[1.365+0.04, xporta-0.12, 1.365+spigolo+0.12],[zporta, 3-zporta]],[[1,0]],kitchenTopTexture);
bedRoomWallCover.rotation.x=Math.PI/2;
bedRoomWallCover.position.set(0, spigolo+5.88-margine, 0);
kitchen.add(bedRoomWallCover);

// door
var doorLivingRoom = mkDoor(xporta,zporta,spigolo,atriumDoorTexture);
doorLivingRoom.position.set(1.365+0.04,spigolo+5.88,0);
kitchen.add(doorLivingRoom);

//obj loaded
var kitchenFurniture = loadKitchen(0xD30000, 0xDDDDDD, 0xEEEfff, 0x000000, 0x1A4026);
kitchenFurniture.rotation.y=Math.PI;
kitchenFurniture.scale.set(0.31,0.26,0.31);
kitchenFurniture.position.set(entranceSize[0].reduce(somma)*houseScalex+80*0.315,spigolo*houseScaley,-5*spigolo*houseScalex);
scene.add(kitchenFurniture);

var tableChairs = loadTableAndChairs(0x442219,0x4b312a);
tableChairs.scale.set(0.6,0.6,0.6)
tableChairs.position.set((entranceSize[0].reduce(somma)+0.25*kitchenSize[1].reduce(somma))*houseScalex,spigolo*houseScaley, -(0.7*kitchenSize[1].reduce(somma))*houseScalex);
scene.add(tableChairs);


//**********************************Living Room
var livingRoom = new THREE.Object3D();
livingRoom.position.set(entranceSize[0].reduce(somma)+spigolo+3.73,0,spigolo); 
house.add(livingRoom);

//wall near kitchen
var livingRoomSideWall=makeWallCover([[3-zporta,zporta],[(5.88-xporta*3)/2, xporta*3,(5.88-xporta*3)/2]],[[1,1]], livingRoomTexture);
livingRoomSideWall.rotation.y= Math.PI/2;
livingRoomSideWall.position.set(spigolo+margine, spigolo, 3);
livingRoom.add(livingRoomSideWall);

var staticElement = new THREE.Object3D();
var coverRigth = makeWallCover([[spigolo],[zporta]],[],livingRoomTexture);
coverRigth.rotation.y=Math.PI/2;
coverRigth.rotation.z=-Math.PI/2;
coverRigth.position.set(margine,spigolo,zporta);
staticElement.add(coverRigth);

var coverLeft = makeWallCover([[spigolo],[zporta]],[],livingRoomTexture);
coverLeft.rotation.y=-Math.PI/2;
coverLeft.rotation.z=-Math.PI/2;
coverLeft.position.set(xporta*3-margine,spigolo,0);
staticElement.add(coverLeft);

var coverUp = makeWallCover([[xporta*3],[spigolo]],[],livingRoomTexture);
coverUp.rotation.x=Math.PI;
coverUp.position.set(0,spigolo,zporta-margine);
staticElement.add(coverUp);

staticElement.rotation.z=Math.PI/2;
staticElement.position.set(spigolo,spigolo+(5.88-xporta*3)/2,0)
livingRoom.add(staticElement);

var livingRoomWindowWall = makeWallCover([[3*.3, zfinestra, 3*0.7-zfinestra],[(5.88-xporta*2)/2,xporta*2, 5.88-(5.88+xporta*2)/2]],[[1,1]],livingRoomTexture);
livingRoomWindowWall.rotation.y=-Math.PI/2;
livingRoomWindowWall.position.set(3-margine+spigolo,spigolo,0);
livingRoom.add(livingRoomWindowWall);

var lRSimpleWallNorth = makeWallCover([[3],[3]],[],livingRoomTexture);
lRSimpleWallNorth.rotation.x=Math.PI/2;
lRSimpleWallNorth.position.set(spigolo, spigolo+5.88-margine, 0);
livingRoom.add(lRSimpleWallNorth);

var lRSimpleWallSouth=makeWallCover([[3],[3]], [], livingRoomTexture);
lRSimpleWallSouth.rotation.x = -Math.PI/2;
lRSimpleWallSouth.position.set(spigolo, spigolo+margine, 3);
livingRoom.add(lRSimpleWallSouth);

var lRWindow = mkDoubleWindow(xporta,zfinestra,spigolo,lBRWindowTexture);
lRWindow.rotation.z=Math.PI/2;
lRWindow.position.set(3+spigolo*2, spigolo+(5.88-xporta*2)/2, 3*0.3);
livingRoom.add(lRWindow);

var couch = loadCouch(0xffffff,0xf9664b);
couch.rotation.y=-Math.PI/2;
couch.scale.set(0.25,0.25,0.25);
couch.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.90)*houseScalex,spigolo*houseScaley,-spigolo*houseScalez-40 );
scene.add(couch);

var tvBottom=tvForniture (0xEEEfff, 0xDDDDDD, 0xf9664b);
// tvBottom.rotation.y=Math.PI;
tvBottom.scale.set(0.3,0.3,0.3);
tvBottom.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.68)*houseScalex,spigolo*houseScalez,-(kitchenSize[1].reduce(somma)-spigolo*2)*houseScaley );
scene.add(tvBottom);

var tv = videoTv([[1.0],[0.5]]);
scene.add(tv);
tv.scale.set(houseScalex,houseScaley,houseScalez);
tv.rotation.x=-Math.PI/2;
tv.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.77)*houseScalex,(spigolo+1.25)*houseScalez,-(kitchenSize[1].reduce(somma)-spigolo*3)*houseScaley);

var kitchenLamp =loadChandalier('lampadario.mtl');
kitchenLamp.scale.set(2,2,2);
kitchenLamp.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.3)*houseScalex,(2.5)*houseScalez,-(kitchenSize[1].reduce(somma)*0.2)*houseScaley);
scene.add(kitchenLamp);
var kitchenLight=kitchenLamp.getLight();
lights.push(kitchenLight);
scene.add(kitchenLight);

var kitchenLamp1 =loadChandalier('lampadario.mtl');
kitchenLamp1.scale.set(2,2,2);
kitchenLamp1.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.3)*houseScalex,(2.5)*houseScalez,-(kitchenSize[1].reduce(somma)*0.7)*houseScaley);
scene.add(kitchenLamp1);
var kitchenLight1=kitchenLamp1.getLight();
lights.push(kitchenLight1);
scene.add(kitchenLight1);

var kitchenLamp2 =loadChandalier('lampadario.mtl');
kitchenLamp2.scale.set(3,3,3);
kitchenLamp2.position.set((entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)*0.8)*houseScalex,(2.5)*houseScalez,-(kitchenSize[1].reduce(somma)*0.5)*houseScaley);
scene.add(kitchenLamp2);
var kitchenLight2=kitchenLamp2.getLight(4*houseScale,3);
lights.push(kitchenLight2);
scene.add(kitchenLight2);