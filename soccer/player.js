class Player extends Phaser.Physics.Arcade.Sprite
{
    // 'standbyX' and 'standbyY' are the start position of the player when under AI control
    //
    // 'imReady' is a function that will be called when the player is ready to play
    //
    // 'name' is the name of the player
    //
    // 'keys' is keyboard control keys and should be like this:
    //
    // this.keys = scene.input.keyboard.addKeys({
    //     up: Phaser.Input.Keyboard.KeyCodes.W,
    //     down: Phaser.Input.Keyboard.KeyCodes.S,
    //     left: Phaser.Input.Keyboard.KeyCodes.A,
    //     right: Phaser.Input.Keyboard.KeyCodes.D,
    //     kick: Phaser.Input.Keyboard.KeyCodes.CTRL
    // });
    constructor(scene, x, y, playerKeyValue, standbyX, standbyY, imReady, name, keys, animIds)
    {
        super(scene, x, y, playerKeyValue);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.play(animIds.still);
        this.animIds = animIds; // Store animation IDs for later use
        this.keys = keys;
        this.speed = 200; // Movement speed
        this.moving = 0;
        this.standByX = standbyX; // Store the initial x position
        this.standByY = standbyY; // Store the initial y position
        this.playerMode = 0;
        this.animLock = 0; // 0 = user control, 1 = AI control
        this.kickVelocity = 1.5;
        this.kickTime = 0;
        this.iAmReady = imReady; // Flag to indicate if the player is ready
        this.name = name; // Player name
    }
    preUpdate(time, delta)
	{
        super.preUpdate(time, delta);

        // Movement logic (already implemented)
        let velocityX = 0;
        let velocityY = 0;
        this.moving = 0;

        if(this.playerMode == 0)
        {
            if (this.keys.left.isDown)
                {
                    this.moving = 1;
                    velocityX = -this.speed;
                    this.setFlipX(true); // Flip the sprite to face left
                    this.animLock = 0;
        
                } else if (this.keys.right.isDown)
                {
                    this.moving = 1;
                    velocityX = this.speed;
                    this.setFlipX(false); // Flip the sprite to face right
                    this.animLock = 0;
                }
        
                if (this.keys.up.isDown) 
                {
                    this.moving = 1;
                    velocityY = -this.speed;
                    this.animLock = 0;
                } else if (this.keys.down.isDown) 
                {
                    this.moving = 1;
                    velocityY = this.speed;
                    this.animLock = 0;
                }
                if (this.keys.kick.isDown && this.kickTime < 0.5)
                {
                    this.kickVelocity = 4.0;
                    this.moving = 1;
                    this.kickTime = 1; // Set kick time to 1 second
                }
        }else{
            // AI movement logic (example: move towards the center of the screen)
            if (this.x < this.standByX)
            {
                this.moving = 1;
                velocityX = this.speed;
                this.setFlipX(false); // Flip the sprite to face right
            }else{
                this.moving = 1;
                velocityX = -this.speed;
                this.setFlipX(true); // Flip the sprite to face left
            }
            if(this.y < this.standByY)
            {
                this.moving = 1;
                velocityY = this.speed;
            }else{
                this.moving = 1;
                velocityY = -this.speed;
            }

            // calculate hypotenuse
            let hypotenuse = Math.sqrt(Math.pow(this.x - this.standByX, 2) + Math.pow(this.y - this.standByY, 2));
            
            // check if the player is close to the starting point
            if(hypotenuse < 5)
            {
                if(this.playerMode == 1)
                {
                    // goal mode
                    this.iAmReady(this.name);
                    this.resetPlayer(); // Reset the player position
                    this.playerMode = 0; // Enable user control again
                    this.animLock = 0;
                }else
                {
                    // ending of game mode
                }
            }
        }

        if(this.kickTime > 0.5)
        {
            // Decrease kick velocity
            this.kickVelocity -= delta / 380; // Decrease kick velocity over time

            // decrease kick time
            this.kickTime -= delta / 1000; // Decrease kick time based on delta time
        }else{
            this.kickVelocity = 1.5; // Reset kick velocity
            this.kickTime = 0; // Reset kick time
        }


        

        if(this.moving == 1)
        {
            if(this.animLock == 0)
            {
                this.anims.play(this.animIds.alive, true);
                this.animLock = 1; // Lock the animation to prevent spamming
            }
        }
        else
        {
            if(this.animLock == 0)
            {
                this.anims.play(this.animIds.still, true);
                this.animLock = 1; // Lock the animation to prevent spamming
            }
        }

        this.setVelocity(velocityX, velocityY); // Use setVelocity for physics-based movement

    }
    resetPlayer() 
    {
        // Reset the player position to the starting point
        this.setPosition(this.standByX, this.standByY);
        
    }
    handleGoal()
    {
        if(this.playerMode == 0)
        {
            this.playerMode = 1; // Set to goal mode
        }
    }
    enableUserControl()
    {
        this.playerMode = 0; // Enable user control
    }
    killPlayer()
    {

    }
}
export default Player;