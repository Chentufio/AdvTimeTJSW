var bg0, bg1, title, letraT, letraI, letraM, letraE, sword, img, arrow, arrow1, complete, gme, plat1, plat2, plat3, plat4;

var flor, flor2, flor3, wallL, wallR, wallU, wallD, titleSprt, tSprt, iSprt, mSprt, eSprt, swordSprt, completeSprt, gameOver;

var plataform1, plataform2, plataform3, plataform4, plataform5, plataform6;

var bgS, bgS2, owl1, finnSound, finnOuch, finnOuch2;

var lifeSlider, highScore = 0;

var jewels;
var snow;
var plats;
var jwls;

var mouse_moved = false,
  touch_started = false,
  isOverCircle,
  isOverBtnL,
  isOverBtnR;


var cosmicOwl, knight, finn, door, pod, iceking, balls;

var position = 0,
  GRAVITY = 1,
  JUMP = 15,
  posicion,
  finnScore = 0,
  contador = 0,
  golpe = 0,
  numero = 0,
  spawn,
  nivel;

var registroX, registroY, buttonPosX, buttonPosY;

var button;
var animacion;
var finnLife = 5;

var btnLeft, btnRight, kingX, kingY;

var frameTime, delay, pantallas;

//CONFIGURACION INICIAL
function preload() {
  bg0 = loadImage("assets/blue.png");
  bg1 = loadImage("assets/space.png");

  plat1 = loadImage("assets/things/plat1.png");
  plat2 = loadImage("assets/things/plat2.png");
  plat3 = loadImage("assets/things/plat3.png");
  plat4 = loadImage("assets/things/plat4.png");

  title = loadImage("assets/title.png");
  letraT = loadImage("assets/t.png");
  letraI = loadImage("assets/i.png");
  letraM = loadImage("assets/m.png");
  letraE = loadImage("assets/e.png");
  sword = loadImage("assets/sword.png");

  img = loadImage("assets/ground.png");
  arrow = loadImage("assets/GUI/arrow.png");
  arrow1 = loadImage("assets/GUI/arrow.png");

  complete = loadImage("assets/complete.png");
  gme = loadImage("assets/questOver.png");

  bgS = loadSound("assets/sounds/bg.mp3");
  bgS2 = loadSound("assets/sounds/bg2.mp3");
  owl1 = loadSound("assets/sounds/owl1.mp3");
  finnS1 = loadSound("assets/sounds/finn1.mp3");
  finnS2 = loadSound("assets/sounds/finn2.mp3");
  finnS3 = loadSound("assets/sounds/finn3.mp3");
  finnS4 = loadSound("assets/sounds/finn4.mp3");

  finnOuch = loadSound("assets/sounds/finnau.mp3");
  finnOuch2 = loadSound("assets/sounds/finnau2.mp3");


  pantallas = 0;
  frameTime = millis();
  delay = random(0, 1000);
}
function setup() {

  createCanvas(windowWidth, windowHeight);
  titleSprites();

  lifeSlider = createSlider(5, 15, 5);

  jewels = new Group();
  snow = new Group();
  plats = new Group();

  bgS.setVolume(0.4);
  bgS2.setVolume(0.4);
  owl1.setVolume(0.4);
  finnOuch.setVolume(0.7);
  finnOuch2.setVolume(0.7);
  finnS1.setVolume(0.7);
  finnS2.setVolume(0.7);
  finnS3.setVolume(0.7);
  finnS4.setVolume(0.7);

  owl1.playMode('restart');
  bgS.play();
}
function draw() {

  if (isTouch()) {
    registroX = touchX;
    registroY = touchY;
  } else {
    registroX = mouseX;
    registroY = mouseY;
  }

  switch (pantallas) {
    case 0:
      background(bg0);
      moveSword();
      drawSprites();
      break;
    case 1:
      background(bg0);
      enlargeTitle();
      cosmicOwlSprite();
      buttonStart();
      drawSprites();
      break;
    case 2:
      background(bg1);
      finnSprite();
      iceKingSprite();
      buttons();
      finn.debug = mouseIsPressed;
      iceking.debug = mouseIsPressed;
      drawSprites();
      break;
    case 3:
      background(bg1);
      enlargeOver();
      drawSprites();
      break;
    default:
      break;

  }


}
//PESTAÑA DEL MENU
function titleSprites() {
  titleSprt = createSprite(windowWidth / 2, windowHeight / 3);
  titleSprt.addImage(title);

  eSprt = createSprite(windowWidth / 2 + 98, windowHeight / 3 + 56);
  eSprt.addImage(letraE);

  iSprt = createSprite(windowWidth / 2 - 8, windowHeight / 3 + 54);
  iSprt.addImage(letraI);

  swordSprt = createSprite(windowWidth / 2 - 400, windowHeight / 3 + 56);
  swordSprt.addImage(sword);

  tSprt = createSprite(windowWidth / 2 - 48, windowHeight / 3 + 54);
  tSprt.addImage(letraT);

  mSprt = createSprite(windowWidth / 2 + 39, windowHeight / 3 + 54);
  mSprt.addImage(letraM);

}
function moveSword() {
  var xls = swordSprt.position.x;
  if (xls < windowWidth / 2) {
    swordSprt.setVelocity(10, 0);
  } else {
    swordSprt.setVelocity(0, 0);
    titleSprt.remove();
    eSprt.remove();
    iSprt.remove();
    mSprt.remove();
    tSprt.remove();
    swordSprt.remove();
    completeSprt = createSprite(windowWidth / 2 - 5, windowHeight / 3 + 28);
    completeSprt.addImage(complete);
    cosmicOwl = createSprite(120, 100);

    cosmicOwl.addAnimation("moving", "assets/owl/owl-0001.png", "assets/owl/owl-0006.png");
    cosmicOwl.addAnimation("floating", "assets/owl/owl-0007.png", "assets/owl/owl-0012.png");
    cosmicOwl.scale = 0.5;

    pantallas = 1;

  }

}
function enlargeTitle() {
  completeSprt.attractionPoint(0.1, windowWidth / 2 - 10, windowHeight / 3 + 18);
}
function enlargeOver() {
  gameOver.attractionPoint(0.1, windowWidth / 2 - 10, windowHeight / 3 + 50);

}
function buttonStart() {
  //fill(random(0,255),random(0,255),random(0,255));
  fill(0);
  textSize(35);
  textStyle(ITALIC);
  text("A New", completeSprt.position.x - 140, completeSprt.position.y - 80);
  rectMode(CENTER);
  strokeWeight(10);
  fill(255, 0, 0);
  rect(windowWidth / 2, windowHeight - 150, 150, 50, 15, 0, 15, 0);
  //EASY
  fill(0, 255, 0);
  rect(windowWidth / 3 - 100, windowHeight - 250, 150, 50, 15, 15, 15, 15);
  //MEDIUM
  fill(0, 0, 255);
  rect(windowWidth / 3 - 100, windowHeight - 180, 150, 50, 0, 10, 0, 10);
  //HARD
  fill(255, 0, 0);
  rect(windowWidth / 3 - 100, windowHeight - 110, 150, 50, 0, 0, 0, 0);
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text("START", windowWidth / 2, windowHeight - 140, 150, 50);

  lifeSlider.position(windowWidth / 2 - 50, windowHeight - 30);
  lifeSlider.style('width', '100px');
  finnLife = lifeSlider.value();

  if (touchX >= windowWidth / 2 - 75 && touchX <= windowWidth / 2 + 75 && touchY >= windowHeight - 165 && touchY <= windowHeight - 115) {
    pantallas = 2;
    completeSprt.remove();
    cosmicOwl.remove();
    bgS.stop();
    bgS2.setVolume(0.4);
    bgS2.play();
    initPlayers();
    lifeSlider.position(-20, -30);
  }

  if (touchX >= windowWidth / 3 - 175 && touchX <= windowWidth / 3 + 25 && touchY >= windowHeight - 275 && touchY <= windowHeight - 225) {
    nivel = 0;
    fill(255);
    text("EASY", windowWidth / 3 - 100, windowHeight - 240, 150, 50);
  } else {
    fill(0);
    text("EASY", windowWidth / 3 - 100, windowHeight - 240, 150, 50);
  }

  if (touchX >= windowWidth / 3 - 175 && touchX <= windowWidth / 3 + 25 && touchY >= windowHeight - 205 && touchY <= windowHeight - 155) {
    nivel = 1;
    fill(255);
    text("MEDIUM", windowWidth / 3 - 100, windowHeight - 170, 150, 50);
  } else {
    fill(0);
    text("MEDIUM", windowWidth / 3 - 100, windowHeight - 170, 150, 50);
  }

  if (touchX >= windowWidth / 3 - 175 && touchX <= windowWidth / 3 + 25 && touchY >= windowHeight - 135 && touchY <= windowHeight - 85) {
    nivel = 2;
    fill(255);
    text("HARD", windowWidth / 3 - 100, windowHeight - 100, 150, 50);
  } else {
    fill(0);
    text("HARD", windowWidth / 3 - 100, windowHeight - 100, 150, 50);
  }

  fill(0);
  textStyle(BOLD);
  textSize(30);
  text("Lifes: " + finnLife, windowWidth / 2, windowHeight - 70, 150, 50);
  text("HighScore: " + highScore, windowWidth - 150, windowHeight - 70);

  if (pantallas == 1) {
    if (bgS.isPlaying() == false) {
      bgS.loop(0, 1, 0.4);
    }
  }
}
function cosmicOwlSprite() {

  if (cosmicOwl.getAnimationLabel() !== "moving") {
    owl1.play();
  }

  cosmicOwl.attractionPoint(.5, registroX, registroY);

  if (registroX < cosmicOwl.position.x - 10 && registroY < cosmicOwl.position.y - 10) {
    cosmicOwl.changeAnimation("moving");
    cosmicOwl.mirrorX(-1);
    //cosmicOwl.velocity.x = -3;
    //cosmicOwl.velocity.y = -1;
  } else if (registroX > cosmicOwl.position.x + 10 && registroY > cosmicOwl.position.y + 10) {
    cosmicOwl.changeAnimation("moving");
    cosmicOwl.mirrorX(1);
    //cosmicOwl.velocity.x = 3;
    //cosmicOwl.velocity.y = 1;
  } else if (registroX > cosmicOwl.position.x + 10 && registroY < cosmicOwl.position.y - 10) {
    cosmicOwl.changeAnimation("moving");
    cosmicOwl.mirrorX(1);
    //cosmicOwl.velocity.x = 3;
    //cosmicOwl.velocity.y = -1;
  } else if (registroX < cosmicOwl.position.x - 10 && registroY > cosmicOwl.position.y + 10) {
    cosmicOwl.changeAnimation("moving");
    cosmicOwl.mirrorX(-1);
    //cosmicOwl.velocity.x = -3;
    //cosmicOwl.velocity.y = 1;
  } else {
    cosmicOwl.changeAnimation("floating");
    //cosmicOwl.velocity.x = 0;
    //cosmicOwl.velocity.y = 0;

  }

  cosmicOwl.velocity.x = (mouseX - cosmicOwl.position.x) / 10;
  cosmicOwl.velocity.y = (mouseY - cosmicOwl.position.y) / 10;

  cosmicOwl.maxSpeed = 10;

}
//PESTAÑA DEL JUEGO
function initPlayers() {

  environment();



  finn = createSprite(200, windowHeight - 40);
  //finn.setCollider("rectangle", 0, 0, 35, 30);
  finn.mirrorX(-1);
  finn.addAnimation("idle", "assets/finn/idle_0001.png", "assets/finn/idle_0012.png");
  finn.addAnimation("walk", "assets/finn/walk_0001.png", "assets/finn/walk_0012.png");
  finn.addAnimation("run", "assets/finn/run_0001.png", "assets/finn/run_0004.png");
  finn.addAnimation("jump", "assets/finn/jump_0001.png", "assets/finn/jump_0012.png");
  finn.addAnimation("arcjump", "assets/finn/arcjump_0001.png", "assets/finn/arcjump_0004.png");
  finn.addAnimation("fall", "assets/finn/fall_0001.png", "assets/finn/fall_0003.png");
  finn.addAnimation("land", "assets/finn/land_0001.png", "assets/finn/land_0006.png");
  finn.addAnimation("jake hit", "assets/finn/jakehit_0001.png", "assets/finn/jakehit_0012.png");
  finn.addAnimation("get hit", "assets/finn/get_hit_0001.png", "assets/finn/get_hit_0004.png");

  iceking = createSprite(600, 150);
  iceking.setCollider("rectangle", 0, 0, 80, 71);
  iceking.addAnimation("air idle", "assets/iceking/airidle_0001.png", "assets/iceking/airidle_0006.png");
  iceking.addAnimation("air move", "assets/iceking/airmove_0001.png", "assets/iceking/airmove_0006.png");
  iceking.addAnimation("fire down", "assets/iceking/firedown_0001.png", "assets/iceking/firedown_0011.png");

  kingX = random(0, windowWidth);
  kingY = random(0, 100);
  iceking.maxSpeed = 10;

  jewellSpawn();

  btnLeft = createSprite(115, windowHeight - 80);
  btnLeft.addImage(arrow);

  btnRight = createSprite(50, windowHeight - 80);
  btnRight.addImage(arrow1);
  btnRight.mirrorX(-1);

}
function environment() {

  /*for (var x = 0; x < windowWidth; x += 612 ) {
    flor = createSprite(x, windowHeight - 10);
    flor.addAnimation("ground", "assets/small_platform0001.png", "assets/small_platform0003.png");
  }*/

  flor = createSprite(306, windowHeight - 10);
  flor.addImage(img);
  flor2 = createSprite(910, windowHeight - 10);
  flor2.addImage(img);
  flor3 = createSprite(1510, windowHeight - 10);
  flor3.addImage(img);

  wallL = createSprite(-1, windowHeight / 2, 1, windowHeight);
  wallL.setCollider("rectangle", -1, 0, 1, windowHeight);
  wallR = createSprite(windowWidth, windowHeight / 2, 1, windowHeight);
  wallR.setCollider("rectangle", -1, 0, 1, windowHeight);
  wallU = createSprite(windowWidth / 2, 0, windowWidth, 1);
  wallU.setCollider("rectangle", 0, -1, windowWidth, 1);
  wallD = createSprite(windowWidth / 2, windowHeight - 20, windowWidth, 1);
  wallD.setCollider("rectangle", 0, -1, windowWidth, 1);


  plataform1 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));
  plataform2 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));
  plataform3 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));
  plataform4 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));
  plataform5 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));
  plataform6 = createSprite(random(10, windowWidth), random(windowHeight / 2, windowHeight - 80));

  plataform1.scale = 1.5;
  plataform2.scale = 1.5;
  plataform3.scale = 1.5;
  plataform4.scale = 1.5;
  plataform5.scale = 1.5;
  plataform6.scale = 1.5;

  //plataform.setCollider(0, 0, 102, 11);
  var n = floor(random(0, 3));

  if (n == 0) {
    plataform1.addImage(plat1);
    plataform2.addImage(plat1);
    plataform3.addImage(plat1);
    plataform4.addImage(plat1);
    plataform5.addImage(plat1);
    plataform6.addImage(plat1);
  } else if (n == 1) {
    plataform1.addImage(plat2);
    plataform2.addImage(plat2);
    plataform3.addImage(plat2);
    plataform4.addImage(plat2);
    plataform5.addImage(plat2);
    plataform6.addImage(plat2);
  } else if (n == 2) {
    plataform1.addImage(plat3);
    plataform2.addImage(plat3);
    plataform3.addImage(plat3);
    plataform4.addImage(plat3);
    plataform5.addImage(plat3);
    plataform6.addImage(plat3);
  } else if (n == 3) {
    plataform1.addImage(plat4);
    plataform2.addImage(plat4);
    plataform3.addImage(plat4);
    plataform4.addImage(plat4);
    plataform5.addImage(plat4);
    plataform6.addImage(plat4);
  }

  plats.add(plataform1);
  plats.add(plataform2);
  plats.add(plataform3);
  plats.add(plataform4);
  plats.add(plataform5);
  plats.add(plataform6);

  //door = createSprite(500, windowHeight - 80);
  //door.addAnimation("stay", "assets/things/door_closed.png");
  //door.addAnimation("opening", "assets/things/door_closed.png", "assets/things/door_middle.png", "assets/things/door_open.png");

}
function finnSprite() {

  plataform1.debug = mouseIsPressed;
  plataform2.debug = mouseIsPressed;
  plataform3.debug = mouseIsPressed;
  plataform4.debug = mouseIsPressed;
  plataform5.debug = mouseIsPressed;
  plataform6.debug = mouseIsPressed;

  finn.velocity.y += GRAVITY;

  if (finn.collide(flor)) {
    finn.velocity.y = 0;
    finn.changeAnimation("idle");
  } else if (finn.collide(flor2)) {
    finn.velocity.y = 0;
    finn.changeAnimation("idle");
  } else if (finn.collide(flor3)) {
    finn.velocity.y = 0;
    finn.changeAnimation("idle");
  }

  finn.collide(jewels, score);
  finn.collide(snow, life);


  finn.collide(plataform1);
  finn.collide(plataform2);
  finn.collide(plataform3);
  finn.collide(plataform4);
  finn.collide(plataform5);
  finn.collide(plataform6);

  if (finn.collide(iceking)) {
    life2();
  }

  wallL.displace(finn);
  wallR.displace(finn);
  wallU.displace(finn);
  wallD.displace(finn);



  if (keyCode == LEFT_ARROW && keyIsPressed == true || isOverBtnL == true && touchIsDown) {
    finn.changeAnimation("run");
    finn.mirrorX(-1);
    finn.velocity.x = -4;
  }

  if (keyCode == RIGHT_ARROW && keyIsPressed == true || isOverBtnR == true && touchIsDown) {
    finn.changeAnimation("run");
    finn.mirrorX(1);
    finn.velocity.x = 4;
  }

  if (keyWentDown("x") || isOverCircle == true && touchIsDown) {
    finn.changeAnimation("arcjump");
    //finn.animation.rewind();
    finn.velocity.y = -JUMP;

  }
  textStyle(BOLD);
  textSize(30);
  text("SCORE: " + finnScore, 10, 30);
  text("Lives: " + finnLife, windowWidth - 160, 30);
  textSize(25);
  text("HP", windowWidth - 200, 70);
  fill(255, 0, 0);
  rect(windowWidth - 160, 50, 140 - golpe, 20)

  if (pantallas == 2) {
    if (bgS2.isPlaying() == false) {
      bgS2.loop(0, 1, 0.4);
    }
  }
}
function iceKingSprite() {
  //iceking.attractionPoint(.2, kingX, kingY);
  var lol = 0;

  if (kingX < iceking.position.x - 10 /*&& registroY < iceking.position.y - 10*/ ) {
    iceking.changeAnimation("air move");
    iceking.mirrorX(-1);
    iceking.velocity.x = -3;
    iceking.velocity.y = 0;
  } else if (kingX > iceking.position.x + 10 /*&& registroY > iceking.position.y + 10*/ ) {
    iceking.changeAnimation("air move");
    iceking.mirrorX(1);
    iceking.velocity.x = 3;
    iceking.velocity.y = 0;
  } else if (kingX > iceking.position.x + 10 /*&& registroY < iceking.position.y - 10*/ ) {
    iceking.changeAnimation("air move");
    iceking.mirrorX(1);
    iceking.velocity.x = 3;
    iceking.velocity.y = 0;
  } else if (kingX < iceking.position.x - 10 /*&& registroY > iceking.position.y + 10*/ ) {
    iceking.changeAnimation("air move");
    iceking.mirrorX(-1);
    iceking.velocity.x = -3;
    iceking.velocity.y = 0;
  } else {
    iceking.changeAnimation("air idle");
    iceking.velocity.x = 0;
    iceking.velocity.y = 0;
  }

  if (iceking.velocity.x == 0) {
    iceKingAttack();
  }
}
function iceKingAttack() {

  var level;

  switch (nivel) {
    case 0:
      level = random(1, 10);
      break;
    case 1:
      level = random(10, 30);
      break;
    case 2:
      level = random(15, 50);
      break;
  }

  if (frameTime + delay < millis()) {
    iceking.changeAnimation("fire down");
    for (var i = 0; i < level; i++) {
      balls = createSprite(iceking.position.x, iceking.position.y);
      balls.addAnimation("fire", "assets/iceking/balls_0001.png", "assets/iceking/balls_0004.png");
      balls.velocity.x = random(-5, 5);
      balls.velocity.y = random(1, 5);
      snow.add(balls);
      balls.life = 310;
    }

    kingX = random(0, windowWidth);
    kingY = random(0, 100);
    frameTime = millis();
    delay = random(0, 1000);
  }
}
//CODIGO CENTRAL DEL DESARROLLO DEL JUEGO
function jewellSpawn() {

  spawn = int(random(5, 15));
  print("Spawn: " + spawn);
  for (var i = 0; i < spawn; i++) {
    var equis = random(0, windowWidth - 10);
    var ye = random(0, windowHeight - 40);
    jwls = createSprite(equis, ye);
    jwls.addAnimation("blink", "assets/jewels/jewels_0001.png", "assets/jewels/jewels_0011.png");
    jewels.add(jwls);
  }

}
function score(collector, collected) {

  finnScore += 1;
  contador += 1;
  numero += 1;

  if (contador == 1) {
    finnS2.play();
  }
  if (contador == 2) {
    finnS3.play();
  }
  if (contador == 3) {
    finnS4.play();
    contador = 0;
  }

  if (numero == spawn) {
    jewellSpawn();
    numero = 0;
  }

  print("SCORE: " + finnScore);

  collected.remove();
}
function life(collector, collected) {

  golpe += 5;
  if (golpe >= 140) {
    finnLife -= 1;
    golpe = 0;
  }
  finnOuch.play();

  finn.changeAnimation("get hit");
  finn.animation.rewind();

  collected.remove();

  if (finnLife == 0) {

    pantallas = 3;
    gameOver = createSprite(windowWidth / 2, windowHeight / 2 + 50);
    gameOver.addImage(gme);
    frameTime = millis();

  }

}
function life2() {

  golpe += 10;
  if (golpe >= 140) {
    finnLife -= 1;
    golpe = 0;
  }
  finnOuch2.play();
  finn.changeAnimation("get hit");
  finn.animation.rewind();

  if (finnLife == 0) {
    highScore = finnScore;
    finnScore = 0;
    pantallas = 3;
    gameOver = createSprite(windowWidth / 2, windowHeight / 2 + 50);
    gameOver.addImage(gme);
    frameTime = millis();

  }


}
//CONFIGURACIONES TECNICAS (CONTROLES)
function buttons() {

  buttonPosX = windowWidth - 100;
  buttonPosY = windowHeight - 100;

  var posX = 50;
  var posY = windowHeight - 80;
  var posX2 = 150;


  var distance = dist(registroX, registroY, buttonPosX, buttonPosY);

  // if the distance is less than the circle's radius
  if (distance < 50) {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  if (touchX >= 21 && touchX <= 21 + 59 && touchY >= windowHeight - 101 && touchY <= windowHeight - 101 + 40) {
    isOverBtnL = true;
  } else {
    isOverBtnL = false;
  }

  if (touchX >= 86 && touchX <= 86 + 59 && touchY >= windowHeight - 101 && touchY <= windowHeight - 101 + 40) {
    isOverBtnR = true;
  } else {
    isOverBtnR = false;
  }

  if (isOverBtnL == true && touchIsDown) {

    arrow1.resize(70, 70);
  } else {
    arrow1.resize(64, 64);

  }

  if (isOverBtnR == true && touchIsDown) {

    arrow.resize(70, 70);
  } else {
    arrow.resize(64, 64);
  }

  noFill();
  if (isOverCircle == true && touchIsDown) {
    ellipse(buttonPosX, buttonPosY, 90, 90);
  } else {
    ellipse(buttonPosX, buttonPosY, 80, 80);
  }



}
function windowResized() {
  bg.resize(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
  if (pantallas == 3) {
    if (frameTime + 3000 < millis()) {
      finn.remove();
      iceking.remove();
      flor.remove();
      flor2.remove();
      flor3.remove();
      btnLeft.remove();
      btnRight.remove();
      gameOver.remove();
      cosmicOwl.remove();
      plataform1.remove();
      plataform2.remove();
      plataform3.remove();
      plataform4.remove();
      plataform5.remove();
      plataform6.remove();
      jwls.remove();
      bgS2.stop();
      bgS.play();
      pantallas = 0;
    }
  }

}
function mouseMoved() {
  mouse_moved = true;
}
function touchStarted() {
  touch_started = true;
  if (pantallas == 3) {
    if (frameTime + 3000 < millis()) {
      finn.remove();
      iceking.remove();
      flor.remove();
      flor2.remove();
      flor3.remove();
      btnLeft.remove();
      btnRight.remove();
      gameOver.remove();
      cosmicOwl.remove();
      plataform1.remove();
      plataform2.remove();
      plataform3.remove();
      plataform4.remove();
      plataform5.remove();
      plataform6.remove();
      jwls.remove();
      bgS2.stop();
      bgS.play();
      pantallas = 0;
    }
  }
}
function touchEnded() {

  if (pantallas == 2) {
    isOverBtnL == false;
    isOverBtnR == false;
    isOverCircle = false;
    finn.setVelocity(0, 0);
    frameTime = millis();
  }
}
function isTouch() {
  return touch_started && !mouse_moved;
}
function keyTyped() {

}
function keyReleased() {
  frameTime = millis();
  finn.setVelocity(0, 0);
}
