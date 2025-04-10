class EndScene extends Phaser.Scene
{
    constructor()
	{
		super('EndScene');
	}

    preload()
    {
        this.load.image('dlbackground', 'graphics/latestnews.png');
    }

    create(scores)
    {
        var team = "";
        var looser = "";
        var score = 0;
        if (scores[0]==scores[1])
        {

        }
        if(scores[0]>scores[1]){
            team = scores[2];
            looser = scores[3];
            score = scores[0];
        }else{
            team = scores[3];
            looser = scores[2];
            score = scores[1];
        }
        this.add.image(0,0, 'dlbackground').setOrigin(0, 0);
        this.add.text(438, 360, team.toUpperCase() + " vann med " + score + " poäng!", { fontSize: '20px', fill: '#000' }).setOrigin(0.5, 0.5);
        this.add.text(398, 390, looser.toUpperCase() + " i krismöte.", { fontSize: '20px', fill: '#000' }).setOrigin(0.5, 0.5);
        this.add.text(480, 436, "Tryck SPACE för att starta om", { fontSize: '20px', fill: '#000' }).setOrigin(0.5, 0.5);
        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.start('StartScene');
        }, this);
    }
}
export default EndScene;