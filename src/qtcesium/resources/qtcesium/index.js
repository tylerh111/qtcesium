
import * as qcesium_channel from "@/qtcesium/qcesium_channel";
import * as qcesium_debug from "@/qtcesium/qcesium_debug";
import * as qcesium_entity from "@/qtcesium/qcesium_entity";
import * as qcesium_viewer from "@/qtcesium/qcesium_viewer";

export {
    qcesium_channel,
    qcesium_debug,
    qcesium_entity,
    qcesium_viewer,
}

/**
 * Connect channel signal to slot.
 *
 * @param {string} obj Channel object that is connected to the Qt application.
 * @param {(object, ...: any[]) => any} fn Function to connect.
 * @param {object} opts Additional function options.
 */
function _connect(obj, fn, opts={}) {
    obj[fn.name].connect((...args) => {
        fn.apply(null, [opts].concat(args));
    });
}


/**
 * Initialize QCesium application.
 *
 * @param {string} container Container where the cesium viewer is to be displayed.
 */
export function initialize(container) {
    qcesium_viewer.initialize_cesium_viewer(container, (viewer) => {
        globalThis.app_viewer = viewer;
    });

    qcesium_channel.initialize_qwebchannel((channel) => {
        globalThis.app_channel = channel;
        globalThis.app_remote = channel.objects.remote;
    });
}
