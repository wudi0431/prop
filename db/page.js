var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    name:String,
    sortindex:Number,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});


var PageModel = mongoose.model('Page', PageSchema);
module.exports = PageModel;