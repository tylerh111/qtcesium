
import * as Cesium from "orbpro";

/**
 * Create a cesium entity in the viewer.
 *
 * @param {Cesium.Viewer} viewer The cesium viewer.
 * @param {Cesium.Entity.ConstructorOptions} options The cesium entity definition.
 */
export function create_cesium_entity(viewer, options) {
    viewer.entities.add(options);
}
