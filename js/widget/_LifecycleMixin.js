/**
 * Created by yangjiankang on 16/4/19.
 */
import Setting from "./Setting";
var key = Setting.contextKey;

export default  {
    ready: function () {
        //生命周期
        if (!window[key]) {
            window[key] = {};
        }
        if (this.config && this.config.id) {
            window[key][this.config.id] = this;
        }
    },
    destroyed: function () {
        //生命周期
        if (this.config && this.config.id) {
            if (window[key][this.config.id]) {
                delete window[key][this.config.id];
            }
        }
    },
    events: {
        "bind-event-bind-accept": function (id, value) {
            var self = this;
            if (this.config.$bind) {
                for (var i = 0; i < this.config.$bind.length; i++) {
                    var bind = this.config.$bind[i];
                    if (bind.targetId == id) {
                        var fun = bind.rule;
                        if (fun) {
                            fun.apply(self, [value]);
                        }
                        if (bind.targetPath) {
                            self.config.value = value[bind.targetPath];
                        }
                    }
                }
            }
            return true;
        }
    },
    methods: {},
    computed: {}
}