class Player2 extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, startX, startY, imReady, name) 
    {
        super(scene, x, y, 'player2key');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.play('still2');
        this.setFlipX(true);
        
        // Define custom keys for movement (WASD)
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            kick: Phaser.Input.Keyboard.KeyCodes.CTRL
        });

        this.speed = 200;
        this.moving = 0;
        this.standByX = startX; // Store the initial x position
        this.standByY = startY; // Store the initial y position
        this.userEnabled = true;
        this.name = name; // Player name
        this.kickVelocity = 1.5;
        this.kickTime = 0;
        this.iAmReady = imReady; // Flag to indicate if the player is ready

    }
    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        let velocityX = 0;
        let velocityY = 0;
        this.moving = 0;

        if(this.userEnabled == true)
        {
            if (this.keys.left.isDown)
            {
                this.moving = 1;
                velocityX = -this.speed;
                this.setFlipX(true);
            } 
            else if (this.keys.right.isDown)
            {
                this.moving = 1;
                velocityX = this.speed;
                this.setFlipX(false);
            }

            if (this.keys.up.isDown) 
            {
                this.moving = 1;
                velocityY = -this.speed;
            } 
            else if (this.keys.down.isDown) 
            {
                this.moving = 1;
                velocityY = this.speed;
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
                    this.resetPlayer(); // Reset the player position
                    this.userEnabled = true; // Enable user control again
                }
        }

        if(this.kickTime > 0.5)
            {
                // Decrease kick velocity
                this.kickVelocity -= delta / 320; // Decrease kick velocity over time
    
                // decrease kick time
                this.kickTime -= delta / 1000; // Decrease kick time based on delta time
            }else{
                this.kickVelocity = 1.5; // Reset kick velocity
                this.kickTime = 0; // Reset kick time
            }

        if(this.moving == 1)
        {
            this.anims.play('alive2', true);
        }
        else
        {
            this.anims.play('still2', true);
        }

        this.setVelocity(velocityX, velocityY);

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
        if(this.userEnabled == true)
        {
            this.userEnabled = false; // Set to goal mode
        }
    }
    enableUserControl()
    {
        this.userEnabled = true; // Enable user control
    }
    killPlayer()
    {
        
    }
}

export default Player2;