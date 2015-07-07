/**
 * Created by wudi on 15/6/30.
 */
/**
 * Created by wudi on 15/5/27.
 */
require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        jqui: '/lib/jqueryui/jquery-ui'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});
require(['jquery', 'jqui'], function ($) {
    Date.prototype.format = function(fmt)
    { //author: meizz
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }



    var $projectForm = $('#projectForm');



    var $username = $('#username');

    var $contain_main = $('.contain_main');

    var $project_add = $('.project_add');

    var $createrProject= $('#createrProject');

    var $loginout = $('#loginout');

    var username = window.localStorage.getItem('username')

    $username.text(username);


    var str = "<div data-project=\"%_id%\" class=\"list_main\">" +
        "<div class=\"list_img_main\">" +
        "<img src=\"img/list_main_img.png\" class=\"list_project_img\" alt=\"\"/></div>" +
        " <div class=\"list_info_main\">" +
        "    <div class=\"list_info_title\">%name%</div>" +
        "                    <div class=\"list_info_intro\">%description%</div>" +
        "                    <div class=\"list_info_time\">" +
        "                        <div class=\"list_info_time_change\">最后修改时间：%updatetime%</div>" +
        "                    </div>" +
        "                </div>" +
        "                <div class=\"list_main_btn_main\">" +
        "                    <a href=\"#\">" +
        "                        <img src=\"img/bianji.svg\" alt=\"编辑\" title=\"编辑\" data-roe=\"editor\" class=\"list_project_btn\"/>" +
        "                    </a>" +
        "                    <a href=\"#\">" +
        "                        <img src=\"img/shanchu.svg\" alt=\"删除\"  title=\"删除\"  data-roe=\"remove\" class=\"list_project_btn\"/>" +
        "                    </a>" +
        "                </div>" +
        "            </div>";

    drawProjectList();

    function drawProjectList() {
        $.ajax({
            method: "GET",
            url: "/getProjectList"
        }).done(function (msg) {
            var html = '';
            var projectList = msg.model.projectList || [];
            if (projectList.length > 0) {
                projectList.forEach(function (o, i) {
                    var t = str.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                        if($3=='updatetime'){
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
            alert(msg);
        });
    }



    function bindEnent(){
        $.each($('.list_project_btn'), function (index,btn) {
            $(btn).on('click',function () {
                var $that = $(this);
                var roe = $that.data('roe');
                var pdiv = $that.parent('a').parent('div').parent('div');
                var projectId = pdiv.data('project');
                if(roe=='editor'){
                    window.location.href = '/editor?projectId=' + projectId;
                }else if(roe=='remove'){
                    $.ajax({
                        method: "POST",
                        url: "/deleteProject",
                        data: {
                            projectId: projectId
                        }
                    }).done(function (msg) {
                        pdiv.remove();
                    }).fail(function (msg) {
                        alert(msg);
                    });
                }
            })
        })

    }


    $loginout.on('click', function () {
        $.ajax({
            method: "get",
            url: "/logout"
        }).done(function (msg) {
           if(msg.success){
               window.location.href = '/index';
               window.localStorage.setItem('username',"");
           }
        }).fail(function (msg) {

        });
    })


    $project_add.on('click', function () {
        $createrProject.dialog({
            resizable: false,
            title:'创建项目',
            height:280,
            modal: true,
            buttons: {
                "确定": function() {

                    var name = $projectForm.find('#name')
                    var description = $projectForm.find('#description')
                    if(name.val()==''){
                        name.focus();
                        name.addClass('eorr');
                    }else if(description.val()==''){
                        description.focus();
                        description.addClass('eorr');
                    }
                    else{
                        name.removeClass('eorr');
                        description.removeClass('eorr');
                        $( this ).dialog( "close" );
                        var prodata ={
                            name:name.val(),
                            description:description.val()
                        };
                        $.ajax({
                            method: "POST",
                            url: "/addProject",
                            data: prodata
                        }).done(function (msg) {
                            drawProjectList();
                        }).fail(function (msg) {
                        });
                    }

                },
                '退出': function() {
                    $( this ).dialog( "close" );
                }
            }
        })


    })





});