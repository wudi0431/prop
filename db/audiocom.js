var mongoose = require('mongoose');


var AudioComSchema = new mongoose.Schema({
    dataurl: {type: String, default: ""},
    datamapping: {type: String, default: ""},
    audiourl: {type: String, default: ""},
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    audio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio'
    }
});

AudioComSchema.static('deleteAudiocom', function (AudiocomId, cb) {
    return this.findByIdAndRemove(AudiocomId, function (err, AudiocomEntity) {
        if(AudiocomEntity){
            Page.updateProjectTime(AudiocomEntity.page);
        }
        if (cb) {
            cb(err, AudiocomEntity);
        }
    })
});

AudioComSchema.static('deleteAudiocomByProject', function (pageId) {
    return this.find({
        page: pageId
    }).exec(function (err, AudiocomList) {
        if (AudiocomList) {
            AudiocomList.forEach(function (Audiocom) {
                AudiocomModel.deleteAudiocom(Audiocom._id);
            });

        }
    });
});

AudioComSchema.static('deleteAudiocomByTemplate', function (templateId) {
    return this.find({
        template: templateId
    }).exec(function (err, AudiocomList) {
        if (AudiocomList) {
            AudiocomList.forEach(function (Audiocom) {
                AudiocomModel.deleteAudiocom(Audiocom._id);
            });

        }
    });
});


AudioComSchema.static('getAudiocom', function (AudiocomId, cb) {
    return this.findById(AudiocomId, cb)
});

AudioComSchema.static('getAudiocomListByprojectId', function (projectId, cb) {
    return this.find({
        project: projectId
    }, cb)
});

AudioComSchema.static('getAudiocomListByTemplateId', function (templateId, cb) {
    return this.find({
        template: templateId
    }, cb)
});


AudioComSchema.static('updateAudiocom', function (Audiocom, cb) {
    var AudiocomId = Audiocom._id;
    delete Audiocom._id;
    delete Audiocom.__v;
    delete Audiocom.project;
    delete Audiocom.audio;
    return this.findOneAndUpdate({
        _id: AudiocomId
    }, Audiocom, {'new': true}, function (err, AudiocomEntity) {
        if (cb) {
            cb(err, AudiocomEntity);
        }
    })
});

var AudiocomModel = mongoose.model('Audiocom', AudioComSchema);
module.exports = AudiocomModel;

var Page = require('./page');
