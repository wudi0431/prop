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
            modal: true
            //buttons: [
            //    {
            //        text: "确定",
            //        click: function() {
            //            $( this ).dialog( "close" );
            //        }
            //    },
            //    {
            //        text: "取消",
            //        click: function() {
            //            $( this ).dialog( "close" );
            //        }
            //    }
            //]
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
         var imgWarepo = $('#imgWarepo');
             imgWarepo.html('');
        category = category || 1;
        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getPubImgs?category=" + category
        }).done(function (msg) {
            var imgList = msg.model.imgList || [];
            var html = '';
            var wraphtml ='';
            var n =0;
            var p=1;
            var ispageone=true;
            if (imgList.length > 0) {
                imgList.forEach(function (o,len) {
                    var t = imgWareStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                        return o[$3] ? o[$3] : '';
                    });
                    html += t;
                    n++;
                  if(ispageone==false && n/8==1){
                    p++;
                    wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                    html='';
                    imgWare.append(wraphtml);
                  }else if(n==8 && ispageone){
                    wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                    html='';
                    imgWare.html('').append(wraphtml);
                    ispageone=false;
                  }else if(ispageone==false && imgList.length==(len+1)){
                    p++;
                    wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                    imgWare.append(wraphtml);
                  }else if(ispageone==true && imgList.length==(len+1)){
                    p++;
                    wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                    imgWare.append(wraphtml);
                  }




                });


              imgWarepo.jui_pagination('destroy')

              imgWarepo.jui_pagination({
                currentPage: 1,
                visiblePageLinks:5,
                rowsPerPage: 8,
                totalPages: Imgs.gettotalPages(imgList),
                containerClass: 'container1',
                showNavButtons:true,
                disableSelectionNavPane: true,
                showPreferences:false,
                navRowsPerPageClass: 'rows-per-page1  ui-state-default ui-corner-all',
                navGoToPageClass: 'goto-page1 ui-state-default ui-corner-all',
                onChangePage: function(event, page_num) {
                  if(isNaN(page_num) || page_num <= 0) {
                    alert('Invalid page' + ' (' + page_num + ')');
                  } else {
                    $('.page-'+page_num).removeClass('item-visible').siblings('div').addClass('item-visible');
                  }
                },
                onSetRowsPerPage: function(event, rpp) {
                  if(isNaN(rpp) || rpp <= 0) {
                    alert('Invalid rows per page' + ' (' + rpp + ')');
                  } else {
                    alert('rows per page successfully changed' + ' (' + rpp + ')');
                    $(this).jui_pagination({
                      rowsPerPage: rpp
                    })
                  }
                },
                onDisplay: function() {
                  var showRowsInfo = $(this).jui_pagination('getOption', 'showRowsInfo');
                  if(showRowsInfo) {
                    var prefix = $(this).jui_pagination('getOption', 'nav_rows_info_id_prefix');
                    $("#" + prefix + $(this).attr("id")).text('Total rows: XXX');
                  }
                }
              });
              imgWarepo.jui_pagination('setOption', 'currentPage',1)
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
        var userWareListpo = $('#userWareListpo');
            userWareListpo.html('');
        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getImgsByUser"
        }).done(function (msg) {
          var imgList = msg.model.imgList || [];
          var html = '';
          var wraphtml ='';
          var n =0;
          var p=1;
          var ispageone=true;
          if (imgList.length > 0) {
            imgList.forEach(function (o,len) {
              var t = imgWareStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                return o[$3] ? o[$3] : '';
              });
              html += t;
              n++;
              if(ispageone==false && n/8==1){
                p++;
                wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                html='';
                userWare.append(wraphtml);
              }else if(n==8 && ispageone){
                wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                html='';
                userWare.html('').append(wraphtml);
                ispageone=false;
              }else if(ispageone==false && imgList.length==(len+1)){
                p++;
                wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                userWare.append(wraphtml);
              }else if(ispageone==true && imgList.length==(len+1)){
                p++;
                wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                userWare.append(wraphtml);
              }

            });

            userWareListpo.jui_pagination('destroy')

            userWareListpo.jui_pagination({
              currentPage: 1,
              visiblePageLinks:5,
              rowsPerPage: 8,
              totalPages: Imgs.gettotalPages(imgList),
              containerClass: 'container1',
              showNavButtons:true,
              disableSelectionNavPane: true,
              showPreferences:false,
              navRowsPerPageClass: 'rows-per-page1  ui-state-default ui-corner-all',
              navGoToPageClass: 'goto-page1 ui-state-default ui-corner-all',
              onChangePage: function(event, page_num) {
                if(isNaN(page_num) || page_num <= 0) {
                  alert('Invalid page' + ' (' + page_num + ')');
                } else {
                  $('.page-'+page_num).removeClass('item-visible').siblings('div').addClass('item-visible');
                }
              },
              onSetRowsPerPage: function(event, rpp) {
                if(isNaN(rpp) || rpp <= 0) {
                  alert('Invalid rows per page' + ' (' + rpp + ')');
                } else {
                  alert('rows per page successfully changed' + ' (' + rpp + ')');
                  $(this).jui_pagination({
                    rowsPerPage: rpp
                  })
                }
              },
              onDisplay: function() {
                var showRowsInfo = $(this).jui_pagination('getOption', 'showRowsInfo');
                if(showRowsInfo) {
                  var prefix = $(this).jui_pagination('getOption', 'nav_rows_info_id_prefix');
                  $("#" + prefix + $(this).attr("id")).text('Total rows: XXX');
                }
              }
            });
            userWareListpo.jui_pagination('setOption', 'currentPage',1)
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
    Imgs.gettotalPages=function(data){
      var len = data.length-1;
      var p =0;
      var chu = len/8;
      if(chu <=1){
        return p=1;
      }else{
        return p = Math.round(chu+1);
      }
    }

    Imgs.init();


    return Imgs;
});
