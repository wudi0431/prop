
require.config({
    waitSeconds: 30,
    paths: {
        dialog:'/wxms/lib/dialog-min',
        wxms_config:'/wxms/config',
        jquery: '/wxms/lib/jqueryui/external/jquery/jquery',
        spectrum: '/wxms/lib/jquerycolorpicker/spectrum',
        html2canvas: '/wxms/lib/html2canvas',
        jqui: '/wxms/lib/jqueryui/jquery-ui',
        btncom: '/wxms/js/module/btncom/btncom',
        btncom_content: '/wxms/js/module/btncom/btncom_content',
        btncom_style: '/wxms/js/module/btncom/btncom_style',
        imgcom: '/wxms/js/module/imgcom/imgcom',
        imgcom_content: '/wxms/js/module/imgcom/imgcom_content',
        imgcom_style: '/wxms/js/module/imgcom/imgcom_style',
        textcom: '/wxms/js/module/textcom/textcom',
        textcom_content: '/wxms/js/module/textcom/textcom_content',
        textcom_style: '/wxms/js/module/textcom/textcom_style',
        imgs: '/wxms/js/module/imgs/imgs',
        pagecom: '/wxms/js/module/page/pagecom',
        pagecom_content: '/wxms/js/module/page/pagecom_content',
        imgcut: '/wxms/js/module/page/imgcut',
        animatecom: '/wxms/js/module/animate/animatecom',
        datasourcecom: '/wxms/js/module/datasource/datasourcecom',
        stylecom: '/wxms/js/module/style/stylecom',
        template: '/wxms/js/module/template/template',
        rotatable: '/wxms/lib/rotatable',
        transit: '/wxms/lib/jquerytransit',
        imgcom_cut: '/wxms/js/module/imgcom/imgcut'
    },
    shim: {
        webchat: {
            deps: ['weixin']
        },
        dialog: {
            deps: ['jquery']
        },
        html2canvas: {
            exports: 'html2canvas'
        },
        jqui: {
            deps: ['jquery']
        },
        spectrum: {
            deps: ['jquery']
        },
        rotatable: {
            deps: ['jqui','transit']
        }

    }
});

