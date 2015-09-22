var express = require('express');
var router = express.Router();
var Project = require('../../db/project');

router.get('/', function (req, res, next) {
  var prostate = req.query.prostate;
  Project.getProjectStateList(prostate, function (err, projectList) {
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
        model: {
          projectList: projectList
        }
      });
    }
  });

});

module.exports = router;
