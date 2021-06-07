function DonutChart(x, y, diameter, donuthole, companyName) {

  this.companyName=companyName;

  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    x: x,
    y: y+10,
    diameter:diameter,
    labelSpace: 30,
    donuthole:donuthole,
    rightMargin: width,
    topMargin: 80,
    bottomMargin: height,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    }

    // Boolean to enable/disable background grid.
    // grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    // numXTickLabels: 10,
    // numYTickLabels: 8,
  };

  this.get_radians = function(data) {

    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function(data, labels, colours, title) {

    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
        Labels (length: ${labels.length})
        Colours (length: ${colours.length})
        Arrays must be the same length!`);
    }



    // https://p5js.org/examples/form-pie-chart.html

    var angles = this.get_radians(data);
    var lastAngle = 0;
    var colour;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      stroke(0);
      strokeWeight(1);

      arc(this.layout.x+(this.layout.diameter/2), 50+(this.layout.diameter/2),
          this.layout.diameter, this.layout.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      if (labels) {
        this.makeLegendItem(labels[i] + ", "+ round(data[i]) + "%", i, colour);
      }

      lastAngle += angles[i];

    }

    if (title) {
      noStroke();
      textSize(24);
      text(title, 20, 30);
    }

    //donut hole
    fill(255);
    ellipse(this.layout.x+(this.layout.diameter/2), 50+(this.layout.diameter/2), diameter/2*donuthole)

    // xompany name in middle of hole if the hole is large enoug
    if(donuthole>=0.3){
      textAlign("center")
      fill(0);
      textSize(24*(donuthole)) //hack for 0!
      text("100%",this.layout.x+(this.layout.diameter/2),50+(this.layout.diameter/2))

    }


  };

  this.makeLegendItem = function(label, i, colour) {
    var x = this.layout.x + 50 + this.layout.diameter;
    var y = 80 + (this.layout.labelSpace * i);
    var boxWidth = this.layout.labelSpace/2;
    var boxHeight = this.layout.labelSpace/2;

    fill(colour);
    rect(x, y, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    text(label, x + boxWidth + 10, y + boxWidth / 2);
  };

}
