/**
 * Created by wudi on 15/7/9.
 */
define(['zepto','weixin'], function($,wx) {
    var foo = {
        init: function (data) {
            this.data = data;
            this.getConfig()
        },
        getConfig: function () {//白名单验证
            var wxConfigUrl = "http://wechat.yhd.com/wechat/getWeixinConfig.do";
            var appId, timestamp, nonceStr, signature,shareData;
            var that = this;
            $.getJSON("http://wechat.yhd.com/wechat/getWeixinConfig.do?url=" + encodeURIComponent('http://mxc.yhd.com/')
                + "&callback=?", function(msg) {
                if (parseInt(msg.rtn_code) == 1) {
                    var data = msg.data;
                    appId = data.appId;
                    timestamp = data.timestamp;
                    nonceStr = data.nonceStr;
                    signature = data.signature;
                }
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });
                setTimeout(function() {
                    that.share();
                }, 800);


            });
        },
        share: function () {
            var that = this;
            that.shareJson = {
                "title": that.data.name,
                "text": that.data.description
            }
            //that.getConfig();
            //分享接口调用
            wx.onMenuShareAppMessage({
                title:that.shareJson.title,
                link:'http://mxc.yhd.com/wxms_client/preview.html?projectId='+that.data.proid,
                desc:that.shareJson.text

            });
            wx.onMenuShareTimeline({
                title:that.shareJson.title,
                link:'http://mxc.yhd.com/wxms_client/preview.html?projectId='+that.data.proid,
                desc:that.shareJson.text
            });
        }

    };


    return foo;
});