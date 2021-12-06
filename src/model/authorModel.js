const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userOne:1234@cluster0.vpzga.mongodb.net/LibraryMEAN?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    authorName :String,
    nationality:String,
    a_dob: String,
    a_gender :String,
    works :String,
    img:String
});
const authorData = mongoose.model('authorData',AuthorSchema);
module.exports = authorData;