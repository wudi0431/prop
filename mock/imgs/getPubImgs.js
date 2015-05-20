if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getPubImgs",
    "desc": "获取公共图片列表",
    // 线上地址
    "url": "http://xxx/getPubImgs",
    // 日常地址
    "urlDaily": "http://xxxx/getPubImgs",
    // 预发地址
    "urlPrepub": "http://example.com/getPubImgs",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {};
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