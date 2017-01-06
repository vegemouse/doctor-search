var apiKey = require('./../.env').apiKey;
var getDoctors = require('./../js/doctor.js').getDoctors;

var displayDoctors = function(medicalIssue, doctorsList) {
  console.log(doctorsList);
  for(var i = 0; i<doctorsList.length; i++) {
    $('#doctors').append(doctorsList[i].profile.first_name);
  }
};

$(document).ready(function() {
  $('#getDoctors').submit(function(event) {
    event.preventDefault();
    var medicalIssue = $('#issue').val();
    getDoctors(medicalIssue, displayDoctors);
  });
});
