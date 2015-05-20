var mongoose = require('mongoose');

var ImgsSchema = new mongoose.Schema({
    name:String,
    updatetime:Date,
    category:Number,
    path:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var ImgsModel = mongoose.model('Imgs', ImgsSchema);
module.exports = ImgsModel;