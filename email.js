
var nodemailer=require("nodemailer")


var verify=(obj)=>{ 
    var transport= nodemailer.createTransport({service:"gmail",auth:{user:process.env.email,pass:process.env.pass}})
     var text="please visit site ,someone nearby need help .You can see there location through site"
    
 var option={
     from: `${process.env.email}`,
     to:`${obj.email}`,
     subject:"donate blood alert ",
     text: text
 }
 console.log(option)
 try{var err2=0
 transport.sendMail(option,(err,info)=>{if(err){err2=err; console.log(err);}})
 if (err2){return 0}
 return 1;}
 catch(e){console.log("email not found")
return 0}
}
module.exports={verify}