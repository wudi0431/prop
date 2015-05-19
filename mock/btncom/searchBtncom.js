if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "searchBtncom",
    "desc": "查询按钮组件",
    // 线上地址
    "url": "http://xxx/searchBtncom",
    // 日常地址
    "urlDaily": "http://xxxx/searchBtncom",
    // 预发地址
    "urlPrepub": "http://example.com/searchBtncom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    "id" : "123"    // 如果不传ID,则查询所有按钮组件
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