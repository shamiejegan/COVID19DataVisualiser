function PayGapTimeSeries() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Pay gap: Over the years';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'pay-gap-timeseries';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/all-employees-hourly-pay-by-gender-1997-2017.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  // Set up the canvas
  this.setup = function() {

    // Set default displays
    textSize(10);
    strokeWeight(1);
    fill(0);

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

    // Create a DOM element to the options section to filter years
    // check if element already exists. If so, remove the element
    if (document.contains(document.getElementById("year-scale"))) {
      //remove element first
      document.getElementById("ref-line").remove();
    }
    // identify number of years in the dataset
    nYrs=this.data.getColumn('year').length-1;

    this.startYrScaleDiv=createDiv("Start Time: ").id("start-yr-scale");
    this.startYrScaleDiv.style('padding','10px');
    this.startYrScaleDiv.style('font-weight','normal');
    this.startYrScaleDiv.parent('visual-options');
    this.StartYrScale = createSlider(0,nYrs,0,1); //default value of 0
    this.StartYrScale.parent('start-yr-scale');

    this.endYrScaleDiv=createDiv("End Time: ").id("end-yr-scale");
    this.endYrScaleDiv.style('padding','10px');
    this.endYrScaleDiv.style('font-weight','normal');
    this.endYrScaleDiv.parent('visual-options');
    this.EndYrScale = createSlider(1,nYrs,nYrs,1); //default value = max years
    this.EndYrScale.parent('end-yr-scale');

    // initialise frame count to animate plot once visual is loaded
    frameCount=0;
  };

  // destroy the options added to this viz whenever another visual is active
  this.destroy = function() {
    this.gridToggleDiv.remove();
    this.startYrScaleDiv.remove();
    this.endYrScaleDiv.remove();
  };

  // destroy the options added to this viz whenever another visual is active
  this.draw = function() {

    // ensure that the data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Prevent slider ranges overlapping.
    if (this.StartYrScale.value() >= this.EndYrScale.value()) {
      this.StartYrScale.value(this.EndYrScale.value() - 1);
    }

    // filter data to include only filtered timestamps using slice method
    time=this.data.getColumn('year')
    .slice(this.StartYrScale.value(),this.EndYrScale.value()+1);
    pay_gap=this.data.getColumn('pay_gap')
    .slice(this.StartYrScale.value(),this.EndYrScale.value()+1);

    // convert arrays of data to numbers
    time=stringsToNumbers(time);
    pay_gap=stringsToNumbers(pay_gap);

    // dynamically modify title based on filtering
    var title = "Inequality of pay decreasing across years ("
      + time[0]
      + " - "
      + time[time.length-1]
      + ")";

    var xAxisLabel = 'Year';
    var yAxisLabel = 'Pay Gap (%)';

    // set the gridOn value to true/false based on the current button value
    var gridOn;
    if(document.getElementById("grid-toggle").children[0].value=="On"){
      gridOn=true;
    }
    else{
      gridOn=false;
    }

    // Set min and max Weeks: assumes data is sorted by date.
    var startTime = time[0];
    // animate plot for each from count
    //slows down plotting by 5 times
    if(frameCount<=(time.length-1)*5){
      var endTime = time[Math.ceil(frameCount/5)];
    }
    else{
      var endTime = time[time.length-1];
    }

    this.timeseries= new TimeSeriesChart(
      x=time,
      y=pay_gap,
      title=title,
      xLabel=xAxisLabel,
      yLabel=yAxisLabel,
      gridOn=gridOn,
      startTime=startTime,
      endTime=endTime,
      minY=0,
      maxY=50,
      baseLine=0
    );
    this.timeseries.draw();

    frameCount++;

  };
}
