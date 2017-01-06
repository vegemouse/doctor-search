(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "310c20762051ab6ac8d8c1f6e17ea097";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/doctor.js":2}]},{},[3]);
