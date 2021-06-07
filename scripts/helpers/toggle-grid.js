// function to toggle the on/off functionality of grid lines

// Currently used by time series charts:
// multiclass-timeseries-chart.js
// timeseries-chart.js

function ToggleGrid() {
  // assign DOM element to a variable
  var v= document.getElementById("grid-toggle").children[0];

  if (v.value=="On"){
    // If the current value is "On", toggle it off
    v.value = "Off";
    // Update the text on the button to indicate instruction to turn back on
    v.innerText= "Turn On";
  }
  else{
    // If the current value is "Off", toggle it on
    v.value = "On";
    // Update the text on the button to indicate instruction to turn back off
    v.innerText= "Turn Off"
  }
}
