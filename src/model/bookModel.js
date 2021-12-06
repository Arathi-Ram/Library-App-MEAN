const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://userOne:1234@cluster0.vpzga.mongodb.net/LibraryMEAN?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    bookTitle :String,
    bookAuthor:String,
    pages: Number,
    publishedDate:String,
    genre :String,
    lang:String,
    img:String
});
const bookData = mongoose.model('bookData',BookSchema);
module.exports = bookData;