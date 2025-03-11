
function create_app_handler() {
    new QWebChannel(qt.webChannelTransport, function (channel) {
        window.app_handler = channel.objects.handler
    })
}

function create_app_viewer() {

    const viewer = new Cesium.Viewer("pyqt-orbpro-cesium-container", {
        timeline: false,
        timelineContainer: true,
        navigationInstructionsInitiallyVisible: false,
    })

    window.app_viewer = viewer

    new Cesium.DynamicTimeline(viewer.timeline.container, viewer)

    viewer.scene.globe.enableLighting = true
    viewer.scene.debugShowFramesPerSecond = true
    viewer.extend(Cesium.viewerReferenceFrameMixin)
    viewer.referenceFrame = 1

    const entity = new Cesium.SpaceEntity({
        id: "25544",
        name: "ISS",
        point: {
            pixelSize: 1,
        },
        label: {
            show: false,
            font: `1rem Helvetica`,
            showBackground: true,
            backgroundColor: new Cesium.Color(0.1, 0.1, 0.1, 0.9),
            pixelOffset: new Cesium.Cartesian2(10, 0),
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 13.0e7, 0.0),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                1.5e2,
                3.0,
                1.5e7,
                0.5
            ),
        },
        viewFrom: new Cesium.Cartesian3(
            -1678500.7493507154,
            -17680994.63403464,
            24667690.486357275
        )
    })

    entity.position.loadOMM({
        "CCSDS_OMM_VERS": 0,
        "CREATION_DATE": null,
        "ORIGINATOR": null,
        "OBJECT_NAME": "ISS (ZARYA)",
        "OBJECT_ID": "1998-067A",
        "CENTER_NAME": null,
        "REFERENCE_FRAME": 2,
        "REFERENCE_FRAME_EPOCH": null,
        "TIME_SYSTEM": 11,
        "MEAN_ELEMENT_THEORY": 0,
        "COMMENT": null,
        "EPOCH": "2024-05-08T19:52:52.426848",
        "SEMI_MAJOR_AXIS": 0,
        "MEAN_MOTION": 15.51025615,
        "ECCENTRICITY": 0.0003349,
        "INCLINATION": 51.6355,
        "RA_OF_ASC_NODE": 150.5366,
        "ARG_OF_PERICENTER": 149.2285,
        "MEAN_ANOMALY": 210.8902,
        "GM": 0,
        "MASS": 0,
        "SOLAR_RAD_AREA": 0,
        "SOLAR_RAD_COEFF": 0,
        "DRAG_AREA": 0,
        "DRAG_COEFF": 0,
        "EPHEMERIS_TYPE": 0,
        "CLASSIFICATION_TYPE": "U",
        "NORAD_CAT_ID": 25544,
        "ELEMENT_SET_NO": 999,
        "REV_AT_EPOCH": 45244,
        "BSTAR": 0.00028217,
        "MEAN_MOTION_DOT": 0.00016275,
        "MEAN_MOTION_DDOT": 0,
        "COV_REFERENCE_FRAME": 23,
        "CX_X": 0,
        "CY_X": 0,
        "CY_Y": 0,
        "CZ_X": 0,
        "CZ_Y": 0,
        "CZ_Z": 0,
        "CX_DOT_X": 0,
        "CX_DOT_Y": 0,
        "CX_DOT_Z": 0,
        "CX_DOT_X_DOT": 0,
        "CY_DOT_X": 0,
        "CY_DOT_Y": 0,
        "CY_DOT_Z": 0,
        "CY_DOT_X_DOT": 0,
        "CY_DOT_Y_DOT": 0,
        "CZ_DOT_X": 0,
        "CZ_DOT_Y": 0,
        "CZ_DOT_Z": 0,
        "CZ_DOT_X_DOT": 0,
        "CZ_DOT_Y_DOT": 0,
        "CZ_DOT_Z_DOT": 0,
        "USER_DEFINED_BIP_0044_TYPE": 0,
        "USER_DEFINED_OBJECT_DESIGNATOR": null,
        "USER_DEFINED_EARTH_MODEL": null,
        "USER_DEFINED_EPOCH_TIMESTAMP": 0,
        "USER_DEFINED_MICROSECONDS": 0
    })

    viewer.trackedEntity = entity

    entity.point.pixelSize = 10
    entity.point.color = Cesium.Color.WHITE

    const issDataSource = new Cesium.SpaceCatalogDataSource({ name: "issSource" })
    issDataSource.entities.add(entity)
    viewer.dataSources.add(issDataSource)
    viewer.extend(Cesium.viewerReferenceFrameMixin)
    viewer.referenceFrame = 1

    setTimeout(() => {
        entity.showOrbit({ show: true })
    }, 1000)

    // entity.showOrbit({ show: true })
    // entity.showCoverage({ show: true })

}


create_app_handler()
create_app_viewer()
