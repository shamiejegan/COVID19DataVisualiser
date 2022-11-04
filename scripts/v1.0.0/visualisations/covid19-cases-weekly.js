function Covid19CasesWeekly() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Growth in Case Count';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'covid19-cases-weekly';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'data/covid19/covid19-overallcases-weekly.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function(table) {
        self.loaded = true;
      }
    )
  };

  // Set up the canvas
  this.setup = function() {

    // Set default displays
    textSize(10);
    strokeWeight(1);
    fill(0);

    //create array of colours of lines
    this.itemcolour=[];
    for (var i = 1; i < this.data.getColumnCount(); i++) {
      //assign a random number to  each country in the dataset
      //ensure darker colour shades by setting limit of 200 instead of 255
      this.itemcolour.push(color(random(0,220),random(0,220),random(0,220)));
    }

    // Create a DOM element to the options section to toggle grid on/off
    // check if element already exists. If so, remove the element
    if (document.contains(document.getElementById("grid-toggle"))) {
      document.getElementById("grid-toggle").remove();
    }
    // create a div block to hold the toggle, as a child of visual-options
    this.gridToggleDiv=createDiv("Display Grids? ").id("grid-toggle");
    this.gridToggleDiv.style('padding','10px');
    this.gridToggleDiv.style('font-weight','normal');
    this.gridToggleDiv.parent('visual-options');
    // create a button with default value of "Off"
    this.gridToggle = createButton("Turn On","Off");
    // the button will be a child of the grid-toggle div block
    this.gridToggle.parent('grid-toggle');
    // add an event handler for changing the toggle when button is clicked
    this.gridToggle.mouseClicked(ToggleGrid);

    // initialise frame count to animate plot once visual is loaded
    frameCount=0;
  };

  // destroy the options added to this viz whenever another visual is active
  this.destroy = function() {
    this.gridToggleDiv.remove();
  };

  // destroy the options added to this viz whenever another visual is active
  this.draw = function() {

    // ensure that the data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // set up variables to be passed as parameters to the chart constructor
    var title=" Weekly New COVID19 Cases (2020)";
    var colours=this.itemcolour;
    var xAxisLabel="Week in 2020";
    var yAxisLabel="Number of cases by country (hover)";
    var datalimit=100000; // minimum weekly cases for country to be displayed

    // set the gridOn value to true/false based on the current button value
    var gridOn;
    if(document.getElementById("grid-toggle").children[0].value=="On"){
      gridOn=true;
    }
    else{
      gridOn=false;
    }

    time=this.data.getColumn('Week');
    // convert arrays of data to numbers
    time=stringsToNumbers(time);

    // Set min and max Weeks: assumes data is sorted by date.
    var startTime = time[0];

    // animate plot for each from count
    //slows down plotting by 2 times
    if(frameCount<=(time.length-1)*2){
      var endTime = time[Math.ceil(frameCount/2)];
    }
    else{
      var endTime = time[time.length-1];
    }


    // Create a new  MulticlassTimeseriesChart object with a constructor
    this.MulticlassTimeseriesChart = new MulticlassTimeseriesChart(
      data=this.data,
      colours=colours,
      title=title,
      xLabel=xAxisLabel,
      yLabel=yAxisLabel,
      gridOn=gridOn,
      startTime=startTime,
      endTime=endTime,
      datalimit=datalimit
    );

    // draw the chart to the screen with the draw method of the chart object
    this.MulticlassTimeseriesChart.draw();

  }

}
