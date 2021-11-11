


console.log("Welcome to notes app. This is app.js");


// If user adds a note, add it to the localStorage

showNotes();
// Function to show elements from localStorage
async function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
await axios.get("/all").then(res=>{notesObj=(res.data)}).catch(e=>{console.log(e)})
//console.log(notesObj)

  let html = "";
  for(var index=0;index< notesObj[0].length;index++) {element=notesObj[0][index]
    // console.log(element)
    // console.log(element['name'])
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element["name"]}</h5>
                        <p class="card-text">Blood: ${element["blood"]}<br>State:${element["state"]}<br>Phone:${element["phone"]}<br>Email:${element["email"]}  </p>
                        <a 
                        href="https://maps.google.com/maps?q=${element["lat"]},${element["log"]}&hl=es;z=14&amp;"
                        style="color:white;text-align:left" 
                        target="_blank"
                       ><button class="btn btn-light">Location Here</button></a><br><br>
                      <a href="/sendalert/${element["name"]}"> <button class="btn btn-secondary">Send a email alert</button></a>
                    </div>

                </div>`;
  };
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    console.log(noteCards)
    Array.from(noteCards).forEach(function(element){
      console.log(element)
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
