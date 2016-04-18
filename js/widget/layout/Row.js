/**
 * Created by yangjiankang on 16/4/7.
 */
import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";

var template = `
    <div :id="config.id"
         v-bind:class="cssClass" v-bind:style="cssStyle"
         v-on:click.stop="ideSelected()"
         style="position: relative"
         >

        <i class="uk-icon-pencil-square-o component-select-panel" v-show="config.idePreSelected" ></i>

        <template v-for="item in config.items">
            <my-col v-if="item.type=='col'" :config="item"></my-col>
        </template>

        <template v-if="!hasChild()">
            <div class="uk-placeholder uk-container-center uk-width-1-1">
            <code>
                Accept: col
            </code>
            </div>
        </template>
    </div>
`;

/**
 * gutter : large medium small collapse
 * uk-grid
 *      uk-grid-large
 *      uk-grid-medium
 *      uk-grid-small
 *      uk-grid-collapse
 *  accept : Col
 */
var Row = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-row',
    props: ['config'],
    template: template,
    methods: {

        "_appendClass": function () {
            var o = {
                "uk-grid": true
            };
            var gutter = "small";
            if (this.config.gutter != undefined) {
                gutter = this.config.gutter;
            }
            o["uk-grid-" + gutter] = true;
            return o;
        }
    },
    computed: {}
});

Vue.component('my-row', Row);

export default Row ;