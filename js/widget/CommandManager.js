/**
 * Created by yangjiankang on 16/4/6.
 */


export default class CommandManager {

    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length > 0) {
            var cmd = this.undoStack.pop();
            cmd['undoExecute']();
            this.redoStack.push(cmd);
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            var cmd = this.redoStack.pop();
            cmd['execute']();
            this.undoStack.push(cmd);
        }
    }

    executeCmd(cmd) {
        cmd['execute']();
        this.undoStack.push(cmd);
    }

    undoLength() {
        return this.undoStack.length;
    }

    redoLength() {
        return this.redoStack.length;
    }

}