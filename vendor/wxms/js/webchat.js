/**
 * Created by wudi on 15/7/9.
 */
define(['zepto','weixin'], function($,wx) {
    var foo = {
        getConfig: function () {//白名单验证
            var wxConfigUrl = "http://wechat.yhd.com/wechat/getWeixinConfig.do";
            var appId, timestamp, nonceStr, signature,shareData;
            var that = this;
            $.getJSON("http://wechat.yhd.com/wechat/getWeixinConfig.do?url=" + encodeURIComponent(window.location.href)
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
            var title = json.data.shareTitle,
                text = json.data.shareDesc;

            that.shareJson = {
                "title":title,
                "text":text

            }
            //that.getConfig();
            //分享接口调用
            wx.onMenuShareAppMessage({
                title:foo.shareJson.title,
                link:window.location.href,
                desc:foo.shareJson.text

            });
            wx.onMenuShareTimeline({
                title:foo.shareJson.title,
                link:window.location.href,
                desc:foo.shareJson.text
            });
        }

    };


    return foo;
});