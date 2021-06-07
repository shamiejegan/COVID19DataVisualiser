// function to add up all numbers from an array of numbers

// currently used by:
  // donut-chart.js (to compute the overall sum of numbers forming the full 100% of the pie)

function sum(data) {
  var total = 0;

  // Ensure that data contains numbers and not strings.
  data = stringsToNumbers(data);

  for (let i = 0; i < data.length; i++) {
    total = total + data[i];
  }

  return total;
}
