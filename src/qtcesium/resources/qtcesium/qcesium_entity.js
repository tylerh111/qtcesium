
import * as Cesium from "orbpro";

/**
 * Create a cesium entity in the viewer.
 *
 * @param {Cesium.Entity.ConstructorOptions} entity Cesium entity definition.
 * @param {object} opts Function options.
 * @param {Cesium.Viewer} opts.viewer Cesium viewer.
 */
export function qcesium_create_entity(
    entity,
    {
        viewer,
    }={},
) {
    if (entity == null) { throw new Error("`entity` undefined or null"); }
    if (viewer == null) { throw new Error("`viewer` undefined or null"); }

    viewer.entities.add(entity);
}

/**
 * Create a point entity via geographic coordinates in the viewer.
 *
 * @param {object} args Function options.
 * @param {number} args.lat Latitude of geographic coordinate.
 * @param {number} args.lon Longitude of geographic coordinate.
 * @param {number} args.alt Altitude of geographic coordinate.
 * @param {string} args.label Label for geographic coordinate.
 * @param {object} opts Function configurations.
 * @param {Cesium.Viewer} opts.viewer Cesium viewer.
 */
export function qcesium_create_entity_fixed_geographic_coordinates(
    {
        lat,
        lon,
        alt = 0,
        label = "",
    }={},
    {
        viewer,
    }={},
) {
    if (lat == null) { throw new Error("`lat` undefined or null"); }
    if (lon == null) { throw new Error("`lon` undefined or null"); }
    if (viewer == null) { throw new Error("`viewer` undefined or null"); }

    viewer.entities.add({
        show: true,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, alt),
        point: {
            pixelSize: 10,
            color: Cesium.Color.WHITE,
        },
        label: {
            show: Boolean(label),
            text: label,
            scale: 0.5,
            showBackground: true,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            pixelOffset: { x: 10, y: 0 },
        }
    });
}
