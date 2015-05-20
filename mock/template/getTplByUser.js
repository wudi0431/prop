if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getTplByUser",
    "desc": "获取用户的模板",
    // 线上地址
    "url": "http://xxx/getTplByUser",
    // 日常地址
    "urlDaily": "http://xxxx/getTplByUser",
    // 预发地址
    "urlPrepub": "http://example.com/getTplByUser",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request ={};
exports.response = {
    "success": true, // 标记成功
    "model": {
    TemplateList:[
        TemplateSchema //db的template表
    ]
}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};