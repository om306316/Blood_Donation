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

  document.getElementById('requestForm').addEventListener('submit',detailForm);
 
  function detailForm(e) 
  {
    e.preventDefault();
    console.log('Request Button is Clicked');
    var refdata=firebase.database().ref('data');
    refdata.on('value',gotData,gotError);    
  }
  function gotData(data){
    var count=data.val();
    var keys=Object.keys(count);
    console.log(keys);
    var requestCity=document.getElementById("requestCity").value;
    console.log(requestCity);
    var bldgrp=document.getElementById("bldgrp").value;
    console.log(bldgrp);
    // console.log(count);
    for(var i=0;i<keys.length;i++)
    {
      var key=keys[i];
      var city=count[key].city;
      var bloodgrp=count[key].bloodgrp;
      var personname=count[key].personname;
      var address=count[key].address;
      if(requestCity===city && bldgrp===bloodgrp)
      {
      console.log('MATCH EXISTS');
      console.log(address);
      console.log(personname);
      alert(personname+" "+ " -"+" "+address);
      }   
      if(requestCity!==city)
      {
       alert('MATCH DOESNT EXIST');
      }
      
  }
      // console.log(city);
    } 
 
  function gotError(err){
    console.log(err);
    console.log('error occured');
  }