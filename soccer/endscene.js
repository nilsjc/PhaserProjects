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

    create(scores)
    {
        var team = "";
        var score = 0;
        if (scores[0]==scores[1])
        {

        }
        if(scores[0]>scores[1]){
            team = 1;
            score = scores[0];
        }else{
            team = 2;
            score = scores[1];
        }
        this.add.image(0,0, 'endbackground').setOrigin(0, 0);
        this.add.text(400, 100, 'lag ' + team + " vann med " + score + " poäng", { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
    }
}
export default EndScene;