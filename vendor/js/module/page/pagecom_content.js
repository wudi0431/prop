define(['imgcut','jquery','imgs'], function (imgcut,$,Imgs) {

    function colorRgb(str){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        /*16进制颜色转为RGB格式*/
        var sColor = str.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "rgba(" + sColorChange.join(",") + ",1)";
        } else {
            return sColor;
        }
    }




    var $J_pageContent = $('#J_pageContent'),
        $showbox = $('#showbox'),
        curpagecom=null,
        $j_crop_btns=$('.j_crop_btns'),
        $j_remove_bg=$('.j_remove_bg'),
        $j_choose_bg=$('.j_choose_bg'),
        $j_bg_preview=$('.j_bg_preview'),
        $j_select_bg=$('.j_select_bg'),
        $j_crop_image=$('.j_crop_image');



    $J_pageContent.on('click', '.palette', function (e) {

        if(e.target.tagName.toLowerCase()=='a'){

            var color = colorRgb($(this).data('value'));

            $showbox.css({"background-color":color});

            $showbox.attr('data-color',color+";");

            updataPageData();

        }else{

            $(this).spectrum({
                allowEmpty:true,
                color: "#ECC",
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showPalette: true,
                showSelectionPalette: true,
                showAlpha: true,
                maxPaletteSize: 10,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                show: function () {

                },
                beforeShow: function () {

                },
                hide: function (color) {
                    console.log(color);
                    var dddc = 'rgba('+color._r.toFixed()+','+color._g.toFixed()+','+color._b.toFixed()+','+color._a+')';
                    $showbox.css({"background-color":dddc});
                    $showbox.attr('data-color',dddc);
                    updataPageData();
                }
                //palette: [
                //    ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                //        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                //        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                //        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                //        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                //        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                //        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                //        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                //        "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
                //         "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
                //        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                //        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                //]
            });


        }


    });

    $j_select_bg.on('click', function (e) {

        Imgs.onImgSelect=function(imgSrc){
            $showbox.css({
                "background-image": "url("+imgSrc+")",
                "background-size": "cover",
                "background-position": "50% 50%"
            });
            $showbox.attr('data-image',imgSrc);

            imgcut.initImgCut(imgSrc);

            updataPageData(false);

        };
        Imgs.show();
        


    });


    $j_crop_image.on('click', function () {
        imgcut.getResults(curpagecom);
    });

    $j_remove_bg.on('click', function () {
        $('#panel').remove();
        $showbox.css({
            "background-image": "nono",
            "background-size": "cover",
            "background-position": "50% 50%"
        });
        updataPageData(true)
    });


    function updatePageStyle(ops){
        curpagecom = ops && ops.curpage;
    }
    function updataPageData(isRemove){
        var curpagedata = curpagecom.getSelectPageData();
        if(curpagecom && !isRemove){
            var curcolor= $showbox.attr('data-color')||"";
            var curimage= $showbox.attr('data-image')|| "";
            curpagedata.backgroundcolor = curcolor;
            curpagedata.backgroundimage = curimage; 
            curpagecom.updataPage(curpagedata,true);
        }else{
            $showbox.attr('data-image',"");
            curpagedata.backgroundimage = "";
            curpagecom.updataPage(curpagedata,true);
        }
    }









    return updatePageStyle;

});