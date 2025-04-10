class StartScene extends Phaser.Scene
{
	constructor()
	{
		super('StartScene');
		this.wrapRect;
		this.logo;
	}
	preload()
	{
		this.load.spritesheet("logo", "/graphics/lufscuplogo.png",{ frameWidth: 430, frameHeight: 88 });
		this.load.html('nameform', 'nameform.html');
		this.load.image('startpage', 'graphics/hero.png');
	}
	create()
	{
		this.add.image(0,0, 'startpage').setOrigin(0, 0);
		this.text = this.add.text(200,10, "Tryck SPACE för att starta",{ fontSize: '32px', fill: '#000' });
		this.cursor = this.input.keyboard.createCursorKeys();
		this.logo = this.physics.add.sprite(700, 200, 'logo');
		this.logo.setVelocity(-80, 0);

		// const element = this.add.dom(0, 0).createFromCache('nameform');

		// const text2 = this.add.text(300, 10, 'Spelare 1 namn:', { color: 'white', fontSize: '20px '});

        // element.addListener('click');

        // element.on('click', function (event)
        // {

        //     if (event.target.name === 'playButton')
        //     {
        //         const inputText = this.getChildByName('nameField');

        //         //  Have they entered anything?
        //         if (inputText.value !== '')
        //         {
        //             //  Turn off the click events
        //             this.removeListener('click');

        //             //  Hide the login element
        //             this.setVisible(false);

        //             //  Populate the text with whatever they typed in
        //             text2.setText(`Welcome ${inputText.value}`);
        //         }
        //         else
        //         {
        //             //  Flash the prompt
        //             this.scene.tweens.add({
        //                 targets: text,
        //                 alpha: 0.2,
        //                 duration: 250,
        //                 ease: 'Power3',
        //                 yoyo: true
        //             });
        //         }
        //     }

        // });
		
			//this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 480, 600);

			//this.add.rectangle(this.wrapRect.x, this.wrapRect.y, this.wrapRect.width, this.wrapRect.height, 0x0094bf).setOrigin(0, 0);
        
	}
	update()
	{
		
		//Phaser.Actions.WrapInRectangle(this.logo, this.wrapRect, 100);
		if (this.cursor.space.isDown)
		{
			this.scene.start('Menu');
		}
		if(this.logo.x<-210)
		{
			this.logo.x = 965;
		}
	}
}
export default StartScene;