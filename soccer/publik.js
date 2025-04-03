class Publik extends Phaser.Physics.Arcade.Sprite
{

    constructor(scene, x, y)
    {
        super(scene, x, y, 'publikkey'); // 'publikkey' is the key for the publik image
        scene.add.existing(this); // Add the publik to the scene
        scene.physics.add.existing(this, true); // Enable physics for the publik
        
        // Randomize the starting frame
        const randomFrame = Phaser.Math.Between(0, 5); // Assuming 'publikalive' animation has frames 0 to 5
        this.setFrame(randomFrame);

        // Play the publik animation
        this.anims.play('publikalive');
    }
    handleCollision(ball) 
    {
        // // Example reaction: Make the publik bounce and change its position slightly
        // this.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200)); // Random bounce
        // this.setTint(0xff0000); // Change color to red temporarily

        // // Reset the tint after 200ms
        // this.scene.time.delayedCall(200, () => {
        //     this.clearTint();
        // }
        this.anims.play('publikdead');
    
    }

    resetPublik() {
        // Reset the publik position
        this.setPosition(240, 320);
        // Reset the publik velocity
        this.setVelocity(0, 0);
    }
}
export default Publik;