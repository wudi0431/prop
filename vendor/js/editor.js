require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        jqui: '/lib/jqueryui/jquery-ui',
        btncom:'/js/module/btncom/btncom',
        btncom_content:'/js/module/btncom/btncom_content',
        btncom_style:'/js/module/btncom/btncom_style',
        imgcom:'/js/module/imgcom/imgcom',
        imgcom_content:'/js/module/imgcom/imgcom_content',
        imgcom_style:'/js/module/imgcom/imgcom_style',
        page:'/js/module/page/page'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});

require(['zepto','jquery','btncom', 'imgcom', 
    'btncom_content','btncom_style','imgcom_content',
    'imgcom_style','jqui','page'], function (zepto,$,Btncom,Imgcom,btncom_content,btncom_style,imgcom_content,imgcom_style,jqui,Page) {


        var Btncom = Btncom.Btncom;
        var Imgcom = Imgcom.Imgcom;
        $('#prototype-content').tabs();
        var page = new Page();
            page.initPage({Btncom:Btncom});


        var addtext = $('#addtext');
        var addimage = $('#addimage');
        var addbutton = $('#addbutton');
        var addpages = $('.add-page-list');

        addpages.on('click',function(){
            page.addPage();
        });
        addimage.on('click',function(){
            var imgcom = new Imgcom();
            imgcom.render({
                container:zepto('#showbox')
            });
            
        });
        addbutton.on('click',function(){
            var pageId = page.getSelectPage();
            var btncom = new Btncom({
                pageId:pageId
            });
            btncom.render({
                container:zepto('#showbox')
            });
        });


    $('#showbox').on('click','.W_iteam',function(){
        var $that = $(this);
        var siblings = $that.siblings();
        $that.addClass('select');
        $that.draggable();
        $that.resizable({
            handles:' n, e, s, w, ne, se, sw, nw'
        });
        siblings.removeClass('select');
        siblings.each(function(i,o){
            if($(o).resizable( "instance" )){
                $(o).resizable( "destroy" );
            }
        });

    });

        
});