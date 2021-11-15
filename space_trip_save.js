var cols, rows;
//Controls the density of the triangles 
var scl = 60;
var w = window.innerWidth*1.26;
var h = window.innerHeight;
var song;
var amp;
 
let img, sun_img, stars;

var flying = 0;

var terrain = [];

function setup() {
  img = loadImage('images/background.jpg');
  sun_img = loadImage('images/sun.png');
  stars = loadImage('images/stars.png'); 
  dim = width / 2;
  song = loadSound('uploads/curr.mp3');
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = cols/2 + 1;

  



  background(255);

  amp = new p5.Amplitude();

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; 
    }
  }
}


function mousePressed() {
  if (song.isPlaying()) {
    song.pause();

  } else {
    song.play();

  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}


function draw() {
  imageMode(CENTER);

  let level = amp.getLevel();

  // Adjust terrain size
  let size = map(level, 0, 0.3, 0.05, 1);

  let circSize = map(level, 0, 0.3, 0, 1);

  background(0);

  fill(20, 0, 255);
  // Background image
  push();
  translate(0, 0, -450);
  image(img, 0, -50, windowWidth + 1100, windowHeight + 500);
  pop();

  // Stars image
  push();
  translate(0, 0, -450);
  tint(255, 255 * circSize);
  image(stars, 0, -1500, windowWidth + 1000, windowHeight + 2000);
  pop();

  // Sun image
  push();
  translate(0, 0, -450);
  image(sun_img, 0, -110, 1000, 1000);
  pop();


  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = y; x < cols - y; x++) {

      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  // Adjust height of camera 
  // Original value 140
  translate(0, windowHeight/8);
  // Adjust rotation and position of rectangle 
  rotateX(PI / 2);


  noFill();

  // Adjust height of the floor
  translate(-w/2 , -h/5);
  stroke(64, 252, 255);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (var x = y; x < cols - y; x++) {

      vertex(x * scl, y * scl, terrain[x][y] * size);
      vertex(x * scl, (y + 1) * scl, terrain[x][y] * size);
    }
    
    endShape();

  }


}
