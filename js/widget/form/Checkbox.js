/**
 * Created by yangjiankang on 16/4/8.
 */
import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";
import FormCommon from "./_FormCommon.js";

var template = `
     <div :id="config.id"
         v-bind:class="cssClass" v-bind:style="cssStyle"
         v-on:click.stop="ideSelected()">
        <div class="uk-grid uk-grid-collapse uk-form uk-form-horizontal ">
            <div v-if="_showLabel" class="uk-width-{{_labelScale}}">
                <div class="uk-float-right" style="margin: 5px 5px 0 0">
                    <my-text :config="config.items.label"></my-text>
                </div>
            </div>
            <div class="uk-width-{{_mainScale}}">
                <div style="position: relative; display: inline-block" class="uk-width-{{_elementScale}}">

                    <label v-for="option in config.options">
                        <input  v-model="config.value" type="checkbox" value="{{option.value}}"> {{option.display}}
                    </label>

                </div>
                <label class="uk-form-label">
                    <my-text :config="config.items.message"></my-text>
                </label>
            </div>
        </div>
    </div>
`;

/**
 * {
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
                value: `GEW<b>X</b>`,
                ideSelected: false,
                idePreSelected: false
            }
        }
    }
 */

var Checkbox = Vue.extend({
    mixins: [CommonMixin, FormCommon],
    name: 'my-checkbox',
    props: ['config'],
    methods: {

    },
    template: template
});

Vue.component('my-checkbox', Checkbox);

export default Checkbox ;