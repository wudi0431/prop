define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;

    var Imgs = {};

    Imgs.show = function(){
        var imgWare = $('#imgWare');
        var userWare = $('#userWare');
        var imgWareStr = '<li>' +
            '<img src="/uploadimg/%name%" style="width:100px;height: 200px;">' +
            '</li>';





        var $selectImgDialog =$('#selectImgDialog').dialog({
            resizable: false,
            width:500,
            height:600,
            title:"选择图片",
            modal: true
        });
        $.ajax({
            method: "GET",
            url: "/getPubImgs"
        }).done(function (msg) {
            var imgList = msg.model.imgList||[];
            var html = '';
            if (imgList.length > 0) {
                imgList.forEach(function (o, i) {
                    var t = imgWareStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                        return o[$3] ? o[$3] : '';
                    });
                    html += t;
                });
                imgWare.html('').html(html);
            } else {
                imgWare.html('');
            }
        }).fail(function (msg) {
        });

        $.ajax({
            method: "GET",
            url: "/getImgsByUser"
        }).done(function (msg) {
            var imgList = msg.model.imgList||[];
            var html = '';
            if (imgList.length > 0) {
                imgList.forEach(function (o, i) {
                    var t = imgWareStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                        return o[$3] ? o[$3] : '';
                    });
                    html += t;
                });
                userWare.html('').html(html);
            } else {
                userWare.html('');
            }
        }).fail(function (msg) {
        });


        //TODO 测试用
        $('#file_upload').on('click', function () {

            var data = new FormData();
            var files = $('#file')[0].files;
            data.append('codecsv', files[0]);

            $.ajax({
                cache: false,
                type: 'post',
                url: '/upLoadImg',
                data: data,
                contentType: false,
                processData: false,
                success: function (data) {
                    alert(data)
                }
            })

        });
    };




    return Imgs;
});