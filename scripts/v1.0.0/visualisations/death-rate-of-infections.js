function DeathRateOfInfection() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Death Rate of Infection';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'death-rate-of-infections';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'https://gitcdn.link/repo/shamiejegan/UOL-CM1010/main/data/covid19/percentage-death-cases-2020.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

// Set up the canvas
  this.setup = function() {

    // ensure data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Set default displays
    textSize(10);
    strokeWeight(1);
    fill(0);

    // Create a select DOM element option to filter company name.
    // check if element already exists. If so, remove the element
    if (document.contains(document.getElementById("company-selection"))) {
      document.getElementById("company-selection").remove();
    }

    // create a div block to hold the selector, as a child of visual-options
    this.selectdiv=createDiv("Company: ").id("company-selection");
    this.selectdiv.style('padding','10px');
    this.selectdiv.style('font-weight','normal');
    this.selectdiv.parent('visual-options');
    // create dropdown selector
    this.select = createSelect();
    this.select.style('text-align', 'center');
    // the dropdown will be a child of the grid-toggle div block
    this.select.parent('company-selection');

    // Fill the options with all company names from dataset
    for (var i=1;i<this.data.columns.length;i++){
      this.select.option(this.data.columns[i]);
    }

    // create a div block to hold the slider, as a child of visual-options
    // check if element already exists. If so, remove the element

    // Create a select DOM element option to toggle between donut and pie chart mode.
    if (document.contains(document.getElementById("donut-size"))) {
      //remove element first
      document.getElementById("donut-size").remove();
    }
    this.DonutButtonDiv=createDiv("Hole: ").id("donut-size");
    this.DonutButtonDiv.style('padding','10px');
    this.DonutButtonDiv.style('font-weight','normal');
    this.DonutButtonDiv.parent('visual-options');
    this.DonutButton = createSlider(0,0.7,0,0.01);
    this.DonutButton.parent('donut-size');

  };


  this.destroy = function() {
      this.selectdiv.remove();
      this.DonutButtonDiv.remove();
  };


  this.draw = function() {

    // ensure that the data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    //customise input parameters to chart constructor
    var plotsize=0.4
    var holesize=this.DonutButton.value()
    var x=100;
    var y=height / 2;
    var diameter=width *plotsize;

    // Get the value of the company we're interested in from the
    // select item.
    var country = this.select.value();
    this.donutchart = new DonutChart(x, y, diameter,holesize,country);


    // Get the column of raw data for the respective company that is selected.
    var col = this.data.getColumn(country);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['blue', 'red'];

    // Make a title.
    var title = 'Infection death rate in ' + country;

    // Draw the pie chart!
    this.donutchart.draw(col, labels, colours, title);
  };

}
