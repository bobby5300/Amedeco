var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var LoginSchema = new Schema({  
    UserEmail: String,  
    Password: String,  
    First_Name: String,  
    Last_Name: String,  
});  
module.exports = mongoose.model('LoginInfo', LoginSchema);
