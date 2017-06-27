'use strict'

var Physics = (function(){

    var that = {};

    var Engine = null,
        Render = null,
        World = null,
        Bodies = null,
        Events = null,
        MouseConstraint = null,
        Mouse = null,
        engine = null,
        mouseConstraint = null;

//iphone 7 pixel resolution = w: 375, h: 667;

    //first thing that should be called in the gameloop for physics
    that.initialize = function(){

        Engine = Matter.Engine;
        Render = Matter.Render;
        World = Matter.World;
        Bodies = Matter.Bodies;
        MouseConstraint = Matter.MouseConstraint;
        Mouse = Matter.Mouse;
        Events = Matter.Events;
        
        //the basic engine setup with the rendering
        engine = Engine.create({
            render: {
                element: document.body,
                canvas: graphics.returnCanvas(),
                engine: engine,
                options: {
                    width: graphics.returnCanvas().width,
                    height: graphics.returnCanvas().height,
                    wireframes: true,
                    wireframeBackground: 'transparent',
                    showVelocity: true,
                    showPositions: true,
                    showBroadphase: true,
                }
            }
        });


        //adds a mouse drag constraint
        mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
            element: graphics.returnCanvas(),
            constraint: {
                render: {
                    visible: false
                },
                stiffness:0.8
            }
        });

        //sets the world gravity in the y direction to zero.
        //useful for topdown game
        engine.world.gravity.y = 0;

        Engine.run(engine);

        Render.run(engine.render);

        //add the mouse constraint to the world
        World.add(engine.world, mouseConstraint);

    };

    //basic function to add bodies to the world
    that.addToWorld = function(body){
        World.add(engine.world, body);
    };

    //basic function to allow the creation of rectangle bodies
    that.createRectangleBody = function(x, y, w, h){
        var box = Bodies.rectangle(x, y, w, h);
        return box;
    };

    //return the position of the body
    that.returnBodyPosition = function(body){
        return body.position;
    };

    //create an event that allows the user to add a body at mousePos
    that.addMouseDownEvent = function(character){
        Events.on(mouseConstraint, 'mousedown', function(event){
            var mousePosition = event.mouse.position;
            console.log('x:' + (mousePosition.x - (graphics.returnCanvas().width / 2)) + ' ' + 'y: ' + (mousePosition.y - (graphics.returnCanvas().height / 2)));
            character.fireGun(mousePosition);

            console.log(character.returnBody().collisionFilter.category);
        });
    };

    that.addMouseUpEvent = function(character){
        Events.on(mouseConstraint, 'mouseup', function(event){
            var mousePosition = event.mouse.position;

            // Matter.Body.setPosition(body, {x: mousePosition.x, y: mousePosition.y});
            // Matter.Body.setVelocity(body, {x: 10, y: 5});

        });
    };

    //set the label of a body
    that.setLabel = function(body, label){
        body.label = label;
    };

    //set the friction through air for a body
    that.setFrictionAir = function(body, value){
        body.frictionAir = value;
    };

    //set speed of a body
    that.setSpeed = function(body, value){
        body.speed = value;
    };

    that.returnSpeed = function(body){
        return body.speed;
    };




    return that;

}());