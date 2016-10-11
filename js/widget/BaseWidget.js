/**
 * 生命周期
 * 外部事件
 * IDE支持
 *
 * action:
 * store: {
 *
 *      ide_selected : ''
 *      ide_pre_selected:''
 *      ide_property_change:''
 * }
 *
 *
 */
const state = {
    ide_selected_id: '',
    ide_pre_selected: '',
    mode: 'design', //view | design
    layout_config: {},
    model: {}// object | array |
};


const mutations = {

    IDE_SELECT: function (id, pid) {
        state.ide_selected_id = id;
        state.ide_pre_selected = pid;
    },


    UPDATE_MODEL: function (path, value) {
        state.model[path] = value;
    },

    ADD_MODEL: function (path, value) {
        var m = state.model[path];
        //make sure this m is an array
        m.push(value);
    }

};


export default {


    ready: function () {

    },

    destroy: function () {

    },

    vuex: {
        getters: {
            state: function (store) {
                return store;
            }
        },
        actions: {
            ideSelected: function (store, vm, e) {
                var id = vm.config.id;
                var pid = vm.$parent.config.id;
                store.dispatch("IDE_SELECT", id, pid);
            },
            updateModel: function (store, path, value) {
                store.dispath("UPDATE_MODEL", path, value);
            }
        }
    },

    methods: {},

    computed: {
        isIdeMode: function () {
            return this.state.mode == 'design';
        },
        isIdeSelected: function () {
            return this.state.ide_selected_id == this.config.id && this.isIdeMode();
        },
        isIdePreSelected: function () {
            return this.state.ide_pre_selected == this.config.id && this.isIdeMode();
        },
        cssClass: function () {

        },
        cssStyle: function () {

        }
    }


}