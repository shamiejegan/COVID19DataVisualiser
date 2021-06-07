// function to plot a horizontal and verticle lineas a cross in the middle of the canvas

//currently used by line chart templates:
  // BubbleChart constructor

function drawBoxAxis(layout,topText,bottomText,leftText,rightText) {

  fill(0);
  stroke(0);
  strokeWeight(2);

  // Add vertical line.
  line((layout.rightMargin - layout.leftMargin)/2 +layout.leftMargin,
       layout.topMargin,
       (layout.rightMargin - layout.leftMargin)/2 +layout.leftMargin,
       layout.bottomMargin);
  // Add horizontal line.
  line(layout.leftMargin,
     (layout.bottomMargin - layout.topMargin) / 2 + layout.topMargin,
     layout.rightMargin,
     (layout.bottomMargin - layout.topMargin) / 2 + layout.topMargin);

  // Insert axis labels
   noStroke();
   textSize(12);

   textAlign('left','top');
   text(topText,
     (layout.rightMargin)/2,
     layout.topMargin);

   text(bottomText,
     (layout.rightMargin)/2,
     layout.bottomMargin-10);

   text(leftText,
     layout.leftMargin,
     (layout.bottomMargin) / 2
   );

   textAlign('right', 'top');
   text(rightText,
     layout.rightMargin,
     (layout.bottomMargin) / 2
   );

}
