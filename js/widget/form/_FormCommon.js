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
 *
 */
export default  {


    created: function () {
        // show
        this.config._initValue = this.config.value;
        this.config._initDisplayValue = this.config.displayValue;

    },
    watch: {
        'config.value': function (newValue, oldValue) {
            //console.log(newValue);
            if (this.__target_ && this.__target_path_) {
                this.$set("__target_." + this.__target_path_, newValue);
            }
        }
    },


    methods: {

        bind: function (object, path) {
            this.__target_ = object;
            this.__target_path_ = path;
        },

        getValue: function () {
            return this.config.value;
        },
        getInitValue: function () {
            return this.config._initValue;
        },
        getDisplay: function () {
            return this.config.display;
        },
        reset: function () {

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
        }
    }
}