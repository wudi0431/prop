if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "updateImgs",
    "desc": "长传图片",
    // 线上地址
    "url": "http://xxx/updateImgs",
    // 日常地址
    "urlDaily": "http://xxxx/updateImgs",
    // 预发地址
    "urlPrepub": "http://example.com/updateImgs",
    // 支持的 Method 集合
    "method": ['POST']
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