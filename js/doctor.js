var apiKey = require('./../.env').apiKey;

exports.getDoctors = function(medicalIssue, displayFunction) {
  var doctorsList = [];
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      for (var i = 0; i<result.data.length; i++) {
        doctorsList.push(result.data[i]);
      }
      displayFunction(medicalIssue, doctorsList);
    })
   .fail(function(error){
      console.log("request failed");
    });
};
