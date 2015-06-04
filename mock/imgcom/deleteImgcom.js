if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "deleteImgcom",
    "desc": "删除单个图片组件",
    // 线上地址
    "url": "http://xxx/deleteImgcom",
    // 日常地址
    "urlDaily": "http://xxxx/deleteImgcom",
    // 预发地址
    "urlPrepub": "http://example.com/deleteImgcom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    imgcomId:"12"
};
exports.response = {
    "success": true, // 标记成功
    "model": { _id: imgcomId}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "删除失败！"
    }
};