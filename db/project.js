var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    updatetime: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ProjectSchema.static('getProjectList', function (userId,cb) {
    return this.find({
        user: userId
    }, cb)
});

ProjectSchema.static('deleteProject', function (projectId,cb) {
    return this.findByIdAndRemove(projectId, cb)
});

ProjectSchema.static('getProject', function (projectId,cb) {
    return this.findById(projectId, cb)
});


var ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;