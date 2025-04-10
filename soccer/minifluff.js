class Minifluff extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'minifluffkey'); // 'minifluffkey' is the key for the minifluff image
        scene.add.existing(this); // Add the minifluff to the scene
        scene.physics.add.existing(this); // Enable physics for the minifluff
        this.setFrame(0); // Set the initial frame for the minifluff
        // Play the minifluff animation
        this.anims.play('minifluffalive', true);
        this.speedX = 120;
        this.speedY = 0;
        this.hit = 0;
        this.walkLeft = true;
    }
    preUpdate(time, delta) 
    {
        super.preUpdate(time, delta);
        
        // Update the minifluffs position
        
        if(this.hit > 0)
        {
            this.setVelocity((-this.speedX * 2), 0); // Stop the minifluff's movement
            this.anims.play('minifluffhit');
            this.hit -= delta / 100; // Decrease hit points
        }
        else if(this.hit == 0){
            if(this.walkLeft == true)
            {
                this.anims.play('minifluffalive', true);
                this.setVelocity(this.speedX, this.speedY);
            }else{
                this.anims.play('minifluffalive', true);
                this.setVelocity(-this.speedX, this.speedY);
            }
            if(this.x < 0) // Check if the minifluff is out of bounds
            {
                this.walkLeft = true; // Change direction to right
                this.y = Phaser.Math.Between(45,150);
                this.setFlipX(false); // Flip the sprite to face right
            }
            if(this.x > 960)
            {
                this.walkLeft = false; // Change direction to left
                this.y = Phaser.Math.Between(375, 480);
                this.setFlipX(true); // Flip the sprite to face left
            }
        }
    }
    handleCollision(ballspeed) 
    {
        let totalSpeed = Math.abs(ballspeed.body.velocity.x) + Math.abs(ballspeed.body.velocity.y); 
        if(totalSpeed > 200)
        {
            this.hit = -1;
            this.anims.play('minifluffdead', true); // Play the hit animation
            this.setVelocity(0, 0); // Stop the minifluff's movement
            this.body.setImmovable(true);
        }
    }

}
export default Minifluff;