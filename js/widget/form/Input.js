/**
 * Created by yangjiankang on 16/4/6.
 */
import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";
import FormCommon from "./_FormCommon.js";

var template = `
   <div :id="config.id"
         v-bind:class="cssStyle"
         v-on:click.stop="ideSelected()">
        <div class="uk-grid uk-grid-collapse uk-form uk-form-horizontal uk-form-stacked">
            <div v-if="_showLabel" class="uk-width-{{_labelScale}}">
                <div style="margin: 5px 5px 0 0">
                    <my-text :config="config.items.label"></my-text>
                </div>
            </div>
            <div class="uk-width-{{_mainScale}}">
                <div style="position: relative; display: inline-block" class="uk-width-{{_elementScale}}">
                   <input lazy v-model="config.value" style="width: 100%">
                </div>
                <div class="">
                    <my-text :config="config.items.message"></my-text>
                </div>
            </div>
        </div>
    </div>
`;
/**
 * label ?
 *
 * labelScale
 *
 * mainScale
 *
 * elementScale
 *
 * labelRight
 *
 */

var Input = Vue.extend({
    mixins: [CommonMixin, FormCommon],
    name: 'my-input',
    props: ['config'],
    methods: {

    },
    template: template
});

Vue.component('my-input', Input);

export default Input ;