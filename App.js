var http = require('http').Server(app);
var fs = require('fs');
var express    = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var cons = require('consolidate');
var mongoose = require('mongoose');  
var Login = require('./Login');
var Nurse = require('./Nurse'); 
var Family = require('./Family'); 
var io = require('socket.io')(http);
var Pug = require('pug');
var io = require('socket.io-client');
//ioClient = io.connect('http://localhost:8000');
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'AppPages'));
app.engine('pug', cons.pug);
app.engine('html', cons.swig);
app.set('view engine', 'html');
//mongoose.connect('mongodb://localhost:27017/Amadeco');
mongoose.connect('mongodb://VsoftDemo:vsoft1234@ds145952.mlab.com:45952/amadeco');
var sess;

app.get('/', function(req, res){    
    res.render('Home.html');  
});

app.get('/Nurse', function(req, res){
    res.render('NurseRegistration.html');  
});

app.get('/NurseLogin', function(req, res){
    res.render('NurseLogin.html');  
});

app.get('/LiveTracking', function(req, res){
    res.render('LiveTracking.html');  
});

app.get('/Dashboard', function(req, res){
    
    console.log(req.session.Uname);
    res.render('DashBoard.html');  
});

app.get('/Request', function(req, res){
    res.render('Request.html');
});

app.get('/AddFamily',function(req, res){
    res.render('AddFamily.html');
});

app.get('/UserReq',function(req,res){
 
    res.render('UserNurseRequest.html');
});

app.get('/UserInfo',function(req,res){
 
    res.render('Profile.html');
});

app.get('/GetFamilyInfo',function(req,res){
    console.log(req.session.Uid);
    Family.find({LinkID: req.session.Uid},function(err, famDet) {    
   if(famDet) {
      console.log(famDet);
         res.send(famDet);
   }
   else {
       res.send(err);
   }

    });
});

app.get('/GetUserInfo',function(req,res){
    //console.log(123);
    Login.findOne({_id: req.session.Uid},function(err, user) {    
   if(user) {
      //console.log(user);
         res.send(user);
   }
   else {
       res.send(err);
   }

    });
});

app.get('/GetSession',function(req,res){

    var Sessiondata = {
    NursId: sess.NursId,
    NursLatLng: sess.NursLatLng,
    CustLatLng: sess.CustLatLng,    
    }

    res.send(Sessiondata);

});

app.post('/User_Nurse_Geo',function(req,res){ 
    sess = req.session;
    sess.NursId=req.body.NursId;
    sess.NursLatLng=req.body.NursLatLng;
    sess.CustLatLng=req.body.CustLatLng;          
   res.send("1");
   // Nurse.find()

});

app.get('/GetRequest', function(req, res){
    
    Nurse.find(function(err, user) {    
   if(err) {
       //res.send({ status: 'Sucess' });
         res.send(err);
   }
   else {
       //console.log(user);
       res.send(user);
       
   }
 });
});

app.post('/Register', function(req, res) {
    var L = new Login();
    //console.log(req.body);
    L.UserEmail = req.body.email;
    L.First_Name = req.body.firstname;
    L.Last_Name = req.body.lastname;
    L.Password = req.body.passwd;    
    L.save(function (err){
        if(err)
        {
            res.send(err);
        }
        res.render('Home.html')
    })       
});

app.post('/NurseRegister', function(req, res) {
    var ObjNurse = new Nurse();
    ObjNurse.UserEmail = req.body.email;
    ObjNurse.First_Name = req.body.firstname;
    ObjNurse.Last_Name = req.body.lastname;
    ObjNurse.Password = req.body.passwd;   
    ObjNurse.Lat = req.body.LatText;   
    ObjNurse.Lng = req.body.LogText; 
    ObjNurse.Languages = req.body.Languages; 
    ObjNurse.Gender = req.body.Gender; 
    ObjNurse.Education = req.body.Education;   
     ObjNurse.save(function (err){
        if(err)
        {
            res.send(err);
        }
        res.render('Home.html')
    })   

});

var db=mongoose.connection;

//Check connection
db.once('open',function(){
  console.log('Connected to MongoDB');
});

 //Check for db errors
db.on('error',function(err){
  console.log(err);
})

app.post('/Login',function (req,res) {
    var useremail = req.body.username;
    var userpassword = req.body.password;
    Login.findOne({UserEmail: useremail,Password: userpassword},function(err, user) {    
   if(user) {
       //console.log(user);
       //console.log(user._id);
       sess = req.session;
       sess.Uname=user.UserEmail; 
       sess.Uid=user._id;       
        res.redirect('DashBoard')
   }
   else {
       res.send(err);
   }
 });

});

app.post('/LoginNurse',function(req,res){

    var useremail = req.body.username;
    var userpassword = req.body.password;
    Nurse.findOne({UserEmail: useremail,Password: userpassword},function(err, user) {    
   if(user) {
       //sess = req.session;
       //sess.NursUname=req.body.username;       
         res.render('NurseHome.html');
   }
   else {
       res.send(err);
   }
 });
});

app.post('/AddFamilyDetails', function(req, res) {
    //console.log(req.session.Uid);
    var ObjFamily = new Family();    
    ObjFamily.First_Name = req.body.firstname;
    ObjFamily.Last_Name = req.body.lastname;
    ObjFamily.PhoneNumber = req.body.PhoneNumber; 
    ObjFamily.Relation = req.body.RelationShip;   
    ObjFamily.LinkID = req.session.Uid;   
    ObjFamily.save(function (err){
        if(err)
        {
            res.send(err);
        }
        res.render('AddFamily.html');
    })   

});


app.listen(5300);
 
console.log('Server Started listening on 5300');
