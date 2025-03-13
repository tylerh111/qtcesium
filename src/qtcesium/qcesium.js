
function qtcesium_create_cesium_channel() {
    new QWebChannel(qt.webChannelTransport, function (channel) {
        globalThis.qtcesium_cesium_channel = channel
        globalThis.qtcesium_cesium_handler = channel.objects.handler
    });
}

function qtcesium_create_cesium_viewer() {

    const viewer = new Cesium.Viewer("qtcesium-cesium-container", {
        navigationInstructionsInitiallyVisible: false,
    });

    return viewer;
}


qtcesium_create_cesium_channel();
const qtcesium_cesium_viewer = qtcesium_create_cesium_viewer();
