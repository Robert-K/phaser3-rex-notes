import EaseValueTask from '../../utils/ease/EaseValueTask.js'
import DefaultMask from '../../utils/mask/DefaultMask.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    setTransitionDirection(dir) {
        if (typeof (dir) === 'string') {
            dir = DirMode[dir];
        }
        this.dir = dir;
        return this;
    },

    setDuration(duration) {
        this.duration = duration;
        return this;
    },

    setEaseFunction(ease) {
        this.easeFunction = ease;
        return this;
    },

    setNextTexture(texture, frame) {
        this.nextImage.setTexture(texture, frame);
        return this;
    },

    setMaskEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (enable && (!this.childrenMask)) {
            var maskGameObject = new DefaultMask(this);
            this.childrenMask = maskGameObject.createGeometryMask();
            this.add(maskGameObject);
        }

        if (enable) {
            this.backImage.setMask(this.childrenMask);
            this.frontImage.setMask(this.childrenMask);
        } else {
            this.backImage.clearMask();
            this.frontImage.clearMask();
        }

        return this;
    },

    transit(texture, frame) {
        if (IsPlainObject(texture)) {
            var config = texture;
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);

            this
                .setDuration(GetValue(config, 'duration', this.duration))
                .setEaseFunction(GetValue(config, 'ease', this.easeFunction))
                .setTransitionDirection(GetValue(config, 'dir', this.dir))
                .setMaskEnable(GetValue(config, 'mask', false));

            var onStart = GetValue(config, 'onStart', undefined);
            var onProgress = GetValue(config, 'onProgress', undefined);
            var onComplete = GetValue(config, 'onComplete', undefined);
            if ((onStart !== undefined) || (onProgress !== undefined) || (onComplete !== undefined)) {
                this
                    .setTransitionStartCallback(
                        onStart,
                        GetValue(config, 'onStartScope', undefined)
                    )
                    .setTransitionProgressCallback(
                        onProgress,
                        GetValue(config, 'onProgressScope', undefined)
                    )
                    .setTransitionCompleteCallback(
                        onComplete,
                        GetValue(config, 'onCompleteScope', undefined)
                    )
            }
        }

        this.setNextTexture(texture, frame);

        this.start();
        return this;
    },

    start() {
        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null })
        }
        this.easeValueTask.restart({
            key: 't', from: 0, to: 1,
            duration: this.duration,
            ease: this.easeFunction
        });
        return this;
    },

    pause() {
        if (this.easeValueTask) {
            this.easeValueTask.pause();
        }
        return this;
    },

    resume() {
        if (this.easeValueTask) {
            this.easeValueTask.resume();
        }
        return this;
    },

    stop() {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        this.setT(1);
        return this;
    },
}

var DirMode = {
    out: 0,
    in: 1
}