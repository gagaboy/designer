/**
 * Created by yangjiankang on 16/4/7.
 */
import CommonMixin from "./_CommonMixin.js";

import Vue from "../../node_modules/vue/dist/vue.js";

var template = `
    <div :id="config.id"
         v-bind:class="cssClass"
         v-on:click.stop="ideSelected()">
       {{{
       config.value
       }}}

        <template v-if="!hasText()">
            <div class='uk-placeholder'>Double click to edit ! </div>
        </template>
    </div>
`;

/**
 *  accept : Col
 */
var Text = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-text',
    props: ['config'],
    template: template,
    methods: {
        _defaultConfig: function () {
            return {
                value: ""
            }
        },
        _accept: function () {
            return "none";
        },
        _configFormItems: function (conf) {

            return [
                {
                    id: "value",
                    type: 'textarea',
                    hide: false,
                    value: conf.value,
                    labelScale: '1-1',
                    mainScale: '1-1',
                    elementScale: '1-1',
                    items: {
                        label: {
                            value: 'text',
                            cssClass: 'uk-form-label'
                        },
                        message: {
                            value: 'html'
                        }
                    }
                }
            ];
        },
        "hasText": function () {
            if (this.mode == 'view') {
                return true;
            }
            return this.config.value != undefined && this.config.value != '';
        }
    },
    computed: {}
});

Vue.component('my-text', Text);

export default Text ;