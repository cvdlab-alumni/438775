var guiCommand = new function () {
  this.FPEnabled=startFP;
  this.entranceVisible=true;
  this.bedRoomVisible=true;
  this.modelVisible=true;
  this.day=false;
  this.trackball_enable=false;
  this.make_it_snow=false;
};

var gui = new dat.GUI();
gui.add(guiCommand, 'FPEnabled');

gui.add(guiCommand, 'trackball_enable');
 
gui.add(guiCommand, 'make_it_snow').onChange(function (value) {
  if(value)
    startEngine();
  else
    stopEngine();
});

gui.add(guiCommand, 'entranceVisible').onChange(function (value) {
  entrance.traverse(function (child){
    child.visible=value;
  });
});

gui.add(guiCommand, 'bedRoomVisible').onChange(function (value) {
  bigBedRoom.traverse(function (child){
    child.visible=value;
  });
  littleBedRoom.traverse(function (child){
    child.visible=value;
  });
});

gui.add(guiCommand,'modelVisible').onChange(function (value) {
  bedRooms.traverse(function (child){
    child.visible=value;
  });
  entranceModel.traverse(function (child){
    child.visible=value;
  });
  rigthSideHouse.traverse(function (child){
    child.visible=value;
  });
});

function lightOn(value){
  directionalLight.visible = value;
  ambientLight.visible = value;
  daySkybox.visible=value;
  nightSkybox.visible=!value;
  for (var i = 0; i < lights.length; i++) {
    console.log(lights[i].interact());
  }
}
gui.add(guiCommand,'day').onChange(lightOn);