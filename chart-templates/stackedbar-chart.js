function StackedBar(data,title,refpoint,AColour,BColour,classes) {

  this.refpoint=refpoint;
  this.title=title
  this.AColour = AColour;
  this.BColour = BColour;
  this.data=data;
  this.classA=classes[0];
  this.classB=classes[1];

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    leftMargin: 100,
    rightMargin: width,
    topMargin: 80,
    bottomMargin: height,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    // Boolean to enable/disable background grid.
    // grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    // numXTickLabels: 10,
    // numYTickLabels: 8,
  };

  this.draw = function() {
    // Draw labels at the top of the plot.
    this.drawCategoryLabels();

    var lineHeight = (height - this.layout.topMargin) /
        this.data.getRowCount();

    // Loop over every row in the data.
    for (var i = 0; i < this.data.getRowCount(); i++) {

      // Calculate the y position for each company.
      var lineY = (lineHeight * i) + this.layout.topMargin;

      // Create an object that stores data from the current row.
      var company = {
        // Convert strings to numbers.
        'name': this.data.getRow(i).getString("company"),
        'classA': this.data.getRow(i).getNum("female"),
        'classB': this.data.getRow(i).getNum("male")
      };

      // Draw the company name in the left margin.
      fill(0);
      noStroke();
      textAlign('right', 'top');
      text(company.name,
           this.layout.leftMargin - this.layout.pad,
           lineY);

      // Draw female employees rectangle.
      fill(this.AColour);
      rect(this.layout.leftMargin,
           lineY,
           this.mapPercentToWidth(company.classA),
           lineHeight - this.layout.pad);

      // Draw male employees rectangle.
      fill(this.BColour);
      rect(this.layout.leftMargin+this.mapPercentToWidth(company.classA),
           lineY,
           this.mapPercentToWidth(company.classB),
           lineHeight - this.layout.pad);
    }

    // Draw 50% line
    stroke(150);
    strokeWeight(2);
    line(this.refX,
         this.layout.topMargin-10,
         this.refX,
         this.layout.bottomMargin);

     // Draw title
     noStroke();
     textSize(24);
     fill(0);
     textAlign("left");
     text(title,20, 20);

  };


  // Variable reference line location e.g. 50% line.
  this.refX = (this.layout.plotWidth() *refpoint) + this.layout.leftMargin;


  this.drawCategoryLabels = function() {
    fill(0);
    noStroke();
    textSize(10);
    textAlign('left', 'top');
    text('Female',
         this.layout.leftMargin,
         this.layout.topMargin-20);
    textAlign('center', 'top');
    text(round(this.refpoint*100)+'%',
         this.refX-15,
         this.layout.topMargin-10);
    textAlign('right', 'top');
    text('Male',
         this.layout.rightMargin,
         this.layout.topMargin-20);
  };

  this.mapPercentToWidth = function(percent) {
    return map(percent,
               0,
               100,
               0,
               this.layout.plotWidth());
  };

};
