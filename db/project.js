var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Page = require('./page');

var ProjectSchema = new Schema({
    name: String,
    description: String,
    updatetime: Date,
    projectImgUrl:{type: String, default: 'http://d9.yihaodianimg.com/N02/M02/40/EB/CgQCsFLVBOOAE0boAAAK5UNpfUI56300.png'},
    user: {
        id: String,
        name: String
    }
});

ProjectSchema.static('getProjectList', function (user, cb) {
    return this.find({
        user: user
    }).sort({updatetime: -1}).exec(cb);
});

ProjectSchema.static('updateProjectTime', function (projectId) {
    return this.findOneAndUpdate({
        _id: projectId
    }, {
        updatetime: new Date()
    }, {'new': true}).exec();
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
