toIntersect=toIntersect.concat(lights);
var projector = new THREE.Projector();

function onDocumentMouseDown(event) {
	event.preventDefault();
	if ((document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element)) {
		var vector = new THREE.Vector3(0, 0, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(vector,
			controls.getDirection(new THREE.Vector3(0, 0, 0)).clone());
	} else {
		var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(camera.position,
			vector.sub(camera.position).normalize());

	}
	var intersects = raycaster.intersectObjects(toIntersect,true);
	if (intersects.length > 0) {
		var intersected=intersects[0].object;
		while(intersected.name!==interactNode){
			intersected=intersected.parent;
		}
		intersected.interact();
	}
}

document.addEventListener('mousedown', onDocumentMouseDown, false);