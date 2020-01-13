let myMap;
let canvas;
var myLat;
var myLon;
var position;
var duomoLat = 45.4641013;
var duomoLon = 9.1897325;

var casaLat = 45.5269135;
var casaLon = 8.9177747;

var defconLat = 45.6136506;
var defconLon = 8.8932612;

var iduomo;
var icasa;
var idefcon;

const mappa = new Mappa('MapboxGL', "pk.eyJ1Ijoib2Nhc2VsdmFnZ2lhIiwiYSI6ImNrNTU1aWdvazAydXYzbm4xZ3R4cGhlNHIifQ.uyOsVPFp8JkV4wh77rEbuw");

//var duomoLat = 45.4641013;
//var duomoLon = 9.1897325;

// Lets put all our map options in a single object
const options = {
  lat: 0,
  lng: 0,
  zoom: 10,
  studio: true,
  style: "mapbox://styles/mapbox/traffic-night-v2"
}

function preload() {
  position = getCurrentPosition();
  iduomo = loadImage("./assets/icons-01.png");
  icasa = loadImage("./assets/icons-02.png");
  idefcon = loadImage("./assets/icons-03.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  myLat = position.latitude;
  myLon = position.longitude;

  options.lat = myLat;
  options.lng = myLon;

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function draw() {
  clear();

  var myPosition = myMap.latLngToPixel(myLat, myLon);

  var duomo = myMap.latLngToPixel(duomoLat, duomoLon);
  var casa = myMap.latLngToPixel(casaLat, casaLon);
  var defcon = myMap.latLngToPixel(defconLat, defconLon);

  var distance1 = calcGeoDistance(myLat, myLon, duomoLat, duomoLon, "km");
  var distance2 = calcGeoDistance(myLat, myLon, casaLat, casaLon, "km");
  var distance3 = calcGeoDistance(myLat, myLon, defconLat, defconLon, "km");

  fill('red');
  noStroke();
  ellipse(myPosition.x,myPosition.y,10, 10);

  image(iduomo,(duomo.x)-iduomo.width/4,(duomo.y)-iduomo.height/4, iduomo.width/3, iduomo.height/3);
  image(icasa,(casa.x)-icasa.width/4,(casa.y)-icasa.height/4, icasa.width/3, icasa.height/3);
  image(idefcon,(defcon.x)-idefcon.width/4,(defcon.y)-idefcon.height/4, idefcon.width/3, idefcon.height/3);

  push();
  fill(color("white"));
  textSize(10);
  text("DUOMO", duomo.x-30, duomo.y+20);
  pop();

  push();
  fill(color("white"));
  textSize(10);
  text("CASA", casa.x-25, casa.y+20);
  pop();

  push();
  fill(color("white"));
  textSize(10);
  text("DEFCON COMICS", defcon.x-50, defcon.y+20);
  pop();


  push();
  fill(color("green"));
  rect((width/8)-45,(height/2)+50,350,85);
  pop();

  push();
  fill(color("white"));
  textSize(20);
  text('SEI A ' + Math.round(distance2) + ' KM DA CASA MIA!', (width/8)-40 , (height/2)+100);
  text('SEI A ' + Math.round(distance1) + ' KM DAL DUOMO!', (width/8)-40 , (height/2)+70);
  text('SEI A ' + Math.round(distance3) + ' KM DAL MIO FUMETTARO!', (width/8)-40 , (height/2)+130);
  pop();

}
