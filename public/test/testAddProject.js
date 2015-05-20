QUnit.asyncTest('addProject--新增单个项目', function (assert) {

    var projectEntity = {
        name: 'test',
        description: '我是自动化测试',
        updatetime: new Date()
    };

    $.ajax({
        method: "POST",
        url: "/addProject",
        data: projectEntity
    }).done(function(msg) {
        assert.equal(msg.name, projectEntity.name, '用户添加成功');
    }).fail(function(msg) {
        assert.ok(false,msg.responseText);
    });

});







