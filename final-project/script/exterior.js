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

var exteriorWestWall = makeWallCover([[spigolo,3,spigolo],[spigolo,entranceSize[1].reduce(somma)-1.64-spigolo*2,littleBedRoomSize[1].reduce(somma)+1.64+spigolo]],[[1,1]],exteriorWallTextureW,undefined, 15, 30);
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

//load obj balcony railing
var railing = loadRailing(0x000000);
var scalex=houseScalex*1;
var scalez=houseScaley*1.30;
var scaley=houseScalez*0.6;
railing.position.set((entranceSize[0].reduce(somma)+3.73+spigolo*5)*houseScalex,spigolo*houseScalez,-(kitchenSize[1].reduce(somma)-spigolo/3)*houseScaley);
railing.scale.set(scalex,scaley,scalez)
scene.add(railing);

basePlane=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200,600),new THREE.MeshLambertMaterial({color: 0x5c9632}));
basePlane.rotation.x=-0.5*Math.PI;
basePlane.position.setY(spigolo);
scene.add(basePlane); 
objects.push(basePlane);

// load skybox
var declareArray=['Right','Left','Up','Down','Front','Back'];
var materialArray = [];
for (var i = 0; i < 6; i++)
materialArray.push(new THREE.MeshBasicMaterial({
map: THREE.ImageUtils.loadTexture(texturePath+'SkyboxSet1/CloudyLightRays/CloudyLightRays'+declareArray[i]+'2048.png'),
side: THREE.BackSide
}));
var daySkybox_material = new THREE.MeshFaceMaterial(materialArray);
var daySkybox = new THREE.Mesh(new THREE.BoxGeometry(2048, 2048, 2048), daySkybox_material);
daySkybox.color = new THREE.Color('#FFFFFF');
scene.add(daySkybox);
daySkybox.visible=false;

var materialArray = [];
for (var i = 0; i < 6; i++)
materialArray.push(new THREE.MeshBasicMaterial({
map: THREE.ImageUtils.loadTexture(texturePath+ "night-skybox.jpg"),
side: THREE.BackSide
}));

var nightSkybox_material = new THREE.MeshFaceMaterial(materialArray);
var nightSkybox = new THREE.Mesh(new THREE.BoxGeometry(8000, 8000, 8000), nightSkybox_material);
nightSkybox.color = new THREE.Color('#FFFFFF');
scene.add(nightSkybox);