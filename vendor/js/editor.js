require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        jqui: '/lib/jqueryui/jquery-ui',
        btncom:'/js/module/btncom/btncom',
        btncom_content:'/js/module/btncom/btncom_content',
        btncom_style:'/js/module/btncom/btncom_style',
        imgcom:'/js/module/imgcom/imgcom',
        imgcom_content:'/js/module/imgcom/imgcom_content',
        imgcom_style:'/js/module/imgcom/imgcom_style'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});

require(['zepto','jquery','btncom', 'imgcom', 
    'btncom_content','btncom_style','imgcom_content',
    'imgcom_style','jqui'], function (zepto,$,Btncom,Imgcom) {
        var Btncom = Btncom.Btncom;
        var Imgcom = Imgcom.Imgcom;

        var addtext = $('#addtext');
        var addimage = $('#addimage');
        var addbutton = $('#addbutton');
        addimage.on('click',function(){
            var imgcom = new Imgcom();
            imgcom.render({
                container:zepto('#showbox')
            });
            
        });
        addbutton.on('click',function(){

            var btncom = new Btncom();
            btncom.render({
                container:zepto('#showbox')
            });
        });


        
})