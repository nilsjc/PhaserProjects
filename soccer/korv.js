class Korv extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'korvkey'); // 'publikkey' is the key for the publik image
        scene.add.existing(this); // Add the publik to the scene
        scene.physics.add.existing(this, true); // Enable physics for the publik
        
        // Play the publik animation
        this.anims.play('korvalive');
    }
    handleCollision(ball) 
    {
        this.anims.play('korvdead');
    }

}

export default Korv;
