var projectId = null;

QUnit.asyncTest('addProject--新增单个项目', function (assert) {
    var wxmsDomain = 'http://120.132.50.71/wxms';
    var projectEntity = {
        name: 'test',
        description: '我是自动化测试',
        updatetime: new Date()
    };


    $.ajax({
        method: "POST",
        url: wxmsDomain+"/addProject",
        data: projectEntity
    }).done(function (msg) {
        projectId = msg.model._id;
        assert.equal(msg.model.name, projectEntity.name, '用户添加成功');
        QUnit.start();
        testGetProject();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});

function testGetProject(){

    QUnit.asyncTest('getProject--获取单个项目详情', function (assert) {
        $.ajax({
            method: "GET",
            url: wxmsDomain+"/getProject",
            data: {
                projectId: projectId
            }
        }).done(function (msg) {
            assert.equal(msg.model._id, projectId, '获取单个项目详情成功');
            QUnit.start();
            testDeleteProject();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}

function testDeleteProject(){

    QUnit.asyncTest('deleteProject--删除单个项目', function (assert) {
        $.ajax({
            method: "POST",
            url: wxmsDomain+"/deleteProject",
            data: {
                projectId: projectId
            }
        }).done(function (msg) {
            assert.ok(msg.success, '删除单个项目成功');
            QUnit.start();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}

QUnit.asyncTest('getProjectList--获取项目列表', function (assert) {
    $.ajax({
        method: "GET",
        url: wxmsDomain+"/getProjectList"
    }).done(function (msg) {
        assert.ok(msg.model.projectList.length > 0, '获取项目列表成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});











