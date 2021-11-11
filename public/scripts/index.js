var firebaseConfig = {
  apiKey: "AIzaSyC3YZdO8fmyvtAupcmZbKn52nYtZQ84wew",
  authDomain: "blood-donation-5150a.firebaseapp.com",
  databaseURL: "https://blood-donation-5150a-default-rtdb.firebaseio.com",
  projectId: "blood-donation-5150a",
  storageBucket: "blood-donation-5150a.appspot.com",
  messagingSenderId: "319252959660",
  appId: "1:319252959660:web:d3f8b3ed378480bde0ea09",
  measurementId: "G-5HD7W8LLG3"
};
 
firebase.initializeApp(firebaseConfig);
var inputData= firebase.database().ref('data');



document.getElementById('donationForm').addEventListener('submit', submitForm);
function submitForm(e)
 { 
  e.preventDefault(); 
  var personname=document.getElementById("personname").value;
  var age=document.getElementById("age").value;
  var bloodgrp=document.getElementById("bloodgrp").value;
  var address=document.getElementById("address").value;
  var condition=document.getElementById("condition").value;
  var country=document.getElementById("country").value;
  var city=document.getElementById("city").value;
  var state=document.getElementById("state").value;
  var zip=document.getElementById("zip").value;
  console.log('form is submitted');
  console.log(personname);
  console.log(age);
  console.log(bloodgrp);
  console.log(address);
  console.log(condition);
  console.log(country);
  console.log(city);
  console.log(state);
  console.log(zip);
 
  saveData(personname,age,bloodgrp,address,condition,country,city,state,zip);
 }
 function saveData(personname,age,bloodgrp,address,condition,country,city,state,zip)
 {
     var newData=inputData.push();
     newData.set({
       personname:personname,
       age:age,
       bloodgrp: bloodgrp,
       address:address,
       condition: condition,
       country: country,
       city: city,
       state: state,
       zip: zip
     });
 }
 