
import * as Cesium from "orbpro";

/**
 * Create a cesium entity in the viewer.
 *
 * @param {Cesium.Entity.ConstructorOptions} entity Cesium entity definition.
 * @param {object} opts Function options.
 * @param {Cesium.Viewer} opts.viewer Cesium viewer.
 */
export function qcesium_create_cesium_entity(
    entity,
    {
        viewer,
    }={},
) {
    if (entity == null) { throw new Error("`entity` undefined or null"); }
    if (viewer == null) { throw new Error("`viewer` undefined or null"); }

    viewer.entities.add(entity);
}
