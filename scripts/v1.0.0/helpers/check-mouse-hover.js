// function to check if the mouse is hovering over a data point

// Curently used by:
  // MulticlassTimeseriesChart constructor

function checkMouseHover(chartX,chartY,texts,chartSize){ //texts should be an array
  // if the mouse hovers over point, display labeling text
  if (abs(mouseX-chartX)<chartSize/2 &&
    abs(mouseY-chartY)<chartSize/2){

      //change the direction of texts depending on location of point to prevent overflow out of the canvas region
      if(mouseX<width/2){
        textAlign("left")
      }
      else{
        textAlign("right")
      }
      noStroke();
      textSize(12);

      for (var i=0; i<texts.length; i++){
        text(texts[i],
          mouseX,
          chartY-10-(10*i));
      }
  }
}
