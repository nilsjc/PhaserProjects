import Player1 from './player1.js';
import Player2 from './player2.js';
import Ball from './ball.js';
import Publik from './publik.js';
import Korv from './korv.js';
import Nisse from './nisse.js';
import Goal from './goal.js';
import Wolf from './wolf.js';
class GameScene extends Phaser.Scene
{
	constructor()
	{
		super('GameScene');
	}
	preload()
	{
		// Load the player1 image
        this.load.spritesheet("player1key", "/graphics/lufsst.png", { frameWidth: 30, frameHeight: 64 });
		this.load.spritesheet("player2key", "/graphics/player2.png", { frameWidth: 30, frameHeight: 64 });
		this.load.spritesheet("publikkey", "/graphics/publik2.png", { frameWidth: 30, frameHeight: 60 });
		this.load.image("ballkey", "/graphics/ball.png");
		this.load.image("goalkey", "/graphics/goal.png");
		this.load.image("goalcageleftkey", "/graphics/goalcage.png");
		this.load.spritesheet("korvkey", "/graphics/korv.png", { frameWidth: 60, frameHeight: 60 });
		this.load.image('background', 'graphics/plane.png');
		this.load.spritesheet("nissekey", "/graphics/nisse.png", { frameWidth: 60, frameHeight: 60 });
		this.load.spritesheet("wolfkey", "/graphics/varg.png", { frameWidth: 40, frameHeight: 64 });
		
	}
	create()
	{
		this.add.image(0,0, 'background').setOrigin(0, 0);
		this.player1name = "Lufsisarna";
		this.player2name = "Bumbibjörnarna";
		let rightAlign = 940 - (this.player2name.length*10);
		this.playerText1 = this.add.text(0,0);
		this.playerText1.setText(this.player1name);
		this.playerText2 = this.add.text(rightAlign,0);
		this.playerText2.setText(this.player2name);
		this.player1score = 0;
		this.player2score = 0;
		this.matchTimerSeconds = 90;
		this.matchTimeText = this.add.text(480, 500, this.matchTimerSeconds, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
		this.goalLock = false;

		
		this.anims.create(
			{
			key: 'alive',
			frames: this.anims.generateFrameNumbers('player1key', { start: 2, end: 3 }),
			frameRate: 4,
			repeat: -1
		});
		this.anims.create(
			{
			key: 'still',
			frames: this.anims.generateFrameNumbers('player1key', { start: 0, end: 1 }),
			frameRate: 4,
			repeat: -1
		});
		this.anims.create(
			{
			key: 'alive2',
			frames: this.anims.generateFrameNumbers('player2key', { start: 2, end: 3 }),
			frameRate: 4,
			repeat: -1
		});
		this.anims.create(
			{
			key: 'still2',
			frames: this.anims.generateFrameNumbers('player2key', { start: 0, end: 1 }),
			frameRate: 4,
			repeat: -1
			});
		this.anims.create(
			{
			key: 'publikalive',
			frames: this.anims.generateFrameNumbers('publikkey', { start: 0, end: 5 }),
			frameRate: 4,
			repeat: -1
			});
		this.anims.create(
			{
			key: 'publikdead',
			frames: this.anims.generateFrameNumbers('publikkey', { start: 6, end: 7 }),
			frameRate: 8,
			repeat: 0
			});
		this.anims.create(
			{
			key: 'korvalive',
			frames: this.anims.generateFrameNumbers('korvkey', { start: 0, end: 1 }),
			frameRate: 2,
			repeat: -1
			});
		this.anims.create(
			{
			key: 'korvdead',
			frames: this.anims.generateFrameNumbers('korvkey', { start: 2, end: 3 }),
			frameRate: 8,
			repeat: 0
			});
		this.anims.create(
			{
			key: 'nissealive',
			frames: this.anims.generateFrameNumbers('nissekey', { start: 0, end: 1 }),
			frameRate: 2,
			repeat: -1
			});
		this.anims.create(
			{
			key: 'nissedead',
			frames: this.anims.generateFrameNumbers('nissekey', { start: 2, end: 3 }),
			frameRate: 8,
			repeat: 0
			});
		this.anims.create(
			{
			key: 'wolfalive',
			frames: this.anims.generateFrameNumbers('wolfkey', { start: 0, end: 1 }),
			frameRate: 8,
			repeat: -1
			});


		// Create Player1
		this.pl1 = new Player1({ scene: this, x: 720, y: 180});
		this.pl1b = new Player1({ scene: this, x: 570, y: 260});
		this.pl1c = new Player1({ scene: this, x: 720, y: 340});

		// Create Player2
		this.pl2 = new Player2(this, 230, 180);	
		this.pl2b = new Player2(this, 380, 260);
		this.pl2c = new Player2(this, 230, 340);

		// Create Ball
        this.ball1 = new Ball(this, 482, 250, 'ballkey');

		// Create Goalcage
		//this.goalcageLeft = new Goal(this, 0, 260);

		// Create Publik
		const publikArray = [];
		let x = 30;
		for (let i = 0; i < 10; i++) {
			x += Phaser.Math.Between(50, 110); // 960
			const y = Phaser.Math.Between(40, 50);
			const publik = new Publik(this, x, y, 'publikkey');
			publikArray.push(publik);
			this.physics.add.collider(this.ball1, publik, (ball, publik) => {
				publik.handleCollision(ball);
			});
		}
		
		// Create Korv
		this.korv1 = new Korv(this, 920, 490, 'korvkey');
		this.physics.add.collider(this.ball1, this.korv1, (ball, korv) => {
			korv.handleCollision(ball);
		});

		// Create Nisse
		this.nisse = new Nisse(this, 30, 490, 'nissekey');
		this.physics.add.collider(this.ball1, this.nisse, (ball, nisse) => {
			nisse.handleCollision(ball);
		});
		
		// Create Wolf
		this.wolf = new Wolf(this, 970, 245, 'wolfkey');

		this.physics.add.collider(this.ball1, this.wolf, (ball, wolf) => {
			wolf.handleCollision(ball);
			ball.applyPlayerVelocity(wolf, 2.1);
		});
		this.physics.add.collider(this.pl1, this.wolf, (player, wolf) => {
			player.killPlayer();
		});
		this.physics.add.collider(this.pl2, this.wolf, (player, wolf) => {
			player.killPlayer();
		});
		

		// Create the goal area
		this.goalLeft = this.add.rectangle(0, 210, 50, 100, 0x0000ff, 0.01).setOrigin(0, 0);
		this.goalRight = this.add.rectangle(900, 210, 50, 100, 0x0000ff, 0.01).setOrigin(0, 0);

		// Make the goal area reacting to the ball
		this.physics.add.existing(this.goalLeft, true);
		this.physics.add.existing(this.goalRight, true);

		// create a zone for the goal area
		this.physics.add.overlap(this.ball1, this.goalLeft, (ball, goal) => {
			this.player2score += 1;
			this.setPlayerScores();
			this.handleBallAfterGoal();
		});
		this.physics.add.overlap(this.ball1, this.goalRight, (ball, goal) => {	
			this.player1score += 1;
			this.setPlayerScores();
			this.handleBallAfterGoal();
		});
		


		// Enable physics for the goal area
		this.physics.add.existing(this.goalLeft, true);
		this.physics.add.existing(this.goalRight, true);
		this.goalLeft.body.immovable = true;

        // Enable collision between the players and the ball
		// the ball gets the x and y velocity of the player when they collide
        this.physics.add.collider(this.pl1, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		this.physics.add.collider(this.pl2, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		this.physics.add.collider(this.pl1b, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		this.physics.add.collider(this.pl2b, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		this.physics.add.collider(this.pl1c, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		this.physics.add.collider(this.pl2c, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, 1.1);
		});
		
		this.add.image(25,238, 'goalcageleftkey');
		this.add.image(930,238, 'goalcageleftkey').setFlipX(true);

		}
	update(time, delta) {

        // countdown timer
		this.matchTimerSeconds -= delta / 1000;
		this.matchTimeText.setText(Math.floor(this.matchTimerSeconds));
		if (this.matchTimerSeconds <= 0) {
			this.endMatch();
			this.matchTimerSeconds = 0;
		}


    }

	endMatch()
	{

	}

	setPlayerScores()
	{
		if(this.goalLock == false)
		{
			this.playerText1.setText(this.player1name + " " + this.player1score);
			this.playerText2.setText(this.player2name + " " + this.player2score);
			this.pl1.handleGoal();
			this.pl2.handleGoal();
			this.pl1b.handleGoal();
			this.pl2b.handleGoal();
			this.pl1c.handleGoal();
			this.pl2c.handleGoal();
			this.showGoalText();
		}
		this.goalLock = true;
		
	}
	showGoalText()
	{
		this.goalText = this.add.text(480, 250, 'Mååål!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
		this.goalText.setAlpha(1);
		this.tweens.add({
			targets: this.goalText,
			alpha: 0,
			duration: 4000,
			ease: 'Power1',
			onComplete: () => {
				this.goalText.destroy();
				this.goalLock = false;

			}
		});
		this.time.addEvent({
			delay: 1000,
			callback: () => {
				this.goalText.destroy();
			},
			callbackScope: this
		});
	}
	handleBallAfterGoal()
	{
		this.ball1.x = -100;
		this.time.addEvent({
			delay: 2200,
			callback: () => {
				this.ball1.resetBall();
				this.goalLock = false;

			},
			callbackScope: this
		});
	}
}
export default GameScene;