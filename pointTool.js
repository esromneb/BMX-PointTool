

setupEasel = function() {
    // get a reference to the canvas we'll be working with:
    canvas = document.getElementById("testCanvas");


    // create a stage object to work with the canvas. This is the top level node in the display list:
    stage = new createjs.Stage(canvas);
    window.stage = stage;



    if( true )
    {
        stage.onMouseMove = function(evt) {
            //
            $('#mouseCoords').html('x: ' + evt.stageX + ' y: ' + evt.stageY);


        };
    }
//
//    if( debugHitBox )
//    {
//        stage.onMouseMove = function(evt) {
//            var hit = false;
//
//            hit = myShip.hitPoint(evt.stageX, evt.stageY);
//
//            $('#debugOut').html('x: ' + evt.stageX + ' y: ' + evt.stageY + ' hit: ' + hit);
//        };
//    }


//
//
//    // makeLine();
//
//    // makeCircle();
//    var waitingForGameCollection = setInterval(function(){
//        if((Session.get('gameID') !== null) && Games.findOne({_id: Session.get('gameID')}) && Games.findOne({_id: Session.get('gameID')}).t0){
//            clearInterval(waitingForGameCollection);
//            console.log("Game terrain ready!");
//            restartGame();
//            // call update on the stage to make it render the current display list to the canvas:
//            stage.update();
//        }
//    }, 500);
//
//
//    //setTimeout(restartGame, 500);
//
//    //FIXME: david said use Meteor.autorun instead, https://github.com/esromneb/bit-tank/issues/2
//    setTimeout(measureServerTime(), 250);
//

};