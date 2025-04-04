class EndScene extends Phaser.Scene
{
    constructor()
	{
		super('EndScene');
	}

    preload()
    {
        this.load.image('endbackground', 'graphics/endscene.png');
    }

    create()
    {
        this.add.image(0,0, 'endbackground').setOrigin(0, 0);
        this.add.text(400, 100, 'Match Over!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
    }
}
export default EndScene;