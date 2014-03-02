// JS Bindings constants
require("jsb.js");

// Load tests files

var tests_files = [
            'ActorController.js',
            'AnimationScene.js',
            'FightScene.js',
            'MapController.js',
            'MainScene.js',
            'resource.js',
            'sprintf.js',
            'TileScene.js',
];

for (var i = 0; i < tests_files.length; i++) {
    var name = "" + tests_files[i];
    require(name);
}


var scene = new MainScene();
var director = cc.Director.getInstance();
winSize = director.getWinSize();
director.runWithScene(scene);
