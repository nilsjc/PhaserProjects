class Goal extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'goalkey'); // 'ballkey' is the key for the ball image
        scene.add.existing(this); // Add the ball to the scene
        scene.physics.add.existing(this, true); // Enable physics for the publik
        this.score = 0;
        this.lastScored = 0;
    }
    handleCollision(ball)
    {
        

    }
}

export default Goal;