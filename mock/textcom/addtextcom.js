if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "addTextcom",
    "desc": "新增文本组件",
    // 线上地址
    "url": "http://xxx/addTextcom",
    // 日常地址
    "urlDaily": "http://xxxx/addTextcom",
    // 预发地址
    "urlPrepub": "http://example.com/addTextcom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request ={
    pageId:'fa23r23r',
    textcom:TextcomSchema //db的Textcom表;
} ;
exports.response = {
    "success": true, // 标记成功
    "model": TextcomSchema
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};