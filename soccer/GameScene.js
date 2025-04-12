import Player from './player.js';
import Ball from './ball.js';
import Korv from './korv.js';
import Nisse from './nisse.js';
import Wolf from './wolf.js';
import Audience from './Audience.js';
import MiniFluff from './minifluff.js';
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
		this.load.spritesheet("audiencekey", "/graphics/publik1.png", { frameWidth: 104, frameHeight: 40 });
		this.load.image("ballkey", "/graphics/ball.png");
		this.load.image("goalkey", "/graphics/goal.png");
		this.load.image("goalcageleftkey", "/graphics/goalcage.png");
		this.load.spritesheet("korvkey", "/graphics/korv.png", { frameWidth: 60, frameHeight: 60 });
		this.load.image('background', 'graphics/plane.png');
		this.load.spritesheet("nissekey", "/graphics/nisse.png", { frameWidth: 60, frameHeight: 60 });
		this.load.spritesheet("wolfkey", "/graphics/varg.png", { frameWidth: 40, frameHeight: 64 });
		this.load.spritesheet("minifluffkey", "/graphics/minifluff.png", { frameWidth: 21, frameHeight: 48 });
	}
	create(nameArr)
	{
		this.add.image(0,0, 'background').setOrigin(0, 0);
		this.player1name = nameArr[0];
		this.player2name = nameArr[1];
		let rightAlign = 940 - (this.player2name.length*10);
		this.playerText1 = this.add.text(0,0);
		this.playerText1.setText(this.player1name);
		this.playerText2 = this.add.text(rightAlign,0);
		this.playerText2.setText(this.player2name);
		this.player1score = 0;
		this.player2score = 0;
		this.matchTimerSeconds = 90;
		this.matchTimeText = this.add.text(480, 500, this.matchTimerSeconds, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
		this.matchCountdown = 3;
		this.matchCountdownText = this.add.text(480, 150, '3', { fontSize: '128px', fill: '#fff' }).setOrigin(0.5, 0.5);
		this.goalLock = false;
		this.endMatchLock = false;
		this.readyPlayers = 0;
		this.gameMode = 5; // 0 = goal mode, 1 = start mode, 2 = end mod, 5 = limbo mode

		
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
		this.anims.create(
			{
				key: 'audiencealive',
				frames: this.anims.generateFrameNumbers('audiencekey', { start: 0, end: 1 }),
				frameRate: 8,
				repeat: -1
			});
		this.anims.create(
			{
				key: 'minifluffalive',
				frames: this.anims.generateFrameNumbers('minifluffkey', { start: 0, end: 1 }),
				frameRate: 8,
				repeat: -1
			});
		this.anims.create(
			{
				key: 'minifluffhit',
				frames: this.anims.generateFrameNumbers('minifluffkey', { start: 2, end: 2 }),
				frameRate: 8,
				repeat: 0
			});
		this.anims.create(
			{
				key: 'minifluffdead',
				frames: this.anims.generateFrameNumbers('minifluffkey', { start: 3, end: 3 }),
				frameRate: 8,
				repeat: 0
			});

		let keys1 = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.UP,
			down: Phaser.Input.Keyboard.KeyCodes.DOWN,
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			kick: Phaser.Input.Keyboard.KeyCodes.SPACE // Add a key for kicking, e.g., space bar
		});

		let keys2 = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			kick: Phaser.Input.Keyboard.KeyCodes.SHIFT
		});
		let animIds1 = {
			still: 'still',
			alive: 'alive'
		};
		let animIds2 = {
			still: 'still2',
			alive: 'alive2'
		};

		// create players 1
		this.pl1a = new Player(this, 550, 590, 'player1key', 660, 180, this.tellGameImReady.bind(this), "adam", keys1, animIds1);
		this.pl1b = new Player(this, 550, 580, 'player1key', 570, 260, this.tellGameImReady.bind(this), "bertil", keys1, animIds1);
		this.pl1c = new Player(this, 550, 570, 'player1key', 720, 340, this.tellGameImReady.bind(this), "carl", keys1, animIds1);
		
		// create Player 2
		this.pl2a = new Player(this, 300, 590, 'player2key', 290, 180, this.tellGameImReady.bind(this), "diana", keys2, animIds2);
		this.pl2b = new Player(this, 300, 580, 'player2key', 380, 260, this.tellGameImReady.bind(this), "ester", keys2, animIds2);
		this.pl2c = new Player(this, 300, 570, 'player2key', 230, 340, this.tellGameImReady.bind(this), "fanny", keys2, animIds2);

		// Create Ball
        this.ball1 = new Ball(this, 482, 250, 'ballkey');

		// create supporters
		const audienceArray = [];
		let sx = 104;
		for(let i = 0; i < 8; i++){
			const audience = new Audience(this, sx*i+100, 40, 'audiencekey');
			audienceArray.push(audience);
			this.physics.add.collider(this.ball1, audience, (ball, audience) => {
				audience.handleCollision(ball);
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

		// Create MiniFluff
		this.minifluff = new MiniFluff(this, 0, 85, 'minifluffkey');

		this.physics.add.collider(this.ball1, this.minifluff, (ball, minifluff) => {
			minifluff.handleCollision(ball);
			ball.applyPlayerVelocity(minifluff, -1.0);
		});
		// this.physics.add.collider(this.pl1a, this.wolf, (player, wolf) => {
		// 	player.killPlayer();
		// });
		// this.physics.add.collider(this.pl2a, this.wolf, (player, wolf) => {
		// 	player.killPlayer();
		// });
		

		// Create the goal area
		this.goalLeft = this.add.rectangle(0, 210, 50, 100, 0x0000ff, 0.01).setOrigin(0, 0);
		this.goalRight = this.add.rectangle(900, 210, 50, 100, 0x0000ff, 0.01).setOrigin(0, 0);

		// Make the goal area reacting to the ball
		this.physics.add.existing(this.goalLeft, true);
		this.physics.add.existing(this.goalRight, true);

		// create a zone for the goal area
		this.physics.add.overlap(this.ball1, this.goalLeft, (ball, goal) => {
			this.setPlayerScores(2);
			this.handleBallAfterGoal();
		});
		this.physics.add.overlap(this.ball1, this.goalRight, (ball, goal) => {	
			this.setPlayerScores(1);
			this.handleBallAfterGoal();
		});
		


		// Enable physics for the goal area
		this.physics.add.existing(this.goalLeft, true);
		this.physics.add.existing(this.goalRight, true);
		this.goalLeft.body.immovable = true;

        // Enable collision between the players and the ball
		// the ball gets the x and y velocity of the player when they collide
        this.physics.add.collider(this.pl1a, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		this.physics.add.collider(this.pl2a, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		this.physics.add.collider(this.pl1b, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		this.physics.add.collider(this.pl2b, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		this.physics.add.collider(this.pl1c, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		this.physics.add.collider(this.pl2c, this.ball1, (player, ball) => {
			ball.applyPlayerVelocity(player, player.kickVelocity);
		});
		
		this.add.image(25,238, 'goalcageleftkey');
		this.add.image(930,238, 'goalcageleftkey').setFlipX(true);

		}


	// GAME LOOP

	update(time, delta) 
	{

        // countdown timer
		if(this.gameMode == 0) // match mode
		{
			this.matchTimerSeconds -= delta / 1000;
			this.matchTimeText.setText(Math.floor(this.matchTimerSeconds));
			if (this.matchTimerSeconds <= 0) {
				this.matchTimerSeconds = 0;
				this.endMatch();
				
			}
		}
		else if(this.gameMode == 1) // countdown to start
		{
			this.matchCountdown -= delta / 1000;
			this.matchCountdownText.setText(Math.floor(this.matchCountdown));
			if (this.matchCountdown <= 0)
			{
				this.gameMode = 0;
				this.matchCountdown = 3;	
				this.matchCountdownText.setText("");
				this.ball1.resetBall();
				this.goalLock = false;
				this.pl1a.enableUserControl();
				this.pl1b.enableUserControl();
				this.pl1c.enableUserControl();
				this.pl2a.enableUserControl();
				this.pl2b.enableUserControl();
				this.pl2c.enableUserControl();
			}
		}
		else if(this.gameMode == 4) // end mode
		{
			this.matchCountdown -= delta / 1000;
			if(this.matchCountdown < 1)
			{
				// prepare and send game to next screenS
				const endArray = [];
				endArray.push(this.player1score);
				endArray.push(this.player2score);
				endArray.push(this.player1name);
				endArray.push(this.player2name);
				console.log(endArray);
				this.scene.start('EndScene', endArray);
			}

		}


    }

	// GAME LOOP stops here

	endMatch()
	{
		if(this.endMatchLock == false)
		{
			// let players stand up
			this.pl1a.standup(530,200);
			this.pl1b.standup(560,200);
			this.pl1c.standup(590,200);
			this.pl2a.standup(370,200);
			this.pl2b.standup(400,200);
			this.pl2c.standup(430,200);
			this.goalLock = true;
			this.endMatchLock = true;
			this.gameMode = 4;
			this.matchCountdown = 4;
		}
		
	}

	setPlayerScores(team)
	{
		if(this.goalLock == false)
		{
			if(team==1)
			{
				this.player1score +=1;
			}else{
				this.player2score +=1;
			}
			this.playerText1.setText(this.player1name + " " + this.player1score);
			this.playerText2.setText(this.player2name + " " + this.player2score);
			this.pl1a.handleGoal();
			this.pl2a.handleGoal();
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
		this.time.addEvent({
			delay: 2200,
			callback: () => {
				this.ball1.resetBall();
				this.goalLock = false;

			},
			callbackScope: this
		});
	}
	
	tellGameImReady(mode)
    {
        this.readyPlayers += 1;
		if(this.readyPlayers == 6)
		{
			if(mode==1) // goal mode
			{
				this.ball1.resetBall();
				this.goalLock = false;
				this.readyPlayers = 0;
			}
			else if(mode==4) // start mode
			{
				// countdown to start
				this.gameMode = 1;
				this.readyPlayers = 0;
			}

		}
    }
}
export default GameScene;