function PayGapByJob2017() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Pay gap: Gender inequality by Job Type';

  // Each visualisation must have a unique ID with no special characters.
  this.id = 'pay-gap-by-job-2017';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data.
  // Function is called automatically by gallery when a visualisation is added.
  this.preload = function() {

    var self = this;
    this.data = loadTable(
      'data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
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

    // Create a select DOM element option to filterjob type variable.
    if (document.contains(document.getElementById("jobype-selection"))) {
      //remove element first
      document.getElementById("jobype-selection").remove();
    }
    this.selectdiv=createDiv("Job Type: ").id("jobype-selection");
    this.selectdiv.style('padding','10px');
    this.selectdiv.style('font-weight','normal');
    this.selectdiv.parent('visual-options');
    this.select = createSelect();
    this.select.style('text-align', 'center');
    this.select.parent('jobype-selection');
    this.select.style('width','100px');

    // add in filter options based on unique job type in dataset
    jobtypes=[];
    for (var i=0;i<this.data.rows.length;i++){
      //https://www.w3schools.com/jsref/jsref_includes_array.asp
      if(! jobtypes.includes(this.data.getColumn('job_type')[i])){
        jobtypes.push(this.data.getColumn('job_type')[i])
      }
    }

    // Fill the options with all job types.
    this.select.option("All"); // add an option to include all items
    for (var i=1;i<jobtypes.length;i++){
      this.select.option(jobtypes[i]);
    }

  };

  this.destroy = function() {
    this.selectdiv.remove()
  };

  this.draw = function() {

    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get data from the table object.
    var filter=this.select.value();

    // get indexes where value matches filter criteria
    indexes=[]
    for (var i=0; i<this.data.rows.length; i++){
      if(this.data.getColumn('job_type')[i]==filter){
        indexes.push(i)
      }
    }

    // if all is selected, do not filter the data
    if(filter == "All"){
      var label=this.data.getColumn('job_subtype');
      var x = stringsToNumbers(this.data.getColumn('proportion_female'));
      var y = stringsToNumbers(this.data.getColumn('pay_gap'));
      var size = stringsToNumbers(this.data.getColumn('num_jobs'));
    }
    else{ // if a filter is being selected, only pass rows where filters match value

      var label=[]
      var x = []
      var y = []
      var size = []

      // push the values of data into an array depending on the filters
      for (var i=0; i<indexes.length; i++){
        label.push(this.data.getColumn('job_subtype')[indexes[i]]);
        x.push(this.data.getColumn('proportion_female')[indexes[i]]);
        y.push(this.data.getColumn('pay_gap')[indexes[i]]);
        size.push(this.data.getColumn('num_jobs')[indexes[i]]);
      }
    }

    var title="Inequality of pay across industries (2017)";

    this.bubblechart=new BubbleChart(title,size,x,y,label);
    this.bubblechart.draw();

  };

}
