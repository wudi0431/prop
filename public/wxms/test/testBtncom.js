var btncomId =null;
QUnit.asyncTest('addBtncom--新增单个按钮组件', function (assert) {

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
        testBtnAddPage(projectId, assert);
    }).fail(function (msg) {
    });




function testBtnAddPage(projectId,assert) {

    var pageEntity = {
        name: 'testPage',
        sortindex: 2,
        background: '333'
    };


    $.ajax({
        method: "POST",
        url: "/addPage",
        data: {
            projectId: projectId,
            page: pageEntity
        }
    }).done(function (msg) {
        var pageId = msg.model._id;
        addBtncom(pageId,assert)
    }).fail(function (msg) {
    });

}


function addBtncom(pageId,assert){
    var btncomEntity = {
        context:'按钮',
        textAlign:String,
        zIndex:Number,
        top:String,
        left:String
    };


    $.ajax({
        method: "POST",
        url: "/addBtncom",
        data: {
            pageId:pageId,
            btncom:btncomEntity
        }
    }).done(function (msg) {
        console.log(msg.model);
        btncomId = msg.model._id;
        assert.equal(msg.model.context, btncomEntity.context, '添加个按钮组件成功');
        QUnit.start();
        getBtncom(btncomId);
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });
}







function getBtncom(btncomId){

    QUnit.asyncTest('getBtncom--查询按钮组件', function (assert) {
        $.ajax({
            method: "GET",
            url: "/getBtncom",
            data: {
                btncomId: btncomId
            }
        }).done(function (msg) {
            assert.equal(msg.success, true,'查询按钮组件成功');
            QUnit.start();
            // testUpdateBtncom(msg.model);
            // getBtncomListByPageId(pageId);
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}


    function getBtncomListByPageId(pageId){

        QUnit.asyncTest('getBtncomListByPageId--查询同一pageid的按钮组件', function (assert) {
            $.ajax({
                method: "GET",
                url: "/getBtncomListByPageId",
                data: {
                    pageId:pageId
                }
            }).done(function (msg) {
                assert.ok(true,'查询同一pageid的按钮组件成功');
                QUnit.start();
                deleteBtncom();
            }).fail(function (msg) {
                assert.ok(false, msg.responseText);
                QUnit.start();
            });

        });
    }


    function updateBtncom(btncomEntity) {

        QUnit.asyncTest('updateBtncom--更新单个按钮组件', function (assert) {
            $.ajax({
                method: "POST",
                url: "/updateBtncom",
                data:btncomEntity
            }).done(function (msg) {
                assert.equal(msg.model.btnurl, '更新单个按钮组件成功');
                QUnit.start();
                deleteBtncom();
            }).fail(function (msg) {
                assert.ok(false, msg.responseText);
                QUnit.start();
            });

        });
    }



function deleteBtncom(){
    QUnit.asyncTest('deleteBtncom--删除单个按钮组件', function (assert) {
        $.ajax({
            method: "POST",
            url: "/deleteBtncom",
            data: {
                btncomId: btncomId
            }
        }).done(function (msg) {
            assert.ok(msg.success, '删除单个按钮组件成功');
            QUnit.start();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}

});










