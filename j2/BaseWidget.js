/**
 * 生命周期
 * 外部事件
 * IDE支持
 *
 * action:
 * store: {
 *
 *      ide_selected : ''
 *      ide_pre_selected:''
 *      ide_property_change:''
 * }
 *
 *
 */

import Meta from "./Meta";


var templateString = '<template v-for="item in config.items">';

for (var widget in Meta.widgets) {
    var tt = Meta.widgets[widget]['el']
    var tpl = "<" + tt + " v-if='item.xtype==\"" + widget + "\"' :config='item'></" + tt + ">";
    templateString += tpl;
}

templateString += '</template>';


var key = Meta.key;

export default {

    props: ['config'],

    created: function () {
        //预处理
        var template = this.$options.template;
        var newTemplate = template.replace("@childrenComponent@", templateString);
        this.$options.template = newTemplate;
    },

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

    vuex: {
        getters: {
            state: function (store) {
                return store;
            }
        },
        actions: {
            ideSelected: function (store, vm, e) {
                var id = vm.config.id;
                var pid = vm.$parent.config.id;
                store.dispatch("IDE_SELECT", id, pid);
            },
            updateModel: function (store, path, value) {
                store.dispatch("UPDATE_MODEL", path, value);
            }
        }
    },

    methods: {
        appendWidget: function (config, index) {
            var i = index == undefined ? this.config.items.length - 1 : index;
            this.config.items.splice(i, 0, config);
        },
        removeChildWidget: function (id) {
            var items = this.config.items;
            if (items) {
                var index = null;
                for (var i = 0; i < items.length; i++) {
                    var conf = items[i];
                    if (conf.id == id) {
                        index = i;
                    }
                }
                items.splice(index, 1);
                return index;
            }
        }
    },

    computed: {
        isIdeMode: function () {
            return this.state.mode == 'design';
        },
        isIdeSelected: function () {
            return this.state.ide.ide_selected_id == this.config.id && this.isIdeMode;
        },
        isIdePreSelected: function () {
            return this.state.ide.ide_pre_selected_id == this.config.id && this.isIdeMode;
        },
        cssClass: function () {
            var clazz = this.config.cssClass;
            var target = {};
            target['component-' + this.config.xtype] = true;
            target['component-selected'] = this.isIdeSelected;
            target['component-pre-selected'] = this.isIdePreSelected;
            target['component-hide'] = this.config.hide;
            if (clazz) {
                if (Array.isArray(clazz)) {
                    for (var i = 0; i < clazz.length; i++) {
                        target[clazz[i]] = true;
                    }
                } else {
                    target[clazz] = true;
                }
            }
            return target;
        },
        cssStyle: function () {
            if (this.config.cssStyle) {
                return this.config.cssStyle;
            }
            return {};
        },
        hasChild: function () {
            return this.config.items.length > 0
        }
    }


}