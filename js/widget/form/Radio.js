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
        <div class="uk-grid uk-grid-collapse uk-form uk-form-horizontal uk-form-stacked">
            <div v-if="_showLabel" class="uk-width-{{_labelScale}}">
                <div class="uk-float-right" style="margin: 5px 5px 0 0">
                    <my-text :config="config.items.label"></my-text>
                </div>
            </div>
            <div class="uk-width-{{_mainScale}}">
                <div style="position: relative; display: inline-block" class="uk-width-{{_elementScale}}">


                   <label v-for="option in config.options">
                        <input v-model="config.value" type="radio" value="{{option.value}}"> {{option.display}}
                    </label>

                </div>
                <div>
                    <my-text :config="config.items.message"></my-text>
                </div>
            </div>
        </div>
    </div>
`;


var Radio = Vue.extend({
    mixins: [CommonMixin, FormCommon],
    name: 'my-radio',
    props: ['config'],
    methods: {

    },
    template: template
});

Vue.component('my-radio', Radio);

export default Radio ;