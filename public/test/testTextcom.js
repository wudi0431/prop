var pageId = 'fsdfsdfdfs';

QUnit.asyncTest('addTextcom--新增单个文本组件', function (assert) {

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
        data: textcomEntity
    }).done(function (msg) {
        console.log(msg.model)
        assert.equal(msg.model.context, textcomEntity.context, '添加个文本组件成功');
        QUnit.start();
       // test2();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});

//function test2(){
//
//    QUnit.asyncTest('getProject--获取单个项目详情', function (assert) {
//        $.ajax({
//            method: "POST",
//            url: "/getProject",
//            data: {
//                projectId: projectId
//            }
//        }).done(function (msg) {
//            assert.equal(msg.model._id, projectId, '获取单个项目详情成功');
//            QUnit.start();
//            test3()
//        }).fail(function (msg) {
//            assert.ok(false, msg.responseText);
//            QUnit.start();
//        });
//
//    });
//}
//
//function test3(){
//
//    QUnit.asyncTest('deleteProject--删除单个项目', function (assert) {
//        $.ajax({
//            method: "POST",
//            url: "/deleteProject",
//            data: {
//                projectId: projectId
//            }
//        }).done(function (msg) {
//            assert.ok(msg.success, '删除单个项目成功');
//            QUnit.start();
//        }).fail(function (msg) {
//            assert.ok(false, msg.responseText);
//            QUnit.start();
//        });
//
//    });
//}
//
//QUnit.asyncTest('getProjectList--获取项目列表', function (assert) {
//    $.ajax({
//        method: "GET",
//        url: "/getProjectList"
//    }).done(function (msg) {
//        assert.ok(msg.model.projectList.length > 0, '获取项目列表成功');
//        QUnit.start();
//    }).fail(function (msg) {
//        assert.ok(false, msg.responseText);
//        QUnit.start();
//    });
//
//});











