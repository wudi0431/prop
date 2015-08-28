define(['FFF', 'jquery', 'jqui', 'wxms_config'], function (FFF, $, jqui, WXMS_config) {
    var F = FFF.FFF;
    WXMS_config.domain = WXMS_config.domain || '';

    var Audio = {};

    Audio.close = function () {
        $.each($("#selectAudioDialog audio"), function (i, audio) {
            audio.pause()
        })
    }

    Audio.init = function () {
        var that = this;
        //文件上传
        $('#audiofile_upload').on('click', function () {

            var data = new FormData();
            var files = $('#audiofile')[0].files;
            if (files.length === 0) {
                alert('请选图片')
                return false;
            }
            data.append('codecsv', files[0]);
            $.ajax({
                cache: false,
                type: 'post',
                url: WXMS_config.domain + '/upLoadAudio',
                data: data,
                contentType: false,
                processData: false,
                success: function (data) {
                    that.getAudiosByUser();
                    $('#audiofile').val("");
                }
            })
        });

        that.$selectAudioDialog = $('#selectAudioDialog').dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height: 600,
            closeOnEscape: false,
            modal: true,
            buttons: [
                {
                    text: "确定",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "取消",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });

        that.getPubAudios();
        that.getAudiosByUser();

        $('#selectAudioDialog').on('click', '.audioWareHref', function () {
            var $that = $(this);
            var src = $that.data('src');
            var id = $that.parent('li').data('id');
            if (that.onAudioSelect) {
                that.onAudioSelect(src,id);
            }
            that.$selectAudioDialog.dialog('close');
        });

        $('#audiourlbtn').on('click', function () {
            var audiourl = $('#audiourlval').val();
            if (audiourl != undefined && audiourl != "") {
                if (that.onAudioSelect) {
                    that.onAudioSelect(audiourl);
                }
                that.$selectAudioDialog.dialog('close');

            }
        })

    };

    Audio.getPubAudios = function () {
        var audioWare = $('#audioWare');

        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getPubAudios"
        }).done(function (msg) {
            var audioList = msg.model.audioList || [];
            var html = '';
            if (audioList.length > 0) {
                audioList.forEach(function (o, i) {
                    var audioWareStr = '<li data-id="'+ o._id+'"><span class="audio_span"><em>' + (o.size / 1024 / 1024).toFixed(1) + 'M</em></span>'
                        + '<div class="audioWareHref"  data-src="' + o.path + '" title="' + o.name + '">' + o.name + '</div>'
                        + '</li>';
                    html += audioWareStr;
                });
                audioWare.html('').html(html);
            } else {
                audioWare.html('');
            }
        }).fail(function (msg) {
        });
    };

    Audio.getAudiosByUser = function () {
        var userWare = $('#audiouserWareList');
        $.ajax({
            method: "GET",
            url: WXMS_config.domain + "/getAudiosByUser"
        }).done(function (msg) {
            var audioList = msg.model.audioList || [];
            var html = '';
            if (audioList.length > 0) {
                audioList.forEach(function (o, i) {
                    var audioWareStr = '<li data-id="'+ o._id+'"><span class="audio_span"><em>' + (o.size / 1024 / 1024).toFixed(1) + 'M</em><a href="javascript:;" data-src="' + o.path + '" class="ti-a faplay"> <i  class="fa fa-play"></i><audio style="display:none;"></audio></a><a href="javascript:;" data-id="' + o._id + '" class="ti-a faremove"> <i  class="fa fa-remove"></i></a></span>'
                        + '<div class="audioWareHref"  data-src="' + o.path + '" title="' + o.name + '">' + o.name + '</div>'
                        + '</li>';
                    html += audioWareStr;
                });
                userWare.html('').html(html);

                $.each($('.faremove'), function (index, remove) {
                    var $remove = $(remove);
                    $remove.on('click', function () {
                        var that = $(this);
                        var audioId = $(this).data('id') || "";
                        if (audioId != "") {
                            $.ajax({
                                method: "POST",
                                url: WXMS_config.domain + "/deleteAudio",
                                data: {
                                    audioId: audioId
                                }
                            }).done(function (msg) {
                                that.parent('span').parent('li').remove();
                            }).fail(function (msg) {
                                console.log(msg);
                            });
                        }
                    })
                })
                $.each($('.faplay'), function (index, play) {
                    var $play = $(play);
                    $play.on('click', function () {
                        var src = $(this).data('src');
                        var $paly = $(this).children('audio');
                        var $$paly = $paly.get(0);
                        var $i = $(this).children('i');
                        if ($$paly.paused) {
                            $.each($("#selectAudioDialog audio"), function (i, audio) {
                                if (!audio.paused) {
                                    audio.pause()
                                    $(audio).prev('i').removeClass('fa-play').addClass('fa-pause');
                                }
                            })
                            var oldsrc = $paly.attr('src');
                            if (oldsrc == undefined) {
                                $paly.attr('src', src);
                            }
                            $$paly.play();
                            if ($i.hasClass('fa-play')) {
                                $i.removeClass('fa-play').addClass('fa-pause');
                            } else {
                                $i.removeClass('fa-pause').addClass('fa-play');
                            }


                        } else {
                            $$paly.pause();
                            $i.removeClass('fa-play').addClass('fa-pause');
                        }

                    })
                })

            } else {
                userWare.html('');
            }

        }).fail(function (msg) {
        });


    };

    Audio.show = function (oid) {
        var that = this;
        $('#audiourlval').val("");
        $('#audiofile').val("");
        if(oid){
            $('#audiouserWareList,#audioWare').children('li').each(function(index,item){
                var id =  $(item).data('id');
                if(id==oid){
                    $(item).addClass('selectaudiobk')
                }else{
                    $(item).removeClass('selectaudiobk')
                }
            })
        }
        that.$selectAudioDialog.dialog('open');
    };

    Audio.getData = function () {
        if (this.data && this.data != "") {
            return this.data;
        } else{
            this.data=null;
            return false;
    }
};

Audio.setData = function (data) {
    this.data = data || "";
};


Audio.init();


return Audio;
})
;
