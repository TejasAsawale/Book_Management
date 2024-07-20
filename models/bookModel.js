const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title : {title: String},
    author : {type: String, required : false},
    genre : {type : String, required : false},
    username : {type: String},
    reviews : [{
        u_id : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
        review : {type : String}
    }]
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

// {
//     "title" : "Ravan Raja Rakshasancha",
//     "author" : "Sharad Tandale",
//     "genre" : "Historic"
// }