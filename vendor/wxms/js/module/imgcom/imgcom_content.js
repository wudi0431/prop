define(['FFF', 'jquery', 'imgcom_cut', 'imgs'], function (FFF, $, imgcom_cut, Imgs) {
    var F = FFF.FFF;
    var J_imgcomContent = $('#J_imgcomContent');

    F.on('renderImgcomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'imgurl':
                    imgcom_cut.initImgCut(data[o]);
                    break;
            }
        });
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