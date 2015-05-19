var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
    name:String,
    updatetime:Date,
    category:Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


var TemplateModel = mongoose.model('Template', TemplateSchema);
module.exports = TemplateModel;