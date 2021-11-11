const LocalStrategy = require("passport-local").Strategy
const db=require("./db")
const initialize=(passport)=>{
    authenticate=(user,password,done)=>{
        db.findone(user).then((res) => {
            var user = res
            // console.log("im herekjbcc", user)
        if (!user) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        else {  return done(null, user) }
      }).catch((err) => { console.log(err) })
    }
passport.use(new LocalStrategy({usernameField:"loginemail", passwordField:"loginPassword"},authenticate))

passport.serializeUser((user, done) => {
    if (user) { return done(null, user.id) }
    return done(null, false)
  });
  passport.deserializeUser((id, done) => {
    db.findbyid(id).then((res) => {
      var user = res
      if (!user) { return done(null, false) }
      return done(null, user)
    }).catch((err) => console.log(err))
  
  })
}
module.exports={initialize}