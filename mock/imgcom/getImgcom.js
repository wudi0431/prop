if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getImgcom",
    "desc": "查询图片组件",
    // 线上地址
    "url": "http://xxx/getImgcom",
    // 日常地址
    "urlDaily": "http://xxxx/getImgcom",
    // 预发地址
    "urlPrepub": "http://example.com/getImgcom",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    imgcomId : "123"    // 如果不传ID,则查询所有图片组件
};
exports.response = {
    "success": true, // 标记成功
    "model":ImgcomSchema//db的imgcom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};