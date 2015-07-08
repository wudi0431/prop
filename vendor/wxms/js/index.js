/**
 * Created by wudi on 15/5/27.
 */


require.config({
    waitSeconds: 30,
    paths: {
        wxms_config:'/wxms/config',
        jquery: 'http://apps.bdimg.com/libs/jquery/1.10.0/jquery.min',
        jqui: '/wxms/lib/jqueryui/jquery-ui'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});
require(['wxms_config','jquery', 'jqui'], function (WXMS_config,$) {
    var islogin = $('#islogin').val(), username = $('#username').val(),
        login = $('#login'), createrpage = $('.createrpage'), $loginout = $('#logout');
    ;
    if (islogin == "false") {
        $loginout.hide();
    } else {
        $loginout.show();
    }
    login.on('click', function (e) {
        e.preventDefault();
        if (islogin == "false") {
            window.location.href = WXMS_config.domain + '/login';
        }
    })
    if (username != "") {
        window.localStorage.setItem('username', username)
    }
    $.each(createrpage, function (index, page) {
        $(page).on('click', function (e) {
            e.preventDefault();
            if (islogin == "false") {
                window.location.href = WXMS_config.domain + '/login';
            } else {
                window.location.href = WXMS_config.domain + '/list';
            }
        })
    })

    $loginout.on('click', function () {
        $.ajax({
            method: "get",
            url: WXMS_config.domain +"/logout"
        }).done(function (msg) {
            if (msg.success) {
                window.location.href = WXMS_config.domain + '/index';
                window.localStorage.setItem('username', "");
            }
        }).fail(function (msg) {

        });
    })

    $(window).on('scroll', function () {
        var body_scoll = $(window).scrollTop();
        var body_scoll_height = document.body.scrollHeight;
        var percentage = body_scoll / body_scoll_height;
        console.log(percentage);
        if (percentage > 0.1) {
            $(".footer_left").addClass('zoomInLeft');
            $(".footer_right").addClass('zoomInRight');
        } else {
            $(".footer_left").removeClass('zoomInLeft');
            $(".footer_right").removeClass('zoomInRight');
        }
    });

    $(".header_title_logo").hover(function () {
        $(this).addClass("bounce");
    }, function () {
        $(this).removeClass("bounce");
    });
    $(".footer_right_btn").hover(function () {
        $(this).addClass("rubberBand");
    }, function () {
        $(this).removeClass("rubberBand");
    });


});