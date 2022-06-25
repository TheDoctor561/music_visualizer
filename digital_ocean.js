var cols, rows;
//Controls the density of the triangles 
var scl = 70;
var w = window.innerWidth*1.26;
var h = window.innerHeight;
var song;
var amp;
 
let img;

var flying = 0;

var terrain = [];

function setup() {
  dim = width / 2;
  song = loadSound('songs/baby_girl.mp3');
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = cols/2 + 1;

  
  frameRate(45); 


  background(0);

  amp = new p5.Amplitude();

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = x; y < rows-x; y++) {
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
  background(0, 0); 

  fill(20, 0, 255);
  flying -= 0.05;
  var yoff = flying;

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
    var xoff = 0; 
    for (var x = y; x < cols - y; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
      vertex(x * scl, y * scl, terrain[x][y] * size);
      vertex(x * scl, (y + 1) * scl, terrain[x][y] * size);
    }
    yoff += 0.2; 
    endShape();

  }


}
