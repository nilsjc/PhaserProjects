class Wolf extends  Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'wolfkey'); // 'wolfkey' is the key for the wolf image
        scene.add.existing(this); // Add the wolf to the scene
        scene.physics.add.existing(this); // Enable physics for the wolf
        this.screenWidth = scene.game.config.width; // Get the screen width
        this.screenHeight = scene.game.config.height; // Get the screen height
        this.wolfRadian = (Math.PI * 2.0) / 3600.0;
        this.left = true; // Direction of the wolf
        this.speedX = 100; // Movement speed
        this.speedY = 0;
        this.speedConstant = 200; // Speed constant for the wolf
        this.running = false;

        // Play the wolf animation
        this.anims.play('wolfalive');
    }

    preUpdate(time, delta) 
    {
        super.preUpdate(time, delta);
        // Update wolf position or other properties if needed
        // let the wolf enter randomly and sine calculate movement
        // Calculate sine wave movement based on time
        //this.speedX = Math.sin(this.wolfRadian * time) * this.speedConstant;
        if(this.running == false)
        {
            this.speedY = Math.cos(this.wolfRadian * time) * this.speedConstant;
        }

        // Update the wolf's position
        this.setVelocity(this.speedX, this.speedY);

        // check if the wolf is out of bounds
        if (this.x > this.screenWidth + 400) {
            this.resetWolf(); // Reset the wolf position
        }
        if (this.x < -400) {
            this.resetWolf(); // Reset the wolf position
        }
        if (this.y > this.screenHeight + 100) {
            this.resetWolf(); // Reset the wolf position
        }
        if (this.y < -100) {
            this.resetWolf(); // Reset the wolf position
        }

    }
    handleCollision(ball) 
    {
        this.running = true; // Set the wolf to running state
        this.speedX = -this.speedX * 2.0; // Reverse the wolf's velocity
        this.speedY = 0;
        if(this.left == true)
        {
            this.setFlipX(true); // Flip the sprite to face left
            this.left = false; // Set the direction to right
        }else{
            this.setFlipX(false); // Flip the sprite to face right
            this.left = true; // Set the direction to left
        }
    }
    resetWolf() {
        this.running = false; // Reset the running state
        let y = Phaser.Math.Between(0, this.screenHeight);
        if(Phaser.Math.Between(0, 1) == 0)
        {
            this.speedX = Phaser.Math.Between(100, 200); // Randomize the speedX for the wolf
            // Reset the wolf position
            this.setPosition(Phaser.Math.Between(-100,-200), y);
            this.setFlipX(false);
            this.left = true; // Set the direction to left

        }else{
            this.speedX = Phaser.Math.Between(-200, -100); // Randomize the speedX for the wolf
            // Reset the wolf position
            this.setPosition(this.screenWidth + (Phaser.Math.Between(100,200)), y);
            this.setFlipX(true);
            this.left = false; // Set the direction to right
        }
        // Reset the wolf velocity
        this.setVelocity(0, 0);
    }
}
export default Wolf;