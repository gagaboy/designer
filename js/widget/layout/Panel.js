/**
 * Created by yangjiankang on 16/4/7.
 */
import CommonMixin from "../_CommonMixin.js";

import Vue from "../../../node_modules/vue/dist/vue.js";

var template = `
    <div class="uk-panel uk-panel-box ">

            <template v-if="config.items.badge.value">
                <div class="uk-panel-badge uk-badge uk-badge-danger">
                    <my-text :config="config.items.badge"></my-text>
                </div>
            </template>

            <h5 class="uk-panel-title">
                <my-text :config="config.items.title" ></my-text>
            </h5>
            <my-row :config="config.items.content">
            </my-row>
    </div>
`;

/**
 * title
 * badge
 * Row
 */

var Panel = Vue.extend({
    mixins: [CommonMixin],
    name: 'my-panel',
    props: ['config'],
    template: template
});

Vue.component('my-panel', Panel);

export default Panel ;