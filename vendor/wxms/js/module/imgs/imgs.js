define(['FFF', 'jquery', 'jqui', 'wxms_config'], function (FFF, $, jqui, WXMS_config) {
    var F = FFF.FFF;
    WXMS_config.domain = WXMS_config.domain || '';

    var Imgs = {};

    Imgs.init = function () {
        var that = this;
        //文件上传
        $('#file_upload').on('click', function () {

            var data = new FormData();
            var files = $('#file')[0].files;
            if (files.length === 0) {
                alert('请选图片')
                return false;
            }
            data.append('codecsv', files[0]);
            data.append('categoryvalue', parseInt(that.categoryvalue) || 1);
            $.ajax({
                cache: false,
                type: 'post',
                url: WXMS_config.domain + '/upLoadImg',
                data: data,
                contentType: false,
                processData: false,
                success: function (data) {
                    that.getImgsByUser();
                    $('#file').val("");

                }
            })
        });

        that.$selectImgDialog = $('#selectImgDialog').dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height: 600,
            title: "选择图片",
            modal: true,
            buttons: [
                {
                    text: "确定",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "取消",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });
        that.addSelectDom()
        that.getPubImgs();
        that.getImgsByUser();

        $('#selectImgDialog').on('click', '.imgWareHref', function () {
            var $that = $(this);
            var img = $that.children('img');
            if (that.onImgSelect) {
                that.onImgSelect(img.attr('src'));
            }
            that.$selectImgDialog.dialog('close');
        });

        $('#imgurlbtn').on('click', function () {
            var imgurl = $('#imgurlval').val();
            if (imgurl != undefined && imgurl != "") {
                if (that.onImgSelect) {
                    that.onImgSelect(imgurl);
                }
                that.$selectImgDialog.dialog('close');

            }
        })

        $('#imgCategory').children('li').each(function (index, item) {
            var $item = $(item);
            $item.on('click', function () {
                $item.siblings().each(function (n, li) {
                    if ($(li).hasClass('cur')) {
                        $(li).removeClass('cur');
                    }
                })
                if (!$item.hasClass('cur')) {
                    $item.addClass('cur')
                }
                var category = $(this).data('category');
                that.getPubImgs(category)
            })
        })

        $('#selectcategory').change(function () {
            that.categoryvalue = $(this).children('option:selected').val();
        })


        $('#userWareList').on('mousemove', 'li', function () {
            $(this).children('i').css('display', 'block');
        }).on('mouseout', 'li', function () {
            $(this).children('i').css('display', 'none');
        });

        $('#selectImgDialog').on('click', '.W_delItem', function () {
            var $that = $(this);
            var $li = $that.parent('li');
            var $img = $that.prev('a').children('img');
            var mid = $img.data('mid');
            that.delImgsByUser(mid, $li);
        });


    };

    Imgs.getPubImgs = function (category) {
        var imgWare = $('#imgWare');
        var imgWareStr = '<li><a class="imgWareHref" href="javascript:;">' +
            '<img src="%path%" data-mid="%_id%" style="width:100px;height: 200px;"></a>' +
            '</li>';
        category = category || 1;
        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getPubImgs?category=" + category
        }).done(function (msg) {
            var imgList = msg.model.imgList || [];
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

    Imgs.getImgsByUser = function () {
        var userWare = $('#userWareList');
        var imgWareStr = '<li><a class="imgWareHref" href="javascript:;">' +
            '<img src="%path%" data-mid="%_id%" style="width:100px;height: 200px;"></a>' +
            '<i class="W_delItem">X</i>' +
            '</li>';
        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getImgsByUser"
        }).done(function (msg) {
            var imgList = msg.model.imgList || [];
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


    Imgs.delImgsByUser = function (imgId, $li) {
        $.ajax({
            method: "POST",
            url: WXMS_config.domain + "/deleteImg",
            data: {
                imgId: imgId
            }
        }).done(function (msg) {
            $li.remove();
        }).fail(function (msg) {
            //alert(msg);
        });
    }

    Imgs.show = function () {
        var that = this;
        $('#imgurlval').val("");
        $('#file').val("");
        that.$selectImgDialog.dialog('open');
    };

    Imgs.addSelectDom = function () {

        var username = window.localStorage.getItem('username');

        if (username === 'admin') {
            var shtml = '<select id="selectcategory">' +
                '<option value="1" selected>全部</option>' +
                '<option value="2">背景</option>' +
                '<option value="3">元素</option>' +
                '<option value="4">表情</option>' +
                '<option value="5">文字</option>' +
                '</select>';
            $('#userWare').prepend(shtml);

        }


    }


    Imgs.init();


    return Imgs;
});