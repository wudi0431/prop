define(['FFF', 'jquery', 'imgcom_cut', 'imgs'], function (FFF, $, imgcom_cut, Imgs) {
    var F = FFF.FFF;
    var J_imgcomContent = $('#J_imgcomContent');
    var J_imgcomHref = $('#J_imgcomHref');


    F.on('renderImgcomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'imgurl':
                    imgcom_cut.initImgCut(data[o]);
                    break;
                case 'href':
                    J_imgcomHref.val(data[o]);
                    break;
            }
        });
    });


    J_imgcomHref.on('input',function(){
        var $that = $(this);
        var value = $that.val();
        F.trigger('imgcomHrefChange', value);
    });

    J_imgcomContent.on('click', '.j_crop_imageImgcom', function () {
        imgcom_cut.getResults();
    });


    J_imgcomContent.on('click', '.j_select_bgImgcom', function (e) {
        Imgs.onImgSelect = function (imgSrc) {
            F.trigger('imgcomContextChange', imgSrc);
            imgcom_cut.initImgCut(imgSrc);
        };
        Imgs.show();


    });


});