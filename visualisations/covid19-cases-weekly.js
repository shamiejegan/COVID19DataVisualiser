function Covid19CasesWeekly() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Covid19 Cases in 2020: Weekly View';


  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'covid19-cases-weekly';


  // Property to represent whether data has been loaded.
  this.loaded = false;


  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'https://gitcdn.link/repo/shamiejegan/UOL-CM1010/main/data/covid19/Covid19-overallcases-weekly.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };


  this.setup = function() {
    // Font defaults.
    textSize(10);

    //set colours of lines
    this.itemcolour=[];
    for (var i = 1; i < this.data.getColumnCount(); i++) {
      this.itemcolour.push(color(random(0,255),random(0,255),random(0,255)));
    }


    // Create a select DOM element option to filter number of countries to be displayed.
    // if (document.contains(document.getElementById("country-scale"))) {
    //   //remove element first
    //   document.getElementById("ref-line").remove();
    // }
    // this.countryScaleDiv=createDiv("Number of Countries to Display: ").id("country-scale");
    // this.countryScaleDiv.style('padding','10px');
    // this.countryScaleDiv.style('font-weight','normal');
    // this.countryScaleDiv.parent('visual-options');
    // this.countryScale = createSlider(1,1.2,1.1,0.001);
    // this.countryScale.parent('country-scale');

  };


  this.destroy = function() {
    // this.countryScaleDiv.remove();
  };


  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var title=" Weekly Covid19 Cases in 2020";

    var colours=this.itemcolour


    this.multiclassline = new MultiClassLineChart(this.data,colours,title);

    this.multiclassline.draw();

  };


}
