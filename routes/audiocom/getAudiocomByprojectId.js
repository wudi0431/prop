var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Audiocom = require('../../db/audiocom');
router.get('/', function (req, res, next) {
  filter.authorize(req, res, function (req, res) {
    var projectId = req.query.projectId;
    Audiocom.getAudiocomByprojectId(projectId, function (err, audiocom) {
      if (err) {
        res.status('500');
        res.send({
          success: false, // 标记失败
          model: {
            error: '系统错误'
          }
        });
      } else {
        res.status('200');
        res.send({
          success: true,
          model: audiocom
        });
      }
    });


  });

});

router.get('/jsonp', function (req, res, next) {
  var projectId = req.query.projectId;
  Audiocom.getAudiocomByprojectId(projectId, function (err, audiocom) {
    if (err) {
      res.jsonp({
        success: false,
        model: {
          error: '系统错误'
        }
      });
    } else {
      res.jsonp({
        success: true,
        model: audiocom
      });
    }
  });

});


module.exports = router;
