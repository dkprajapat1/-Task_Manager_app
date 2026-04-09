const mongoose = require('mongoose')

const data = mongoose.Schema({  //creating schema
        title: String,
        date: String,
        mark: {
                type: Boolean,
                default: false
        }
});

const Todosch = mongoose.model('Todosch', data); //store model into sch

module.exports = Todosch;