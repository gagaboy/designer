/**
 * Created by yangjiankang on 5/10/16.
 */

import Vue from "../../../node_modules/vue/dist/vue";
import BaseWidget from "../../BaseWidget";


var template = `
    <div>
        <div>container {{config.id}}</div>
        
       
    </div>
    @childrenComponent@
`;


var Container = Vue.extend({
    mixins: [BaseWidget],
    name: 'j-container',
    
    methods: {},
    template: template
});

Vue.component('j-container', Container);






export default Container ;