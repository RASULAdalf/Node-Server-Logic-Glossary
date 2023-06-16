const mongoose = require('mongoose');
const {Model} = require("mongoose");
const HistorySchema = new mongoose.Schema({
    englishWord:{type:String,required:true},
    sinhalaWord:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:Date,required:true}
});

module.exports = mongoose.model('History',HistorySchema);