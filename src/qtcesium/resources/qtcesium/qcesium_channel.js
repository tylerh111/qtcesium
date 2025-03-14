
/**
 * Create a Qt `QWebChannel` for communication with Qt application.
 *
 * @param {(QWebChannel) => void} callback Callback after the channel is created.
 */
export function initialize_qwebchannel(callback) {
    new QWebChannel(qt.webChannelTransport, callback);
}
