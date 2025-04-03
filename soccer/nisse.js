class Nisse extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'nissekey'); // 'publikkey' is the key for the publik image
        scene.add.existing(this); // Add the publik to the scene
        scene.physics.add.existing(this, true); // Enable physics for the publik
        
        // Play the publik animation
        this.anims.play('nissealive');
    }
    handleCollision(ball) 
    {
        this.anims.play('nissedead');
    }

}

export default Nisse;