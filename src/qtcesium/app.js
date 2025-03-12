
function create_app_viewer() {

    const viewer = new Cesium.Viewer("qcesium-container", {
        timeline: false,
        timelineContainer: true,
        navigationInstructionsInitiallyVisible: false,
    })

    window.app_viewer = viewer
}
