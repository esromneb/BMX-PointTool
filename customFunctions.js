// This is a file for custom functions that I am personally working on.
// These are probably less relevant for others working with this tool







// accepts full point array with an entry for every x
// returns a sparse array with approximated line segments
lineSegmentApprox = function(pa)
{
    var approx = [];
    approx.push(pa[0]);

    // how much of a difference between approximation and original before we make a new line segment
    var diff = 1;
    var area;
    var lineArea;
    var probe1 = 0;
    var probe2;
    for( var i = 0; i < pa.length; i++ )
    {
        probe2 = i;
        area = calcArea(pa, probe1, probe2);
        lineArea = areaLine(pa[probe1][0], pa[probe1][1], pa[probe2][0], pa[probe2][1]);

        if( Math.abs(area-lineArea) > diff )
        {
            debugLine(pa[probe1][0], pa[probe1][1], pa[probe2][0], pa[probe2][1]);
            approx.push(pa[probe2]);
            probe1 = i;
        }
    }


    console.log(JSON.stringify(approx));
    console.log('done with ' + approx.length + ' points');

//    console.log('area: ' + area);
//    console.log('approx area: '+ lineArea);


//    debugLine(pa[0][0], pa[0][1], pa[50][0], pa[50][1]);
//    debugLine(pa[probe1][0], pa[probe1][1], pa[probe2][0], pa[probe2][1]);
    return approx;
}

function areaLine(x1,y1,x2,y2)
{
    return ((y2+y1)/2)*(x2-x1+1);
}

function calcArea(pa, x0, x1)
{
    var area = 0;
    for( var i = x0; i <= x1; i++ )
    {
        var p = pa[i];
//        var x = p[0];
        var y = p[1];

        area += y;

//        if( i == 10 )
//            break;
    }

    return area;
}



// Bresenham's line algorithm
// http://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
// apparently this only works great with ints, if using floats see comment in body
// returns point array
bresenhams = function(x0, y0, x1, y1){
    var dx = Math.abs(x1-x0);
    var dy = Math.abs(y1-y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx-dy;
    var ret = [];
    while(true){
        ret.push([x0,y0]);
//        console.log('x: ' + x0 + ' y:' + y0);  // render line

        // floats
        //if (Math.abs(x0-x1)<0.0001 && Math.abs(y0-y1)<0.0001) break;
        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
    }
    return ret;
}