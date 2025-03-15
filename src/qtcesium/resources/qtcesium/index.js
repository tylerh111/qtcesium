
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
 * Connect remote signal to slot.
 *
 * @param {object} obj Channel object that is connected to the Qt application.
 * @param {(object, object) => any} fn Function to connect that takes `args` object followed by `opts` object.
 * @param {object} opts Function options.
 */
function _connect(obj, fn, opts={}) {
    obj[fn.name].connect((args) => {
        fn(args, opts);
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
