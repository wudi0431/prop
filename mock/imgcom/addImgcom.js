if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "addImgcom",
    "desc": "新增图片组件",
    // 线上地址
    "url": "http://xxx/addImgcom",
    // 日常地址
    "urlDaily": "http://xxxx/addImgcom",
    // 预发地址
    "urlPrepub": "http://example.com/addImgcom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = ImgComSchema; //db的imgcom表;
exports.response = {
    "success": true, // 标记成功
    "model": {}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};