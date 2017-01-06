var apiKey = require('./../.env').apiKey;

exports.getSpecialties = function(displayFunction) {
  var specialtiesList = [];
  $.get('https://api.betterdoctor.com/2016-03-01/specialties?user_key=' + apiKey)
   .then(function(result) {
     for (var i = 0; i<result.data.length; i++) {
       specialtiesList.push(result.data[i]);
     }
     displayFunction(specialtiesList);
    })
   .fail(function(error){
      console.log("request failed");
    });
};

exports.issueSearch = function(medicalIssue, displayFunction) {
  var doctorsList = [];
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C&user_location=45.5231%2C-122.6765&skip=0&limit=50&user_key=' + apiKey)
   .then(function(result) {
     console.log(result);
      for (var i = 0; i<result.data.length; i++) {
        doctorsList.push(result.data[i]);
      }
      displayFunction(medicalIssue, doctorsList);
    })
   .fail(function(error){
      console.log("request failed");
    });
};

exports.specialtySearch = function(specialty, displayFunction) {
  var doctorsList = [];
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=' + specialty + '&location=45.5231%2C-122.6765%2C&user_location=45.5231%2C-122.6765&skip=0&limit=50&user_key=' + apiKey)
   .then(function(result) {
     console.log(result);
      for (var i = 0; i<result.data.length; i++) {
        doctorsList.push(result.data[i]);
      }
      displayFunction(specialty, doctorsList);
    })
   .fail(function(error){
      console.log("request failed");
    });
};
