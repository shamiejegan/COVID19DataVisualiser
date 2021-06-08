// function to convert strings into numbers

// currently used by
  //covid19-cases-geography.js (to convert latitude, longitute, and cases volume into numeric format)
  //pay-gap-by-job.js (to convert propertion, pay gap, and number of jobs into numeric format)
  //sum.js (to convert data for the sum helper function into numeric format)


function stringsToNumbers (array) {
  return array.map(Number);
}
