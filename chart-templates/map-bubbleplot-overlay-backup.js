function MapBubblePlot(maxdimension,title,longitude,latitude,size,dimension) {

  this.maxdimension=maxdimension;

  this.longitude=longitude;
  this.latitude=latitude;
  this.size=size;
  this.dimension=dimension;

  this.title=title;

  var marginSize=30;

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {

    marginSize: marginSize,

    // Margin positions around the plot. Left and bottom have double
    // margin size to make space for axis and tick labels on the canvas.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Min and max size of plot's dots.
    dotSizeMin:3,
    dotSizeMax:40
  };

  image(mapimg, 0 , 0, width, height);

  this.draw = function() {

    // Convert numerical data from strings to numbers.
    latitude = stringsToNumbers(this.latitude);
    longitude = stringsToNumbers(this.longitude);
    size = stringsToNumbers(this.size);

    // Set ranges for axes.
    // Use full 100% for y-axis (latitude).
    var latitudeMin = -90;
    var latitudeMax = 90;

    // Use full 100% for x-axis (longitude).
    var longitudeMin = -180;
    var longitudeMax = 180;

    // Find smallest and largest numbers of events across all categories to scale the size of the dots.
    var sizeMin = min(this.size);
    var sizeMax = max(this.size);

    //counter for number of bubbles displayed
    var n=0;

    for (i = 0; i < this.dimension.length; i++) {

      //display country only if they are the top x affected dimension
      if(this.size[i]>sizeMax*this.maxdimension){

        // increment count of number of dimension displayed
        n+=1;

        y = map(this.latitude[i],latitudeMax,latitudeMin,0,height)
        x = map(this.longitude[i],longitudeMax,longitudeMin,width,0)
        size = map(this.size[i],sizeMin,sizeMax,this.layout.dotSizeMin,this.layout.dotSizeMax)

        // Draw an ellipse for each point.
        fill(255,0,0,150);
        stroke(100,100,100);
        strokeWeight(1);

        ellipse(
          x,y,size
        );

        // draw accompanying dimension only for top10 elements
        if(n<=10){
          noStroke();
          fill(0);
          textSize(10);
          textAlign('center','center');
          text(this.dimension[i],x,y)
        }

      }
    }

    // Draw the title above the plot.
    this.drawTitle(n);



  };

  this.drawTitle = function(n) {
    fill(0);
    noStroke();
    textSize(24);
    textAlign('center', 'center');

    text(n + " " + title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.bottomMargin + (this.layout.marginSize / 2)+20);
  };


};
