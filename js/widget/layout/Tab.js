/**
 * Created by yangjiankang on 16/4/11.
 */

import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";

var template = `
    <div :id="config.id"
         v-bind:class="cssStyle"
         v-on:click.stop="ideSelected()">

        <ul class="uk-tab" >
            <li v-for="tab in config.tabs" v-bind:class="[tab.active ? 'uk-active':'']">
                <a href="javascript:;" @click="switchTab(tab)">{{tab.title}}</a>
            </li>
        </ul>

        <my-container v-for="item in config.items" :config="item"></my-container>

    </div>
`;

/**
 *
 * activeKey:'',
 * tabs : [{title:'', mapKey:''},{},{}]
 * items :[]
 *
 *
 */
var Tab = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-tab',
    props: ['config'],
    template: template,
    methods: {
        switchTab: function (tab) {
            var tabs = this.config.tabs;
            for (var i = 0; i < tabs.length; i++) {
                var tb = tabs[i];
                if (tb.mapKey == tab.mapKey) {
                    tb.active = true;
                } else {
                    tb.active = false;
                }
            }
            var items = this.config.items;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id == tab.mapKey) {
                    item.hide = false;
                } else {
                    item.hide = true;
                }
            }
        }
    },
    computed: {

    }
});

Vue.component('my-tab', Tab);

export default Tab ;