const mongoose = require('mongoose');

async function connectdb() {
    try {
        await mongoose.connect("mongodb+srv://tejasasawale2607:tejas@cluster0.vugxmfz.mongodb.net/BookManagement");
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("error in connection", error);
    }
}
module.exports = { connectdb };

// mongodb://localhost:27017

