/**
 * Created by wudi on 15/5/27.
 */
define(['jquery','jqui'], function($,jqui) {


var index =0;

var projectId =  getQueryString("projectId");

function Page(){
    this.index=index;
    this.pageList=[];
    this.isfistadd=true;
};

Page.prototype={
    constructor:Page,
    addPage:function(){
        var that =this;
        this.index = ++index;
        var  addpage =$('.add-page-list');
        var html=$('<div class="page-item ui-sortable-handle" data-index='+ this.index+'>'+
            '<a data-set="selected" class="sort-page js-sort-page cur-sort-page" href="javascript:;"></a>'+
            '<span data-set="selected" class="disp">第'+this.index+'页</span>'+
            '<div class="page-edit" style="display: none;" data-role="title-edit">'+
            '<input placeholder="请输入不超过100个字" maxlength="100" class="edit" type="text" value="第'+this.index+'页">'+
            '<a data-role="btn-edit-cancel" title="取消" class="ico-del" href="javascript:;" style="text-decoration: none;"></a>'+
            '<a data-role="btn-edit-post" title="确定" class="ico-right" href="javascript:;" style="text-decoration: none;"></a>'+
            '</div>'+
            '<a data-role="btn-del-scene" title="删除" class="ico-del" href="javascript:;"></a>'+
            ' <a data-role="scene-copy" title="复制" class="ico-copy" href="javascript:;"></a>'+
            '<a data-role="btn-edit-scene" title="修改" class="ico-edit" href="javascript:;"></a>'+
            '</div>');
        this.isfistadd && addpage.before(html);
        if(!this.isfistadd) {
            var $addPageDailog =$('#addPageDailog').dialog({
                resizable: false,
                width:500,
                height:600,
                title:"选择模板",
                modal: true,
                dialogClass: "fasdfasdfasdfsd"
            });

            $(".tmpl-item").on('click',function(){
                if($(this).attr('tmpl-index')==-1){
                    $addPageDailog.dialog( "close" );
                    addpage.before(html);
                    that.clearIphone();
                }
            });

        }

        this.savePage();
        this.isfistadd=false;
    },
    savePage: function () {
        var that =this;
        var pageEntity = {
            name: "第"+ this.index+"页",
            sortindex:this.index,
            background:'#fff'
        };
        $.ajax({
            method: "POST",
            url: "/addPage",
            data: {
                projectId:projectId,
                page:pageEntity
            }
        }).done(function (msg) {
            console.log(msg);
            that.pageList.push(msg);
            that.$items =$('.page-item');
            that.$pagelist =$('.page-list');
            that.bindUI();

        }).fail(function (msg) {
            console.log(msg)
        });

    },
    updataPage:function(pageEntity){
        $.ajax({
            method: "POST",
            url: "/updatePage",
            data:pageEntity
        }).done(function (msg) {
            console.log(msg)
        }).fail(function (msg) {
            console.log(msg)
        });

    },
    deletePage:function(pageId){
        var that =this;
        $.ajax({
            method: "POST",
            url: "/deletePage",
            data: {
                pageId: pageId
            }
        }).done(function (msg) {
            if(msg.success){
                console.log('删除页面成功');
            }

        }).fail(function (msg) {

        });

    },
    bindUI:function(){
        var that =this;
        that.deleteSelectPage();

        that.$pagelist.sortable({
            placeholder: "ui-state-highlight",
            stop: function( event, ui ) {
                console.log(ui);
                that.updateIndex();
            }
        });
        that.$pagelist.disableSelection();

        that.$items.on('click', function (e) {
            e.stopPropagation();
            var curitem =$(this);
            var pindex =+curitem.attr('data-index');
            var pageid =curitem.attr('data-pageid');
            var curPageData = that.getPageListByIndex(null,pageid);
            that.addSelectPage(pindex);
            if(e.target.dataset.set=="selected"){
                curitem.children().first().addClass('cur-sort-page');
            }
            var $ed = curitem.find('[data-role="title-edit"]');
            switch(e.target.dataset.role){
                case "btn-edit-scene":
                    $.each(that.$items,function(index,item){
                        $(item).find('[data-role="title-edit"]').hide();
                    });
                    $ed.show();
                    $ed.nextAll().addClass("item-visible");
                    break;
                case "btn-edit-cancel":
                    $ed.hide();
                    $ed.nextAll().removeClass("item-visible");
                    break;
                case "btn-edit-post":
                    var title = $ed.find('.edit').val();
                    curPageData.model.name = title;
                    that.updataPage(curPageData.model);
                    $ed.hide();
                    $ed.nextAll().removeClass("item-visible");
                    $ed.find('.edit').attr('value',title);
                    curitem.find('.disp').text(title);
                    break;
                case "scene-copy":
                    that.addPage();
                    break;
                case "btn-del-scene":
                    if(curPageData){
                       that.deletePage(curPageData.model._id,pindex);
                        curitem.remove();
                        that.clearIphone();
                        that.delePageListByIndex(null,pageid);
                        if(that.pageList.length===0){
                            index =  that.pageList.length;
                            that.index =that.pageList.length;
                            that.addPage();
                        }else{
                            var nextpindex =pindex-1;
                            that.addSelectPage(nextpindex==0?1:nextpindex);
                        }

                    }
                    break;

            }
            return false;

        })
    },
    clearIphone:function(){
        $('#showbox').html("");
    },
    getPageListByIndex:function(index,pageid){
        var onePagedata=null;
        this.pageList.map(function(item){
            if(index && item.model.sortindex===index){
                onePagedata=item;
            }
            if(pageid && item.model._id===pageid){
                onePagedata=item;
            }
        });
        return onePagedata;
    },
    delePageListByIndex: function (index,pageid) {
        for(var i=0;i<this.pageList.length;i++){
            if(index && this.pageList[i].model.sortindex==index){
                this.pageList.splice(i,1);
            }
            if(pageid && this.pageList[i].model._id==pageid){
                this.pageList.splice(i,1);
            }
        }
        index =  this.pageList.length;
        this.index =this.pageList.length;
    },
    deleteSelectPage: function () {
        var that =this;
        $.each(that.$items,function(index,item){
            var $item = $(item);
            var $a = $item.children().first();
            if($item.attr('data-index')!= that.index){
                $a.removeClass('cur-sort-page');
            }else{
                var curpage = that.getPageListByIndex(that.index);
                curpage && $item.attr('data-pageid',curpage.model._id);
            }
        });
    },
    addSelectPage: function (pindex) {
        var that =this;
        $.each(that.$items,function(index,item){
            var $item = $(item),flag=true;
            var $a = $item.children().first();
            if($item.attr('data-index')== pindex && flag){
                $a.addClass('cur-sort-page');
                flag=false;
            }else{
                $a.hasClass('cur-sort-page') &&  $a.removeClass('cur-sort-page');
            }
        });
    },
    updateIndex: function () {
        var that =this;
        var $pageietm  =$('.page-item');
        $.each($pageietm,function(index,page){
            var pageid =$(page).attr('data-pageid');
            var curpage = that.getPageListByIndex(null,pageid);
            var cindex = ++index;
            curpage.model.sortindex=cindex;
            $(page).attr('data-index',cindex);
            var $title = $(page).find('.disp');
            if($title.text().indexOf('第')!=-1){
                var n  ="第"+cindex+"页";
                curpage.model.name=n;
                $title.text(n);
                $(page).find('.edit').attr('value',n);
            }
            that.updataPage(curpage.model)

        })
    }
}

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

return Page;


});