const mongoose = require('mongoose');

//Schema

const linkSchema = new mongoose.Schema({
    //Passarei um obj.
    title: {type:String, required:true},
    description: String,
    url: {type:String, required:true},
    click: {type:Number, default: 0}
})

//model
module.exports = mongoose.model('Link', linkSchema) ;
