require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        spectrum: '/lib/jquerycolorpicker/spectrum',
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
        pagecom:'/js/module/page/pagecom',
        pagecom_content:'/js/module/page/pagecom_content',
        imgcut:'/js/module/page/imgcut',
        animatecom:'/js/module/animate/animatecom'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        },
        'spectrum': {
            deps: ['jquery']
        }
    }
});

require(['zepto', 'jquery', 'spectrum', 'btncom', 'imgcom', 'textcom','btncom_content', 'btncom_style', 'imgcom_content',
    'imgcom_style', 'textcom_content', 'textcom_style', 'jqui', 'pagecom', 'imgs','FFF','animatecom'], function (
    zepto, $, bigcolorpicker, Btncom, Imgcom, Textcom, btncom_content,
    btncom_style, imgcom_content, imgcom_style, textcom_content, textcom_style, jqui, Pagecom, Imgs,FFF,Animatecom) {

    var F = FFF.FFF;
    var Btncom = Btncom.Btncom;
    var Imgcom = Imgcom.Imgcom;
    var Textcom = Textcom.Textcom;
    var Animatecom = Animatecom.Animatecom;
    var animatecom = new Animatecom().render({
        container: zepto('#J_animateContent')
    });
    var procon = $('#prototype-content');
    procon.tabs();
    var pagecom = new Pagecom();
    pagecom.initPage({Btncom: Btncom, Imgcom: Imgcom,Textcom: Textcom});
    var selectImgDialog = $('#selectImgDialog');
    selectImgDialog.tabs();

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
    $('#showbox').on('click', '.W_item', function (e) {
        var $that = $(this);
        $('#J_pageContent').hide();
        var siblings = $that.siblings();
        $that.addClass('select');
        $that.draggable({
            cursor: 'move',
            containment: 'parent',
            cancel: false,
            stop:function(e,drag){
                F.trigger('dragCom', drag.position);
            }
        });
        $that.resizable({
            handles: ' n, e, s, w, ne, se, sw, nw',
            minWidth: 50,
            minHeight: 20,
            stop:function(e,resize){
                F.trigger('resizeCom', resize.size);
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

        });
    });
    $('#showbox').on('click', function (e) {
        var issWich = true;
        var $Witem = $(e.target).children();
        $.each($Witem, function (index, item) {
            if ($(item).hasClass('select')) {
                $(item).removeClass('select').resizable('destroy');
            }
        });
        if (issWich) {
            var $li = procon.children('ul').children('li');
            var $jp = procon.find('#J_pageContent');
            var $jb = procon.find('#J_btncomContent');
            var $jm = procon.find('#J_imgcomContent');
            if (e.target.className == 'showbox') {
                $li.first().show().siblings('li').addClass('item-visible');
                $jp.show();
                $jb.hide();
                $jm.hide();
            } else {
                $li.siblings('li').removeClass('item-visible');
                $jp.hide();
                var type = $(e.target).data('type');
                if (type == 'btncom') {
                    $jb.show();
                } else if (type == 'imgcom') {
                    $jm.show();
                }
            }
        }
        e.stopPropagation();
    });
});