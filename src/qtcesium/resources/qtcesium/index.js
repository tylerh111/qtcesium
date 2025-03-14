
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
