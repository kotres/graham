var canvasHeight = 500, CanvasWidth = 500,vec0;

class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


function boxMuller() {
    var u = Math.random(), v = Math.random();
    var x = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return x ;
}

function createPoints(numberOfPoints) {
    var points = [];
    var i = 0;
    for (i = 0; i < numberOfPoints; i++) {
        var x = boxMuller()
        var y = boxMuller();
        points.push(new vec2(x, y));
    }
    return points;
}

function drawPoints(points) {
    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");
    var i = 0;
    for (i = 0; i < points.length; i++) {
        var x = CanvasWidth * (points[i].x) / 10 + CanvasWidth / 2;
        var y = canvasHeight * (points[i].y) / 10 + canvasHeight / 2;
        ctx.fillRect(x, y, 1, 1);
    }
}

function myCos(a, b) {
    return (b.x - a.x) / Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

function cosSort(a, b) {
    var cosa = myCos(vec0, a);
    var cosb = myCos(vec0, b);
    return cosa - cosb;
}

function crossProduct(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function determineConvexHull(points) {
    var untreatedPoints = points;
    untreatedPoints.sort(function (a, b) { return b.y - a.y });
    var hullPoints = [];
    hullPoints.push(untreatedPoints[untreatedPoints.length-1]);
    vec0 = untreatedPoints[untreatedPoints.length - 1];
    untreatedPoints.pop();
    untreatedPoints.sort(cosSort);
    hullPoints.push(untreatedPoints[untreatedPoints.length - 1]);
    untreatedPoints.pop();
    while (untreatedPoints.length > 0) {
        while (crossProduct(hullPoints[hullPoints.length - 2], hullPoints[hullPoints.length - 1], untreatedPoints[untreatedPoints.length - 1]) < 0) {
            hullPoints.pop();
        }
        hullPoints.push(untreatedPoints[untreatedPoints.length - 1]);
        untreatedPoints.pop();
    }
    return hullPoints;
}

function drawHull(hull) {
    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");
    var x0 = CanvasWidth * (hull[0].x) / 10 + CanvasWidth / 2;
    var y0 = canvasHeight * (hull[0].y) / 10 + canvasHeight / 2;
    ctx.moveTo(x0,y0);
    var i = 1;
    for (i = 1; i < hull.length; i++) {
        var x = CanvasWidth * (hull[i].x) / 10 + CanvasWidth / 2;
        var y = canvasHeight * (hull[i].y) / 10 + canvasHeight / 2;
        ctx.lineTo(x,y);
    }
    ctx.lineTo(x0, y0);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function main() {
    var points = createPoints(1e4);
    drawPoints(points);
    var hull = determineConvexHull(points);
    drawHull(hull);
}