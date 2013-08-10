// variables or settings
connectPoints = true;
imageUrl = null;

//Transform to/from center matrices
centerToTopLeft = [1,0,0,
					0,1,0,
					960/2,400/2,1];

topLeftToCenter = [1,0,0,
					0,1,0,
					-960/2,-400/2,1];

// what coord system is this in?
pointArray = [];




// easeljs handles
imageShape = null;
pointObjectArray = [];


setupEasel = function() {
    // get a reference to the canvas we'll be working with:
    canvas = document.getElementById("testCanvas");


    // create a stage object to work with the canvas. This is the top level node in the display list:
    stage = new createjs.Stage(canvas);
    window.stage = stage;
	addCenterPoint();



    stage.onMouseMove = function(evt) {
        //


		var vec = [evt.stageX, evt.stageY];
		var vecOut = [];

		vec2.transformMat3(vecOut, vec,  topLeftToCenter);

		$('#mouseCoords').html('x: ' + vecOut[0] + ' y: ' + vecOut[1]);

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

        // add point to stage
        addGraphicsPoint(x,y);

        // add to tracking array
        pointArray.push([x,y]);

        // render canvas
        stage.update();


        // update dom point list
        updatePointsListDom();

};


// redraws the scene
function reRenderPoints()
{
//    console.log('rerendering');
    stage.clear();
    stage.removeAllChildren();

    // add the image first (so it's backgrounded) if present
    renderImage();

	// render center
	addCenterPoint();

    pointObjectArray = [];

    for( var i in pointArray )
    {
        var p = pointArray[i];

        addGraphicsPoint(p[0], p[1]);
    }

//    lineSegmentApprox(pointArray);

    stage.update();
}


// draws a blue line that is not saved and will be cleared with the stage
debugLine = function(x1,y1,x2,y2)
{
    var l = new createjs.Shape();
    l.graphics.beginStroke('#00f');
    l.graphics.moveTo(x1,y1);
    l.graphics.lineTo(x2,y2);

    stage.addChild(l);
}

function addGraphicsPoint(x,y)
{
    // create graphics object
    var p = pointObjectArray[getPoint()];

    // position it
    p.x = x;
    p.y = y;

//    console.log('length: ' + pointObjectArray.length);


    // optionally draw line to connect
    if( connectPoints && pointObjectArray.length > 1 )
    {
        // pp is previous point
        var pp = pointObjectArray[pointObjectArray.length-2];

        // draw line from previous point to x,y but we need to subtract the current location of pp
        pp.graphics.lineTo((x-pp.x),(y-pp.y));

    }
}

function addCenterPoint(){
	var centerPoint = new createjs.Shape();
	stylePoint(centerPoint, {'color':'#00F', 'size':2});
	stage.addChild(centerPoint);
	centerPoint.x = 960/2;
	centerPoint.y = 400/2;
	stage.update();

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
    // use val NOT html
	var pointArrayCopy = JSON.parse(JSON.stringify(pointArray));
	transformPointsMat3(pointArrayCopy, topLeftToCenter);
	$('#pointList').val(JSON.stringify(pointArrayCopy));

}

parsePointsListFromDom = function()
{
    var string = $('#pointList').val();

    try{
        pointArray = JSON.parse(string);
		transformPointsMat3(pointArray, centerToTopLeft);
        reRenderPoints();
    }catch(e)
    {
        console.log('something is wrong with your point array.  try jsonlint.com');
        return;
    }
}

deleteLastPoint = function ()
{
//    console.log('delete');
    var p = pointArray.pop();

    console.log('deleted point: ' + p[0] + ', ' + p[1]);
    reRenderPoints();

    // update dom point list
    updatePointsListDom();

}

loadImageFromUrl = function()
{

    imageUrl = $('#imageUrl').val();

    imageShape = new createjs.Bitmap(imageUrl);
//    bmp.mask = mask;

    renderImage();

    // Move them over so we can see them
    updateImage();

    stage.update();

    // timing bug: only wait 1 second for the image to load
    // clicking to add a new point will also draw the canvas (and show the image) if this fails
    setTimeout(function(){stage.update()}, 1000);
}

var renderImage = function()
{
    if( imageShape )
        stage.addChild(imageShape);
}

updateImage = function()
{
    var props = $('#imageProperties').val();
    var o;
    try{
        o = JSON.parse(props);
    }catch(e)
    {
        console.log('something is wrong with your image properties.  try jsonlint.com');
        return;
    }
//    console.log(o);

    imageShape.x = o.x;
    imageShape.y = o.y;
    imageShape.scaleX = imageShape.scaleY = o.scale;

    reRenderPoints();
}

transformPointsClick = function()
{
    var string = $('#transformMatrix').val();

    var transformMatrix;
    try{
        transformMatrix = JSON.parse(string);
        transformPoints(pointArray, transformMatrix);
        reRenderPoints();
        updatePointsListDom();

    }catch(e)
    {
        console.log('something is wrong with your transform array.  try jsonlint.com');
        return;
    }


}

// transforms each point in coordSet using the provided 2 dimensional matrix
// transform occurs in place; coordSet is overwritten with new points
transformPoints = function(coordSet, matrix)
{
    if( matrix.length == 4 )
        transformPointsMat2(coordSet, matrix);
    else if( matrix.length == 9 )
        transformPointsMat3(coordSet, matrix);
}

transformPointsMat2 = function(coordSet, matrix)
{
    for(var i = 0; i < coordSet.length; i++)
    {
        vec2.transformMat2(coordSet[i], coordSet[i], matrix);
    }
}

transformPointsMat3 = function(coordSet, matrix)
{
    for(var i = 0; i < coordSet.length; i++)
    {
        vec2.transformMat3(coordSet[i], coordSet[i], matrix);
    }
}

