// function to convert number format into comma separated in thousands
// utilises regex

// currently used by:
  // draw-yaxis-ticklabels.js (helper function to plot yaxis tickers)
  // multiclass-timeseries-chart (for pointer label when hovered)
function numberToCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
