/**
 * Created by wudi on 15/5/27.
 */
define(['jquery','jqui'], function($,jqui) {


var index =0;

var projectId =  getQueryString("projectId");

function Page(){
    this.index=index;
    this.pageList=[];
};

Page.prototype={
    constructor:Page,
    pageList:[],
    addPage:function(){
        this.index = ++index;
        var  addpage =$('.add-page-list');
        var html=$('<div class="page-item" data-index='+ this.index+'>'+
            '<a data-set="selected" class="sort-page js-sort-page cur-sort-page" href="javascript:;"></a>'+
            '<span data-set="selected" class="disp">第'+this.index+'页</span>'+
            '<div class="page-edit" style="display: none;" data-role="title-edit">'+
            ' <input placeholder="请输入不超过100个字" maxlength="100" class="edit" type="text" value="第'+this.index+'页">'+
            '<a data-role="btn-edit-cancel" title="取消" class="ico-del" href="javascript:;" style="text-decoration: none;"></a>'+
            '<a data-role="btn-edit-post" title="确定" class="ico-right" href="javascript:;" style="text-decoration: none;"></a>'+
            '</div>'+
            '<a data-role="btn-del-scene" title="删除" class="ico-del" href="javascript:;"></a>'+
            ' <a data-role="scene-copy" title="复制" class="ico-copy" href="javascript:;"></a>'+
            '<a data-role="btn-edit-scene" title="修改" class="ico-edit" href="javascript:;"></a>'+
            '</div>');
        addpage.before(html);
        this.savePage();
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
            that.bindUI();
            that.clearIphone();
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
        that.$items.on('click', function (e) {
            e.stopPropagation();
            var curitem =$(this);
            var pindex =+curitem.attr('data-index');
            that.addSelectPage(pindex);
            if(e.target.dataset.set=="selected"){
                curitem.children().first().addClass('cur-sort-page');
            }
            var $ed = $('[data-role="title-edit"]')
            switch(e.target.dataset.role){
                case "btn-edit-scene":

                    $ed.show();
                    break;
                case "btn-edit-cancel":
                    $ed.hide();
                    break;
                case "btn-edit-post":

                    break;
                case "scene-copy":
                    that.addPage();
                    break;
                case "btn-del-scene":
                    var curPageData = that.getPageListByIndex(pindex);
                    if(curPageData){
                       that.deletePage(curPageData.model._id,pindex);
                        curitem.remove();
                        that.clearIphone();
                        that.index--;
                        index--;
                        that.delePageListByIndex(pindex);
                        if(that.pageList.length===0){
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
    getPageListByIndex:function(index){
        var onePagedata=null;
        this.pageList.map(function(item){
            if(item.model.sortindex===index){
                onePagedata=item;
            }
        });
        return onePagedata;
    },
    delePageListByIndex: function (index) {
        for(var i=0;i<this.pageList.length;i++){
            if(this.pageList[i].model.sortindex==index){
                this.pageList.splice(i,1);
            }
        }
    },
    deleteSelectPage: function () {
        var that =this;
        $.each(that.$items,function(index,item){
            var $item = $(item);
            var $a = $item.children().first();
            if($item.attr('data-index')!= that.index){
                $a.removeClass('cur-sort-page');
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
    }
}

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

return Page;


});