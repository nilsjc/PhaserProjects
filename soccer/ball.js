class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ballkey'); // 'ballkey' is the key for the ball image
        scene.add.existing(this); // Add the ball to the scene
        scene.physics.add.existing(this); // Enable physics for the ball

        // Set ball properties
        this.setCollideWorldBounds(true); // Prevent the ball from leaving the game world
        this.setBounce(0.9); // Make the ball bounce when it hits something
        this.setDrag(280); // Add some drag to slow the ball down over time
        this.startX = x; // Store the initial x position
        this.startY = y; // Store the initial y position
        // Define custom keys for movement (WASD)
        this.keys = scene.input.keyboard.addKeys({
            pl1hit: Phaser.Input.Keyboard.KeyCodes.space,
            pl2hit: Phaser.Input.Keyboard.KeyCodes.shift
        });
    }

    applyPlayerVelocity(player, velocityMultiplier) {
        // Apply the player's velocity to the ball with a multiplier
        this.setVelocity(
            player.body.velocity.x * velocityMultiplier,
            player.body.velocity.y * velocityMultiplier
        );
    }

    resetBall() {
        // Reset the ball position
        this.setPosition(this.startX, this.startY);
        // Reset the ball velocity
        this.setVelocity(0, 0);
    }
}

export default Ball;