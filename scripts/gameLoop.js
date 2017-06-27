'use strict'

var game = (function(){

    //spot for all the global variables
    var keyboard, canceled, time;

    //objects
    var character;

    //collison categories;
    var enemyCategory = 0x0002;
    var defaultCategory = 0x0003;
    var bulletCategory = 0x0004;

    var that = {};


//INITIALIZE:
    //main initializing function to be called on start
    that.initialize = function(){

        //sets canceled to false on initial
        canceled = false;
        time = performance.now();

        var characterImage = new Image();

        //initalized the other main js files
        graphics.initialize(); 
        Physics.initialize();
        


        //initialize the character
        character = Character({
            body: Physics.createRectangleBody(250, 250, 50, 50),
            position: {
                x: 250,
                y: 250
            },
            gun: Gun({
                clip: 6,
                clipMax: 6,
                fireRate: 5,
                damage: 2,
                emptyChamber: false
            }),
            image: characterImage,

        });


        //add the character to the world
        character.addCharacterBody();

        //initialize the gun the character has
        character.initializeGun();


        //creates a temporary body
        var temp = Physics.createRectangleBody(500, 500, 50, 50);
        temp.collisionFilter.category = enemyCategory;
        Physics.addToWorld(temp);
        //end temp
        

        //add mouse events
        Physics.addMouseDownEvent(character);
        Physics.addMouseUpEvent(character);
        

        //initialized the keyboard
        keyboard = input.Keyboard();
        setupControlScheme();

        //after initializing the game, call our gameloop
        gameLoop();
    };





//CONTROLS
    //main function to set up all keyboard and mouse commands
    function setupControlScheme(){
        window.addEventListener('keydown', keyboard.keyPress, false);
        window.addEventListener('keyup', keyboard.keyRelease, false);

        //call keyboard register commands to assign them to functions
        //keyboard.registerCommand(DOM_VK_UP, function);
        keyboard.registerCommand(KeyEvent.DOM_VK_W, character.moveUp);
        keyboard.registerCommand(KeyEvent.DOM_VK_S, character.moveDown);
        keyboard.registerCommand(KeyEvent.DOM_VK_D, character.moveRight);
        keyboard.registerCommand(KeyEvent.DOM_VK_A, character.moveLeft);

        //other:
        keyboard.registerCommand(KeyEvent.DOM_VK_R, character.reloadGun);
        keyboard.registerCommand(KeyEvent.DOM_VK_G, graphics.turnOff);
    }

    //handle the updating of the keyboard actions
    function handleInput(elapsedTime){
        keyboard.update(elapsedTime);
    }







//MAIN FUNCTIONS:

    function update(elapsedTime){
        character.update();
    }

    function render(elapsedTime){
        //switch the graphics off
        if(!graphics.returnGraphicSwitch()){
            graphics.drawImages(character);
        }
    }

    function gameLoop(){

        //calculate the elapsed time
        var newTime = performance.now();
        var elapsedTime = newTime - time;

        //handle the keyboard inputs over elapsed time
        handleInput(elapsedTime);



        //main two functions to handle update and rendering
        update(elapsedTime);
        render(elapsedTime);



        //time becomes the previous time
        time = newTime;

        //the main call to loop our gameloop over frames per second
        if(!canceled) requestAnimationFrame(gameLoop);
    }

    return that;

}());