QUnit.asyncTest('downLoadHtml--打包下载生成的html', function (assert) {
    
    $.ajax({
        method: "GET",
        url: "/downLoadHtml?url=http://localhost:9898/projectName.html",
    }).done(function (msg) {
        assert.equal(msg.model.url, 'http://localhost:9898/projectName.html', '生成html成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});













