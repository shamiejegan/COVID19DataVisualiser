// Function to draw bubble chart to the screen.
// This function is called by a visual constructor to plot a pie or donut chart.
// REFERENCE: https://p5js.org/examples/form-pie-chart.html

function DonutChart(x, y, diameter, donuthole) {

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 0,
    rightMargin: width-50,
    topMargin: 80,
    bottomMargin: height,
    labelSpace: 30, // gap between each label item
    pad:10,
    x: x, // x position of the centre of the chart
    y: y+10, // y position of the centre of the chart
    diameter:diameter, // diameter of chart
    donuthole:donuthole // size of hole in the middle of the chart
  };

  // method to convert the data into radians for plotting the chart
  this.get_radians = function(data) {
    //get the total sum of variable from data (100%)
    var total = sum(data);
    // for each row item, convert it into radians and push it into an array
    var radians = [];
    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }
    // return the array of radians to plot chart
    return radians;
  };

  // draw method called by the visualiser to plot the chart after setting it up
  this.draw = function(data, labels, colours, title) {

    // Test that data is not empty
    if (data.length == 0) {
      alert('Data has length zero!');
    }
    // Test that each input array is the same length.
    else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })){ //alert user if inputs are not of same length
      alert(`Data (length: ${data.length})
        Labels (length: ${labels.length})
        Colours (length: ${colours.length})
        Arrays must be the same length!`);
    }

    //convert the array of data into respective radians
    var angles = this.get_radians(data);

    // variable to kep track of the last point /angle of the ellipse drawn to screen
    var lastAngle = 0;
    var colour;

    // loop through each category of dataset
    for (var i = 0; i < data.length; i++) {
      // map colour to item
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      stroke(0);
      strokeWeight(1);

      // draw portion of the pie chart, with angle associated to value
      arc(this.layout.x+(this.layout.diameter/2), this.layout.topMargin+(this.layout.diameter/2),
          this.layout.diameter, this.layout.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      // draw corresponding legends
      if (labels) {
        this.makeLegendItem(labels[i] + ", "+ round(data[i]) + "%", i, colour);
      }

      // update angle - next category will have starting point at the end of this point
      lastAngle += angles[i];

    }

    // draw a white ellipse in the middle of chart to give illusion of donuthole
    // dynamically change size
    fill(255);
    ellipse(this.layout.x+(this.layout.diameter/2), this.layout.topMargin+(this.layout.diameter/2), (diameter*donuthole))

    // add title to chart
    addTitle(title)

  };

  // method for drawing legends
  this.makeLegendItem = function(label, i, colour) {
    var x = this.layout.x + 50 + this.layout.diameter;
    var y = 50 + (this.layout.labelSpace * i);
    var boxWidth = this.layout.labelSpace/2;
    var boxHeight = this.layout.labelSpace/2;

    fill(colour);
    rect(x, y + (diameter / 2) - this.layout.topMargin, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    text(label, x + boxWidth + 10, y + (diameter / 2) - this.layout.topMargin+10);
  };

}
