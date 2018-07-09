var three = require('three');
var View = require('threejs-managed-view').View;
var Mouse = require('input-mouse');
var CameraControllerFPS = require('threejs-camera-controller-first-person-desktop');
var GuiScene = require('threejs-gui-scene');
var Crosshair = require('./');
var view = new View({
	useRafPolyfill: false
});
var scene = view.scene;


var sphereGeometry = new three.SphereGeometry(1.5);
var size = 500;
var sizeHalf = size * .5;
var bounds = new three.Box3(
	new three.Vector3(-sizeHalf, -sizeHalf, -sizeHalf),
	new three.Vector3(sizeHalf, sizeHalf, sizeHalf)
)
var random = new three.Vector3();
var boundSize = bounds.size();
for (var i = 0; i < 1200; i++) {
	var ball = new three.Mesh(sphereGeometry);
	scene.add(ball);
	random.set(
		Math.random(),
		Math.random(),
		Math.random()
	);
	ball.position.copy(bounds.min).add(random.multiply(boundSize));
};

var fpsController = new CameraControllerFPS(view.camera, view.canvasContainer);
var guiScene = new GuiScene({
	renderer: view.renderer
});

var cursor = new Crosshair();
guiScene.add(cursor);

var mouse = new Mouse(view.canvasContainer);
function onMouseMovePositionCursor(x, y) {
	guiScene.positionRelative(x/view.canvasContainer.offsetWidth, y/view.canvasContainer.offsetHeight, cursor);
}

mouse.onMoveSignal.add(onMouseMovePositionCursor);

fpsController.onPointerLockAttainSignal.add(function(){
	console.log('attained pointerlock');
	mouse.onMoveSignal.remove(onMouseMovePositionCursor);
	cursor.position.x = cursor.position.y = 0;
})
fpsController.onPointerLockReleaseSignal.add(function(){
	console.log('released pointerlock');
	mouse.onMoveSignal.add(onMouseMovePositionCursor);
})
view.renderManager.onEnterFrame.add(function() {
	fpsController.update();
})
