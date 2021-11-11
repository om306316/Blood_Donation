# blood_donation_website

steps to run this website on your device.

1->To make this work you need to have node js installed.

1.1->Download repository.

2->You can do npm install to intall all dependencies.(open this folder in vs code,go to terminal and type npm install).

2.1->Till now you should be able to see login page and home page thats open to everyone .

2.2->Now you need to set up you sql server on your device.

3->This project use my sql .So u need to known how to set up sql server in your system .

4->In sql i used database = blood (database name)and it uses 1 table -> user (table name) .

4.1->user contains fields -> id,name,email,adhaar,password,profilepic,address,state,lat,log,blood,phone,willing (these are coloumns name).

4.2 ->make a table with these fied and u can go to next step.

4.3>You ned to make a .env file in this folder and set some varibles like. 

( example:-email="xxxxx@gmail.com" - email id ( also u need to set this gmail's setting .go to manage your account ->security->less secure app access ->turn on)
  pass="xxxxxx"  ->email password (this is a gmail password)
  spassword="xxxxx" ->sql password
  session_secret="xxxxxxxxx" ->random password )

4.4->Till now if u try to create account and login it should run and save data in sql . If it not work u can see db.js file where u mainly interact with your sql server . (may be you are not connected to your sql server).

5->Now you just need to add some more data to your database.

6->On calles like /all ,you can set a midleware like "checkauth ".

7->This project is not complete yet. if you want, you can complete it.

info about files 

Profile is user profile html and js.

profile2 is profile user who alert user by sending email.

login for login page.

app.js server code.

db.js  mysql connection.

notes.html and notes.js is to get donors detail page.

strategy.js is for login using passport local strategy.

email.js to send email when user press send email alert . You can add in verify email in starting of creating account (i didn't do this ) .

public is all static stuff for your site.











