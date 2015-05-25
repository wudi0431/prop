if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getImgcomListByPageId",
    "desc": "查询同一pageid的图片组件",
    // 线上地址
    "url": "http://xxx/getImgcomListByPageId",
    // 日常地址
    "urlDaily": "http://xxxx/getImgcomListByPageId",
    // 预发地址
    "urlPrepub": "http://example.com/getImgcomListByPageId",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    "pageid" : "123"
};
exports.response = {
    "success": true, // 标记成功
    "model": {
        ImgcomList: [ImgComSchema] //db的imgcom表
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};