// Function to draw bubble chart to the screen.
// This function is called by a visual constructor to plot a bubble chart.

function BubbleChart(title,size,x,y,label) {

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 100,
    rightMargin: width-50,
    topMargin: 80,
    bottomMargin: height-50,
    pad: 10,
    // Min and max size of plot's dots.
    dotSizeMin:10,
    dotSizeMax:50
  };

  // draw method called by the visualiser to plot the chart after setting it up
  this.draw = function() {

    // Draw the box axis with labels
    drawBoxAxis(this.layout,
      topText="Males get better pay",
      bottomText="Females get better pay",
      leftText="male dominated",
      rightText="female dominated"
    );


    // Find smallest and largest numbers from the array representing the  size of ellipses.
    var sizeMin = min(size);
    var sizeMax = max(size);

    // Find smallest and largest numbers from the array representing the x axis.
    var xMin = min(x);
    var xMax = max(x);

    // Find smallest and largest numbers from the array representing the y axis.
    var yMin = min(y);
    var yMax = max(y);

    //plot point for each row item in the dataset
    for (i = 0; i < x.length; i++) {

      //map values in dataset to values on the canvas
      this.chartY = map(y[i],
        20,
        -20,
        this.layout.topMargin,
        this.layout.bottomMargin
      )
      this.chartX = map(x[i],
        100,
        0,
        this.layout.rightMargin,
        this.layout.leftMargin
      )
      this.chartSize = map(size[i],
        sizeMin,
        sizeMax,
        this.layout.dotSizeMin,
        this.layout.dotSizeMax
      )

      // shade the left and the right side of the graph different colours
      // Note: In future modifications, this section should not be within the
      // chart plotting constructor as different visuals may use different colour schemes
      if (x[i]<=50){
        fill(0,0,255,150);
      }
      else{
        fill(255,0,0,150);
      }

      // Draw an ellipse for each point.
      noStroke();
      ellipse(
        this.chartX,this.chartY,this.chartSize
      );

      // show labels if mouse is over region
      textAlign("left","center")
      fill(0);
      var text1=label[i];
      var text2=Math.round(x[i]) + "% Female";
      var text3=100-Math.round(x[i]) + "% Male";
      var text4=Math.round(y[i]) + "% Pay gap";
      this.texts=[text1,text2,text3,text4];
      checkMouseHover(this.chartX,this.chartY,this.texts,this.chartSize);
    }

    // add title to chart
    addTitle(title);

  };

};
