var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var router = express.Router();
var config = require('../../config');
var filter = require('../passport.js');
var Project = require('../../db/project');



router.post('/', function (req, res, next) {
  filter.authorize(req, res, function (req, res) {
    var projectId = req.body.projectId;
    var prostate = req.body.prostate;
    Project.updateProjectState(projectId,prostate, function (err, projectEntity) {
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
          model: projectEntity
        });
      }
    });
  });
});




module.exports = router;
