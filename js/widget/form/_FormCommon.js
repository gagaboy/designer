/**
 * Created by yangjiankang on 16/4/11.
 */


/**
 * 1. showLabel
 * 2. isValueChanged
 * 3. message: | default | error
 * 4. required: true | false
 * 5. bind
 * 6. status : edit, readonly, disabled
 *
 *  {label, value, displayValue, required, message, validated, status}
 bind config : {formelement'id : }
 key:value 拉平的结构.
 或者立体结构
 $bind : [
 {targetId:'', rule:function(){}}
 ]
 *
 */
export default  {

    vuex: {
        getters: {
            store: function (store) {
                return store;
            }
        },
        actions: {
            updateValue: function (store, that, e) {
                //validator
                store.dispatch("UPDATE", that.config.storeBind, e.target.value)
            },
            updateStore:function (store, that, propertyName, e) {
                
            }
        }
    },

    created: function () {
        // show

        var config = JSON.parse(JSON.stringify(this.config));

        // this.$initValue$ = config.value;
        // this.$set('config.test', "11");
        // this.config.$test2 = '222';
    },
    watch: {
        'config.value': function (newValue, oldValue) {
            if (this.$initStatus$) {
                //do nothing
                this.$initStatus$ = false;
            } else {
                //向上通知控制器,值发生了变化
                this.$dispatch("bind-event-value-changed", this.config.id, newValue, oldValue);
                //TODO 处理校验
                this.config.$valueChanged = true;
            }
        }
    },
    events: {},

    methods: {

        setInitValue: function (newValue) {
            this.$initStatus$ = true;
            this.$initValue$ = newValue;
            this.config.value = newValue;
        },

        getValue: function () {
            return this.config.value;
        },
        getInitValue: function () {
            return this.$initValue$;
        },
        getDisplay: function () {
            return this.config.display;
        },
        reset: function () {
            this.config.value = this.$initValue$;
        },
        validate: function () {

        }
    },
    computed: {
        _showLabel: function () {
            if (!this.config.items.label) {
                return false;
            }
            return true;
        },
        _labelScale: function () {
            if (!this.config.items.label) {
                // 没有label
                return "1-1";
            }
            if (this.config.labelScale) {
                return this.config.labelScale;
            }
            return "1-5";
        },
        _mainScale: function () {
            if (!this.config.items.label) {
                // 没有label
                return "1-1";
            }
            if (this.config.mainScale) {
                return this.config.mainScale;
            }
            return "4-5";
        },
        _elementScale: function () {
            if (this.config.elementScale) {
                return this.config.elementScale;
            }
            return "1-1";
        },
        bindValue : function () {
            return this.store[this.config.storeBind] ;
        }
    }
}