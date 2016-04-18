/**
 * Created by yangjiankang on 16/4/11.
 */

import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";

var template = `

    <div v-bind:class="cssClass" v-bind:style="cssStyle"
         v-on:click.stop="ideSelected()"
         style="position: relative"
         :id="config.id"
            >
        <i class="uk-icon-pencil-square-o component-select-panel" v-show="config.idePreSelected" ></i>
        
        
        
        <template v-if="!hasChild()">
            <div class="uk-placeholder">
            <code>Accept: row</code>
            </div>
        </template>

        <template v-for="item in config.items">
            <my-row v-if="item.type=='row'" :config="item"></my-row>
        </template>
    </div>
`;


/**
 *
 * center :true|false
 * accept: all
 */
var Container = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-container',
    props: ['config'],
    template: template,
    methods: {

        _appendClass: function () {
            var css = {
                "uk-container": true
            };
            if (this.config.center != undefined && (this.config.center == true || this.config.center == 'true' )) {
                css["uk-container-center"] = true;
            }
            return css;
        }
    },
    computed: {}
});

Vue.component('my-container', Container);

export default Container ;