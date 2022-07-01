const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseScrollCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.scroll', 'camera.scroll');
    parser
        .on(`+${tagName}`, function (x, y) {
            tagPlayer.camera.setScroll(x, y);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (x, y, duration, ease) {
            // this: tagPlayer
            var camera = tagPlayer.camera;
            var xSave = camera.scrollX;
            var ySave = camera.scrollY;
            camera.setScroll(x, y);
            x += camera.centerX;
            y += camera.centerY;
            camera.setScroll(xSave, ySave);

            // x,y in pan() is the centerX, centerY
            camera.pan(x, y, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseScrollCameraTag;