define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;

    var Imgs = {};




    Imgs.init = function(){
        var that = this;
        //文件上传
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
                    that.getImgsByUser();
                }
            })
        });

        that.$selectImgDialog =$('#selectImgDialog').dialog({
            autoOpen:false,
            resizable: false,
            width:500,
            height:600,
            title:"选择图片",
            modal: true
        });

        that.getPubImgs();
        that.getImgsByUser();

        $('#selectImgDialog').on('click','.imgWareHref',function(){
            var $that = $(this);
            var img = $that.children('img');
            if(that.onImgSelect){
                that.onImgSelect(img.attr('src'));
            }
            that.$selectImgDialog.dialog('close');
        });
    };

    Imgs.getPubImgs = function(){
        var imgWare = $('#imgWare');
        var imgWareStr = '<li><a class="imgWareHref" href="javascript:;">' +
            '<img src="/uploadimg/%name%" style="width:100px;height: 200px;"></a>' +
            '</li>';
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
    };

    Imgs.getImgsByUser = function(){
        var userWare = $('#userWareList');
        var imgWareStr = '<li><a class="imgWareHref" href="javascript:;">' +
            '<img src="/uploadimg/%name%" style="width:100px;height: 200px;"></a>' +
            '</li>';


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
    };

    Imgs.show = function(){
        var that =this;
        that.init();
        that.$selectImgDialog.dialog('open');
    };




    return Imgs;
});