var apiKey = require('./../.env').apiKey;
var issueSearch = require('./../js/doctor.js').issueSearch;
var getSpecialties = require('./../js/doctor.js').getSpecialties;
var specialtySearch = require('./../js/doctor.js').specialtySearch;


var displayDoctors = function(searchType, doctorsList) {
  $('#doctors').empty();
  if (doctorsList.length === 0) {
    $('#doctors').append("Sorry, no doctors meet your search criteria. Please try a different symptom or specialty.");
  }
  for(var i = 0; i<doctorsList.length; i++) {
    $('#doctors').append("<div class='doctor'></div>");
    $('.doctor:nth-child(' + (i+1) + ')').append(
      "<div class='doctor-title'>" +
      doctorsList[i].profile.first_name +
      " " + doctorsList[i].profile.last_name +
      ", " + doctorsList[i].profile.title +
       "</div>" +
       "<div class='doctor-practice'>" +
       doctorsList[i].practices[0].name +
        "</div>" +
       "<img class='doctor-image' src='" +
       doctorsList[i].profile.image_url + "' alt='A picture of Dr.'" + doctorsList[i].profile.first_name + ">" +
       "<div class='doctor-bio'>" +
       doctorsList[i].profile.bio.slice(0, 500) + "...</div>"
    );
  }
};

var displaySpecialties = function(specialtiesList) {
  console.log(specialtiesList);
  for (var i = 0; i<specialtiesList.length; i++) {
    $('#specialties').append(
      "<option value='" + specialtiesList[i].uid + "'>" + specialtiesList[i].name + "</option>"
    )
  }
};

$(document).ready(function() {
  getSpecialties(displaySpecialties);
  $('#issueSearch').submit(function(event) {
    event.preventDefault();
    var medicalIssue = $('#issue').val();
    issueSearch(medicalIssue, displayDoctors);
  });

  $('#specialtiesSearch').submit(function(event) {
    event.preventDefault();
    var specialty = $('#specialties').val();
    specialtySearch(specialty, displayDoctors);
  });


});
