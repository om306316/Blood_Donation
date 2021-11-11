const mysql = require("mysql")
var pool = mysql.createPool({
    connectionLimit: "10",
    user: "root",
    password: process.env.spassword,
    database: "blood",
    host: "localhost",
    port: "3306",
    charset:'utf8mb4'
});
let db = {}

db.setuser = (user,file) => {
  //  console.log("im here")
    pool.query("insert into user(name,email,address,blood,password,adhaar,lat,log,phone,state,profilepic)values(?,?,?,?,?,?,?,?,?,?,?)", [user.name,user.email,user.address,user.bloodgroup,user.password,user.adhaar,user.lat,user.log, user.phone,user.state,file.path], (err, result) => {
        console.log(err)
        if (err) { return (err) }
        console.log(result) 
        return (result)

    })
}
db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`select name,email,address,gender,pincode,country,description,profilepic  from user`, (err, result) => {
            if (err) { return reject(err) }
            return resolve(result)
       
        })
    })
}
db.findone = (user) => {
    return new Promise((resolve, reject) => {
        // console.log("im here")
        return pool.query("select * from user where email=?", [user], (err, result) => {
            // console.log(result[0])
            if (err) { return reject(err) }
            return resolve(result[0])
            
        })
    })
}
db.findbyid = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`select * from user where id=?`, [id], (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            result[0].password = "not allowed";
            return resolve(result[0])

        })
    })

}
db.setmessage = (message,user, reciever, date,time) => {
   console.log("im in set messages")
    pool.query("insert into chats (sender_id,reciever_id,message,date,time)value(?,?,?,?,?)", [user, reciever, message, date,time], (err, result) => {
        if (err) {  console.log(err) }

        return (result)
        
    })
}
db.senddata = (user) => {
    return new Promise((resolve, reject) => {
        console.log("im in senddata")
        return pool.query("select email from user where name =?", [user], (err, result) => {
        
            if (err) { return reject(err) }

            return resolve(result)

        })
    })
}

db.getmessages = (user, reciever) => {
    return new Promise((resolve, reject) => {
        console.log("im getmessages")
        return pool.query("select u2.name as sender, u.name as reciever,c.message,c.time,c.date from chats c inner join user u on u.id=c.reciever_id inner join user u2 on u2.id=c.sender_id where ( c.reciever_id=? AND c.sender_id=? ) OR ( c.reciever_id=? AND c.sender_id=? ) order by c.id asc", [user, reciever, reciever, user], (err, result) => {
            // console.log(result[0])
            if (err) { return reject(err) }

            return resolve(result)

        })
    })
}



db.alldata=(userid)=>{
    return new Promise((resolve, reject) => {
        pool.query(`select * from user where id=? `, [userid], (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            result[0].password = "not allowed";
            return resolve(result[0])

        })
    })
}
db.setdonor=(user)=>{
    pool.query(`update user set willing="yes" where id=? `, [user], (err, result) => {
        if (err) {
            console.log(err)
            return (err)
        }
        return (result[0])

    })
}
db.deldonor=(user)=>{
    pool.query(`update user set willing="no" where id=? `, [user], (err, result) => {
        if (err) {
            console.log(err)
            return (err)
        }
        return (result[0])

    })
}
db.alldonor=()=>{
   return new Promise((resolve,reject)=>{ 
       pool.query(`select name,blood,state,phone,email ,lat,log from user where willing="yes"`, (err, result) => {
        if (err) {
            console.log(err)
            return reject(err)
        }
        return resolve(result)

    })
})
}
db.donorname=(user)=>{
    return new Promise((resolve,reject)=>{ 
        pool.query(`select name,blood,state,phone,email ,lat,log,request from user where name =?`,[user], (err, result) => {
         if (err) {
             console.log(err)
             return reject(err)
         }
         return resolve(result[0])
 
     })
 })
 }

 db.setrequest=(requ,user)=>{
    
        pool.query(`update user set request=? where id=?`,[requ,user], (err, result) => {
         if (err) {
             console.log(err)
             return (err)
         }
         return (result)
 
 })
 }
 


    module.exports = db