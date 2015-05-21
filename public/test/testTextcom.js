var textcomId =null;
QUnit.asyncTest('addTextcom--新增单个文本组件', function (assert) {

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
        testTextAddPage(projectId, assert);
    }).fail(function (msg) {
    });

});

function testTextAddPage(projectId,assert) {

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
        addTectcom(pageId,assert)
    }).fail(function (msg) {
    });

}


function addTectcom(pageId,assert){
    var textcomEntity = {
        context:'新增单个文本组件',
        texalign:'left',
        zindex:1,
        top:'10px',
        left:'10px',
        width:'300px',
        height:'300px',
        backgroundcolor:'rgba(255,255,0)',
        opcity:'0.5',
        transform:'rotate(-51deg)',
        bordercolo:'rgba(246,22,22,1.00)',
        borderwidth:'5px',
        borderstyle:'solid',
        borderradius:'3',
        transformrotate:'-51',
        textshadowcolor:'rgba(1,1,1,0.40)',
        textshadowwidth:'5px',
        textshadowblur:'5px',
        textshadowdegree:'100',
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
        fontstyle:'anima',
        fontweight:'none',
        fontfamily:'anima',
        fontsize:'14px',
        color:'rgba(1,255,1,0.40)',
        lineheight:'300px',
        verticalalign:'moddloe',
        href:'#test',
        hreftype:'1',
        dataurl:'http://www.bejson.com/test',
        datamapping:'data.test'
    };


    $.ajax({
        method: "POST",
        url: "/addTextcom",
        data: {
            pageId:pageId,
            textcom:textcomEntity
        }
    }).done(function (msg) {
        console.log(msg.model);
        textcomId = msg.model._id;
        assert.equal(msg.model.context, textcomEntity.context, '添加个文本组件成功');
        QUnit.start();
        getTextcom();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });
}







function getTextcom(){

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














