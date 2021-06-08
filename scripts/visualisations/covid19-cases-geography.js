function Covid19CasesGeography() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'COVID19: Geographic View';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'covid19-cases-geographic';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'https://gitcdn.link/repo/shamiejegan/UOL-CM1010/main/data/covid19/Covid19-overallcases-geographically.csv', 'csv', 'header',
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

    ncountries=this.data.getRowCount();

    // Create a select DOM element option to filter number of countries to be displayed.
    // check if element already exists. If so, remove the element
    if (document.contains(document.getElementById("country-scale"))) {
      document.getElementById("ref-line").remove();
    }
    this.countryScaleDiv=createDiv("Number of Countries to Display: ").id("country-scale");
    this.countryScaleDiv.style('padding','10px');
    this.countryScaleDiv.style('font-weight','normal');
    this.countryScaleDiv.parent('visual-options');
    this.countryScale = createSlider(0,ncountries,5,1);
    this.countryScale.parent('country-scale');

  };


  this.destroy = function() {
    this.countryScaleDiv.remove();
  };


  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get data from the table object.
    var dimension = this.data.getColumn(0);
    var size = stringsToNumbers(this.data.getColumn(1));
    var latitude = stringsToNumbers(this.data.getColumn(2));
    var longitude = stringsToNumbers(this.data.getColumn(3));

    var maxcountries=this.countryScale.value();

    var title=" COVID19 Cases Around the World in 2020 (" + maxcountries + " displayed)";


    this.MapBubbleChart = new MapBubbleChart(
      maxdimension=maxcountries,
      title=title,
      longitude=longitude,
      latitude=latitude,
      size=size,
      dimension=dimension);

    this.MapBubbleChart.draw();

  };

};
