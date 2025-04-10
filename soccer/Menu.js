class Menu extends Phaser.Scene
{
    constructor()
	{
        super('Menu');
    }
    
    preload()
    {
        this.load.image('endbackground', 'graphics/endscene.png');
    }
    create() {
        // Add a background image
        this.add.image(480, 270, 'endbackground');

        // Create an HTML input element for the textbox, player 1
        const inputPlayer1 = document.createElement('input');
        inputPlayer1.type = 'text';
        inputPlayer1.placeholder = 'player 1 name';
        inputPlayer1.style.position = 'absolute';
        inputPlayer1.style.top = '100px'; // Adjust position
        inputPlayer1.style.left = '400px'; // Adjust position
        inputPlayer1.style.width = '200px';
        inputPlayer1.style.fontSize = '20px';

        // Create an HTML input element for the textbox, player 2
        
        const inputPlayer2 = document.createElement('input');

        inputPlayer2.type = 'text';
        inputPlayer2.placeholder = 'player 2 name';
        inputPlayer2.style.position = 'absolute';
        inputPlayer2.style.top = '200px'; // Adjust position
        inputPlayer2.style.left = '400px'; // Adjust position
        inputPlayer2.style.width = '200px';
        inputPlayer2.style.fontSize = '20px';



        // Append the input element to the document body
        document.body.appendChild(inputPlayer1);
        document.body.appendChild(inputPlayer2);

        // Add a button to confirm the input
        const button = document.createElement('button');
        button.innerText = 'Play!';
        button.style.position = 'absolute';
        button.style.top = '300px'; // Adjust position
        button.style.left = '450px'; // Adjust position
        button.style.fontSize = '20px';

        document.body.appendChild(button);

        // Store the input value in a variable when the button is clicked
        button.addEventListener('click', () => {
            const playerName1 = inputPlayer1.value; // Get the value from the textbox
            const playerName2 = inputPlayer2.value;
            
            inputPlayer1.remove(); // Remove the textbox
            inputPlayer2.remove(); // Remove the textbox
            button.remove(); // Remove the button
            // prepare and send game to next screenS
			const nameArray = [];
			nameArray.push(playerName1);
			nameArray.push(playerName2);
			this.scene.start('GameScene', nameArray);
        });
    }
}
export default Menu;