/**
 * Created by yangjiankang on 5/10/16.
 */

import Vue from '../node_modules/vue/dist/vue';
import Vuex from '../node_modules/vuex/dist/vuex';
import $ from '../node_modules/jquery/dist/jquery';
import BaseWidget from "./BaseWidget";

Vue.use(Vuex);


import Meta from './Meta';
import CommandManager from './CommandManager';

var cmdMgr = new CommandManager();


function createWidget(meta) {

    for (var widget in meta) {
        var xtype = widget;
        var elName = meta[widget].el;
        var component = meta[widget].component;

        var config = {
            mixins: [BaseWidget],
            name: xtype,
            methods: {},
            template: ''
        };

        $.extend(config, component);

        Vue.component(elName, Vue.extend(config));
    }

};

createWidget(Meta.widgets);


function pureConfig(conf) {
    return JSON.parse(JSON.stringify(conf));
}

/**
 * @param setting
 * @returns {Store|*}
 */
function createStore(data) {

    var state = {
        mode: 'view',
        ide: {
            ide_selected_id: '',
            ide_pre_selected_id: '',
            ide_property_change: ''
        },
        model: {}
    };


    $.extend(state, data);

    var mutations = {

        IDE_SELECT: function (state, id, pid) {
            state.ide.ide_selected_id = id;
            state.ide.ide_pre_selected_id = pid;
        },


        UPDATE_MODEL: function (state, path, value) {
            state.model[path] = value;
        }

    };

    return new Vuex.Store({
        state,
        mutations
    });
}

/**
 * {
 *   layout:{},
 *   data:{}
 * }
 * @param setting
 * @returns {*}
 */
export default function (setting) {

    var componentName = 'j-' + setting.layout.xtype;

    var conf = {
        store: createStore(setting.data),
        data: {
            config: setting.layout,
            setting: {
                id: setting.id
            }
        },
        vuex: {
            getters: {
                state: function (store) {
                    return store;
                }
            },
            actions: {
                ideSelect: function (store, pid, id) {
                    store.dispatch("IDE_SELECT", id, pid);
                }
            }
        },
        template: '<div>{{state.ide.ide_selected_id}} ** {{state.ide.ide_pre_selected_id}}<' + componentName + ' :config="config"></' + componentName + '></div>',

        methods: {
            getWidget: function (id) {
                return window[Meta.key][id];
            },
            select: function (id) {
                var vm = this.getWidget(id);
                var pid = vm.$parent.config.id;
                this.ideSelect(id, pid);
            },
            add: function (pid, config) {
                var self = this;
                cmdMgr.executeCmd({
                    "pid": pid,
                    "config": config,
                    "execute": function () {
                        var vm = self.getWidget(this.pid);
                        vm.appendWidget(this.config);
                    },

                    "undoExecute": function () {
                        var vm = self.getWidget(this.pid);
                        vm.removeChildWidget(this.config.id);
                        if (self.state.ide.ide_selected_id == this.config.id) {
                            self.ideSelect(null, null);
                        }
                    }
                });
                this._refresh();
            },
            remove: function (id) {
                var self = this;
                if(this.config.id == id) {
                    return ;
                }
                cmdMgr.executeCmd({
                    "id": id,
                    "execute": function () {
                        var vm = self.getWidget(this.id);
                        var pvm = vm.$parent;
                        this.pid = pvm.config.id;
                        this.config = pureConfig(vm.config);
                        this.index = pvm.removeChildWidget(this.id);
                        if (self.state.ide.ide_selected_id == this.id) {
                            self.ideSelect(null, null);
                        }
                    },
                    "undoExecute": function () {
                        var vm = self.getWidget(this.pid);
                        vm.appendWidget(this.config, this.index);
                    }
                });
                this._refresh();
            },
            update: function (id, config) {
                var self = this;
                cmdMgr.executeCmd({
                    "id": id,
                    "config": config,
                    "hconfig": null,
                    "execute": function () {
                        var vm = self.getWidget(this.id);
                        this.hconfig = pureConfig(vm.config);
                        vm.config = this.config;
                    },
                    "undoExecute": function () {
                        var vm = self.getWidget(this.pid);
                        vm.config = this.hconfig;
                    }
                });
                this._refresh();
            },
            undo: function () {
                cmdMgr.undo();
                this._refresh();
            },
            redo: function () {
                cmdMgr.redo();
                this._refresh();
            },
            _refresh: function () {
                var sid = this.state.ide.ide_selected_id;
                if (this.getWidget(sid) == undefined) {
                    this.ideSelect(null, null);
                }
            },
            appendWidget: BaseWidget.methods.appendWidget,
            removeChildWidget: BaseWidget.methods.removeChildWidget
        }
    };


    return new Vue(conf);
};