require(['dialog','wxms_config','template', 'rotatable', 'html2canvas', 'zepto', 'jquery', 'spectrum', 'btncom', 'imgcom', 'textcom', 'btncom_content', 'imgcom_content',
        'textcom_content', 'jqui', 'pagecom', 'imgs', 'FFF', 'animatecom', 'datasourcecom'],
    function (Dialog,WXMS_config,Template, rotatable, Html2canvas, zepto, $, bigcolorpicker, Btncom, Imgcom, Textcom, btncom_content,
              imgcom_content,textcom_content, jqui, Pagecom, Imgs, FFF, Animatecom, Datasourcecom) {

        //根据 url 的名字 获得 值
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }

        var F = FFF.FFF;
        var Btncom = Btncom.Btncom;
        var Imgcom = Imgcom.Imgcom;
        var Textcom = Textcom.Textcom;
        var Animatecom = Animatecom.Animatecom;
        var Datasourcecom = Datasourcecom.DataSourcecom;
        var animatecom = new Animatecom().render({
            container: zepto('#J_animateContent')
        });
        var datasourcecom = new Datasourcecom().render({
            container: zepto('#J_datasourceContent')
        });

        var projectId = getQueryString("projectId");
        var j_preview_app = $('.j_preview_app');
        j_preview_app.on('click', function () {
            var d = dialog({
                width:250,
                height:50,
                content: '预览页面'
            });
            d.show();
            setTimeout(function () {
                d.close().remove();
            }, 2000);

            window.open(WXMS_config.domain+'/show?projectId=' + projectId);
        });

        var j_saveTpl = $('.j_saveTpl');
        j_saveTpl.on('click', function () {
            var pageId = pagecom.getSelectPage();
            Html2canvas($('#showbox')).then(function (canvas) {
                    var imgData = canvas.toDataURL();
                    imgData = imgData.split(',')[1];
                    $.ajax({
                        method: "POST",
                        url: WXMS_config.domain+"/addTplByUser",
                        data: {
                            pageId: pageId,
                            imgData: imgData
                        }
                    }).done(function (msg) {
                        if (msg.success) {
                            Template.drawPubTpl();
                            Template.drawUserTpl();
                        }
                    }).fail(function (msg) {
                    });
                }
            );

        });


        var procon = $('#prototype-content');
        procon.tabs();
        var pagecom = new Pagecom();
        pagecom.initPage({Btncom: Btncom, Imgcom: Imgcom, Textcom: Textcom});
        var selectImgDialog = $('#selectImgDialog');
        selectImgDialog.tabs();

        $('#prototype-content').tabs({
            beforeActivate: function (event, ui) {
                switch (selecttype) {
                    case 'btncom':
                        if (ui.newTab.attr('aria-controls') == "content-1") {
                            $('#J_btncomContent').show();
                        } else {
                            $('#J_btncomContent').hide();
                        }
                        break;
                    case 'imgcom':
                        if (ui.newTab.attr('aria-controls') == "content-1") {
                            $('#J_imgcomContent').show();
                        } else {
                            $('#J_imgcomContent').hide();
                        }
                        break;
                    case 'textcom':
                        if (ui.newTab.attr('aria-controls') == "content-1") {
                            $('#J_textcomContent').show();
                        } else {
                            $('#J_textcomContent').hide();
                        }
                        break;
                }
            }
        })

        var addtext = $('#addtext');
        var addimage = $('#addimage');
        var addbutton = $('#addbutton');
        var addpages = $('.add-page-list');

        addpages.on('click', function (e) {
            e.stopPropagation();
            pagecom.addPage();
        });
        addimage.on('click', function () {

            Imgs.onImgSelect = function (imgSrc) {
                var pageId = pagecom.getSelectPage();
                var imgcom = new Imgcom({
                    pageId: pageId,
                    imgSrc: imgSrc
                });
                imgcom.render({
                    container: zepto('#showbox')
                });
            };
            Imgs.show();

        });
        addtext.on('click', function () {
            var pageId = pagecom.getSelectPage();
            var textcom = new Textcom({
                pageId: pageId
            });
            textcom.render({
                container: zepto('#showbox')
            });

        });
        addbutton.on('click', function () {
            var pageId = pagecom.getSelectPage();
            var btncom = new Btncom({
                pageId: pageId
            });


        addbutton.on('click', function () {
            var pageId = pagecom.getSelectPage();
            var btncom = new Btncom({
                pageId: pageId
            });
            btncom.render({
                container: zepto('#showbox')
            });
        });


        });
        var selecttype = null;
        $('#showbox').on('click', '.W_item', function (e) {
            var $that = $(this);
            $('#J_pageContent').hide();
            var siblings = $that.siblings();
            $that.addClass('select');
            $that.draggable({
                cursor: 'move',
                containment: 'parent',
                cancel: false,
                stop: function (e, drag) {
                    var type = $(e.target).data('type');
                    F.trigger('dragCom', {position:drag.position,type:type});
                    return false;
                }
            });
            $that.resizable({
                handles: ' n, e, s, w, ne, se, sw, nw',
                minWidth: 50,
                minHeight: 20,
                stop: function (e, resize) {
                    var type = $(e.target).data('type');
                    F.trigger('resizeCom', {size:resize.size,type:type});
                    return false;
                }
            });

            $that.rotatable({
                stop: function (e, rotate) {
                    var type = $(e.target).data('type');
                    F.trigger('rotateCom', {deg:rotate.deg,type:type});
                    return false;
                }
            });

            $that.disableSelection();
            siblings.removeClass('select');
            siblings.each(function (i, o) {
                if ($(o).resizable('instance')) {
                    $(o).resizable('destroy');
                }
                if ($(o).draggable('instance')) {
                    $(o).draggable('destroy');
                }

                if ($(o).rotatable('instance')) {
                    $(o).rotatable('destroy');
                }

            });
        });
        $('#showbox').on('click', function (e) {
            var issWich = true;
            var $Witem = $(e.target).children();
            $.each($Witem, function (index, item) {
                if ($(item).hasClass('select')) {
                    $(item).removeClass('select').resizable('destroy');
                    $(item).removeClass('select').rotatable('destroy');
                    $(item).removeClass('select').draggable('destroy');
                }
            });
            if (issWich) {
                var $li = procon.children('ul').children('li');
                var $div = procon.children('div');
                var $jp = procon.find('#J_pageContent');
                var $jb = procon.find('#J_btncomContent');
                var $jm = procon.find('#J_imgcomContent');
                var $jt = procon.find('#J_textcomContent');
                if (e.target.className == 'showbox') {
                    $li.eq(0).show().siblings('li').addClass('item-visible');
                    $div.eq(0).show().siblings('div').hide();
                    $jp.show();
                    $jb.hide();
                    $jm.hide();
                    $jt.hide();

                } else {
                    $li.siblings('li').removeClass('item-visible');
                    $jp.hide();
                    procon.tabs("option", "active", 0);
                    var targetName = e.target.tagName.toLowerCase();
                    ;
                    if (targetName == "button" || targetName == "img" || targetName == "div") {
                        selecttype = $(e.target).parent('div').data('type');
                    } else {
                        selecttype = $(e.target).data('type');
                    }
                    if (selecttype == 'btncom') {
                        $jb.show();
                    } else if (selecttype == 'imgcom') {
                        $jm.show();
                    } else if (selecttype == 'textcom') {
                        $jt.show();
                    }
                }
            }
            e.stopPropagation();
        });

        $('#accordion_btncomStyle,#accordion_imgcomStyle,#accordion_textcomStyle').accordion({
            heightStyle: "content",
            collapsible: true
        });


        var $wxshare = $('#wxshare'),$wxsharedailog = $('#wxsharedailog');
        var $selectImgUrl = $('#selectImgUrl');var $imgUrl = $('#imgUrl');

        $selectImgUrl.on('click',function(){
            Imgs.onImgSelect = function (imgSrc) {
                $imgUrl.attr('src',imgSrc);
            };
            Imgs.show();
        });




        $wxshare.on('click', function () {
            $wxsharedailog.dialog({
                resizable: false,
                title:'分享微信',
                width:400,
                height:400,
                modal: true,
                buttons: {
                    "确定": function() {
                        var that = this;
                        var name = $wxsharedailog.find('#name');
                        var description = $wxsharedailog.find('#description');
                        var imgUrl = $wxsharedailog.find('#imgUrl');
                        if(name.val()==''){
                            name.focus();
                            name.addClass('eorr');
                        }else if(description.val()==''){
                            description.focus();
                            description.addClass('eorr');
                        }
                        else{
                            name.removeClass('eorr');
                            description.removeClass('eorr');
                            var prodata ={
                                title:name.val(),
                                desc:description.val(),
                                imgUrl:imgUrl.attr('src')
                            };
                            var projectId = getQueryString('projectId')||'';

                            var shareid = description.attr('shareid');

                            if (projectId !='' && shareid!='' && shareid!=undefined){
                                $.ajax({
                                    method: "POST",
                                    url: WXMS_config.domain+"/deleteWeiXinShare",
                                    data: {
                                        shareid: shareid
                                    }
                                }).done(function (msg) {
                                    if(msg.success){
                                        $.ajax({
                                            method: "POST",
                                            url: WXMS_config.domain+"/addWeiXinShare",
                                            data: {
                                                projectId: projectId,
                                                wexinshare:prodata
                                            }
                                        }).done(function (msg) {
                                            $(that).dialog( "close" );
                                        }).fail(function (msg) {

                                        });
                                    }

                                }).fail(function (msg) {

                                });

                            }
                            if(projectId !=''){
                                $.ajax({
                                    method: "POST",
                                    url: WXMS_config.domain+"/addWeiXinShare",
                                    data: {
                                        projectId: projectId,
                                        wexinshare:prodata
                                    }
                                }).done(function (msg) {
                                    $(that).dialog( "close" );
                                }).fail(function (msg) {

                                });

                            }

                        }

                    },
                    '退出': function() {
                        $( this ).dialog( "close" );
                    }
                }
            })


        })

         var $gohome = $('#gohome');

        $gohome.on('click',function(){
            $.ajax({
                method: "get",
                url: WXMS_config.domain+"/logout"
            }).done(function (msg) {
                if (msg.success) {
                    window.location.href = WXMS_config.domain + '/index';
                    window.localStorage.setItem('username', "");
                }
            }).fail(function (msg) {

            });
        });

    });