QUnit.asyncTest('getImgsByUser--获得用户图片', function (assert) {
    var wxmsDomain = 'http://120.132.50.71/wxms';
    $.ajax({
        method: "GET",
        url: wxmsDomain+"/getImgsByUser"
    }).done(function (msg) {
        assert.ok(true, '获得用户图片成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});













