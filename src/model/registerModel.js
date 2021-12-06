const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userOne:1234@cluster0.vpzga.mongodb.net/LibraryMEAN?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
    name:String,
    mob:String,
    email:String,
    pass:String,
    // re_pass:String
});
const registerData = mongoose.model('RegisterData',RegisterSchema);
module.exports = registerData;