var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Page = require('./page');

var ProjectSchema = new Schema({
    name: String,
    description: String,
    updatetime: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ProjectSchema.static('getProjectList', function (userId, cb) {
    return this.find({
        user: userId
    }).sort({updatetime: -1}).exec(cb);
});

ProjectSchema.static('deleteProject', function (projectId, cb) {
    return this.findByIdAndRemove(projectId, function (err, projectEntity) {
            if (projectEntity) {
                Page.deletePageByProject(projectId);
            }

            cb(err, projectEntity);
        }
    )
});

ProjectSchema.static('getProject', function (projectId, cb) {
    return this.findById(projectId, cb)
});


var ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;