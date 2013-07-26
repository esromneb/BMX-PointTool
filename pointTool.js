connectPoints = true;
pointArray = [];
pointObjectArray = [];



setupEasel = function() {
    // get a reference to the canvas we'll be working with:
    canvas = document.getElementById("testCanvas");


    // create a stage object to work with the canvas. This is the top level node in the display list:
    stage = new createjs.Stage(canvas);
    window.stage = stage;



    stage.onMouseMove = function(evt) {
        //
        $('#mouseCoords').html('x: ' + evt.stageX + ' y: ' + evt.stageY);


    };



    // why is this jquery? onClick wasn't working for stage?
    $("#testCanvas").click(handleStageClick);


    $('#mouseCoords').html('move your mouse...');
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


};


var handleStageClick = function(e)
{


        var x = e.pageX-$("#testCanvas").offset().left;
        var y = e.pageY-$("#testCanvas").offset().top;

        console.log('x: ' + x + ' y: ' + y);

        addPoint(x,y);

        stage.update();


};

function addPoint(x,y)
{
    // create graphics object
    var p = pointObjectArray[getPoint()];

    // position it
    p.x = x;
    p.y = y;

    // add to tracking array
    pointArray.push([x,y]);
}

function getPoint() {

//    var i = 0;
    var len = pointObjectArray.length;

    pointObjectArray[len] = new createjs.Shape();

    stylePoint(pointObjectArray[len], null);

    stage.addChild(pointObjectArray[len]);

    // post increment after return
    return len++;
}

function stylePoint(p, options)
{
    var g = p.graphics;
    options = options || {'color':'#f00', 'size':2};

    g.beginStroke(options.color);

    g.drawCircle(0, 0, options.size);
}