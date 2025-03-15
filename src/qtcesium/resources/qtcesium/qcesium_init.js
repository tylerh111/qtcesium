
import * as QCesium from "@/qtcesium";

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
    QCesium.initialize_cesium_viewer(container, (viewer) => {
        globalThis.app_viewer = viewer;
    });

    QCesium.initialize_qwebchannel((channel) => {
        globalThis.app_channel = channel;
        globalThis.app_remote = channel.objects.remote;

        _connect(channel.objects.remote, qcesium_entity.qcesium_create_cesium_entity, {viewer: globalThis.app_viewer});
    });
}
