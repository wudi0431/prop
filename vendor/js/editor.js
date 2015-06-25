require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        spectrum: '/lib/jquerycolorpicker/spectrum',
        html2canvas: '/lib/html2canvas',
        jqui: '/lib/jqueryui/jquery-ui',
        btncom: '/js/module/btncom/btncom',
        btncom_content: '/js/module/btncom/btncom_content',
        btncom_style: '/js/module/btncom/btncom_style',
        imgcom: '/js/module/imgcom/imgcom',
        imgcom_content: '/js/module/imgcom/imgcom_content',
        imgcom_style: '/js/module/imgcom/imgcom_style',
        textcom: '/js/module/textcom/textcom',
        textcom_content: '/js/module/textcom/textcom_content',
        textcom_style: '/js/module/textcom/textcom_style',
        imgs: '/js/module/imgs/imgs',
        pagecom: '/js/module/page/pagecom',
        pagecom_content: '/js/module/page/pagecom_content',
        imgcut: '/js/module/page/imgcut',
        animatecom: '/js/module/animate/animatecom',
        datasourcecom: '/js/module/datasource/datasourcecom',
        template: '/js/module/template/template',
        rotatable: '/lib/rotatable',
        transit: '/lib/jquery.transit',
        imgcom_cut: '/js/module/imgcom/imgcut'


    },
    shim: {
        html2canvas: {
            exports: 'html2canvas'
        },
        jqui: {
            deps: ['jquery']
        },
        spectrum: {
            deps: ['jquery']
        },
        transit: {
            deps: ['jquery']
        },
        rotatable: {
            deps: ['jqui','transit']
        }

    }
});

require(['rotatable','html2canvas', 'zepto', 'jquery', 'spectrum', 'btncom', 'imgcom', 'textcom', 'btncom_content', 'btncom_style', 'imgcom_content',
    'imgcom_style', 'textcom_content', 'textcom_style', 'jqui', 'pagecom', 'imgs', 'FFF', 'animatecom', 'datasourcecom'], function (rotatable,Html2canvas, zepto, $, bigcolorpicker, Btncom, Imgcom, Textcom, btncom_content,
                                                                                                                                    btncom_style, imgcom_content, imgcom_style, textcom_content, textcom_style, jqui, Pagecom, Imgs, FFF, Animatecom, Datasourcecom) {

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
        window.open('/preview?projectId=' + projectId);
    });

    var j_saveTpl = $('.j_saveTpl');
    j_saveTpl.on('click', function () {
        var pageId = pagecom.getSelectPage();

        Html2canvas($('#showbox'), {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL();
                imgData=imgData.split(',')[1];
                $.ajax({
                    method: "POST",
                    url: "/addTplByUser",
                    data: {
                        pageId: pageId,
                        imgData:imgData
                    }
                }).done(function (msg) {
                    if (msg.success) {

                    }
                }).fail(function (msg) {
                });
            }
        });

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
                F.trigger('dragCom', drag.position);
            }
        });
        $that.resizable({
            handles: ' n, e, s, w, ne, se, sw, nw',
            minWidth: 50,
            minHeight: 20,
            stop: function (e, resize) {
                F.trigger('resizeCom', resize.size);
            }
        });

        $that.rotatable({
            stop: function (e, rotate) {
                F.trigger('rotateCom', rotate.deg);
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

    $('#accordion_btncomStyle,#accordion_imgcomStyle').accordion({
        heightStyle: "content",
        collapsible: true
    });
});