
import * as Cesium from "cesium";

/**
 * Create a cesium viewer object.
 *
 * @param {string} container Container where the cesium viewer is to be displayed.
 * @returns {Cesium.Viewer} The new cesium viewer.
 */
export function create_cesium_viewer(container) {
    const viewer = new Cesium.Viewer(container, {
        navigationInstructionsInitiallyVisible: false,
        creditContainer: document.createElement("none"),
    });

    viewer.scene.globe.enableLighting = true;
    viewer.scene.debugShowFramesPerSecond = true;

    viewer.extend(Cesium.viewerReferenceFrameMixin);
    viewer.referenceFrame = Cesium.ReferenceFrame.FIXED;

    return viewer;
}

/**
 * Create a cesium viewer object with callback.
 *
 * @param {string} container Container where the cesium viewer is to be displayed.
 * @param {(Cesium.Viewer) => void} callback Callback after the viewer is created.
 */
export function initialize_cesium_viewer(container, callback) {
    const viewer = create_cesium_viewer(container);
    callback(viewer);
}

