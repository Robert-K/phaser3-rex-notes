// import * as Phaser from 'phaser';
import Canvas from '../../canvas/canvas/Canvas';
import { IConfigTextStyle } from './bob/char/TextStyle';
import BobBaseClass from './bob/Base';
import CharBobClass from './bob/char/CharData';
import ImageBobClass from './bob/image/ImageData';
import DrawBobClass from './bob/drawer/Drawer';
import CommandBobClass from './bob/command/Command';


export default DynamicText;

declare namespace DynamicText {

    type PaddingTypes = number |
    { left?: number, right?: number, top?: number, bottom?: number };

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number })
    }

    interface IConfigBackground {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,

        cornerRadius?: number |
        ({ x?: number, y?: number }) |
        IRadiusConfig,
        cornerIteration?: number
    }

    interface IConfigInnerBounds {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,
    }

    interface IConfigImage {
        width?: number,
        height?: number,
        scaleX?: number,
        scaleY?: number,
    }

    type HAlignTypes = 0 | 1 | 2 | 'left' | 'center' | 'right';
    type VAlignTypes = 0 | 1 | 2 | 'top' | 'center' | 'bottom';

    interface IConfigWordWrap {
        padding?: {
            top?: number, bottom?: number,
        },
        lineHeight?: number,
        maxLines?: number,
        wrapWidth?: number,
        letterSpacing?: number,
        hAlign?: HAlignTypes,
        vAlign?: VAlignTypes,
        charWrap?: boolean
    }

    interface IConfigVerticalWrap {
        padding: {
            top?: number, left?: number, right?: number, bottom?: number,
        },
        lineWidth?: number,
        maxLines?: number,
        fixedChildHeight?: number,
        charPerLine?: number,
        wrapHeight?: number,
        letterSpacing?: number,
        rtl?: boolean,
        hAlign?: HAlignTypes,
        vAlign?: VAlignTypes,
    }

    type BobBase = BobBaseClass;
    type CharBob = CharBobClass;
    type ImageBob = ImageBobClass;
    type DrawBob = DrawBobClass;
    type CommandBob = CommandBobClass;
    type RenderChildTypes = CharBob | ImageBob | DrawBob;

    interface IWrapResult {
        children: BobBase[],
        lines: ({
            children: BobBase[],
            width: number,
            height: number
        })[],
        isLastPage: boolean
    }

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        padding: PaddingTypes,

        background?: IConfigBackground,

        innerBounds?: IConfigInnerBounds,

        style?: IConfigTextStyle,

        text?: string,

        wrap?: IConfigWordWrap | IConfigVerticalWrap,

        childrenInteractive?: boolean,
    }

}

declare class DynamicText extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        fixedWidth?: number, fixedHeight?: number,
        config?: DynamicText.IConfig
    );
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: DynamicText.IConfig
    );
    constructor(
        scene: Phaser.Scene,
        config?: DynamicText.IConfig
    );

    clearContent(): this;

    createCharChild(
        text: string,
        style?: IConfigTextStyle
    ): DynamicText.CharBob;
    createCharChildren(
        text: string,
        style?: IConfigTextStyle
    ): DynamicText.CharBob[];
    setText(
        text: string,
        style?: IConfigTextStyle
    ): this;
    appendText(
        text: string,
        style?: IConfigTextStyle
    ): this;
    insertText(
        index: number,
        text: string,
        style?: IConfigTextStyle
    ): this;
    getText(activeOnly?: boolean): string;
    resetTextStyle(): this;
    text: string;

    getCharChild(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    getCharChildIndex(
        charIndex: number,
        activeOnly?: boolean
    ): DynamicText.CharBob;
    getCharChildren(
        activeOnly?: boolean,
        out?: DynamicText.CharBob[]
    ): DynamicText.CharBob[]

    createImageChild(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): DynamicText.ImageBob;
    appendImage(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): this;

    createDrawerChild(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): DynamicText.DrawBob;
    appendDrawer(
        renderCallback: (this: DynamicText.DrawBob) => void,
        width?: number,
        height?: number
    ): this;

    createCommandChild(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): DynamicText.CommandBob;
    appendCommand(
        name: string,
        callback: (param: unknown, name: string) => any,
        param: unknown,
        scope?: Object
    ): this;

    removeChild(child: DynamicText.BobBase): this;
    removeChildren(): this;
    removeText(index: number, length?: number): this;

    moveChildToFist(child: DynamicText.BobBase): this;
    moveChildToLast(child: DynamicText.BobBase): this;
    movechildUp(child: DynamicText.BobBase): this;
    movechildDown(child: DynamicText.BobBase): this;
    movechildAbove(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;
    movechildBelow(
        child: DynamicText.BobBase,
        baseChild: DynamicText.BobBase
    ): this;

    runWordWrap(
        config?: DynamicText.IConfigWordWrap
    ): DynamicText.IWrapResult;

    runVerticalWrap(
        config?: DynamicText.IConfigVerticalWrap
    ): DynamicText.IWrapResult;

    getChildren(): DynamicText.BobBase[];
    getLastAppendedChildren(): DynamicText.BobBase[];
    getActiveChildren(): DynamicText.BobBase[];

    setBackgroundColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    setBackgroundStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;
    setBackgroundCornerRadius(
        cornerRadius?: number |
            ({ x?: number, y?: number }) |
            DynamicText.IRadiusConfig,
        cornerIteration?: number
    ): this;

    setInnerBoundsColor(
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean
    ): this;
    setInnerBoundsStroke(
        stroke?: string | number | null,
        strokeThickness?: number,
    ): this;
}