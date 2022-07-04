let Book = require('../model/book');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image')

exports.addBook = async (req, res) => {
    upload(req, res, next => {
        console.log("file", req.file)
        console.log("filepath", "http://localhost:3500/" + req.file.path)

        let book = new Book({
            name: req.body.name,
            price: req.body.price,
            pages: req.body.pages,
            author: req.body.author,
            image: req.file.path
        })

        book.save().then((data) => {
            return res.send({ message: "Data created successfully", data: data })
        }).catch((err) => {
            return res.send({ message: err.message })
        })

    });
};

exports.updateBookdetails = async (req, res, err) => {
    upload(req, res, err => {

        if (err) {
            console.log("err", err)
            return res.json(err);
        }
        else {
            var files = req.file;
            console.log('files', files);
            var data = req.body;
            var id = data.id;
            if (id == null || id == undefined || id == '') {
                return res.json({
                    status: 400,
                    message: "Please enter book id"
                })
            }
            Book.findById(err, datafind => {
                if (err) {
                    return res.json({
                        status: 400,
                        message: "Something went wrong"
                    })
                } else {
                    Book.findOneAndUpdate({ _id: id }, { $set: { data, files } })
                        .then((data) => {
                            console.log(data)
                            return res.send(data, 'Book Updated successfully!!')
                        }).catch((err) => {
                            console.log(err)
                            return res.send({message : err.message})
                        })
                }
            })
        }
    })
};

exports.search = (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            return res.send(book);
        }).catch((err) => {
            return res.send({
                message: err.message
            })
        })
}

exports.booklist = async (req, res) => {
    Book.find({ deleted: false })
        .then((book) => {
            return res.send(book);
        }).catch((err) => {
            return res.send({ message: err.message });
        })
};

exports.removebook = (req, res) => {
    Book.findOneAndDelete(req.params.book_id, { deleted: false })
        .then(() => {
            return res.send({ message: 'book deleted successfully' });
        }).catch((err) => {
            return res.send({ message: err.message })
        })
};