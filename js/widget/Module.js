/**
 * Created by yangjiankang on 5/10/16.
 */

import Vue from '../../node_modules/vue/dist/vue.js';
import Vuex from '../../../node_modules/vuex/dist/vuex';
import $ from '../../../node_modules/jquery/dist/jquery';

Vue.use(Vuex);


var module = {

    store: {},
    data: {},
    template: ``

};

/**
 * @param setting
 * @returns {Store|*}
 */
function createStore(data) {

    var state = {
        mode: 'view',
        ide_selected: '',
        ide_pre_selected: '',
        ide_property_change: '',
        model: {}
    };

    $.extend(state, data);

    var mutations = {

        IDE_SELECT: function (id, pid) {
            state.ide_selected_id = id;
            state.ide_pre_selected = pid;
        },

        UPDATE_MODEL: function (path, value) {
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

    var conf = {
        store: createStore(setting.data),
        data: {
            layout: setting.layout
        }
    };


    return new Vue(conf);
};