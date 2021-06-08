function TechDiversityRace() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Race';


  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-race';


  // Property to represent whether data has been loaded.
  this.loaded = false;


  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'https://gitcdn.link/repo/shamiejegan/UOL-CM1010/main/data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };


  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element option to filter company name.
    if (document.contains(document.getElementById("company-selection"))) {
      //remove element first
      document.getElementById("company-selection").remove();
    }
    this.selectdiv=createDiv("Company: ").id("company-selection");
    this.selectdiv.style('padding','10px');
    this.selectdiv.style('font-weight','normal');
    this.selectdiv.parent('visual-options');
    this.select = createSelect();
    this.select.style('text-align', 'center');
    this.select.parent('company-selection');

    // Fill the options with all company names.
    for (var i=1;i<this.data.columns.length;i++){
      this.select.option(this.data.columns[i]);
    }

    // Create a select DOM element option to scale plot.
    if (document.contains(document.getElementById("size-slider"))) {
      //remove element first
      document.getElementById("size-slider").remove();
    }
    this.SizeSliderDiv=createDiv("Plot Size: ").id("size-slider");
    this.SizeSliderDiv.style('padding','10px');
    this.SizeSliderDiv.style('font-weight','normal');
    this.SizeSliderDiv.parent('visual-options');
    this.SizeSlider = createSlider(0.25,0.45,0.35,0.01);
    this.SizeSlider.parent('size-slider');

    // Create a select DOM element option to toggle between donut and pie chart mode.
    if (document.contains(document.getElementById("donut-size"))) {
      //remove element first
      document.getElementById("donut-size").remove();
    }
    this.DonutButtonDiv=createDiv("Hole: ").id("donut-size");
    this.DonutButtonDiv.style('padding','10px');
    this.DonutButtonDiv.style('font-weight','normal');
    this.DonutButtonDiv.parent('visual-options');
    this.DonutButton = createSlider(0,1,0,0.01);
    this.DonutButton.parent('donut-size');

  };


  this.destroy = function() {
      this.selectdiv.remove();
      this.SizeSliderDiv.remove();
      this.DonutButtonDiv.remove();
  };


  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var plotsize=this.SizeSlider.value()
    var holesize=this.DonutButton.value()
    var x=100;
    var y=height / 2;
    var diameter=width *plotsize;

    // Get the value of the company we're interested in from the
    // select item.
    var companyName = this.select.value();

    this.pie = new DonutChart(x, y, diameter,holesize,companyName);


    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];

    // Make a title.
    var title = 'Employee diversity at ' + companyName;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
  };

}
