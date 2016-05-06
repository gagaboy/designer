/**
 * Created by yangjiankang on 16/4/18.
 */

import Lifecycle from "../_LifecycleMixin";

import Vue from "../../../node_modules/vue/dist/vue.js";

/**
 *
 * ! graphql !
 * form
 *     [
 *      {id:'',value:''},
 *      {id:'',value:''}
 *     ]
 *     User(id:1 object:"{xx:'1'}"){
 *
 *     }
 *
 *  formUtils.formElements = [name, caught, created];
 *  build = mutation M { User(name: “newUser” pokemon: “Snorlax") { name, caught, created } }
 *
 *  target = mutation M { User(name: “newUser” pokemon: “Snorlax") { name, caught, created } }
 *  mapping_setting = [{name:'name_1'},{pokemon:'pokemon_1'}];
 *  value_object = {name:'Jake', pokemon:'Snor'};
 *
 * grid
 * combobox
 *
 *
 * {layout:{},setting:{}}
 *
 */
class DataSource1 {

    constructor() {
        //
    }

    fetch(condition) {
        //build =>
        //query{User(cnd:""){name,caught}}

    }

    save() {

    }

    remove() {

    }
}
;


var template = ``;


var transport = {

    fetch: {
        type: 'fetch',
        url: '',
        method: 'POST',
        params: [{
            name: 'name',
            value: ''
        }],
        filter: {}
    }

};


/**
 * config = {}
 */
var DataSource = Vue.extend({
    mixins: [Lifecycle],

    name: 'my-ds',
    props: ['config'],
    template: template,
    methods: {},
    computed: {},
    events: {
        'data-source-transport': function (id, transport_id, params) {
            if (this.config.id == id) {
                if (this.config.transport[transport_id] != undefined) {
                    //TODO ajax
                    //set config.value
                    var oldValue = this.config.value;
                    var newValue = {name: "JK"};
                    this.config.value = newValue;
                    this.$dispatch("bind-event-value-changed", this.config.id, newValue, oldValue);
                }
            }
            return true;
        }
    }
});

Vue.component('my-ds', DataSource);

export default DataSource ;