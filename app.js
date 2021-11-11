require("dotenv").config()
const exp = require("express")
const path = require("path")
const ses = require('express-session')
const passport = require("passport")
const db = require("./db.js")
const bodyParser = require("body-parser")
const {initialize}=require("./strategy")
const axios=require("axios")
const {verify}=require("./email.js")
initialize(passport);
const app = exp()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.urlencoded({ extended: true }))

const multer = require("multer")
const filestore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imag")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname)
  }
  
  
})
const upload = multer({ storage: filestore })

      
      app.use(exp.static("./public"))
      app.use(ses({
        secret: process.env.session_secret,
        resave: false,
        saveUninitialized:false,
        cookie: { secure: false }
      }))
      app.use(passport.initialize());
      app.use(passport.session());
      



function checkauth(req, res, done) {
  if (req.isAuthenticated()) {return done() }
  return res.redirect("/login")
}
function notauth(req, res, done) {
  if (!req.isAuthenticated()) {return done() }
  return res.redirect("/prof")
}

app.get("/logout", checkauth, (req, res) => {
  req.logout();
  res.redirect("/")
})

app.get("/prof",checkauth, (req, res) => {
  // console.log("im in lol", req.session)
  res.cookie("name", req.user.name)//can add more details
  res.sendFile(path.join(__dirname, "/Profile/profile.html"))
})




// app.get("/lol/:Rname", isAuthenticated, (req, res) => {
//   // console.log("im in lol", req.session)
//   res.cookie("name", req.user.name)//can add more details
//   res.cookie("Rname",req.params.Rname)
//   res.sendFile(path.join(__dirname, "/client/index2.html"))
// })

app.get("/client.js", checkauth, (req, res) => {
  // console.log("im in lol", req.session)
  res.sendFile(path.join(__dirname, "/client/client.js"))
})
app.get("/style2", checkauth, (req, res) => {
  // console.log("im in lol", req.session)
  res.sendFile(path.join(__dirname, "/client/style.css"))
})
app.get("/profile.js", checkauth, (req, res) => {
  // console.log("im in lol", req.session)
  res.sendFile(path.join(__dirname, "/Profile/profile.js"))
})




app.post('/login',notauth ,passport.authenticate('local'), (req, res) => {
  res.redirect("/prof")
});


app.get('/login', notauth,(req, res) => {
  res.sendFile(path.join(__dirname, "/login/login.html"))
});

app.get("/profile/:name", checkauth, async (req, res) => {
  console.log(req.params.name)
  var p;
  await db.findone(req.params.name).then((res) => {
    p = res
    console.log(res)
  }).catch(e => console.log(e))
  res.sendFile(path.resolve(String(p.profilepic)))
})

app.get("/profilealert/a/:name", checkauth, async (req, res) => {
  res.cookie("Rname", req.params.name)
  res.sendFile(path.join(__dirname, "/profile2/profile2.html"))
})
app.get("/profile2.js", checkauth, async (req, res) => {

  res.sendFile(path.join(__dirname, "/profile2/profile2.js"))
})
app.get("/profile2.css", checkauth, async (req, res) => {

  res.sendFile(path.join(__dirname, "/public/profile.css"))
})


// app.get('/create', (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/login.html"))
// });

app.post('/create', upload.single('image'), (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log("in create")
  console.log(obj, req.file)
  console.log(req.file)
  db.setuser(obj, req.file)
  // res.sendFile(path.resolve(req.file.path))
  res.redirect("/login")
});

app.get("/alldata",checkauth ,async (req, res) => {
  res.send(req.user)
})
app.get("/setdonor",checkauth ,async (req, res) => {
  db.setdonor(req.user.id)
  return res.sendStatus(200)
})
app.get("/deldonor",checkauth ,async (req, res) => {
  db.deldonor(req.user.id)
  return res.sendStatus(200)
})
app.get("/sendalert/:name" ,async (req, res) => {

  db.senddata(req.params.name).then(resp=>{console.log(resp);verify(resp[0])})
  db.setrequest(req.params.name,req.user.id)
  res.redirect("/getdonor")
})

app.get("/getdonor", (req, res) => {
  res.sendFile(path.join(__dirname, "/notes2.html"))
})
app.get("/notes.js",(req, res) => {
  res.sendFile(path.join(__dirname, "/notes.js"))
})
app.get("/alldata/:name",checkauth ,async (req, res) => {
  var data;
 await db.donorname(req.params.name).then(resp=>{ data=resp}).catch(e=>console.log(e))
res.send(data)

})

app.get("/all",(req, res) => {
  console.log("getting donor")
  db.alldonor().then(resp=>{res.send(Array(resp))}).catch(e=>console.log(e))

})
 

// app.get("/map/:lat/:log",checkauth ,async (req, res) => {
//   await axios.get(`https://maps.google.com/maps?q=${req.params.lat},${req.params.log}&hl=es;z=14&amp;output=embed`).then(resp=>{resp.headers["x-frame-options"]="ALLOW-FROM *" ; res.send(resp.data)})
// })
app.listen('8080', () => { console.log("server is listening"); })
