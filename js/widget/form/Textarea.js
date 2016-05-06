/**
 * Created by yangjiankang on 16/4/6.
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
                <div class="" style="margin: 5px 5px 0 0">
                    <my-text :config="config.items.label"></my-text>
                </div>
            </div>
            <div class="uk-width-{{_mainScale}}">
                <div style="position: relative; display: inline-block" class="uk-width-{{_elementScale}}">
                   <textarea :value="bindValue" @change="updateValue(this,$event)" lazy rows="{{_rows}}" class="uk-width-1-1"></textarea>
                </div>
                <div class="">
                    <my-text :config="config.items.message"></my-text>
                </div>
            </div>
        </div>
    </div>
`;


var Textarea = Vue.extend({
    mixins: [CommonMixin, FormCommon],
    name: 'my-textarea',
    props: ['config'],
    template: template,
    computed: {

        _rows: function () {
            if(this.config.rows) {
                return this.config.rows;
            }
            return "5"
        }
    }
});

Vue.component('my-textarea', Textarea);

export default Textarea ;