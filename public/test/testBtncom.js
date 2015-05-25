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
        context:"按钮",
        texalign:'left',
        zindex:1,
        top:'10px',
        left:'10px',
        right:'10px',
        bottom:'10px',
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
        deleteBtncom();
        //getBtncom(pageId);
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });
}







// function getImgcom(pageId){

//     QUnit.asyncTest('getImgcom--查询图片组件', function (assert) {
//         $.ajax({
//             method: "GET",
//             url: "/getImgcom",
//             data: {
//                 imgcomId: imgcomId
//             }
//         }).done(function (msg) {
//             assert.equal(msg.model._id, imgcomId, '查询图片组件成功');
//             QUnit.start();
//             testUpdateImgcom(msg.model);
//             getImgcomListByPageId(pageId)
//         }).fail(function (msg) {
//             assert.ok(false, msg.responseText);
//             QUnit.start();
//         });

//     });
// }


//     function getImgcomListByPageId(pageId){

//         QUnit.asyncTest('getImgcomListByPageId--查询同一pageid的图片组件', function (assert) {
//             $.ajax({
//                 method: "GET",
//                 url: "/getImgcomListByPageId",
//                 data: {
//                     pageId:pageId
//                 }
//             }).done(function (msg) {
//                 assert.ok(true,'查询同一pageid的图片组件成功');
//                 QUnit.start();
//                 deleteImgcom()
//             }).fail(function (msg) {
//                 assert.ok(false, msg.responseText);
//                 QUnit.start();
//             });

//         });
//     }


//     function testUpdateImgcom(imgcomEntity) {

//         imgcomEntity.imgurl = 'http://img.yhd.com/test2';

//         QUnit.asyncTest('updateImgcom--更新单个图片组件', function (assert) {
//             $.ajax({
//                 method: "POST",
//                 url: "/updateImgcom",
//                 data:imgcomEntity
//             }).done(function (msg) {
//                 assert.equal(msg.model.imgurl, 'http://img.yhd.com/test2', '更新单个图片组件成功');
//                 QUnit.start();
//             }).fail(function (msg) {
//                 assert.ok(false, msg.responseText);
//                 QUnit.start();
//             });

//         });
//     }



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










