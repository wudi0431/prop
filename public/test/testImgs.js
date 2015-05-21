QUnit.asyncTest('getImgsByUser--获得用户图片', function (assert) {
    
    $.ajax({
        method: "GET",
        url: "/getImgsByUser"
    }).done(function (msg) {
        var userid=msg.userId;
        assert.equal(msg.model[0].user, userid, '获得用户图片成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});













