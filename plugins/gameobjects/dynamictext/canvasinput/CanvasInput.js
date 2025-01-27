import DynamicText from '../dynamictext/DynamicText.js';
import HiddenTextEdit from './textedit/HiddenTextEdit.js';
import AddLastInsertCursor from './methods/AddLastInsertCursor.js';
import SetText from './methods/SetText.js';
import { IsChar } from '../dynamictext/bob/Types.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CanvasInput extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }

        // Set text later
        var text = GetValue(config, 'text', undefined);
        if (text) {
            delete config.text;
        }

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        this.textEdit = new HiddenTextEdit(this, GetValue(config, 'edit'));

        var addCharCallback = GetValue(config, 'onAddChar');
        if (addCharCallback) {
            this.on('addChar', addCharCallback);
        }

        var moveCursorCallback = GetValue(config, 'onMoveCursor');
        if (moveCursorCallback) {
            this.on('movecursor', moveCursorCallback);
        }

        this.lastInsertCursor = AddLastInsertCursor(this);
        if (text) {
            this.setText(text);
        } else {
            // Still need run word wrap for lastInsertCursor child
            this.runWordWrap();
        }
    }

    addChild(child, index) {
        super.addChild(child, index);

        if (Array.isArray(child)) {
            var children = child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (IsChar(child)) {
                    this.emit('addChar', child, index + i, this);
                }
            }
        } else {
            if (IsChar(child)) {
                this.emit('addChar', child, index, this);
            }
        }

        return this;
    }

    setText(text) {
        this.moveChildToLast(this.lastInsertCursor);
        SetText(this, text);
        return this;
    }

    appendText(text) {
        this.setText(this.text + text);
        return this;
    }

    open(onCloseCallback) {
        if (onCloseCallback) {
            this.textEdit.once('close', onCloseCallback)
        }
        this.textEdit.open();
        return this;
    }

    close() {
        this.textEdit.close();
        return this;
    }

    get isOpened() {
        return this.textEdit.isOpened;
    }
}

export default CanvasInput;