'use strict'

var Gun = function(spec){

    var that = {};

    //bullets in the barrel
    var bullets = [];

    var test = [];

    var enemyCategory = 0x0002;
    var defaultCategory = 0x0003;
    var bulletCategory = 0x0004;


    //spec should have:
            // - clipMax
            // - clip
            // - firerate
            // - damage per bullet
            // - reload bool

    that.initialize = function(body){
        for(var i = 0; i < spec.clipMax; i++){
            bullets.push(Physics.createRectangleBody(body.position.x, body.position.y, 10, 10));
            bullets[i].collisionFilter.category = bulletCategory;
            bullets[i].collisionFilter.mask = bulletCategory | enemyCategory;
        }
    };
    
    //return clip amount
    that.returnClip = function(){
        return spec.clip;
    };

    //return the max amount allowed in the clip
    that.returnClipMax = function(){
        return spec.clipMax;
    };

    //return the current firerate of the gun
    that.returnFireRate = function(){
        return spec.fireRate;
    };

    //return the damage each bullet deals
    that.returnDamage = function(){
        return spec.damage;
    };

    //reload the gun with new bullets
    that.reload = function(body){

        //run this only when the character is reloading when they arent empty
        if(spec.clip != 0){
            for(var j = 0; j < bullets.length; j ++){
                bullets.pop();
            }
        }

        //reinitialize the clip and chamber
        spec.clip = spec.clipMax;
        spec.emptyChamber = false;

        //loop through and add new bullets to the bullets array
        for(var i = 0; i < spec.clipMax; i++){
            var bullet = Physics.createRectangleBody(body.position.x, body.position.y, 10, 10);
            bullet.collisionFilter.category = bulletCategory;
            bullet.collisionFilter.mask = bulletCategory | enemyCategory;
            bullets.push(bullet);
        }
    };

    //fire a bullet off of the bullets array
    that.fire = function(mousePosition, characterPosition){
        if(spec.clip === 0){                //check to see if out of bullets
            spec.emptyChamber = true;
        }
        if(spec.emptyChamber === false){    //check to see if there are bullets

            //create a placeholder for vector values
            var xVector = (mousePosition.x - characterPosition.x)/100000;
            var yVector = (mousePosition.y - characterPosition.y)/100000;

            //console.log('Vector X = ' + xVector + ' | Vector Y = ' + yVector);
            //console.log('MAGNITUDE = ' + Matter.Vector.magnitude({x: xVector, y: yVector}));

            //Bullet force vector equalizing
            if(Matter.Vector.magnitude({x: xVector, y: yVector}) < 0.001){
                xVector *= 9;
                yVector *= 9;
            }
            else if(Matter.Vector.magnitude({x: xVector, y: yVector}) < 0.0017){
                xVector *= 5.5;
                yVector *= 5.5;
            }
            else if(Matter.Vector.magnitude({x: xVector, y: yVector}) < 0.0024){
                xVector *= 3.5;
                yVector *= 3.5;
            }
            else{
                xVector *= 2;
                yVector *= 2;
            }


            //make the bullet visable in the world
            Physics.addToWorld(bullets[bullets.length - 1]);

            //getting the bullet to fire to the mouse:
            Matter.Body.setPosition(bullets[bullets.length - 1], {x: characterPosition.x, y: characterPosition.y});            
            Matter.Body.applyForce(bullets[bullets.length - 1], bullets[bullets.length - 1].position, {x: xVector, y: yVector});

           //remove bullet from array and clip 
            bullets.pop();
            spec.clip -= 1;

        }
    };

    //return the total left in the bullets array
    that.returnBullet = function(){
        return bullets[bullets.length-1];
    };


    return that;
}