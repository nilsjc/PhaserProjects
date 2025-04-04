class Player1 extends Phaser.Physics.Arcade.Sprite
{
    constructor(config, playerKeyValue, startX, startY)
    {
        super(config.scene, config.x, config.y, playerKeyValue);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.anims.play('still');

        // Create cursor keys for movement
        this.cursors = config.scene.input.keyboard.createCursorKeys();

        // Add space bar key
        this.spaceKey = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.speed = 200; // Movement speed
        this.moving = 0;
        this.standByX = startX; // Store the initial x position
        this.standByY = startY; // Store the initial y position
        this.playerMode = 0;
        this.animLock = 0; // 0 = user control, 1 = AI control
        this.name = "pl1"; // Player name
        this.kickVelocity = 1.5;
        this.kickTime = 0;
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
            if (this.cursors.left.isDown)
                {
                    this.moving = 1;
                    velocityX = -this.speed;
                    this.setFlipX(true); // Flip the sprite to face left
                    this.animLock = 0;
        
                } else if (this.cursors.right.isDown)
                {
                    this.moving = 1;
                    velocityX = this.speed;
                    this.setFlipX(false); // Flip the sprite to face right
                    this.animLock = 0;
                }
        
                if (this.cursors.up.isDown) 
                {
                    this.moving = 1;
                    velocityY = -this.speed;
                    this.animLock = 0;
                } else if (this.cursors.down.isDown) 
                {
                    this.moving = 1;
                    velocityY = this.speed;
                    this.animLock = 0;
                }
                if (this.spaceKey.isDown && this.kickTime < 0.5)
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
                this.anims.play('alive', true);
                this.animLock = 1; // Lock the animation to prevent spamming
            }
        }
        else
        {
            if(this.animLock == 0)
            {
                this.anims.play('still', true);
                this.animLock = 1; // Lock the animation to prevent spamming
            }
        }

        this.setVelocity(velocityX, velocityY); // Use setVelocity for physics-based movement

        // Update position based on velocity and delta time
        //this.x += velocityX * (delta / 1000);
        //this.y += velocityY * (delta / 1000);
    }
    resetPlayer() 
    {
        // Reset the player position to the starting point
        this.setPosition(this.standByX, this.standByY);
        // Reset the player velocity
        //this.setVelocity(0, 0);
        
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
export default Player1;