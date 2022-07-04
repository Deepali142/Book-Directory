const express = require('express');
const Book = require('../controller/book');

const router = express.Router();

router.post('/addBook',Book.addBook);
router.put('/updateBook',Book.updateBookdetails);
router.get('/searchBook/:id',Book.search);
router.get('/BookList',Book.booklist);
router.delete('/remove/:_id',Book.removebook);

module.exports = router;    