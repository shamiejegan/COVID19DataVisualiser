// Function to draw bubble chart to the screen overlaying a map.

function MapBubbleChart(maxdimension,title,longitude,latitude,size,dimension) {

  // array of values for variables that will be represented by size of bubble
  this.size=size;

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 100,
    rightMargin: width-50,
    topMargin: 80,
    bottomMargin: height-50,
    // Min and max size of plot's dots.
    dotSizeMin:14,
    dotSizeMax:60
  };

  // display image that was preloaded in sketch.js
  image(mapimg,
    this.layout.leftMargin,
    this.layout.topMargin,
    this.layout.rightMargin - this.layout.leftMargin,
    this.layout.bottomMargin - this.layout.topMargin);

  // draw method called by the visualiser to plot the chart after setting it up
  this.draw = function() {

    // Set ranges for axes based on known min/max longitude and latitude values
    var latitudeMin = -90;
    var latitudeMax = 90;
    var longitudeMin = -180;
    var longitudeMax = 180;

    // Find smallest and largest numbers from the array representing the  size of ellipses.
    var sizeMin = min(this.size);
    var sizeMax = max(this.size);

    //plot point for each row item in the dataset
    for (i = 0; i < maxdimension; i++) {

        // set x and y values based on mapping to the screen
        y = map(latitude[i],latitudeMax,latitudeMin,this.layout.topMargin,this.layout.bottomMargin)
        x = map(longitude[i],longitudeMax,longitudeMin,this.layout.rightMargin,this.layout.leftMargin)
        // set size values based on min and max points in data
        size = map(this.size[i],sizeMin,sizeMax,this.layout.dotSizeMin,this.layout.dotSizeMax)

        // Draw an ellipse for each point.
        fill(255,0,0,150); //translucent red
        ellipse(x,y,size);

        // draw accompanying country
        noStroke();
        fill(0);
        textSize(size/2+3); //scale size of text according to size of bubble
        textAlign('center','center');
        text(dimension[i],x,y)
    }

    // add title to chart
    addTitle(title)

  }

};
