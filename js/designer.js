/**
 * Created by yangjiankang on 16/4/6.
 */

import Vue from "../node_modules/vue/dist/vue.js";

import Utils from "./widget/Utils.js";

import WidgetFactory from "./widget/WidgetFactory.js";

import App from "./widget/App.js";

var widgetFactory = new WidgetFactory();

var config = {
    id: 'root',
    type: 'page',
    hide: false,
    cssClass: '',
    ideSelected: false,
    idePreSelected: false,
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
    var widgets = {
        input: {
            "icon": '', show: false, defaultConfig: {
                type: 'input',
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                value: '',
                items: {
                    label: {
                        type: 'text',
                        value: ""

                    },
                    message: {
                        type: 'text',
                        value: ""
                    }
                }
            },
            accept: "null",
            form: [
                {
                    id: "labelScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'labelScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "mainScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'mainScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "elementScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'elementScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                }
            ]
        },
        textarea: {
            "icon": '', show: false, defaultConfig: {
                type: 'textarea',
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                value: '',
                items: {
                    label: {
                        type: 'text',
                        value: ""

                    },
                    message: {
                        type: 'text',
                        value: ""
                    }
                }
            }
            ,
            accept: "null",
            form: [
                {
                    id: "labelScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'labelScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "mainScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'mainScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "elementScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'elementScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                }
            ]
        },
        select: {
            "icon": '', show: false, defaultConfig: {
                type: 'select',
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                options: [{value: '1', display: 'click to edit!'}],
                value: [],
                items: {
                    label: {
                        type: 'text',
                        value: ""

                    },
                    message: {
                        type: 'text',
                        value: ""
                    }
                }
            },
            accept: "null",
            form: [
                {
                    id: "labelScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'labelScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "mainScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'mainScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "elementScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'elementScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "options",
                    type: 'textarea',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'options',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'html'
                        }
                    }
                }
            ]
        },
        checkbox: {
            "icon": '', show: false, defaultConfig: {
                type: 'checkbox',
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                options: [{value: '1', display: 'click to edit!'}],
                value: [],
                items: {
                    label: {
                        type: 'text',
                        value: ""

                    },
                    message: {
                        type: 'text',
                        value: ""
                    }
                }
            },
            accept: "null",
            form: [
                {
                    id: "labelScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'labelScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "mainScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'mainScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "elementScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'elementScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "options",
                    type: 'textarea',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'options',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'html'
                        }
                    }
                }
            ]
        },

        radio: {
            "icon": '', show: false, defaultConfig: {
                type: 'radio',
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                options: [{value: '1', display: 'click to edit!'}],
                value: [],
                items: {
                    label: {
                        type: 'text',
                        value: ""

                    },
                    message: {
                        type: 'text',
                        value: ""
                    }
                }
            },
            accept: "null",
            form: [
                {
                    id: "labelScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'labelScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "mainScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'mainScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "elementScale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'elementScale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                },
                {
                    id: "options",
                    type: 'textarea',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'options',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'html'
                        }
                    }
                }
            ]
        },

        text: {
            "icon": '', show: false, defaultConfig: {
                type: 'text',
                value: ""
            },
            accept: "null",
            form: [
                {
                    id: "value",
                    type: 'textarea',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'text',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'html'
                        }
                    }
                }
            ]
        },

        page: {
            "icon": '', show: false, defaultConfig: {
                type: 'page',
                center: true
            },
            accept: ["container"],
            form: []
        },
        container: {
            "icon": '', show: false, defaultConfig: {
                type: 'container',
                center: true
            },
            accept: ["row"],
            form: [{
                id: "center",
                type: 'radio',
                hide: false,
                value: "",
                labelScale: '1-1',
                mainScale: '1-1',
                elementScale: '1-1',
                options: [{value: 'true', display: '是'}, {value: 'false', display: '否'}],
                items: {
                    label: {
                        value: 'center',
                        cssClass: 'uk-form-label'
                    },
                    message: {
                        value: 'true|false'
                    }
                }
            }]
        },
        panel: {
            "icon": '', show: false, defaultConfig: {
                type: 'panel',
            },
            accept: "null",
            form: []
        },
        row: {
            "icon": '', show: false, defaultConfig: {
                type: 'row',
                gutter: 'collapse'
            }
            ,
            accept: ["col"],
            form: [
                {
                    id: "gutter",
                    type: 'radio',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    options: [{value: 'large', display: 'large'},
                        {value: 'medium', display: 'medium'},
                        {value: 'small', display: 'small'},
                        {value: 'collapse', display: 'collapse'}],
                    items: {
                        label: {
                            value: 'center',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: ' '
                        }
                    }
                }
            ]
        },
        col: {
            "icon": '', show: false, defaultConfig: {
                type: 'col',
                center: true,
                scale: '1-1'
            }
            ,
            accept: "all",
            form: [
                {
                    id: "center",
                    type: 'radio',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    options: [{value: 'true', display: '是'}, {value: 'false', display: '否'}],
                    items: {
                        label: {
                            value: 'center',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'true|false'
                        }
                    }
                },
                {
                    id: "scale",
                    type: 'input',
                    hide: false,
                    value: "",
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'scale',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'example: 1-1'
                        }
                    }
                }
            ]
        },
        tab: {
            "icon": '', show: false, defaultConfig: {
                type: 'tab',
            }
            ,
            accept: "null",
            form: []
        },

    };
    return widgets;
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
            }
        },
        methods: {
            undo: function () {
                if (this.undoLength > 0) {
                    App.undo();
                }
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

