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

        // add point to stage and to array
        addPoint(x,y);

        // render canvas
        stage.update();

        // update dom point list
        updatePointsListDom();

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


    // optionally draw line to connect
    if( pointObjectArray.length > 1 )
    {
        // pp is previous point
        var pp = pointObjectArray[pointObjectArray.length-2];

        // draw line from previous point to x,y but we need to subtract the current location of pp
        pp.graphics.lineTo((x-pp.x),(y-pp.y));
    }
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
    options = options || {'color':'#f00', 'size':1};

    g.beginStroke(options.color);

    g.drawCircle(0, 0, options.size);
}

function updatePointsListDom()
{
    $('#pointList').html(JSON.stringify(pointArray));
}