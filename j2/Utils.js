/**
 * Created by yangjiankang on 16/4/6.
 */

function findId(pid, obj) {
    if (obj.id == pid) {
        return obj;
    }
    if (obj.items) {
        if (Array.isArray(obj.items)) {
            for (var i = 0; i < obj.items.length; i++) {
                var o = obj.items[i];
                if (o.id == pid) {
                    return o;
                }
                var id = findId(pid, o);
                if (id != null) {
                    return id;
                }
            }
        } else {
            for (var key in obj.items) {
                var o = obj.items[key];
                if (o.id == pid) {
                    return o;
                }
                var id = findId(pid, o);
                if (id != null) {
                    return id;
                }
            }
        }

    }
    return null;
}


function query(id, obj) {
    if (obj && obj.items) {
        if (Array.isArray(obj.items)) {
            for (var i = 0; i < obj.items.length; i++) {
                var itemId = obj.items[i].id;
                if (id == itemId) {
                    return obj;
                }
                var result = query(id, obj.items[i]);
                if (result != null) {
                    return result;
                }
            }
        } else {
            for (var key in obj.items) {
                var itemId = obj.items[key].id;
                if (id == itemId) {
                    return obj;
                }
                var result = query(id, obj.items[key]);
                if (result != null) {
                    return result;
                }
            }
        }

    }
    return null;
}


function find(root) {
    if (root.ideSelected) {
        return root;
    } else {
        if (Array.isArray(root.items)) {
            for (var i = 0; i < root.items.length; i++) {
                var obj = root.items[i];
                var r = find(obj);
                if (r != null) {
                    return r;
                }
            }
        } else {
            for (var key in root.items) {
                var obj = root.items[key];
                var r = find(obj);
                if (r != null) {
                    return r;
                }
            }
        }
    }
    return null;
}


function findParentPath(root, id) {
    if (root && root.items) {
        if (Array.isArray(root.items)) {
            for (var i = 0; i < root.items.length; i++) {
                var itemId = root.items[i].id;
                if (id == itemId) {
                    return ["items[" + i + "]", root];
                }
                var result = findParentPath(root.items[i], id);
                if (result != null) {
                    return result;
                }
            }
        } else {
            for (var key in root.items) {
                var itemId = root.items[key].id;
                if (id == itemId) {
                    return ["items['" + key + "']", root];
                }
                var result = findParentPath(root.items[key], id);
                if (result != null) {
                    return result;
                }
            }
        }
    }
}


//TODO 整理
export default {
    findById: function (layout, id) {
        var object = findId(id, layout);
        return object;
    },
    findParent: function (layout, id) {
        if (layout.id == id) {
            return layout;
        }
        return query(id, layout);
    },
    findSelected: function (layout) {
        var data = layout;
        return find(data);
    },
    findSelectedPath: function (layout, selectedId) {
        var data = layout;
        var rootId = data.id;
        var start = this.findById(layout, selectedId);

        var path = [];
        while (start.id != rootId) {
            var o = {id: start.id, title: start.type /*+ " (" + start.id + ") "*/};
            path.push(o);
            start = this.findParent(layout, start.id);
        }
        path.push({id: rootId, title: rootId});
        return path.reverse();
    },
    findSelectedFullPath: function (root, id) {
        var end = root.id;
        var array = [];
        var start = id;
        while (start != end) {
            var p = findParentPath(root, start);
            array.push(p[0]);
            start = p[1].id;
        }
        return array.reverse().join(".");
    },
    log: function () {

    },
    addProperty: function (target, key, value) {
        target[key] = value;
        if (target.items) {
            for (var i = 0; i < target.items.length; i++) {
                var it = target.items[i];
                this.addProperty(it, key, value);
            }
        }
    },
    uuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
}