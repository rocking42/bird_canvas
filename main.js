window.addEventListener("load", function() {
//constants
var GAME_WIDTH = 640;
var GAME_HEIGHT = 360;

var gameLive = true;

var level = 1;
// Hero
var hero = {
  x: 50,
  y: 200,
  speedX: 4,
  w: 40,
  h: 40,
  isMoving: false
};
// Goal
var goal = {
  x: 590,
  y: 200,
  w: 40,
  h: 40
};
//enemies
var enemies = [
  {
    x: 150, //x coordinate
    y: 100, //y coordinate
    speedY: 2, //speed in Y
    w: 30, //width
    h: 30 //heght
  },
  {
    x: 260,
    y: 100,
    speedY: 2,
    w: 40,
    h: 40
  },
  {
    x: 380,
    y: 100,
    speedY: 3,
    w: 40,
    h: 40
  },
  {
    x: 450,
    y: 100,
    speedY: 2,
    w: 40,
    h: 40
  },
  {
    x: 510,
    y: 100,
    speedY: 1,
    w: 30,
    h: 30
  }
];

var sprites = {

};

//grab the canvas and context
var canvas = document.querySelector("#mycanvas");
var ctx = canvas.getContext("2d");

function movePlayer() {
  hero.isMoving = true;
}

function stopPlayer() {
  hero.isMoving = false;
}

canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);

var load = function() {
  sprites.player = new Image();
  sprites.player.src = 'images/hero.png';

  sprites.enemy = new Image();
  sprites.enemy.src = 'images/enemy.png';

  sprites.chest = new Image();
  sprites.chest.src = 'images/chest.png';

  sprites.floor = new Image();
  sprites.floor.src = 'images/floor.png';
};

//update the logic
var update = function() {

  if (hero.isMoving === true) {
    hero.x += hero.speedX;
  }

  if(checkCollision(hero, goal)) {

    for (var y = 0; y < enemies.length; y++) {
      var winElement = enemies[y];
      if (winElement.speedY < 0) {
        winElement.speedY -= 1;
      }
      else if (winElement.speedY > 0) {
        winElement.speedY += 1;
      }
    }
    level += 1;
    hero.x = 50;
  }

  for (var i = 0; i < enemies.length; i++) {
    var element = enemies[i];

    if(checkCollision(hero, element)) {
      gameLive = false;

      alert("Game over");

      window.location = "";
    }

    element.y += element.speedY;
    //check borders
    if(element.y <= 10) {
      element.y = 10;
      //element.speedY = element.speedY * -1;
      element.speedY *= -1;
    }
    else if(element.y >= GAME_HEIGHT - (element.h)) {
      element.y = GAME_HEIGHT - (element.h);
      element.speedY *= -1;
    }
  }

};

//show the game on the screen
var draw = function() {
  //clear the canvas
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  //
  // ctx.fillStyle ="#3333FF";
  // ctx.fillRect(hero.x, hero.y, hero.w, hero.h);
  //
  // ctx.fillStyle = "#009900";
  // ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
  //
  // ctx.fillStyle ="#990000";
  // enemies.forEach(function(element, index){
  //   ctx.fillRect(element.x, element.y, element.w, element.h);
  // });

  // sprites are loaded in order
  // draw background
  ctx.drawImage(sprites.floor, 0, 0);

  // draw player
  ctx.drawImage(sprites.player, hero.x, hero.y);
  // draw enemies
  for (var i= 0; i < enemies.length; i++) {
    var element = enemies[i];
    ctx.drawImage(sprites.enemy, element.x, element.y);
  }

  // draw goal
  ctx.drawImage(sprites.chest, 590, 200);
};


//gets executed multiple times per second
var step = function() {

  update();
  draw();

  if(gameLive) {
    window.requestAnimationFrame(step);
  }
};

var checkCollision = function(rect1, rect2) {
  var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
  var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);

  return closeOnHeight && closeOnWidth;
};

//initial kick
load();
step();
});
