// function to standardize to style and location of title across all visuals

// used for all chart template scripts

function addTitle(title){
  // add title to chart
  if (title) {
    noStroke();
    fill(0);
    textSize(24);
    textAlign('left')
    text(title, 20, 30);
  }
}
