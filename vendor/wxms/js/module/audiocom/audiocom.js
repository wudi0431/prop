define(['FFF', 'zepto', 'jquery','stylecom','wxms_config'], function (FFF, $, jq,Stylecom,WXMS_config) {
    var F = FFF.FFF,
        Widget = F.Widget,
        Stylecom = Stylecom.Stylecom;
    WXMS_config.domain = WXMS_config.domain || '';

    function Audiocom() {
        Widget.apply(this, arguments);
    }

    Audiocom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_item" data-type="Audiocom"></div>')
        },
        data: {
            value: null
        },
        projectId: {
            value: null
        },
        audioSrc:{
            value:''
        },
        audio:{
            value:''
        }
    };
    F.extend(Audiocom, Widget, {
        renderUI: function () {
            var that = this;
            that.stylecom =  new Stylecom();
            that.audio = that.getAudio();
            that._addAudiocom(that._bindUI);
        },

        update: function () {
            var that = this;
            var audiocomEntity = that.getData() || that.audio.getData();
            audiocomEntity = jq.isArray(audiocomEntity) ? audiocomEntity[0]:audiocomEntity;
            audiocomEntity.audiourl= that.getAudioSrc();
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/updateAudiocom",
                data: audiocomEntity
            }).done(function (msg) {
                if (msg.success) {
                    F.trigger('comChange', {type: 'Audiocom', comData: msg.model, isUpdate: true});
                }
            }).fail(function (msg) {
            });
        },
        _bindUI: function () {
            var that = this;
            var data = that.getData() || that.audio.getData();
            data = jq.isArray(data) ? data[0]:data;
            if(data.audiourl){
                that.$j_tool_audio.removeClass('item-visible').children('i').removeClass('item-visible');
                that.$j_tool_audio_remove.removeClass('item-visible').children('i').removeClass('item-visible');
            }
            that.$j_tool_audio.on('click',function(){
                that.audio.show();
                if(that.audio.onAudioSelect==undefined){
                    that.audio.onAudioSelect= function (src) {
                        that.setAudioSrc(src);
                        that._addAudiocom(that._bindUI);
                    }
                }
            })
            that.$j_tool_audio_remove.on('click',function(){
                 $(this).addClass('item-visible').children('i').addClass('item-visible');
                $(this).prev('a').addClass('item-visible').children('i').addClass('item-visible');
                that.delSelf()
            })

        },


        delSelf: function () {
            var that = this;
            var AudiocomEntity = that.getData() ||  that.audio.getData();
            AudiocomEntity = jq.isArray(AudiocomEntity) ? AudiocomEntity[0]:AudiocomEntity;
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/deleteAudiocom",
                data: {
                    audiocomId: AudiocomEntity._id
                }
            }).done(function (msg) {
                that.audio.setData("");
                //that.destroy();
                F.trigger('comChange', {type: 'Audiocom', comData: msg.model, isRemove: true});
            }).fail(function (msg) {
                console.log(msg);
            });

        },

        _renderAudiocom: function (data, next) {
            this.$j_tool_audio = $('.j_tool_audio');
            this.$j_tool_audio_remove = $('.j_tool_audio_remove');

            next.call(this);
        },

        _addAudiocom: function (next) {
            var that = this;
            var data = that.getData() ;
            var adata= that.audio && that.audio.getData();
            if (adata) {
                that.update();
            } else if(data){
                that._renderAudiocom(data, next);
            } else {
                var projectId = that.getProjectId();
                var AudiocomEntity = {
                    audiourl: that.getAudioSrc()
                };

                jq.ajax({
                    method: "POST",
                    url: WXMS_config.domain+"/addAudiocom",
                    data: {
                        projectId: projectId,
                        audiocom: AudiocomEntity
                    }
                }).done(function (msg) {
                    if (msg.success) {
                        that.audio.setData(msg.model);
                        console.log(msg.model)
                        that._renderAudiocom(msg.model, next);
                        F.trigger('comChange', {type: 'Audiocom', comData: msg.model, isAdd: true});
                    }
                }).fail(function (msg) {
                });
            }

        }
    });
    return {
        Audiocom: Audiocom
    };
});