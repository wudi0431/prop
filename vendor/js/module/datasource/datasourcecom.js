/**
 * Created by wudi on 15/6/11.
 */

define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function DataSourcecom() {
        Widget.apply(this, arguments);
    }

    DataSourcecom.ATTRS = {
        boundingBox: {
            value: $('<div class="datasource_inner"></div>')
        },
        dataurl: {
            value: "",
            changeFn: function (args) {
                var that = this;
                if (args.value !== args.preValue) {
                    that.isgetDataSouceData && F.trigger('getDataSouceData', that.getDataSouceData());
                }
                that.$dataurl.val(args.value)
            }
        },
        datamapping: {
            value: "",
            changeFn: function (args) {
                var that = this;
                if (args.value !== args.preValue) {
                    that.isgetDataSouceData && F.trigger('getDataSouceData', that.getDataSouceData());
                }
                that.$datamap.val(args.value)
            }
        }

    };
    F.extend(DataSourcecom, Widget, {
        renderUI: function () {
            var that = this;
            var $box = that.getBoundingBox();
            var html ='<p><label>URL:<input type="text" id="J_dateurl" value="'+that.getDataurl()+'"></label></p>' +
                      '<p><label>字段名称:<input type="text" id="J_datamap" value="'+that.getDatamapping()+'"></label></p>';
            $box.append(html);

            that.$dataurl = $('#J_dateurl');
            that.$datamap = $('#J_datamap');
        },
        bindUI: function () {
            var that = this;

            that.isgetDataSouceData=false;

            that.$dataurl.on('blur', function () {
                that.isgetDataSouceData=true;
                that.setDataurl($(this).val());
            })

            that.$datamap.on('blur', function () {
                that.isgetDataSouceData=true;
                that.setDatamapping($(this).val());
            })

            F.on('setDataSouceData', function (data) {
                that.setDataSouceData(data);
            });



        },
        getDataSouceData: function () {
            var that = this;
            return {
                dataurl:that.getDataurl(),
                datamapping:that.getDatamapping()
            }
        },
        setDataSouceData: function (data) {
            var that = this;
            that.isgetDataSouceData=false;
            that.setDataurl(data.dataurl ||"");
            that.setDatamapping(data.datamapping ||"");
        }
    });
    return {
        DataSourcecom: DataSourcecom
    };
});