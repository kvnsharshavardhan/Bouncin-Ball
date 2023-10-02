
var speed = 0;
var numberOfBalls = 1;
var stopAnimation = true;
var x = [((speed + 1) * 3)]
var y = [((speed + 1) * 3)]
var xSpeed = [];
var ySpeed = [];
var ballIds = ['ball'];
const ball = document.getElementById("ball");
var court = document.getElementById("court");

function setSpeed(s) {
    speed = s;
    var i = 0
    ballIds.forEach(element => {
        xSpeed[i] = (xSpeed[i] / Math.abs(xSpeed[i])) * ((speed + 1) * 3)
        ySpeed[i] = (ySpeed[i] / Math.abs(ySpeed[i])) * ((speed + 1) * 3)
        i++
    });
}

function resumeOrSuspend() {
    if (stopAnimation) {
        stopAnimation = false;
        var i = 0
        ballIds.forEach(element => {
            animate(element, i);
            i++
        });
    }
    else {
        stopAnimation = true;
    }
}

function setBallNum() {
    var balls = document.getElementById("ballNums");
    ballIds = []
    numberOfBalls = balls.value;
    stopAnimation = true;
    document.getElementById('court').innerHTML = ""
    for (let index = 0; index < balls.value; index++) {
        var rand = `ball-${Math.random()}`;
        var html = `<img id="${rand}" src="soccer-ball.gif" height="50px" style="margin: 0; padding: 0px; position: absolute;" />`;
        document.getElementById('court').insertAdjacentHTML('beforeend', html);
        ballIds.push(rand)
    }
    stopAnimation = false;
    initialize();
}

function initialize() {
    x = []
    y = []
    xSpeed = []
    ySpeed = []
    var i = 0
    ballIds.forEach(element => {
        const ball = document.getElementById(element);
        court = document.getElementById('court');
        divBoundingClient = court.getBoundingClientRect();
        console.log(divBoundingClient);
        vw = divBoundingClient.width;
        vh = divBoundingClient.height;
        divTop = divBoundingClient.top;
        divLeft = divBoundingClient.left;
        divBottom = divBoundingClient.bottom;
        divRight = divBoundingClient.right;
        console.log(divBoundingClient)
        randx = Math.floor(Math.random() * (Math.round(divRight - 80) - Math.round(divLeft) + 1) + Math.round(divLeft + 30));
        randy = Math.floor(Math.random() * (Math.round(divBottom - 80) - Math.round(divTop) + 1) + Math.round(divTop + 30));
        x.push(randx);
        y.push(randy);
        xSpeed.push((speed + 1) * 3)
        ySpeed.push((speed + 1) * 3)
        animate(element, i);
        i++;
    });
}

function animate(element, i) {
    if (ballIds.length == 0 || !ballIds.includes(element)) {
        return
    }
    if (stopAnimation) {
        return
    }
    x[i] += xSpeed[i];
    y[i] += ySpeed[i];
    var inn = 0;
    var isOverlapping = false;
    ballIds.forEach(ballId => {
        if (inn != i) {
            var domRect1 = document.getElementById(ballId).getBoundingClientRect();
            var domRect2 = document.getElementById(ballIds[i]).getBoundingClientRect();
            isOverlapping = !(
                domRect1.top > domRect2.bottom ||
                domRect1.right < domRect2.left ||
                domRect1.bottom < domRect2.top ||
                domRect1.left > domRect2.right
            );

            if (isOverlapping) {
                xSpeed[i] = -xSpeed[i];
                ySpeed[i] = -ySpeed[i];
            }
        }
        inn++;
    });

    if (!isOverlapping) {
        if (x[i] > divRight - 50 || x[i] < divLeft) {
            xSpeed[i] = -xSpeed[i];
        }
        if (y[i] > divBottom - 50 || y[i] < divTop) {
            ySpeed[i] = -ySpeed[i];
        }
    }
    document.getElementById(element).style.left = x[i] + (xSpeed[i]) + "px";
    document.getElementById(element).style.top = y[i] + (ySpeed[i]) + "px";
    setTimeout(() => {
        animate(element, i)
    }, 50);
}
