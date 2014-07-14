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
toIntersect.push(doorLivingRoom);
kitchen.add(doorLivingRoom);

//obj loaded


//**********************************Living Room
var livingRoom = new THREE.Object3D();
livingRoom.position.set(entranceSize[0].reduce(somma)+spigolo+3.73,0,spigolo); 
house.add(livingRoom);

//wall near kitchen
var livingRoomSideWall=makeWallCover([[3-zporta,zporta],[(5.88-xporta*3)/2, xporta*3,(5.88-xporta*3)/2]],[[1,1]], livingRoomTexture);
livingRoomSideWall.rotation.y= Math.PI/2;
livingRoomSideWall.position.set(spigolo+margine, spigolo, 3);
livingRoom.add(livingRoomSideWall);

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
lRWindow.position.set(3+spigolo, spigolo+(5.88-xporta*2)/2, 3*0.3);
livingRoom.add(lRWindow);