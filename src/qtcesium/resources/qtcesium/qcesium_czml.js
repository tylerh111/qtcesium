
import * as Cesium from "cesium";

/**
 * @param {object} czml The cesium document to load.
 * @param {object} opts Function configurations.
 * @param {Cesium.Viewer} opts.viewer Cesium viewer.
 */
export function qcesium_load_czml(
    czml,
    {
        viewer,
    }={}
) {

    console.log(`::DEBUG:: ${JSON.stringify(czml, null, 2)}`)

    viewer.dataSources.removeAll();
    viewer.dataSources.add(
        Cesium.CzmlDataSource.load(czml)
    );
}
