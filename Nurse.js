var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var NurseSchema = new Schema({  
    UserEmail: String,  
    Password: String,  
    First_Name: String,  
    Last_Name: String,
    Lat: String,    
    Lng: String, 
    Gender:String,
    Languages:String,
    Education:String,   
});  
module.exports = mongoose.model('NurseInfo', NurseSchema);