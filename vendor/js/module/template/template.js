define(['FFF', 'jquery', 'jqui'], function (FFF, $) {

    var Template = {};


    Template.init = function () {
        var that = this;


        that.$selectTplDialog = $('#selectTplDialog').dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height: 600,
            title: "选择模板",
            modal: true
        });

        that.drawPubTpl();
        that.drawUserTpl();


        //$('#selectImgDialog').on('click', '.imgWareHref', function () {
        //    var $that = $(this);
        //    var img = $that.children('img');
        //    if (that.onImgSelect) {
        //        that.onImgSelect(img.attr('src'));
        //    }
        //    that.$selectTplDialog.dialog('close');
        //});
    };

    Template.drawPubTpl = function () {
        $.ajax({
            type: 'GET',
            url: '/getPubTpl',
            success: function (data) {
                console.log(data);
            }
        })

    };

    Template.drawUserTpl = function () {
        $.ajax({
            type: 'GET',
            url: '/getTplByUser',
            success: function (data) {
                console.log(data);
            }
        })

    };


    Template.show = function () {
        var that = this;

        that.$selectTplDialog.dialog('open');
    };


    Template.init();


    return Template;
});