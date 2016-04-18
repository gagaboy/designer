/**
 * Created by yangjiankang on 16/4/6.
 */

import Vue from "../node_modules/vue/dist/vue.js";

import Utils from "./widget/Utils.js";

import WidgetFactory from "./widget/WidgetFactory.js";

import App from "./widget/App.js";

import MetaConfig from "./widget/MetaConfig.js";

var widgetFactory = new WidgetFactory();

var config = {
    id: 'root',
    type: 'page',
    hide: false,
    cssClass: '',
    ideSelected: false,
    idePreSelected: false,
    $aoa: function () {
        this.config.id = '';
    },
    items: [{
        id: '1',
        type: 'container',
        center: 'true',
        hide: false,
        cssClass: '',
        ideSelected: false,
        idePreSelected: false,
        items: []
    }]
};

function getWidgetConfig() {
    return MetaConfig();
}


window['canvasConfig'] = config;

window['canvasReady'] = function canvasReady(App) {

    var designer = new Vue({
        el: "#designer-root",
        data: {
            undoLength: 0,
            redoLength: 0,
            selectedId: null,
            selectedPath: [],
            selectedConf: {},
            configForm: {}, // 配置表单
            configObject: [],
            configCreate: true,
            acceptWidgets: getWidgetConfig()
        },
        computed: {
            undoClass: function () {
                return {
                    'undo-redo-enable': this.undoLength > 0,
                    'undo-redo-disable': this.undoLength == 0
                }
            },
            redoClass: function () {
                return {
                    'undo-redo-enable': this.redoLength > 0,
                    'undo-redo-disable': this.redoLength == 0
                }
            },
            removeBtnShow: function () {
                return this.selectedId != null && this.selectedId != config.id;
            }
        },
        methods: {
            undo: function () {
                App.undo();
            },
            redo: function () {
                App.redo();
            },
            remove: function () {
                App.remove(this.selectedId);
            },
            select: function (id) {
                App.select(id);
            },
            insert: function (type) {
                var config = getWidgetConfig();
                App.add(this.selectedId, widgetFactory.create(config[type].defaultConfig));
            },
            exportJSON: function () {
                alert(App.getConfig());
            }
        },
        watch: {
            'configForm': {
                handler: function () {
                    var config = {};
                    for (var i = 0; i < this.configObject.length; i++) {
                        var id = this.configObject[i];
                        var o = window['__designer__'][id];
                        var key = o.config.id;
                        var value = o.config.value;
                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            //ignore
                        }
                        config[key] = value;
                    }
                    if (this.configCreate) {
                        this.configCreate = false;
                    } else {
                        App.update(designer.selectedId, config);
                    }
                },
                deep: true
            }
        }
    });

    App.$watch("undoLength", function () {
        designer.undoLength = App.undoLength;
    });
    App.$watch("redoLength", function () {
        designer.redoLength = App.redoLength;
    });

    function buildConfigForm(config, conf) {
        var form = {
            type: 'container',
            items: []
        };
        for (var i = 0; i < config.length; i++) {
            var formElement = config[i];
            var key = formElement.id;

            if (conf[key] != undefined) {
                if ((typeof conf[key]) == 'object') {
                    formElement.value = JSON.stringify(conf[key]);
                } else {
                    formElement.value = conf[key];
                }
            }
            var row = {type: 'row', items: []};
            var col = {type: 'col', items: []};
            form.items.push(row);
            row.items.push(col);
            col.items.push(formElement);
        }
        return widgetFactory.create(form);
    }

    App.$watch("selectedId", function (newVal, oldVal) {
        if (newVal == null) {
            designer.selectedId = null;
            designer.selectedPath = [];
            designer.configForm = {};
            designer.configObject = [];
            designer.selectedConf = {};
            designer.configCreate = true;
            for (var o in designer.acceptWidgets) {
                designer.acceptWidgets[o].show = false;
            }
        } else {
            var selectObjectConf = JSON.parse(JSON.stringify(App.selectedObject));

            var selectPath = App.selectedPath;

            designer.selectedId = newVal;

            designer.selectedPath = JSON.parse(JSON.stringify(selectPath));

            ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            var widgets = getWidgetConfig();
            var config = widgets[selectObjectConf.type].form;

            designer.configForm = buildConfigForm(config, selectObjectConf);
            designer.configObject = [];

            designer.selectedConf = selectObjectConf;

            for (var i = 0; i < config.length; i++) {
                var id = config[i].id;
                designer.configObject.push(id);
            }

            designer.configCreate = true;

            ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            var accept = widgets[selectObjectConf.type].accept;

            if (Array.isArray(accept)) {
                for (var i = 0; i < accept.length; i++) {
                    var key = accept[i];
                    for (var type in designer.acceptWidgets) {
                        if (type == key) {
                            designer.acceptWidgets[type].show = true;
                            //designer.$set('acceptWidgets.' + type + '.show', true);
                        } else {
                            designer.acceptWidgets[type].show = false;
                            //designer.$set('acceptWidgets.' + type + '.show', false);
                        }
                    }
                }
            } else {
                for (var o in designer.acceptWidgets) {
                    if (accept == 'null') {
                        designer.acceptWidgets[o].show = false;
                    } else if (accept == 'all') {
                        designer.acceptWidgets[o].show = true;
                    }
                }
            }
            ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
    });
};

