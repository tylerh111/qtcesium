
export async function qcesium_run_debug (
    {
        id,
    }={},
    {
        viewer,
    }={},
) {

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

