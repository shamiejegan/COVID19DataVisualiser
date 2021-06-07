
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function preload() {
  //preload map
  mapimg = loadImage('data/covid19/worldmap.jpg');
}

function setup() {
  // Create a canvas to draw charts, with size fitting screen, giving buffer width for the side bar.
  var c = createCanvas(windowWidth*0.7, windowHeight*0.95);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new Covid19CasesGeography());
  gallery.addVisual(new Covid19CasesWeekly());
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new ClimateChange());
}

function draw() {
  background(50);
  if (gallery.selectedVisual != null) {
    background(255);
    gallery.selectedVisual.draw();
  }
}
