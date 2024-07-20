const express = require('express');
const bookController = require('../controller/bookController.js');
const userController = require('../controller/userController.js');
const authorise = require('../middleware/authorise.js');

const router = express.Router();

// Book API's
router.post('/addBook',authorise,bookController.addBook);
router.get('/getAllBooks',authorise,bookController.getAllBooks);
router.delete('/Book/:id',authorise,bookController.deleteBook);
router.put('/book/:id',authorise,bookController.updateBooks);
router.post('/book/:id/review',authorise,bookController.addReview) // add review 


// User API's
router.post('/register',userController.addUser);
router.post('/login',userController.getUser);

module.exports = router;