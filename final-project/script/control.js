var guiCommand = new function () {
  this.FPEnabled=startFP;
  this.entranceVisible=true;
  this.bedRoomVisible=true;
  this.modelVisible=true;
};

var gui = new dat.GUI();
gui.add(guiCommand, 'FPEnabled');

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