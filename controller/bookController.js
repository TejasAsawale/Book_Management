const Book = require('../models/bookModel');

// Add new book 
async function addBook(req, res) {
    console.log("Book add here",req.body);

    try {
        const newBook = new Book(req.body);

        const result = await newBook.save();
        res.status(200).send({ message : "Book added successfully...", task: result});
    } catch (error) {
        res.status(500).send(error);
    }
}

// get all books
async function getAllBooks(req,res){
    console.log("show get all books");
    try {
        result = await Book.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// delete book
async function deleteBook(req,res){
    console.log("Call the req.params.id",req.params.id);
    // ID = req.params.id;
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book){
            res.status(400).send({ message : "Book are Not Found"});
        }
        res.send({task : book, message : "Book Deleted Successfully..."});
    } catch (error) {
        res.status(500).send(error);
    }
}

// update book
async function updateBooks(req,res){
    console.log(req.params.id);
    console.log("Check Update Book req.body",req.body);
    try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!book){
        res.status(400).send({message:"Book Not Found"});
    }
    res.status(200).send({message : "Book Updated Successfully...",task : book});
        
    } catch (error) {
        res.status(500).send(error);
    }
}

// Add Book Review
async function addReview(req,res){
    try {
        const id = req.params.id;
        const uId = req.user.id;
        const newReview = req.body.review;
        console.log(id,uId,newReview);
        const result = await Book.findById(id);
        // console.log(result);
        if(!result){
            res.status(400).send({message : "Book Not Found Yet"})
        }
        result.reviews.push({u_id : uId, review : newReview})
        await result.save();
        console.log(result.reviews);

        res.status(200).send({message : "Review Added Successfully..."})

    } catch (error) {
        res.status(500).send(error);
    }
}

// export modules (functions)
module.exports = {
    addBook,
    getAllBooks,
    deleteBook,
    updateBooks,
    addReview
}
