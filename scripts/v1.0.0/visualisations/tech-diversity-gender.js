function TechDiversityGender() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Gender composition by company';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'tech-diversity-gender';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      'https://gitcdn.link/repo/shamiejegan/UOL-CM1010/main/data/tech-diversity/gender-2018.csv', 'csv', 'header',
      // Callback function to set the value this.loaded to true.
      function(table) {
        self.loaded = true;
      }
    )
  };


  this.setup = function() {
    // Font defaults.
    textSize(12);

    // Create a select DOM element option to move reference line.
    if (document.contains(document.getElementById("ref-line"))) {
      //remove element first
      document.getElementById("ref-line").remove();
    }
    this.refLineDiv=createDiv("Reference Line: ").id("ref-line");
    this.refLineDiv.style('padding','10px');
    this.refLineDiv.style('font-weight','normal');
    this.refLineDiv.parent('visual-options');
    this.refLine = createSlider(0,1,0.5,0.01);
    this.refLine.parent('ref-line');

    // Create a select DOM element option to change female bar colour.
    if (document.contains(document.getElementById("female-colour"))) {
      //remove element first
      document.getElementById("sort-by").remove();
    }
    this.femalecolourdiv=createDiv("Female: ").id("female-colour");
    this.femalecolourdiv.style('padding','10px');
    this.femalecolourdiv.style('font-weight','normal');
    this.femalecolourdiv.parent('visual-options');
    this.femalecolour = createColorPicker('#ed225d')
    this.femalecolour.style('text-align', 'center');
    this.femalecolour.parent('female-colour');

    // Create a select DOM element option to change male bar colour.
    if (document.contains(document.getElementById("male-colour"))) {
      //remove element first
      document.getElementById("sort-by").remove();
    }
    this.malecolourdiv=createDiv("Male: ").id("male-colour");
    this.malecolourdiv.style('padding','10px');
    this.malecolourdiv.style('font-weight','normal');
    this.malecolourdiv.parent('visual-options');
    this.malecolour = createColorPicker('#0000FF')
    this.malecolour.style('text-align', 'center');
    this.malecolour.parent('male-colour');


  };


  this.destroy = function() {
    this.femalecolourdiv.remove();
    this.malecolourdiv.remove();
    this.refLineDiv.remove();
  };


  this.draw = function() {

    // ensure that the data has been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    //customise input parameters to chart constructor
    var refpoint=this.refLine.value();
    var classes=["Female","Male"]
    var AColour= this.femalecolour.value();
    var BColour= this.malecolour.value();
    var title="Gender Diversity in Tech by Companies";


    this.StackedBarChart = new StackedBarChart(
      data=this.data,
      title=title,
      refpoint=refpoint,
      AColour=AColour,
      BColour=BColour,
      classes=classes);

    this.StackedBarChart.draw();

  };


}
