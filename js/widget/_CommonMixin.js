/**
 * Created by yangjiankang on 16/4/6.
 */


import Utils from "./Utils.js";

import Lifecycle from "./_LifecycleMixin";

/**
 * 选中, 是否有子项, 拖放
 *
 *
 *
 *  $bind : [
 {targetId:'', rule:function(){}}
 ]
 */


var Base = {
    events: {
        "ide-event-component-selected": function (id) {
            //响应选中事件
            if (this.config.id == id) {
                this.config.ideSelected = true;
            } else {
                this.config.ideSelected = false;
            }
            return true;
        },
        "ide-event-component-pre-selected": function (id) {
            //响应预选中事件
            if (this.config.id == id) {
                this.config.idePreSelected = true;
            } else {
                this.config.idePreSelected = false;
            }
            return true;
        },
        "ide-event-component-attr-update": function (id, conf) {
            //响应属性改变事件
            if (this.config.id == id) {
                for (var o in conf) {
                    this.config[o] = conf[o];
                }
            }
            return true;
        }
    },
    methods: {
        "ideSelected": function () {
            //if(this.mode == 'design') {
            this.$dispatch("ide-event-root-selected", this.config.id);
            //}
        },
        "hasChild": function () {
            if (this.config.items && this.config.items.length > 0) {
                return true;
            }
            return false;
        },
        "status": function () {
            if (this.config._status != undefined) {
                return this.config._status;
            }
            //design|view
            return "view";
        },
        "isDesign": function () {
            return this.status() == "design";
        },

        _configForm: function (conf) {
            // 输出<my-container></my-container>
            var form = {
                id: Utils.uuid(),
                type: 'container',
                items: []
            };

            if (this._configFormItems) {

                var elements = this._configFormItems(conf);

                for (var i = 0; i < elements.length; i++) {
                    var formElement = elements[i];
                    var row = {id: Utils.uuid(), type: 'row', items: []};
                    var col = {id: Utils.uuid(), type: 'col', items: []};
                    form.items.push(row);
                    row.items.push(col);
                    col.items.push(formElement);
                }

            }
            return form;
        }
    },
    computed: {
        "cssClass": function () {

            var style = {};
            //if (this.mode == 'design') {
            var selected = this.config.ideSelected;
            var preSelected = this.config.idePreSelected;
            style = {
                'component-selected': selected, // 选中样式,
                'component-pre-selected': preSelected, // 预选样式,
                'component-hide': this.config.hide
            };
            //}
            if (this.config.hide) {
                style['component-hide'] = this.config.hide;
            }
            if (this.config.cssClass) {
                var cls = this.config.cssClass;
                if (Array.isArray(cls)) {
                    for (var i = 0; i < cls.length; i++) {
                        var c = cls[i];
                        style[c] = true;
                    }
                } else {
                    style[cls] = true;
                }
            }
            if (this._appendClass) {
                var cj = this._appendClass();
                if (cj) {
                    for (var key in cj) {
                        style[key] = cj[key];
                    }
                }
            }
            return style;
        },
        "cssStyle": function () {
            //v-bind:style="cssStyle"
            //[]
            var style = {};
            if (this.config.cssStyle) {
                style = this.config.cssStyle;
            }
            return style;
        }
    },
    vuex: {
        getters: {
            fluxData : function (state) {
                return state ;
            }
        },
        actions: {
            fluxAction : function (store, action) {
                store.dispatch(action)
            }
        }
    }
};



function mixin(base, obj1) {
    for (var key in obj1) {
        var value = obj1[key];
        if (base[key] == undefined) {
            base[key] = value;
        } else {
            if ((typeof value) == 'object') {
                mixin(base[key], value);
            } else {
                //ignore
            }
        }
    }
}

mixin(Base, Lifecycle);

export default Base;

/*
var key = Setting.contextKey;

export default  {
    ready: function () {
        //生命周期
        if (!window[key]) {
            window[key] = {};
        }
        if (this.config && this.config.id) {
            window[key][this.config.id] = this;
        }
    },
    destroyed: function () {
        //生命周期
        if (this.config && this.config.id) {
            if (window[key][this.config.id]) {
                delete window[key][this.config.id];
            }
        }
    },
    events: {

        "bind-event-bind-accept": function (id, value) {
            var self = this;
            if (this.config.$bind) {
                for (var i = 0; i < this.config.$bind.length; i++) {
                    var bind = this.config.$bind[i];
                    if (bind.targetId == id) {
                        var fun = bind.rule;
                        fun.apply(self, [value]);
                    }
                }
            }
            return true;
        },

        "ide-event-component-selected": function (id) {
            //响应选中事件
            if (this.config.id == id) {
                this.config.ideSelected = true;
            } else {
                this.config.ideSelected = false;
            }
            return true;
        },
        "ide-event-component-pre-selected": function (id) {
            //响应预选中事件
            if (this.config.id == id) {
                this.config.idePreSelected = true;
            } else {
                this.config.idePreSelected = false;
            }
            return true;
        },
        "ide-event-component-attr-update": function (id, conf) {
            //响应属性改变事件
            if (this.config.id == id) {
                for (var o in conf) {
                    this.config[o] = conf[o];
                }
            }
            return true;
        }
    },
    methods: {
        "ideSelected": function () {
            //if(this.mode == 'design') {
            this.$dispatch("ide-event-root-selected", this.config.id);
            //}
        },
        "hasChild": function () {
            if (this.config.items && this.config.items.length > 0) {
                return true;
            }
            return false;
        },
        "status": function () {
            if (this.config._status != undefined) {
                return this.config._status;
            }
            //design|view
            return "view";
        },
        "isDesign": function () {
            return this.status() == "design";
        },

        _configForm: function (conf) {
            // 输出<my-container></my-container>
            var form = {
                id: Utils.uuid(),
                type: 'container',
                items: []
            };

            if (this._configFormItems) {

                var elements = this._configFormItems(conf);

                for (var i = 0; i < elements.length; i++) {
                    var formElement = elements[i];
                    var row = {id: Utils.uuid(), type: 'row', items: []};
                    var col = {id: Utils.uuid(), type: 'col', items: []};
                    form.items.push(row);
                    row.items.push(col);
                    col.items.push(formElement);
                }

            }
            return form;
        }
    },
    computed: {

        "cssClass": function () {

            var style = {};
            //if (this.mode == 'design') {
            var selected = this.config.ideSelected;
            var preSelected = this.config.idePreSelected;
            style = {
                'component-selected': selected, // 选中样式,
                'component-pre-selected': preSelected, // 预选样式,
                'component-hide': this.config.hide
            };
            //}
            if (this.config.hide) {
                style['component-hide'] = this.config.hide;
            }
            if (this.config.cssClass) {
                var cls = this.config.cssClass;
                if (Array.isArray(cls)) {
                    for (var i = 0; i < cls.length; i++) {
                        var c = cls[i];
                        style[c] = true;
                    }
                } else {
                    style[cls] = true;
                }
            }
            if (this._appendClass) {
                var cj = this._appendClass();
                if (cj) {
                    for (var key in cj) {
                        style[key] = cj[key];
                    }
                }
            }
            return style;
        },
        "cssStyle": function () {
            //v-bind:style="cssStyle"
            //[]
            var style = {};
            if (this.config.cssStyle) {
                style = this.config.cssStyle;
            }
            return style;
        }
    }
}
*/