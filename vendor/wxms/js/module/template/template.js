define(['FFF', 'jquery', 'jqui','wxms_config'], function (FFF, $,jqui,WXMS_config) {

    var Template = {};
    var str = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"></li>';
    var userStr = '<li><img class="W_tpl" data-uid="%uid%" src="%realImgUrl%"><i class="W_delItem">X</i></li>';
    WXMS_config.domain = WXMS_config.domain || '';

    Template.init = function () {
        var that = this;
        that.pubTplList = [];
        that.userTplList = [];

        that.$selectTplDialog = $('#selectTplDialog').dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height: 600,
            title: "选择模板",
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

        $('#selectTplDialog').tabs({
            activate: function( event, ui ) {
                if(ui.newTab.context.hash=='#userTplWare'){
                    $('#tplCategory').hide();
                  $('#tplWarepo').hide();
                  $('#userTplWarepo').show()

                }else{
                  $('#tplWarepo').show();
                  $('#userTplWarepo').hide()
                    $('#tplCategory').show();
                }
            }
        });

        that.drawPubTpl();
        that.drawUserTpl();


        $('#selectTplDialog').on('click', '.W_tpl', function () {
            var $that = $(this);
            var allData = that.pubTplList.concat(that.userTplList);
            var uid = $that.data('uid');
            var curTpl = allData.filter(function (tpl) {
                if (tpl.uid == uid) {
                    return true;
                } else {
                    return false;
                }
            });

            if (curTpl.length > 0) {
                curTpl = curTpl[0];
            } else {
                curTpl = null;
            }

            if (that.onTplSelect) {
                that.onTplSelect(curTpl);
            }
            that.$selectTplDialog.dialog('close');
        });

        $('#userTplWare').on('mousemove', 'li', function () {
            $(this).addClass('W_tplHover');
        }).on('mouseout', 'li', function () {
            $(this).removeClass('W_tplHover');
        });

        $('#selectTplDialog').on('click', '.W_delItem', function () {
            var $that = $(this);
            var $tpl = $that.parent('li');
            var $img = $that.prev('.W_tpl');
            var uid = $img.data('uid');
            that.delTpl(uid, $tpl);
        });

        $('#tplCategory').children('li').each(function (index, item) {
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
                that.drawPubTpl(category)
            })
        })


    };


    Template.delTpl = function (templateId, $tpl) {
        $.ajax({
            method: "POST",
            url: WXMS_config.domain+"/deleteTemplate",
            data: {
                templateId: templateId
            }
        }).done(function (msg) {
            $tpl.remove();
        }).fail(function (msg) {
            alert(msg);
        });

    };

    Template.drawPubTpl = function (category) {
        var that = this;
        var tplWare = $('#tplWare');
        var tplWarepo = $('#tplWarepo');
            tplWarepo.html('');
        var category = category || 1;
        $.ajax({
            type: 'GET',
            url: WXMS_config.domain+'/getPubTpl?category='+category,
          success: function (data) {
            var tplList = data.TemplateList || [];
            var html = '';
            var wraphtml ='';
            var n =0;
            var p=1;
            var ispageone=true
            if (tplList.length > 0) {
              that.userTplList = tplList;
              tplList.forEach(function (o,len) {
                o.realImgUrl = '/wxms/uploadimg/' + o.imgUrl;
                var t = userStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                  return o[$3] ? o[$3] : '';
                });
                html+=t;
                n++;
                if(ispageone==false && n/8==1){
                  p++;
                  wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                  html='';
                  tplWare.append(wraphtml);
                }else if(n==8 && ispageone){
                  wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                  html='';
                  tplWare.html('').append(wraphtml);
                  ispageone=false;
                }else if(ispageone==false && tplList.length==(len+1)){
                  p++;
                  wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                  tplWare.append(wraphtml);
                }

              });
              tplWarepo.jui_pagination('destroy')

              tplWarepo.jui_pagination({
                currentPage: 1,
                visiblePageLinks:5,
                rowsPerPage: 8,
                totalPages: that.gettotalPages(tplList),
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
              tplWarepo.jui_pagination('setOption', 'currentPage',1)
            } else {
              tplWare.html('');
              tplWarepo.html('');
            }
          }
        })




    };

    Template.drawUserTpl = function () {
        var that = this;
        var userTplWarepo = $('#userTplWarepo');
        var userTplWare = $('#userTplWare');
        $.ajax({
            type: 'GET',
            url: WXMS_config.domain+'/getTplByUser',
            success: function (data) {
                var tplList = data.TemplateList || [];
                var html = '';
              var wraphtml ='';
                var n =0;
                var p=1;
              var ispageone=true
                if (tplList.length > 0) {
                    that.userTplList = tplList;
                  tplList.forEach(function (o,len) {
                        o.realImgUrl = '/wxms/uploadimg/' + o.imgUrl;
                        var t = userStr.replace(/(%(\w+)%)/g, function ($1, $2, $3) {
                            return o[$3] ? o[$3] : '';
                        });
                      html+=t;
                      n++;
                      if(ispageone==false && n/8==1){
                        p++;
                        wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                        html='';
                        userTplWare.append(wraphtml);
                      }else if(n==8 && ispageone){
                        wraphtml = '<div class="page-'+p+'">'+html+'</div>';
                        html='';
                        userTplWare.html('').append(wraphtml);
                        ispageone=false;
                      }else if(ispageone==false && tplList.length==(len+1)){
                        p++;
                        wraphtml = '<div class="page-'+p+' item-visible">'+html+'</div>';
                        userTplWare.append(wraphtml);
                      }

                    });



                  userTplWarepo.jui_pagination({
                    currentPage: 1,
                    visiblePageLinks:5,
                    rowsPerPage: 8,
                    totalPages: that.gettotalPages(tplList),
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
                  userTplWarepo.jui_pagination('setOption', 'currentPage',1)

                } else {
                    userTplWare.html('');
                    userTplWarepo.html('');
                }
            }
        })

    };


    Template.show = function () {
        var that = this;

        that.$selectTplDialog.dialog('open');
    };


    Template.init();

   Template.gettotalPages=function(data){
     var len = data.length-1;
     var p =0;
     var chu = len/8;
     if(chu <=1){
       return p=1;
     }else{
       return p = Math.round(chu+1);
     }
   }

    return Template;
});
