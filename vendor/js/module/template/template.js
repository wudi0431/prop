define(['FFF', 'jquery', 'jqui'], function (FFF, $) {

    var Template = {};
    var str = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"></li>';
    var userStr = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"></li>';


    Template.init = function () {
        var that = this;
        that.pubTplList = [];
        that.userTplList = [];

        that.$selectTplDialog = $('#selectTplDialog').dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height: 600,
            title: "选择模板",
            modal: true
        });

        $('#selectTplDialog').tabs();

        that.drawPubTpl();
        that.drawUserTpl();


        $('#selectTplDialog').on('click', '.W_tpl', function () {
            var $that = $(this);
            var allData = that.pubTplList.concat(that.userTplList);
            var uid = $that.data('uid');
            var curTpl = allData.filter(function(tpl){
                if(tpl.uid == uid){
                    return true;
                }else{
                    return false;
                }
            });

            if(curTpl.length>0){
                curTpl = curTpl[0];
            }else{
                curTpl = null;
            }

            if (that.onTplSelect) {
                that.onTplSelect(curTpl);
            }
            that.$selectTplDialog.dialog('close');
        });
    };

    Template.drawPubTpl = function () {
        var that = this;

        var tplWare = $('#tplWare');

        $.ajax({
            type: 'GET',
            url: '/getPubTpl',
            success: function (data) {
                var tplList = data.TemplateList||[];
                var html = '';
                if (tplList.length > 0) {
                    that.pubTplList = tplList;
                    tplList.forEach(function (o) {
                        o.realImgUrl = '/uploadimg/'+ o.imgUrl;
                        var t = str.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                            return o[$3] ? o[$3] : '';
                        });
                        html += t;
                    });
                    tplWare.html('').html(html);
                } else {
                    tplWare.html('');
                }
            }
        })

    };

    Template.drawUserTpl = function () {
        var that = this;

        var userTplWare = $('#userTplWare');
        $.ajax({
            type: 'GET',
            url: '/getTplByUser',
            success: function (data) {
                var tplList = data.TemplateList||[];
                var html = '';
                if (tplList.length > 0) {
                    that.userTplList = tplList;
                    tplList.forEach(function (o) {
                        o.realImgUrl = '/uploadimg/'+ o.imgUrl;
                        var t = userStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                            return o[$3] ? o[$3] : '';
                        });
                        html += t;
                    });
                    userTplWare.html('').html(html);
                } else {
                    userTplWare.html('');
                }
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