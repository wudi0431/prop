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
        texalign:"centen",
        zindex:1,
        top:"10px",
        left:"20px",
        width:"100px",
        height:"100px",
        background:"rgba(0, 0, 0, 0)",
        opcity:"1",
        route:"10deg",
        border:"1px solid #000",
        textshadow:"0 1px 2px #ccc",
        boxshadow:"0 1px 2px #ccc",
        padding:"10px",
        animationname:"topBottom",
        animationduration:"1s",
        animationdelay:"1s",
        animationcount:"1",
        fontstyle:"normal",
        fontweight:"bold",
        fontfamily:"simsum",
        fontsize:"12px",
        color:"rgba(0, 0, 0, 1)",
        lineheight:"20px",
        verticalalign:"middle",
        borderradius:"5px",
        href:"http://www.baidu.com",
        hreftype:"_blank",
        dataurl:"http://www.baidu.com",
        datamapping:"data.Id"
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










