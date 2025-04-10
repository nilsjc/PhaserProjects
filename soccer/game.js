import StartScene from "./StartScene.js";
import GameScene from "./GameScene.js";
import EndScene from "./endscene.js";
import Menu from "./Menu.js";
var game;
window.onload = function(){
	var config = {
		type: Phaser.AUTO,
		width: 960,
		height: 520,
		parent: 'phaser-game',
		scene: [StartScene],
		physics: {
			default: 'arcade',
			arcade: {
				debug: false,
				gravity: { y: 0 }
			}
		},
		scene: [
			StartScene,
			GameScene,
			EndScene,
			Menu
			],
			dom: {
				createContainer: true
			}};
	game = new Phaser.Game(config);
}