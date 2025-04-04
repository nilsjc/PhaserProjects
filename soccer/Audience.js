class Audience extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'audiencekey'); // 'audiencekey' is the key for the audience image
        scene.add.existing(this); // Add the audience to the scene
        scene.physics.add.existing(this, true); // Enable physics for the audience
        this.setFrame(0); // Set the initial frame for the audience
        // Play the publik animation
        this.anims.play('audiencealive');
    }

    handleCollision(ball) 
    {
        // // Example reaction: Make the audience bounce and change its position slightly
        // this.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200)); // Random bounce
        // this.setTint(0xff0000); // Change color to red temporarily

        // // Reset the tint after 200ms
        // this.scene.time.delayedCall(200, () => {
        //     this.clearTint();
        // });
    }

    resetAudience() {
        // Reset the audience position
        this.setPosition(240, 320);
        // Reset the audience velocity
        this.setVelocity(0, 0);
    }

}
export default Audience;