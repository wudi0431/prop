/**
 * Created by wudi on 15/6/30.
 */
/**
 * Created by wudi on 15/5/27.
 */


require.config({
  waitSeconds: 30,
  paths: {
    wxms_config: '/wxms/config',
    jquery: '/wxms/lib/jqueryui/external/jquery/jquery',
    jqui: '/wxms/lib/jqueryui/jquery-ui',
    qrcode: 'http://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min',
    dialog: '/wxms/lib/dialog-min'
  },
  shim: {
    'jqui': {
      deps: ['jquery']
    },
    qrcode: {
      deps: ['jquery']
    },
    dialog: {
      deps: ['jquery']
    }
  }
});
require(['wxms_config', 'jquery', 'dialog', 'jqui', 'qrcode'], function (WXMS_config, $) {
  WXMS_config.domain = WXMS_config.domain || '';
  Date.prototype.format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }


  var $projectForm = $('#projectForm');


  var $username = $('#username');

  var $contain_main = $('.contain_main');

  var $project_add = $('.project_add');

  var $createrProject = $('#createrProject');

  var $loginout = $('#loginout');

  var username = window.localStorage.getItem('username')

  $username.text(username);


  var str = '<div data-project="%_id%" class="product_box">' +
    '<div class="product_top">' +
    '<div class="product_pic">' +
    '<img src="%projectImgUrl%" />' +
    '</div>' +
    '<div class="product_edit">' +
    '<a href="javascript:;" class="iconfont preview list_project_btn" data-roe="preview">&#xe606;</a>' +
    '<a href="javascript:;" class="iconfont delete list_project_btn" data-roe="remove">&#xe609;</a>' +
    '<a href="javascript:;" class="iconfont editor list_project_btn" data-roe="editor">&#xe60a;</a>' +
    '</div>' +
    '<div class="product_ewm" data-preview="%preview%">' +
    '</div>' +
    '</div>' +
    '<div class="product_title">%description%</div>' +
    '<div class="product_date">最新修改时间：%updatetime%</div>' +
    '</div>';

  drawProjectList();

  function drawProjectList() {
    $.ajax({
      method: "GET",
      url: WXMS_config.domain + "/getProjectList"
    }).done(function (msg) {
      var html = '';
      var projectList = msg.model.projectList || [];
      if (projectList.length > 0) {
        projectList.forEach(function (o, i) {
          o.preview = WXMS_config.previewDomain + '/index.html?projectId=' + o._id;
          var t = str.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
            if ($3 == 'updatetime') {
              var time1 = new Date(o[$3]).format("yyyy-MM-dd");
              return time1;
            }
            return o[$3] ? o[$3] : '';
          });
          html += t;
        });
        $contain_main.html('').html(html);
        bindEnent();
      } else {
        $contain_main.html('');
      }
    }).fail(function (msg) {

    });
  }


  function bindEnent() {


    $.each($('.list_project_btn'), function (index, btn) {
      $(btn).on('click', function () {
        var $that = $(this);
        var roe = $that.data('roe');
        var pdiv = $that.parents('.product_box');
        var projectId = pdiv.data('project');
        if (roe == 'editor') {
          window.location.href = WXMS_config.domain + '/editor?projectId=' + projectId;
        } else if (roe == 'preview') {
          window.open(WXMS_config.domain + '/show?projectId=' + projectId);
        } else if (roe == 'remove') {
          $.ajax({
            method: "POST",
            url: WXMS_config.domain + "/deleteProject",
            data: {
              projectId: projectId
            }
          }).done(function (msg) {
            pdiv.remove();
          }).fail(function (msg) {

          });
        }
      })
    })

  }


  $loginout.on('click', function () {
    $.ajax({
      method: "get",
      url: WXMS_config.domain + "/logout"
    }).done(function (msg) {
      if (msg.success) {
        window.location.href = WXMS_config.domain + '/index';
        window.localStorage.setItem('username', "");
      }
    }).fail(function (msg) {

    });
  });


  $project_add.on('click', function () {
    $createrProject.dialog({
      resizable: false,
      title: '创建项目',
      height: 280,
      modal: true,
      buttons: {
        "确定": function () {

          var name = $projectForm.find('#name');
          var description = $projectForm.find('#description');
          var projectImgUrl = $projectForm.find('#projectImgUrl');

          if (name.val() == '') {
            name.focus();
            name.addClass('eorr');
          } else if (description.val() == '') {
            description.focus();
            description.addClass('eorr');
          }
          else {
            name.removeClass('eorr');
            description.removeClass('eorr');
            $(this).dialog("close");
            var prodata = {
              name: name.val(),
              description: description.val(),
              projectImgUrl: projectImgUrl.val()||'http://d9.yihaodianimg.com/N02/M02/40/EB/CgQCsFLVBOOAE0boAAAK5UNpfUI56300.png'
            };
            $.ajax({
              method: "POST",
              url: WXMS_config.domain + "/addProject",
              data: prodata
            }).done(function (msg) {
              drawProjectList();
            }).fail(function (msg) {
            });
          }

        },
        '退出': function () {
          $(this).dialog("close");
        }
      }
    })


  });

  //文件上传
  $('#file_upload').on('click', function () {

    var data = new FormData();
    var files = $('#file')[0].files;
    if (files.length === 0) {
      alert('请选图片')
      return false;
    }
    data.append('codecsv', files[0]);
    data.append('categoryvalue', 1);
    $.ajax({
      cache: false,
      type: 'post',
      url: WXMS_config.domain + '/upLoadImg',
      data: data,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.success) {
          var d = dialog({
            width: 250,
            height: 50,
            content: '上传成功'
          });
          d.show();
          setTimeout(function () {
            d.close().remove();
          }, 2000);
          $('#projectImgUrl').val(data.model.path);
        }
      }
    })
  });


  $contain_main.on('mouseenter', '.product_box', function () {
    var $product_ewm = $(this).find('.product_ewm');
    $product_ewm.qrcode({
      width: 225,
      height: 225,
      text: $product_ewm.data('preview'),
      foreground: '#000000'
    });
    $product_ewm.addClass('show');
  }).on('mouseleave', '.product_box', function () {
    $(this).find('.product_ewm').removeClass('show');
  });

});
