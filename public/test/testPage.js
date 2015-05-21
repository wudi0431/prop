
QUnit.asyncTest('addPage--新增页面', function (assert) {

    var projectEntity = {
        name: 'testPage',
        description: '我是自动化测试',
        updatetime: new Date()
    };


    $.ajax({
        method: "POST",
        url: "/addProject",
        data: projectEntity
    }).done(function (msg) {
        var projectId = msg.model._id;
        testAddPage(projectId,assert);
    }).fail(function (msg) {
    });

});

function testAddPage(projectId,assert){

    var pageEntity = {
        name: 'testPage',
        sortindex: 2,
        background:'333'
    };


    $.ajax({
        method: "POST",
        url: "/addPage",
        data: {
            projectId:projectId,
            page:pageEntity
        }
    }).done(function (msg) {
        assert.equal(msg.model.name, pageEntity.name, '新增页面成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

}













