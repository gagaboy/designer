/**
 * Created by yangjiankang on 5/10/16.
 */

import Module from "./Module";

var id = 0;
var setting = {
    id: id++,

    layout: {
        id: id++,
        xtype: 'container',
        cssStyle: {},
        cssClass: [],
        items: [
            {
                id: id++,
                xtype: 'container',
                cssStyle: {},
                cssClass: [],
                items: []
            },
            {
                id: id++,
                xtype: 'container',
                cssStyle: {},
                cssClass: [],
                items: []
            }
        ]
    },
    data: {
        mode: 'design'
    }
};
var m = Module(setting);

m.$mount(document.querySelector("#app"));