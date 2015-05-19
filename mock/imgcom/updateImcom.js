if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "updateImgcom",
    "desc": "更新图片组件",
    // 线上地址
    "url": "http://xxx/updateImgcom",
    // 日常地址
    "urlDaily": "http://xxxx/updateImgcom",
    // 预发地址
    "urlPrepub": "http://example.com/updateImgcom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    "id" : "123"
};
exports.response = {
    "success": true, // 标记成功
    "model": {
        ImgcomList:[
            ImgcomSchema //db的imgcom表
        ]
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};