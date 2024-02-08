var myGamePiece;
var myObstacles = [];
var myScore;

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

var existingValue = getCookie('flappy');

function startGame() {
    if (window.orientation == 0){
        location.href = "index.html";
    }
    if (!existingValue) {
        console.log(document.cookie)
        document.cookie = "flappy = 0;"
    }
    myGamePiece = new component(30, 30, "wheat", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "wheat", window.innerWidth/4, 30, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth/3 * 2;
        this.canvas.height = window.innerHeight/3 * 2;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.font = "30px ArcadeClassic"
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitTop = function() {
        var rocktop = 0;
        if (this.y < rocktop) {
            this.y = rocktop;
            this.gravitySpeed = -(this.gravitySpeed);
        }
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

let checkStatus = false;

function end() {

    if (checkStatus == false) {
        alert("GAME OVER!!  SCORE : " + Math.floor(myGameArea.frameNo/100))
        if (getCookie('flappy') < Math.floor(myGameArea.frameNo/100)) {
            document.cookie = "flappy="+Math.floor(myGameArea.frameNo/100)
        }

        location.href = "index.html";
        checkStatus = true;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            end();
            return false;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "white", x, 0));
        myObstacles.push(new component(10, x - height - gap, "white", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="BEST : " + getCookie('flappy') +"     SCORE : " + Math.floor(myGameArea.frameNo/100);
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGamePiece) {
        startGame();
    }
    myGamePiece.gravity = n;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 's' || event.key === 'Enter' || event.key ===' ' || event.key === "ArrowUp" ) {
        accelerate(-0.2)
      }
    }
  );

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 's' || event.key === 'Enter' || event.key ===' ' || event.key === 'ArrowUp') {
        accelerate(0.05)
      }
    }
);

document.addEventListener('mousedown',()=>{
    accelerate(-0.2)
})

document.addEventListener('mouseup',()=>{
    accelerate(0.05)
})

document.addEventListener('touchstart',()=>{
    accelerate(-0.2)
})

document.addEventListener('touchend',()=>{
    accelerate(-0.2)
})

document.onload(startGame())