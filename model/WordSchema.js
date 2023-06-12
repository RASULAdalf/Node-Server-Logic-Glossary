const mongoose = require('mongoose');
const WordSchema = new mongoose.Schema({
    englishWord:{type:String,required:true},
    sinhalaWord:{type:String,required:true}
});


module.exports = mongoose.model('Word',WordSchema);/*Here, we share this file to use it in other place*/
