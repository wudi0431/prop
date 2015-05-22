QUnit.asyncTest('createHtml--生成html', function (assert) {
    var testdata={
        url:'http://localhost:9898/projectName.html' 
    }
    $.ajax({
        method: "POST",
        url: "/createHtml",
        data:testdata
    }).done(function (msg) {
        assert.equal(msg.model.url, 'http://localhost:9898/projectName.html', '生成html成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});

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











