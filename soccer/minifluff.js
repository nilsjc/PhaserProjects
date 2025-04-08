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
        this.speedX = 50;
        this.speedY = 0;
        this.hit = 0;
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
        else{
            this.anims.play('minifluffalive', true);
            this.setVelocity(this.speedX, this.speedY);
        }
    }
    handleCollision(ball) 
    {
        this.hit = 5;
    }

}
export default Minifluff;