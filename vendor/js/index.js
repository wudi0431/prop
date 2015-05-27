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
    var $projectForm = $('#projectForm');
    var $projectList = $('#projectList');
    $projectForm.on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        $.ajax({
            method: "POST",
            url: "/addProject",
            contentType: false,
            processData: false,
            data: data
        }).done(function (msg) {
            drawProjectList();
        }).fail(function (msg) {
        });
    });
    var str = '<li data-project="%_id%">' +
        '<a href="javascript:;" class="project">%name%</a>' +
        '<a href="javascript:;" class="delete-project">删除</a>' +
        '</li>';

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
                        return o[$3] ? o[$3] : '';
                    });
                    html += t;
                });
                $projectList.html('').html(html);
            } else {
                $projectList.html('');
            }
        }).fail(function (msg) {
            alert(msg);
        });
    }

    $projectList.on('click', '.delete-project', function () {
        var $that = $(this);
        var projectId = $that.parent('li').data('project');
        $.ajax({
            method: "POST",
            url: "/deleteProject",
            data: {
                projectId: projectId
            }
        }).done(function (msg) {
            drawProjectList();
        }).fail(function (msg) {
            alert(msg);
        });
    });


    $projectList.on('click', '.project', function () {
        var $that = $(this);
        var projectId = $that.parent('li').data('project');
        window.location.href = '/editor?projectId=' + projectId;
    });


});