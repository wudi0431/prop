var pageId = null;
var wxmsDomain = 'http://120.132.50.71/wxms';
QUnit.asyncTest('addPage--新增页面', function (assert) {

    var projectEntity = {
        name: 'testPage',
        description: '我是自动化测试',
        updatetime: new Date()
    };


    $.ajax({
        method: "POST",
        url: wxmsDomain+"/addProject",
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
        url: wxmsDomain+"/addPage",
        data: {
            projectId:projectId,
            page:pageEntity
        }
    }).done(function (msg) {
        pageId = msg.model._id;
        assert.equal(msg.model.name, pageEntity.name, '新增页面成功');
        QUnit.start();
        testGetPageList(projectId);
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

}




function testDeletePage(){

    QUnit.asyncTest('deletePage--删除页面', function (assert) {
        $.ajax({
            method: "POST",
            url: wxmsDomain+"/deletePage",
            data: {
                pageId: pageId
            }
        }).done(function (msg) {
            assert.ok(msg.success, '删除页面成功');
            QUnit.start();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}

function testGetPage(){

    QUnit.asyncTest('getPage--获取单个页面详情', function (assert) {
        $.ajax({
            method: "GET",
            url: wxmsDomain+"/getPage",
            data: {
                pageId: pageId
            }
        }).done(function (msg) {
            assert.equal(msg.model._id, pageId, '获取单个页面详情成功');
            QUnit.start();
            testUpdatePage(msg.model);
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}


function testGetPageList(projectId) {

    QUnit.asyncTest('getPageList--获取页面列表', function (assert) {
        $.ajax({
            method: "GET",
            url: wxmsDomain+"/getPageList",
            data:{
                projectId:projectId
            }
        }).done(function (msg) {
            assert.ok(msg.model.pageList.length > 0, '获取项目列表成功');
            QUnit.start();
            testGetPage();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}


function testUpdatePage(pageEntity) {

    pageEntity.name = '11111';

    QUnit.asyncTest('updatePage--更新单个页面', function (assert) {
        $.ajax({
            method: "POST",
            url: wxmsDomain+"/updatePage",
            data:pageEntity
        }).done(function (msg) {
            assert.equal(msg.model.name, '11111', '更新单个页面成功');
            QUnit.start();
            testDeletePage();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}






