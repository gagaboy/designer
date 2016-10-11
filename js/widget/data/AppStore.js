/**
 * Created by yangjiankang on 4/27/16.
 */
import Vue from "../../../node_modules/vue/dist/vue";
import Vuex from '../../../node_modules/vuex/dist/vuex';
import $ from '../../../node_modules/jquery/dist/jquery';

Vue.use(Vuex);


// root state object.
// each Vuex instance is just a single state tree.
const state = {
    count: 0,
    name: 'JK',
    name2:'xx'
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by middlewares
// for debugging purposes.
const mutations = {
    INCREMENT (state) {
        state.count++
    },
    DECREMENT (state) {
        state.count--
    },
    UPDATE(state, name, value) {
        state[name] = value;
    },
    INIT() {
        $.get("init.json",function (data) {
            $.extend(state, data);
        })
    }
}

export default new Vuex.Store({
    state,
    mutations
})