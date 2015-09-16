define(['FFF', 'jquery', 'jqui','wxms_config','template_native'], function (FFF, $,jqui,WXMS_config,Tejs) {


    var tplDraw = '<div id="<%= page.uid %>" class="showPage" style="background-color:<%= page.backgroundcolor %>;' +
      ' background-image:url(<%=page.backgroundimage%>); background-size: cover; background-position: 50% 50%;"> ' +
      '<% page.imgcomList.forEach(function(img){ %>' +
      ' <div id="<%=img._id %>" class="<%=img.animationName %> animated" data-type="img" style="position: absolute; ' +
      'z-index: <%=img.zIndex %>;left: <%=sizeFormat(img.left,page.initWidth)%>; right: <%=sizeFormat(img.right,page.initWidth) %>; ' +
      'top: <%=sizeFormat(img.top,page.initHeight) %>; bottom: <%=sizeFormat(img.bottom,page.initHeight) %>; ' +
      'width: <%=sizeFormat(img.width,page.initWidth) %>; height: <%=sizeFormat(img.height,page.initHeight)%>;' +
      ' -webkit-animation-duration: <%=img.animationDuration %>; animation-duration: <%=img.animationDuration %>; ' +
      '-webkit-animation-iteration-count: <%=img.animationCount %>; animation-iteration-count: <%=img.animationCount %>; ' +
      'animation-delay:<%=img.animationDelay %>; -webkit-animation-delay:<%=img.animationDelay %>; ' +
      ' background-repeat: no-repeat;"> <div style="transform:<%=img.transform %>;-webkit-transform:<%=img.transform %>;' +
      'background-color:transparent;" class="item-image-full"> <img class="W_item" data-href="<%=img.href%>" ' +
      'src="<%=img.imgurl %>" data-dataurl="<%=img.dataurl %>" data-datamapping="<%=img.datamapping %>" ' +
      'width="100%" height="100%" style="-webkit-border-radius:<%=img.borderRadius %>;border-radius:<%=img.borderRadius %>; ' +
      'box-shadow:<%=img.boxShadow %>;opacity:<%=img.opacity %>; border-color:<%=img.borderColor %>;' +
      'border-style:<%=img.borderStyle %>;border-width: <%=img.borderWidth %>;border-radius: <%=img.borderRadius %> ;' +
      'padding: <%=img.paddingTop %> <%=img.paddingRight %> <%=img.paddingBottom %> ' +
      '<%=img.paddingLeft %>;"> </div>' +
      ' </div> <% }) %> ' +
      '<% page.textcomList.forEach(function(txt){ %> <div id="<%=txt._id %>" class="<%=txt.animationName%> animated" ' +
      'data-type="text" style="position: absolute; display: table; width: <%=sizeFormat(txt.width,page.initWidth) %>;' +
      ' height: <%=sizeFormat(txt.height,page.initHeight) %>; font-style: <%=txt.fontStyle %>; ' +
      'font-weight: <%=txt.fontWeight %>; font-family: <%=txt.fontFamily %>; font-size: <%=txt.fontSize %>; ' +
      'color:  <%=txt.color %>; text-align: <%=txt.textAlign%>; line-height:<%=txt.lineHeight%>; ' +
      'z-index: <%=txt.zIndex %>;left: <%=sizeFormat(txt.left,page.initWidth) %>; ' +
      'right: <%=sizeFormat(txt.right,page.initWidth) %>;' +
      ' top: <%=sizeFormat(txt.top,page.initHeight) %>; bottom: <%=sizeFormat(txt.bottom,page.initHeight) %>;' +
      ' opacity: <%=txt.opacity %>; -webkit-animation-duration: <%=txt.animationDuration %>; animation-duration: <%=txt.animationDuration %>;' +
      ' -webkit-animation-iteration-count: <%=txt.animationCount %>; animation-iteration-count: <%=txt.animationCount %>; ' +
      'animation-delay:<%=txt.animationDelay %>; -webkit-animation-delay:<%=txt.animationDelay %>; ' +
      'transform:<%=txt.transform %>;-webkit-transform:<%=txt.transform %>;"> <div class="item-table"> ' +
      '<div data-href="<%=txt.href%>" style="display: table-cell;text-decoration:<%=txt.textDecoration %>;' +
      'vertical-align:<%=txt.verticalAlign %>;color:<%=txt.color %>; box-shadow:<%=txt.boxShadow %> ; ' +
      'text-shadow:<%=txt.textShadow %>;background-color:<%=txt.backgroundColor %>; border-color:<%=txt.borderColor %>;' +
      'border-style:<%=txt.borderStyle %>;border-width: <%=txt.borderWidth %>;border-radius: <%=txt.borderRadius %> ;" ' +
      'class="item-table-cell W_item" data-dataurl="<%=txt.dataurl %>" data-datamapping="<%=txt.datamapping %>"> <%=txt.context %>' +
      ' </div> </div> ' +
      '</div> <% }) %> ' +
      '<% page.btncomtList.forEach(function(btn){ %> <div id="<%= btn._id %>" class="W_item <%=btn.animationName%> animated" ' +
      'data-type="btn" style="position: absolute;width: <%=sizeFormat(btn.width,page.initWidth) %>; ' +
      'height: <%=sizeFormat(btn.height,page.initHeight) %>;z-index: <%=btn.zIndex %>;left: <%=sizeFormat(btn.left,page.initWidth) %>; ' +
      'right: <%=sizeFormat(btn.right,page.initWidth) %>; top: <%=sizeFormat(btn.top,page.initHeight) %>; ' +
      'bottom: <%=sizeFormat(btn.bottom,page.initHeight) %>; -webkit-animation-duration: <%=btn.animationDuration %>; ' +
      'animation-duration: <%=btn.animationDuration %>; -webkit-animation-iteration-count: <%=btn.animationCount %>; ' +
      'animation-iteration-count: <%=btn.animationCount %>; animation-delay:<%=btn.animationDelay %>; ' +
      '-webkit-animation-delay:<%=btn.animationDelay %>; background-repeat: no-repeat;"> <div class="item-table">' +
      ' <button type="button" data-href="<%=btn.href%>" style="transform:<%=btn.transform %>;-webkit-transform:<%=btn.transform %>;' +
      'background-color:<%=btn.backgroundColor %>; border-color:<%=btn.borderColor %>;border-style:<%=btn.borderStyle %>;' +
      'border-width: <%=btn.borderWidth %>;border-radius: <%=btn.borderRadius %> ; box-shadow:<%=btn.boxShadow %> ; ' +
      'text-shadow:<%=btn.textShadow %> ; color:  <%=btn.color %>;font-style: <%=btn.fontStyle %>; font-weight: <%=btn.fontWeight %>;' +
      ' font-family: <%=btn.fontFamily %>; font-size: <%=btn.fontSize %>;  text-align: <%=btn.textAlign%>; line-height:<%=btn.lineHeight%>;" ' +
      'class="W_btn W_item" data-dataurl="<%=btn.dataurl %>" data-datamapping="<%=btn.datamapping %>"> ' +
      '<%= btn.context %> </button> </div> ' +
      '</div> <% }) %> ' +
      '</div>';


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
            modal: true,
            buttons: [
              {
                text: "确定",
                click: function() {
                  if(that.selectTpl){
                    that.selectAction(that.selectTpl);
                  }else{
                    alert('请选择模板');
                  }
                }
              },
              {
                text: "取消",
                click: function() {
                  $( this ).dialog( "close" );
                  $('.tplDraw').html('').hide();
                }
              }
            ]
        });

        $('#selectTplDialog').tabs({
            activate: function( event, ui ) {
                if(ui.newTab.context.hash=='#userTplWare'){
                    $('#tplCategory').hide();
                }else{
                    $('#tplCategory').show();
                }
            }
        });

        that.drawPubTpl();
        that.drawUserTpl();

      $('.tplDraw').on('click',function(){
        $('.tplDraw').html('').hide();
      });


        $('#selectTplDialog').on('click', '.W_tpl', function () {
            var $that = $(this);
             var uid = $that.data('uid');
            $('.W_tpl').removeClass('W_tplSelect');
            $that.addClass('W_tplSelect');
            that.selectTpl = $that;

          Tejs.helper('sizeFormat', function (oldSize, size) {
            return (parseInt(oldSize, 10) / size) * 100 + '%';
          });

          var render = Tejs.compile(tplDraw);
          var html = '预览失败';
          $.ajax({
            method: "GET",
            url: WXMS_config.domain+"/getOneTpl",
            data: {
              tplId: uid
            }
          }).done(function (msg) {
            if(msg.success){
              var data = msg.model;
              data.initWidth = 320;
              data.initHeight = 504;
              html = render({
                page: data
              });
            }
            $('.tplDraw').html(html).show();
          }).fail(function (msg) {
            alert(msg);
          });


        });

      Template.selectAction = function ($tpl) {
        var allData = that.pubTplList.concat(that.userTplList);
        var uid = $tpl.data('uid');
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
        $('.tplDraw').html('').hide();
      };


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
                  userTplWare.show()
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
                      }else if(ispageone==true && tplList.length==(len+1)){
                        p++;
                        wraphtml = '<div class="page-'+p+'">'+html+'</div>';
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
        that.selectTpl = null;
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
