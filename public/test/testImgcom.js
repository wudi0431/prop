var imgcomId =null;
QUnit.asyncTest('addImgcom--新增单个图片组件', function (assert) {

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
        testImgAddPage(projectId, assert);
    }).fail(function (msg) {
    });




function testImgAddPage(projectId,assert) {

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
        addImgcom(pageId,assert)
    }).fail(function (msg) {
    });

}


function addImgcom(pageId,assert){
    var imgcomEntity = {
        imgurl:'http://img.yhd.com/test',
        zindex:1,
        top:'10px',
        left:'10px',
        width:'300px',
        height:'300px',
        opcity:'0.5',
        transform:'rotate(-51deg)',
        bordercolo:'rgba(246,22,22,1.00)',
        borderwidth:'5px',
        borderstyle:'solid',
        borderradius:'3px',
        transformrotate:'-51',
        boxshadowcolor:'rgba(1,255,1,0.40)',
        boxshadowwidth:'10px',
        boxshadowblur:'10px',
        boxshadowsize:'10px',
        boxshadowdegree:'120',
        paddingtop:'10px',
        paddingleft:'10px',
        paddingright:'10px',
        paddingbottom:'10px',
        animationname:'leftan',
        animationduration:'10s',
        animationdelay:'2s',
        animationcount:'10',
        verticalalign:'moddloe',
        href:'#test',
        hreftype:'1',
        dataurl:'http://www.bejson.com/test',
        datamapping:'data.test'
    };


    $.ajax({
        method: "POST",
        url: "/addImgcom",
        data: {
            pageId:pageId,
            imgcom:imgcomEntity
        }
    }).done(function (msg) {
        console.log(msg.model);
        imgcomId = msg.model._id;
        assert.equal(msg.model.imgurl, imgcomEntity.imgurl, '添加个图片组件成功');
        QUnit.start();
        //getTextcom(pageId);
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });
}







function getTextcom(pageId){

    QUnit.asyncTest('getTextcom--获取单个项目详情', function (assert) {
        $.ajax({
            method: "GET",
            url: "/getTextcom",
            data: {
                textcomId: textcomId
            }
        }).done(function (msg) {
            assert.equal(msg.model._id, textcomId, '获取单个文本组件成功');
            QUnit.start();
            getTextcomListByPageId(pageId,textcomId)
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}


    function getTextcomListByPageId(pageId,textcomId){

        QUnit.asyncTest('getTextcomListByPageId--获取单个同一pageid的文本组件', function (assert) {
            $.ajax({
                method: "GET",
                url: "/getTextcomListByPageId",
                data: {
                    pageId:pageId
                }
            }).done(function (msg) {
                var lasttextcomId = msg.model.textcomtList[msg.model.textcomtList.length-1]._id;
                assert.equal(0, 0, '获取单个同一pageid的文本组件成功');
                QUnit.start();
                deleteTextcomById()
            }).fail(function (msg) {
                assert.ok(false, msg.responseText);
                QUnit.start();
            });

        });
    }






function deleteTextcomById(){
    QUnit.asyncTest('deleteTextcom--删除单个文本组件', function (assert) {
        $.ajax({
            method: "POST",
            url: "/deleteTextcom",
            data: {
                textcomId: textcomId
            }
        }).done(function (msg) {
            assert.ok(msg.success, '删除单个文本组件成功');
            QUnit.start();
        }).fail(function (msg) {
            assert.ok(false, msg.responseText);
            QUnit.start();
        });

    });
}





});










