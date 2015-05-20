var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    updatetime: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


var ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;