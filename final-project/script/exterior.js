//texture
var exteriorWallTexture='exteriorBrick.jpg';
var exteriorWallTextureW='exteriorBrickW.jpg';
var balconyFloorTexture = 'balconyFloor.jpg';

var exteriorWalls = new THREE.Object3D();
house.add(exteriorWalls);

var southWallPattern = [[(primoblocco*0.5-(xfinestra/2))+spigolo, xfinestra,(primoblocco*0.5-(xfinestra/2))+xscala-xfinestra+spigolo/2, xfinestra, spigolo, xfinestra, xscala-xfinestra-spigolo/2+kitchenSize[0].reduce(somma)+spigolo],[3*0.3+spigolo, zfinestra, 3*0.7-zfinestra+spigolo]];
var southWall= makeWallCover(southWallPattern, [[1,1],[3,1],[5,1]], exteriorWallTexture, undefined, 60,15);
southWall.rotation.x=Math.PI/2;
southWall.position.setY( -margine);
exteriorWalls.add(southWall);

var exteriorWestWall = makeWallCover([[spigolo,3,spigolo],[spigolo,entranceSize[1].reduce(somma)-spigolo,littleBedRoomSize[1].reduce(somma)]],[[1,1]],exteriorWallTextureW,undefined, 15, 30);
exteriorWestWall.rotation.y=-Math.PI/2;
exteriorWestWall.position.setX(-margine);
exteriorWalls.add(exteriorWestWall);

var exteriorSEWall = makeWallCover([[spigolo+3*.3, zfinestra, 3*0.7-zfinestra+spigolo].reverse(),[spigolo+(5.88-xporta*2)/2,xporta*2, 5.88-(5.88+xporta*2)/2]],[[1,1]],exteriorWallTextureW,undefined, 15, 15);
exteriorSEWall.rotation.y=Math.PI/2;
exteriorSEWall.position.set(entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)+margine,0,3+spigolo*2);
exteriorWalls.add(exteriorSEWall);

var exteriorNEWall = makeWallCover([[spigolo, 3, spigolo],[spigolo,bigBedRoomSize[1].reduce(somma)]], [[1,1]], exteriorWallTextureW,undefined, 15,15);
exteriorNEWall.rotation.y=Math.PI/2;
exteriorNEWall.position.set(entranceSize[0].reduce(somma)+kitchenSize[0].reduce(somma)+margine,kitchenSize[1].reduce(somma)-spigolo,3+spigolo*2);
exteriorWalls.add(exteriorNEWall);

var exteriorNorthWall1 = makeWallCover([[spigolo+littleBedRoomSize[0][1]/2-xfinestra*2.5, xfinestra*2, xfinestra, xfinestra*2, littleBedRoomSize[0][1]/2-xfinestra*2.5+spigolo],[3*.3+spigolo, zfinestra, 3*0.7-zfinestra+spigolo].reverse()],[[1,1],[3,1]],exteriorWallTexture,undefined, 15,15);
exteriorNorthWall1.rotation.x= -Math.PI/2;
exteriorNorthWall1.position.set(0, entranceSize[1].reduce(somma)+littleBedRoomSize[1].reduce(somma)+margine, spigolo*2+3);
exteriorWalls.add(exteriorNorthWall1);

var exteriorNorthWall2 = makeWallCover([[spigolo+ 3.73+ spigolo, 3+spigolo],[spigolo, 3, spigolo]],[[1,1]],exteriorWallTexture,undefined, 15,15);
exteriorNorthWall2.rotation.x= -Math.PI/2;
exteriorNorthWall2.position.set( littleBedRoomSize[0].reduce(somma), entranceSize[1].reduce(somma)+littleBedRoomSize[1].reduce(somma)+margine, spigolo*2+3);
exteriorWalls.add(exteriorNorthWall2);

// *************BALCONY
var balconyDoorWall = makeWallCover([[3-zporta,zporta],[4.3/2-xporta, xporta*2, 4.3/2-xporta+spigolo]],[[1,1]],exteriorWallTextureW,undefined, 15,10);
balconyDoorWall.rotation.y=Math.PI/2;
balconyDoorWall.position.set(entranceSize[0].reduce(somma)+3.73+margine+spigolo*2,kitchenSize[1].reduce(somma),3+spigolo);
exteriorWalls.add(balconyDoorWall);

var balconyWall = makeWallCover([[3+spigolo],[3]],[],exteriorWallTexture,undefined, 10,15);
balconyWall.rotation.x= -Math.PI/2;
balconyWall.position.set( entranceSize[0].reduce(somma)+3.73+spigolo*2,kitchenSize[1].reduce(somma)+margine, 3+spigolo);
exteriorWalls.add(balconyWall);

var balconyFloor= makeWallCover([[3+spigolo],[4.3+spigolo]],[],balconyFloorTexture, undefined, 5,6);
balconyFloor.position.set(entranceSize[0].reduce(somma)+3.73+spigolo*2,kitchenSize[1].reduce(somma), spigolo+margine);
exteriorWalls.add(balconyFloor);