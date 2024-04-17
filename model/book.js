const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:{
        type:'string',
    },
    price:{
        type:Number,
        default:''
    },
    pages:{
        type:Number,
        default:''
    },
    author:{
        type:'string',
        default:''
    },
    image:{
        type:'string',
        default:''
    },
    isDelete:{
        type:Boolean
    }
 
});

const book = new mongoose.model("book",Schema);
module.exports = book;