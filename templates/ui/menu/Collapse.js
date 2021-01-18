import GetEaseConfig from './GetEaseConfig.js';

var Collapse = function () {
    this.root.emit('collapse', this, this.parentButton, this.root);
    this.scaleDownDestroy(GetEaseConfig(this, this.root.easeOut));
    this.collapseSubMenu();
    return this;
}
export default Collapse;