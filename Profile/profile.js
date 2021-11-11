

var user=async()=>{
 await axios.get("/alldata").then(res=>{
     document.getElementById("name").innerText=(res.data.name)
     document.getElementById("phone").innerText=res.data.phone
     document.getElementById("adhaar").innerText=res.data.adhaar
     document.getElementById("email").innerText=res.data.email
     document.getElementById("state").innerText=res.data.state
     document.getElementById("name2").innerText=res.data.name.toUpperCase()
     document.getElementById("blood").innerText=res.data.blood
     document.getElementById("willing").innerText=res.data.willing
      var link= `<a href="/profilealert/a/${res.data.request}"> Profile</a>`;
     document.getElementById("location_alert_person_account").innerHTML=link
     document.getElementById("pimg").setAttribute("src",`/profile/${res.data.email}`)
   //  document.getElementById("location").setAttribute("is","x-frame-bypass")
    document.getElementById("location").setAttribute("src",`https://maps.google.com/maps/embed/v1/place?key=AIzaSyAN1BYyVRiefLgflWt4U4_4OHUkNltyfZE&q=${res.data.lat},${res.data.log}`)
    document.getElementById("location2").setAttribute("href",`https://maps.google.com/maps?q=${res.data.lat},${res.data.log}&hl=es;z=14&amp;output=embed`)
    if(res.data.willing=="yes"){
      document.getElementById("blood_donate2").innerText="remove me from donor list";
document.getElementById("blood_donate2").removeEventListener("click",setdonor)
document.getElementById("blood_donate2").addEventListener("click",deletedonor)
    }else{
      document.getElementById("blood_donate2").innerText="click and be a donor";
    document.getElementById("blood_donate2").removeEventListener("click",deletedonor)
    document.getElementById("blood_donate2").addEventListener("click",setdonor)}
   
  })
}
user();
var setdonor =async()=>{
await axios.get("/setdonor").then(res=>console.log(res.data)).catch(e=>console.log(e))
document.getElementById("willing").innerText="Yes"
document.getElementById("blood_donate2").innerText="remove me from donor list";
document.getElementById("blood_donate2").removeEventListener("click",setdonor)
document.getElementById("blood_donate2").addEventListener("click",deletedonor)
}
var deletedonor=async()=>{
  await axios.get("/deldonor").then(res=>console.log(res.data)).catch(e=>console.log(e))
  document.getElementById("willing").innerText="No"
document.getElementById("blood_donate2").innerText="click and be a donor";
document.getElementById("blood_donate2").removeEventListener("click",deletedonor)
document.getElementById("blood_donate2").addEventListener("click",setdonor)
}
var deldonor



