QUnit.asyncTest('getImgsByUser--获得用户图片', function (assert) {
    var userid='55546233a7f0544c40a2ee70';
    $.ajax({
        method: "GET",
        url: "/getImgsByUser?userId="+userid
    }).done(function (msg) {
        assert.equal(msg.model[0].user, userid, '获得用户图片成功');
        QUnit.start();
    }).fail(function (msg) {
        assert.ok(false, msg.responseText);
        QUnit.start();
    });

});













