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




  var $contain_main = $('.contain_main');
   var $username = $('#username').val()




  var str = '<div data-project="%_id%" class="product_box">' +
    '<div class="product_top">' +
    '<div class="product_pic">' +
    '<img src="%projectImgUrl%" />' +
    '</div>' +
    '<a href="" class="product_preview">' +
    '<span class="iconfont preview">&#xe606;</span>' +
    '<span class="preview_text">34432</span>' +
    '</a>'+
    '<div class="product_ewm" data-preview="%preview%">' +
    '</div>' +
    '</div>' +
    '<div class="product_title">%description%</div>' +
    '<div class="product_date">'+$username+'</div>' +
    '</div>';

  drawProjectList();

  function drawProjectList() {
    $.ajax({
      method: "GET",
      url: WXMS_config.domain + "/getProjectStateList?prostate=1"
    }).done(function (msg) {
      var html = '';
      var projectList = msg.model.projectList || [];
      if (projectList.length > 0) {
        projectList.forEach(function (o, i) {
          o.preview = WXMS_config.previewDomain + '/index.html?projectId=' + o._id;
          var t = str.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
            return o[$3] ? o[$3] : '';
          });
          html += t;
        });
        $contain_main.html('').html(html);

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
          if (projectId) {
            $.ajax({
              method: "POST",
              url:WXMS_config.domain + "/updateProjectState",
              data: {projectId: projectId, prostate: "0"}
            }).done(function (msg) {
              if(msg.success){
               var product_datespan = $that.parent('div').parent('div').parent('div').find('.product_date').children('span')
                product_datespan.removeClass('color_green').addClass('color_red').text('未发布');
              }
            }).fail(function (msg) {
            });
          }


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
