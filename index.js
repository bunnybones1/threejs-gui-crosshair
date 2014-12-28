function Crosshair() {
	var geometry = new THREE.Geometry();
	var white = new THREE.Color(1, 1, 1);
	var black = new THREE.Color(0, 0, 0);

	var petals = 8;

	var radiusInner = 0.01;
	var radiusOuter = 0.1;
	for(var iPetal = 0; iPetal < petals; iPetal++) {
		var ratio = iPetal / petals;
		var angle = ratio * Math.PI * 2;

		geometry.vertices.push(new THREE.Vector3(
			Math.cos(angle) * radiusInner,
			Math.sin(angle) * radiusInner,
			0
		));
		geometry.vertices.push(new THREE.Vector3(
			Math.cos(angle) * radiusOuter,
			Math.sin(angle) * radiusOuter,
			0
		));

		var odd = (iPetal % 2) != 0;
		geometry.colors.push(odd ? white : black);
		geometry.colors.push(odd ? white : black);
	}

	THREE.Line.call(
		this,
		geometry, 
		new THREE.LineBasicMaterial({
			color: 0xffffff,
			vertexColors: true
		}),
		THREE.LinePieces
	);
}

Crosshair.prototype = Object.create(THREE.Line.prototype);

module.exports = Crosshair;