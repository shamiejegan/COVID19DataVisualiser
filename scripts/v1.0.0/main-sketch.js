
// Global variable to store the gallery object.
// The gallery object is a container for all the visualisations.
var gallery;

function preload() {
  //preload map
  //source: https://commons.wikimedia.org/wiki/File:Equirectangular-projection-topographic-world.jpg
  mapimg = loadImage('https://uploads-ssl.webflow.com/5d6e55ca1416617737eabacd/60be3976de00dcadda1fea81_worldmap.jpg');
}

function setup() {
  // Create canvas to draw charts, with size fitting screen, give buffer for side bar.
  var c = createCanvas(windowWidth*0.7, windowHeight*0.95);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new Covid19CasesGeography());
  gallery.addVisual(new Covid19CasesWeekly());
  gallery.addVisual(new TravelSearchTerm());
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapByJob2017());
  gallery.addVisual(new ClimateChange());
}

function draw() {
  background(50);
  if (gallery.selectedVisual != null) {
    background(255);
    gallery.selectedVisual.draw();
  }
}
