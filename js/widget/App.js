/**
 * Created by yangjiankang on 16/4/6.
 */

import Vue from "../../node_modules/vue/dist/vue.js";
import CommonMixin from "./_CommonMixin.js";
import CommandManager from "./CommandManager.js";


// layout
import Container from "./layout/Container.js";
import Panel from "./layout/Panel.js";
import Row from "./layout/Row.js";
import Col from "./layout/Col.js";
import Tab from "./layout/Tab.js";
// form
import Input from "./form/Input.js";
import Select from "./form/Select.js";
import Checkbox from "./form/Checkbox.js";
import Textarea from "./form/Textarea.js";
import Radio from "./form/Radio.js";
import Text from "./Text.js";

import Utils from  "./Utils.js";

//Vue.config.debug = true ;

var template = `
<div v-bind:class="cssStyle"
         v-on:click.stop="ideSelected()"
         :id="config.id"
            >
    <template v-for="item in config.items">
        <my-container :config="item"></my-container>
    </template>
</div>
`;

var commandManager = new CommandManager();

var App = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-app',
    template: template,
    props: ['config', 'mode'], //model : design|view
    data: function () {
        return {
            undoLength: 0,
            redoLength: 0,
            selectedId: null,
            selectedObject: null,
            selectedPath: []
        }
    },
    events: {
        "ide-event-root-selected": function (id) {
            this.select(id);
        }
    },
    methods: {
        _changeStatus: function (status) {
            //design|view
            Utils.addProperty(this.config, "_status", status);
        },
        change2viewMode: function () {
            this._changeStatus("view");
        },
        change2designMode: function () {
            this._changeStatus("design");
        },
        _refreshUndoRedoAndSelect: function () {
            this.undoLength = commandManager.undoLength();
            this.redoLength = commandManager.redoLength();

            var selectObj = Utils.findSelected(this.config);

            if (selectObj) {
                var selectedId = selectObj.id;
                this.selectedId = selectedId;
                this.selectedObject = selectObj;
                this.selectedPath = Utils.findSelectedPath(this.config, selectedId);
            } else {
                this.selectedId = null;
                this.selectedObject = null;
                this.selectedPath = [];
            }
        },
        undo: function () {
            console.log('undo');
            commandManager.undo();
            this._refreshUndoRedoAndSelect();
        },
        redo: function () {
            commandManager.redo();
            this._refreshUndoRedoAndSelect();
        },
        _add: function (pid, conf, index) {
            //TODO index
            var parent = Utils.findById(this.config, pid);
            if (parent != null) {
                if (Array.isArray(parent.items)) {
                    if (index == undefined) {
                        index = parent.items.length;
                    }
                    parent.items.splice(index, 0, conf);
                } else {
                    parent.items[index] = conf;
                }
            }
        },

        add: function (pid, conf) {
            var self = this;
            commandManager.executeCmd({
                "pid": pid,
                "conf": conf,
                "execute": function () {
                    self._add(this.pid, this.conf);
                },
                "undoExecute": function () {
                    self._remove(this.conf.id);
                }
            });
            this._refreshUndoRedoAndSelect();
        },
        _remove: function (id) {
            var parent = Utils.findParent(this.config, id);
            var items = parent.items;
            if (Array.isArray(items)) {
                var index = 0;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == id) {
                        index = i;
                        break;
                    }
                }
                items.splice(index, 1);
            } else {
                //TODO delete items' key
            }

        },
        remove: function (id) {
            if (!id) {
                return;
            }
            if (id == this.config.id) {
                return;
            }
            var self = this;
            var parent = Utils.findParent(this.config, id);
            var pid = null;
            var removeIndex = null;
            if (parent) {
                pid = parent.id;
                if (Array.isArray(parent.items)) {
                    var index = 0;
                    for (var i = 0; i < parent.items.length; i++) {
                        if (id == parent.items[i].id) {
                            index = i;
                        }
                    }
                    removeIndex = index;
                } else {
                    for (var key in parent.items) {
                        if (parent.items[key].id == id) {
                            index = key;
                        }
                    }
                    removeIndex = index;
                }
            }
            var removed = Utils.findById(this.config, id);
            var removedConf = JSON.parse(JSON.stringify(removed));
            commandManager.executeCmd({
                "id": id,
                "pid": pid,
                "removedConf": removedConf,
                "removeIndex": removeIndex,
                "execute": function () {
                    self._remove(this.id);
                    self._select(this.pid);
                },
                "undoExecute": function () {
                    self._add(this.pid, JSON.parse(JSON.stringify(this.removedConf)), this.removeIndex);
                    self._select(this.removedConf.id);
                    this._refreshUndoRedoAndSelect();
                }
            });
            this._refreshUndoRedoAndSelect();
        },

        _select: function (id) {
            window.console.log("id=" + id + ",pid=" + Utils.findParent(this.config, id).id);
            if (this.mode == 'design') {
                if (this.config.id == id) {
                    this.config.ideSelected = true;
                } else {
                    this.config.ideSelected = false;
                }
                this.$broadcast("ide-event-component-selected", id);
                var parent = Utils.findParent(this.config, id);
                if (parent) {
                    if (parent.id == this.config.id) {
                        this.config.idePreSelected = true;
                    } else {
                        this.config.idePreSelected = false;
                    }
                    this.$broadcast("ide-event-component-pre-selected", parent.id);
                }
            }
        },

        select: function (id) {
            var selectObj = Utils.findSelected(this.config);
            window.console.log(this.findById(id));
            //设置回调.
            var self = this;
            self._select(id);
            /*
             commandManager.executeCmd({
             "id": id,
             "hid": selectedId,
             "execute": function () {
             self._select(this.id);
             },
             "undoExecute": function () {
             self._select(this.hid);
             }
             });
             */
            this._refreshUndoRedoAndSelect();
        },

        findById: function (id) {
            var key = '__designer__';
            return window[key][id];
        },

        _update: function (id, conf) {
            this.$broadcast("ide-event-component-attr-update", id, conf);
        },

        update: function (id, conf) {
            var self = this;
            var obj = Utils.findById(this.config, id);
            var objConf = JSON.parse(JSON.stringify(obj));
            commandManager.executeCmd({
                "id": id,
                "conf": conf,
                "hconf": objConf,
                "execute": function () {
                    self._update(this.id, JSON.parse(JSON.stringify(this.conf)));
                },
                "undoExecute": function () {
                    self._update(this.id, JSON.parse(JSON.stringify(this.hconf)));
                }
            });
            this._refreshUndoRedoAndSelect();
        },
        move: function (id, toId) {
            var self = this;
            var obj = JSON.parse(JSON.stringify(Utils.findById(this.config, id)));
            var objParent = JSON.parse(JSON.stringify(Utils.findParent(this.config, id)));
            commandManager.executeCmd({
                "id": id,
                "idObj": obj,
                "idParent": objParent,
                "toId": toId,
                "execute": function () {
                    self._remove(this.id);
                    self._add(this.toId, JSON.parse(JSON.stringify(this.idObj)));
                },
                "undoExecute": function () {
                    self._remove(this.id);
                    self._add(this.idParent.id, JSON.parse(JSON.stringify(this.idObj)));
                }
            });
            this._refreshUndoRedoAndSelect();
        }
    },
    watch: {}
});

Vue.component('my-app', App);

export default App ;