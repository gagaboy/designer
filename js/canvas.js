/**
 * Created by yangjiankang on 16/4/6.
 */

import Jquery from "../node_modules/jquery/dist/jquery.js";

//import Bootstrap from "./Bootstrap.js";

import Vue from "../node_modules/vue/dist/vue.js";

import App from "./widget/App.js";

import '../node_modules/uikit/dist/css/components/placeholder.almost-flat.css';
import '../node_modules/uikit/dist/css/components/form-advanced.css';
import '../node_modules/uikit/dist/css/uikit.almost-flat.css';

Jquery(document).ready(function () {

    var config = {
        id: '0',
        items: [{
            id: '1X',
            type: 'container',
            center: 'false',
            hide: false,
            cssStyle: {},
            cssClass: '',
            center: true,
            ideSelected: false,
            idePreSelected: false,
            $test: function () {
                alert('x');
            },
            items: [
                {
                    id: 'tab1row',
                    type: 'row',
                    ideSelected: false,
                    idePreSelected: false,
                    items: [
                        {
                            id: '11x',
                            type: 'col',
                            scale: '1-2',
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '11xx',
                                    type: 'tab',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    tabs: [{
                                        title: 'title1', mapKey: 't1', active: true
                                    }, {
                                        title: 'title2', mapKey: 't2', active: false
                                    }],
                                    items: [
                                        {
                                            id: 't1',
                                            type: 'container',
                                            hide: false,
                                            cssClass: '',
                                            ideSelected: false,
                                            idePreSelected: false,
                                            items: []
                                        },
                                        {
                                            id: 't2',
                                            type: 'container',
                                            hide: true,
                                            cssClass: '',
                                            ideSelected: false,
                                            idePreSelected: false,
                                            items: [
                                                {
                                                    id: 'tab1xxrow',
                                                    type: 'row',
                                                    ideSelected: false,
                                                    idePreSelected: false,
                                                    items: [
                                                        {
                                                            id: '11ssssaax',
                                                            type: 'col',
                                                            scale: '1-1',
                                                            ideSelected: false,
                                                            idePreSelected: false,
                                                            items: []
                                                        }

                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                {
                    id: '21',
                    type: 'row',
                    ideSelected: false,
                    idePreSelected: false,
                    //gutter:'collapse',
                    items: [
                        {
                            id: '11',
                            type: 'col',
                            scale: '1-2',
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '111',
                                    "type": 'textarea',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    options: [
                                        {value: '1', display: 'xxxxxxxx1'},
                                        {value: '2', display: 'xxxxxxxx2'}
                                    ],
                                    value: '2',
                                    items: {
                                        "label": {
                                            id: 'aaaaaa',
                                            value: '',
                                            ideSelected: false,
                                            idePreSelected: false
                                        },
                                        "message": {
                                            id: 'xxddd',
                                            value: `GEW<b>FFFFFFFF</b>`,
                                            ideSelected: false,
                                            idePreSelected: false
                                        }
                                    }
                                }
                            ]
                        },

                        {
                            id: '12',
                            type: 'col',
                            scale: '1-2',
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '121',
                                    "type": 'checkbox',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    options: [
                                        {value: '1', display: 'xxxxxxxx1'},
                                        {value: '2', display: 'xxxxxxxx2'},
                                        {value: '3', display: 'xxxxxxxx3'}
                                    ],
                                    value: ['2', '3'],
                                    items: {
                                        "label": {
                                            id: 'x',
                                            value: '',
                                            ideSelected: false,
                                            idePreSelected: false
                                        },
                                        "message": {
                                            id: 'xx',
                                            value: `GE<b>WX</b>`,
                                            ideSelected: false,
                                            idePreSelected: false
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    id: '21F',
                    type: 'row',
                    ideSelected: false,
                    idePreSelected: false,
                    //gutter:'collapse',
                    items: [
                        {
                            id: '11F',
                            type: 'col',
                            scale: '1-2',
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '111F',
                                    "type": 'text',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    value: '',
                                    $validates: [

                                    ],
                                    $bind: [{
                                        targetId: '121', rule: function (v) {
                                            this.config.value = JSON.stringify(v);
                                        }
                                    }
                                    ]
                                }
                            ]
                        },

                        {
                            id: '12F',
                            type: 'col',
                            scale: '1-2',
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '121F',
                                    "type": 'radio',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    options: [
                                        {value: '1', display: 'xxxxxxxx1'},
                                        {value: '2', display: 'xxxxxxxx2'},
                                        {value: '3', display: 'xxxxxxxx3'}
                                    ],
                                    value: "2",
                                    items: {
                                        "label": {
                                            id: 'xF',
                                            value: '',
                                            ideSelected: false,
                                            idePreSelected: false
                                        },
                                        "message": {
                                            id: 'xxF',
                                            value: `GEW<b>X</b>`,
                                            ideSelected: false,
                                            idePreSelected: false
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    id: '21aF',
                    type: 'row',
                    ideSelected: false,
                    idePreSelected: false,
                    //gutter:'collapse',
                    items: [
                        {
                            id: '1a1F',
                            type: 'col',
                            scale: '1-2',
                            center: true,
                            ideSelected: false,
                            idePreSelected: false,
                            items: [
                                {
                                    id: '11a1F',
                                    "type": 'panel',
                                    ideSelected: false,
                                    idePreSelected: false,
                                    items: {
                                        title: {
                                            id: 'fjlep',
                                            type: 'text',
                                            value: 'title',
                                            ideSelected: false,
                                            idePreSelected: false,
                                        },
                                        badge: {
                                            id: 'fjlepX',
                                            type: 'text',
                                            value: 'FFF',
                                            ideSelected: false,
                                            idePreSelected: false,
                                        },
                                        content: {
                                            id: 'fjlepXD',
                                            type: 'text',
                                            value: 'title',
                                            ideSelected: false,
                                            idePreSelected: false,
                                            items: []
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
    };

    if (parent && parent.canvasConfig) {
        config = parent.canvasConfig;
    }
    var app = new Vue({
        el: "#appRoot",
        data: {
            layout: config,
            mode: 'design' //design|view
        }
    });
    if (parent && parent.canvasReady) {
        parent.canvasReady(app.$children[0]);
    }
});