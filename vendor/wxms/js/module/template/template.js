define(['FFF', 'jquery', 'jqui','wxms_config'], function (FFF, $,jqui,WXMS_config) {

    var Template = {};
    var str = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"></li>';
    var userStr = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"><i class="W_delItem">X</i></li>';
    WXMS_config.domain = WXMS_config.domain || '';

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
            modal: true,
            buttons: [
                {
                    text: "确定",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "取消",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });

        $('#selectTplDialog').tabs({
            activate: function( event, ui ) {
                console.log(ui)
                if(ui.newTab.context.hash=='#userTplWare'){
                    $('#tplCategory').hide();
                }else{
                    $('#tplCategory').show();
                }
            }
        });

        that.drawPubTpl();
        that.drawUserTpl();


        $('#selectTplDialog').on('click', '.W_tpl', function () {
            var $that = $(this);
            var allData = that.pubTplList.concat(that.userTplList);
            var uid = $that.data('uid');
            var curTpl = allData.filter(function (tpl) {
                if (tpl.uid == uid) {
                    return true;
                } else {
                    return false;
                }
            });

            if (curTpl.length > 0) {
                curTpl = curTpl[0];
            } else {
                curTpl = null;
            }

            if (that.onTplSelect) {
                that.onTplSelect(curTpl);
            }
            that.$selectTplDialog.dialog('close');
        });

        $('#userTplWare').on('mousemove', 'li', function () {
            $(this).addClass('W_tplHover');
        }).on('mouseout', 'li', function () {
            $(this).removeClass('W_tplHover');
        });

        $('#selectTplDialog').on('click', '.W_delItem', function () {
            var $that = $(this);
            var $tpl = $that.parent('li');
            var $img = $that.prev('.W_tpl');
            var uid = $img.data('uid');
            that.delTpl(uid, $tpl);
        });

        $('#tplCategory').children('li').each(function (index, item) {
            var $item = $(item);
            $item.on('click', function () {
                $item.siblings().each(function (n, li) {
                    if ($(li).hasClass('cur')) {
                        $(li).removeClass('cur');
                    }
                })
                if (!$item.hasClass('cur')) {
                    $item.addClass('cur')
                }
                var category = $(this).data('category');
                that.drawPubTpl(category)
            })
        })


    };


    Template.delTpl = function (templateId, $tpl) {
        $.ajax({
            method: "POST",
            url: WXMS_config.domain+"/deleteTemplate",
            data: {
                templateId: templateId
            }
        }).done(function (msg) {
            $tpl.remove();
        }).fail(function (msg) {
            alert(msg);
        });

    };

    Template.drawPubTpl = function (category) {
        var that = this;

        var tplWare = $('#tplWare');

        var category = category || 1;


        $.ajax({
            type: 'GET',
            url: WXMS_config.domain+'/getPubTpl?category='+category,
            success: function (data) {
                var tplList = data.TemplateList || [];
                var html = '';
                if (tplList.length > 0) {
                    that.pubTplList = tplList.sort(function (a,b) {
                        return a.uid > b.uid;
                    });
                    tplList.forEach(function (o) {
                        o.realImgUrl = '/wxms/uploadimg/' + o.imgUrl;
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
            url: WXMS_config.domain+'/getTplByUser',
            success: function (data) {
                var tplList = data.TemplateList || [];
                var html = '';
                if (tplList.length > 0) {
                    that.userTplList = tplList;
                    tplList.forEach(function (o) {
                        o.realImgUrl = '/wxms/uploadimg/' + o.imgUrl;
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