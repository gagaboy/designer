/**
 * Created by yangjiankang on 16/4/6.
 */
import Jquery from "../../node_modules/jquery/dist/jquery.js";

export default class WidgetFactory {

    constructor() {

    }

    create(conf) {
        return this.wrapDefaultConf(conf);
    }

    wrapDefaultConf(conf) {
        var defaultConf = {
            cssClass: '',
            ideSelected: false,
            idePreSelected: false,
            hide: false,
            cssClass: [],
            items: []
        };
        var target = Jquery.extend({}, defaultConf, conf);
        if (target.id == undefined) {
            target.id = this.generateUUID();
        }
        if (target.items != undefined) {
            if (Array.isArray(target.items)) {
                var newItem = [];
                for (var i = 0; i < target.items.length; i++) {
                    var nt = this.wrapDefaultConf(target.items[i]);
                    newItem.push(nt);
                }
                target.items = newItem;
            } else {
                var newItem = {};
                for (var key in target.items) {
                    var nt = this.wrapDefaultConf(target.items[key]);
                    newItem[key] = nt;
                }
                target.items = newItem;
            }
        }
        return target;
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
}