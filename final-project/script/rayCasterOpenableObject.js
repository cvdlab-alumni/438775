

function onDocumentMouseDown(event) {
	event.preventDefault();
	if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
		var vector = new THREE.Vector3(0, 0, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(vector,
		controls.getDirection(new THREE.Vector3(0, 0, 0)).clone());
		var intersects = raycaster.intersectObjects(toIntersect);
		if (intersects.length > 0 && intersects.length<10) {
		 intersects[0].son.active && intersects[0].son.interact();
		}
	} else {
		var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
		projector.unprojectVector(vector, camera);
		var raycaster = new THREE.Raycaster(camera.position,
		vector.sub(camera.position).normalize());
		var intersects = raycaster.intersectObjects(toIntersect);
		if (intersects.length > 0 ) {
		 intersect[0].son.active && intersects[0].son.interact();
		}

	}
}