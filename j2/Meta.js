/**
 * Created by yangjiankang on 5/10/16.
 */


function appendOuterDiv(str) {

    var append =
        `
         <div  :id="config.id"
                    v-bind:class="cssClass" v-bind:style="cssStyle"
                    v-on:click.stop="ideSelected(this, $event)" >
        `;

    append += str ;

    append = append + `</div>`;

    return append ;
}




export default {
    key:'_widgets_', // window['_widgets_']
    widgets: {
        'container': {
            el: 'j-container',
            component: {
                methods: {},
                template: appendOuterDiv(`
                <div>container {{config.id}}</div>
                    @childrenComponent@
                `)
            }
        }
    }
}