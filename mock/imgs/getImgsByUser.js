if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getImgsList",
    "desc": "获取用户的图片列表",
    // 线上地址
    "url": "http://xxx/getImgsList",
    // 日常地址
    "urlDaily": "http://xxxx/getImgsList",
    // 预发地址
    "urlPrepub": "http://example.com/getImgsList",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    userId:'dfsdfsd'
};
exports.response = {
    "success": true, // 标记成功
    "model": {
        ImgsList:[
            ImgsSchema //db的imgs表
        ]
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};