function Covid19CasesGeography() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Covid19 Cases in 2020: Geographic View';


  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'covid19-cases-geographic';


  // Property to represent whether data has been loaded.
  this.loaded = false;


  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/covid19/Covid19-overallcases-geographically.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };


  this.setup = function() {
    // Font defaults.
    textSize(10);

    ncountries=this.data.getRowCount();

    // Create a select DOM element option to filter number of countries to be displayed.
    if (document.contains(document.getElementById("country-scale"))) {
      //remove element first
      document.getElementById("ref-line").remove();
    }
    this.countryScaleDiv=createDiv("Number of Countries to Display: ").id("country-scale");
    this.countryScaleDiv.style('padding','10px');
    this.countryScaleDiv.style('font-weight','normal');
    this.countryScaleDiv.parent('visual-options');
    this.countryScale = createSlider(1,ncountries,5,1);
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
    var size = this.data.getColumn(1);
    var latitude = this.data.getColumn(2);
    var longitude = this.data.getColumn(3);

    var maxcountries=this.countryScale.value();

    var title=" Countries Displayed: ";


    this.mapbubbleplot = new MapBubblePlot(maxcountries,title,longitude,latitude,size,dimension);

    this.mapbubbleplot.draw();

  };


}
