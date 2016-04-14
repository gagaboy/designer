/**
 * Created by yangjiankang on 16/4/7.
 */
import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";

var template = `
    <div :id="config.id"
         v-bind:class="cssStyle"
         v-on:click.stop="ideSelected()">

        <template v-if="!hasChild()">
            <div class="uk-placeholder">
            <code>Accept: any</code>
            </div>
        </template>

        <template v-for="item in config.items">
            <my-col v-if="item.type=='col'" :config="item"></my-col>
            <my-panel v-if="item.type=='panel'" :config="item"></my-panel>
            <my-tab v-if="item.type=='tab'" :config="item"></my-tab>

            <my-text v-if="item.type=='text'" :config="item"></my-text>
            <my-textarea v-if="item.type=='textarea'" :config="item"></my-textarea>
            <my-input v-if="item.type=='input'" :config="item"></my-input>
            <my-select v-if="item.type=='select'" :config="item"></my-select>
            <my-checkbox v-if="item.type=='checkbox'" :config="item"></my-checkbox>
            <my-radio v-if="item.type=='radio'" :config="item"></my-radio>
        </template>

    </div>
`;

/**
 *
 * uk-container-center uk-width-1-4
 * center :true|false
 * scale  :1-4
 * accept: all
 */
var Col = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-col',
    props: ['config'],
    template: template,
    methods: {

        "_appendClass": function () {
            var scale = "1-1";
            if (this.config.scale != undefined) {
                scale = this.config.scale;
            }
            var width = "uk-width-" + scale;
            var css = {};
            css[width] = true;
            if (this.config.center) {
                css['uk-container-center'] = true;
            }
            return css;
        }
    },
    computed: {}
});

Vue.component('my-col', Col);

export default Col ;