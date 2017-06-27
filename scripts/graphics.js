'use strict'


var graphics = (function(){

    var that = {};

    var context = null;
    var canvas = null;
    var background = new Image();

    var state = false;


    that.initialize = function(){
        canvas = document.getElementById('canvas-main');
        context = canvas.getContext('2d');

        CanvasRenderingContext2D.prototype.clear = function(){
            this.save();
            this.setTransform(1,0,0,1,0,0);
            this.clearRect(0,0,canvas.width, canvas.height);
            this.restore();
        };

        //set the background image
        background.src = 'assets/otherSpaceBG.png';
    };

    that.returnCanvas = function(){
        return canvas;
    };

    that.returnContext = function(){
        return context;
    };

    //draw all the images off all the objects
    that.drawImages = function(character){
        context.setTransform(1,0,0,1,0,0);
        context.clearRect(0,0, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(character.returnImage(), character.returnPosition().x - 25, character.returnPosition().y - 25, 50, 50);
    };  



//CONTROL:

    //turn off the graphics
    that.turnOff = function(){
        if(state === false){
            state = true;
        }
    };
    
    //return the state of the graphcis switch
    that.returnGraphicSwitch = function(){
        return state;
    };  



    return that;
}());