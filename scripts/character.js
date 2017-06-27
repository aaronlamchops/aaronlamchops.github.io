'use strict'


var Character = function(spec){

    var that = {};

    var characterCategory = 0x0001;

    that.addCharacterBody = function(){
        spec.image.src = 'assets/x.png';
        Physics.setFrictionAir(spec.body, 0.095);
        spec.body.collisionFilter.category = characterCategory;
        Physics.addToWorld(spec.body);
    };

    that.returnBody = function(){
        return spec.body;
    };

    that.returnPosition = function(){
        return spec.position;
    };

    that.returnImage = function(){
        return spec.image;
    };

//GUN:
    that.initializeGun = function(){
        spec.gun.initialize(spec.body);
    };

    that.returnGun = function(){
        return spec.gun;
    };

    that.fireGun = function(mousePosition){
        spec.gun.fire(mousePosition, spec.body.position);
    };



//MOVEMENT:
    that.moveRight = function(elapsedTime){
        Matter.Body.applyForce(spec.body, spec.body.position, {x: 0.002 * spec.body.mass, y: 0});
    };
    that.moveLeft = function(){
        Matter.Body.applyForce(spec.body, spec.body.position, {x: -0.002 * spec.body.mass, y: 0});
    };
    that.moveUp = function(){
        Matter.Body.applyForce(spec.body, spec.body.position, {x: 0, y: -0.002 * spec.body.mass});
    };
    that.moveDown = function(){
        Matter.Body.applyForce(spec.body, spec.body.position, {x: 0, y: 0.002 * spec.body.mass});
    };

//CONTROLS
    that.reloadGun = function(){
        spec.gun.reload(spec.body);
    };




    that.update = function(){
        spec.position.x = spec.body.position.x;
        spec.position.y = spec.body.position.y;
    };  



    return that;
}