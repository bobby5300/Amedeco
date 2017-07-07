var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var FamilySchema = new Schema({      
    First_Name: String,  
    Last_Name: String,     
    PhoneNumber:String,
    Relation:String,
    LinkID:String,   
});  
module.exports = mongoose.model('FamilyInfo', FamilySchema);