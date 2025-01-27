import SetFixedSize from './SetFixedSize.js';
import SetPadding from './SetPadding.js';
import GetPadding from './GetPadding.js';
import ModifyTextStyle from './ModifyTextStyle.js';
import ResetTextStyle from './ResetTextStyle.js';
import RemoveChild from './RemoveChild.js';
import RemoveChildren from './RemoveChildren.js';
import ClearContent from './ClearContent.js';
import AddChild from './AddChild.js';
import CreateCharChild from './CreateCharChild.js';
import CreateCharChildren from './CreateCharChildren.js';
import SetText from './SetText.js';
import AppendText from './AppendText.js';
import InsertText from './InsertText.js';
import RemoveText from './RemoveText.js';
import GetText from './GetText.js';
import CreateImageChild from './CreateImageChild.js';
import AppendImage from './AppendImage.js';
import CreateDrawerChild from './CreateDrawerChild.js';
import AppendDrawer from './AppendDrawer.js';
import CreateSpaceChild from './CreateSpaceChild.js';
import AppendSpace from './AppendSpace.js';
import CreateCommandChild from './CreateCommandChild.js';
import AppendCommand from './AppendCommand.js';
import SetWrapConfig from './SetWrapConfig.js';
import RunWordWrap from './RunWordWrap.js';
import RunVerticalWrap from './RunVerticalWrap.js';
import RenderContent from './RenderContent.js';

import ForEachChild from './ForEachChild.js';
import ForEachRenderableChild from './ForEachRenderableChild.js';
import ForEachCharChild from './ForEachCharChild.js';
import GetChildren from './GetChildren.js';
import GetActiveChildren from './GetActiveChildren.js';
import GetCharChildren from './GetCharChildren.js';
import GetLastAppendedChildren from './GetLastAppendedChildren.js';
import GetNearestChild from './GetNearestChild.js';
import SetToMinSize from './SetToMinSize.js';
import GetCharChildIndex from './GetCharChildIndex.js';
import GetCharChild from './GetCharChild.js';
import GetCharIndex from './GetCharIndex.js';

import SetChildrenInteractiveEnable from './input/SetChildrenInteractiveEnable.js';
import SetInteractive from './input/SetInteractive.js';

import MoveChildMethods from './MoveChildMethods.js';
import BackgroundMethods from './BackgroundMethods.js';
import InnerBoundsMethods from './InnerBoundsMethods.js';

var Methods = {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    resetTextStyle: ResetTextStyle,

    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clearContent: ClearContent,
    addChild: AddChild,
    createCharChild: CreateCharChild,
    createCharChildren: CreateCharChildren,
    setText: SetText,
    appendText: AppendText,
    insertText: InsertText,
    removeText: RemoveText,
    getText: GetText,
    createImageChild: CreateImageChild,
    appendImage: AppendImage,
    createDrawerChild: CreateDrawerChild,
    appendDrawer: AppendDrawer,
    createSpaceChild: CreateSpaceChild,
    appendSpace: AppendSpace,
    createCommandChild: CreateCommandChild,
    appendCommand: AppendCommand,

    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    renderContent: RenderContent,

    forEachChild: ForEachChild,
    forEachRenderableChild: ForEachRenderableChild,
    forEachCharChild: ForEachCharChild,
    getChildren: GetChildren,
    getActiveChildren: GetActiveChildren,
    getCharChildren: GetCharChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getNearestChild: GetNearestChild,

    setToMinSize: SetToMinSize,

    getCharChildIndex: GetCharChildIndex,
    getCharChild: GetCharChild,
    getCharIndex: GetCharIndex,


    setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
    setInteractive: SetInteractive,
}

Object.assign(
    Methods,

    MoveChildMethods,
    BackgroundMethods,
    InnerBoundsMethods,

)

export default Methods;