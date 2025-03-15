
import * as Cesium from "orbpro";





export async function qcesium_run_debug (
    {
        id,
    }={},
    {
        viewer,
    }={},
) {

    const entity = new Cesium.SpaceEntity({
        id: id,
        name: id,
        show: true,
        point: {
            pixelSize: 10,
            color: Cesium.Color.WHITE,
        },
        label: {
            show: Boolean(id),
            text: id,
            scale: 0.5,
            showBackground: true,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            pixelOffset: { x: 10, y: 0 },
        },
    });


    console.error("::DEBUG:: here0");
    await entity.position.loadOMM({
        "OBJECT_NAME": "ISS (ZARYA)",
        "OBJECT_ID": "1998-067A",
        "EPOCH": "2025-03-14T20:33:23.372064",
        "MEAN_MOTION": 15.50010161,
        "ECCENTRICITY": 0.0006407,
        "INCLINATION": 51.6358,
        "RA_OF_ASC_NODE": 54.244,
        "ARG_OF_PERICENTER": 21.9595,
        "MEAN_ANOMALY": 338.1668,
        "EPHEMERIS_TYPE": 0,
        "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 25544,
        "ELEMENT_SET_NO": 999,
        "REV_AT_EPOCH": 50053,
        "BSTAR": 0.00030216,
        "MEAN_MOTION_DOT": 0.0001684,
        "MEAN_MOTION_DDOT": 0,
    });
    // await entity.position.loadOMM({
    //     "CCSDS_OMM_VERS": 0,
    //     "CREATION_DATE": null,
    //     "ORIGINATOR": null,
    //     "OBJECT_NAME": "ISS (ZARYA)",
    //     "OBJECT_ID": "1998-067A",
    //     "CENTER_NAME": null,
    //     "REFERENCE_FRAME": 2,
    //     "REFERENCE_FRAME_EPOCH": null,
    //     "TIME_SYSTEM": 11,
    //     "MEAN_ELEMENT_THEORY": 0,
    //     "COMMENT": null,
    //     "EPOCH": "2024-05-08T19:52:52.426848",
    //     "SEMI_MAJOR_AXIS": 0,
    //     "MEAN_MOTION": 15.51025615,
    //     "ECCENTRICITY": 0.0003349,
    //     "INCLINATION": 51.6355,
    //     "RA_OF_ASC_NODE": 150.5366,
    //     "ARG_OF_PERICENTER": 149.2285,
    //     "MEAN_ANOMALY": 210.8902,
    //     "GM": 0,
    //     "MASS": 0,
    //     "SOLAR_RAD_AREA": 0,
    //     "SOLAR_RAD_COEFF": 0,
    //     "DRAG_AREA": 0,
    //     "DRAG_COEFF": 0,
    //     "EPHEMERIS_TYPE": 0,
    //     "CLASSIFICATION_TYPE": "U",
    //     "NORAD_CAT_ID": 25544,
    //     "ELEMENT_SET_NO": 999,
    //     "REV_AT_EPOCH": 45244,
    //     "BSTAR": 0.00028217,
    //     "MEAN_MOTION_DOT": 0.00016275,
    //     "MEAN_MOTION_DDOT": 0,
    //     "COV_REFERENCE_FRAME": 23,
    // });
    console.error("::DEBUG:: here1");

    // await entity.position.loadOMM(omm);

    // viewer.entities.add(entity);
    // console.error("::DEBUG:: here2");

    const issDataSource = new Cesium.SpaceCatalogDataSource({ name: "issSource" });
    issDataSource.entities.add(entity);
    viewer.dataSources.add(issDataSource);

    // viewer.trackedEntity = entity;
    // console.error("::DEBUG:: here3");

    entity.showOrbit({ show: true });
    console.error("::DEBUG:: here4");
    entity.showCoverage({ show: true });
    console.error("::DEBUG:: here5");

    // viewer.trackedEntity = entity;


}





// /**
//  * QCesium debug hook.
//  */
// export function qcesium_debug(
//     {
//         val="hello",
//     }={},
//     {
//         viewer,
//     }={},
// ) {
//     // switch between fixed and inertial
//     console.error("::DEBUG::" + val);
//     console.error("::DEBUG::" + viewer);

//     if (viewer.referenceFrame === Cesium.ReferenceFrame.FIXED) {
//         viewer.referenceFrame = Cesium.ReferenceFrame.INERTIAL;
//     }
//     else if (viewer.referenceFrame === Cesium.ReferenceFrame.INERTIAL) {
//         viewer.referenceFrame = Cesium.ReferenceFrame.FIXED;
//     }
//     // console.error("::DEBUG::" + JSON.stringify(arguments, null, 4));
// }

