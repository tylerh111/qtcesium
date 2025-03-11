from __future__ import annotations

import importlib.resources
from PyQt6 import (
    QtCore,
    QtWebEngineWidgets,
    QtWebChannel,
)

class QCesiumHandler(QtCore.QObject):

    cesium_add_marker = QtCore.pyqtSignal(float, float)


class QCesium(QtWebEngineWidgets.QWebEngineView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # settings = [
        #     QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls,
        #     QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls,
        #     QWebEngineSettings.WebAttribute.WebGLEnabled,
        # ]

        # for setting in settings:
        #     self.settings().setAttribute(setting, True)

        self.resources = QtCore.QResource.registerResource((importlib.resources.files("pyqt_orbpro") / "app.rcc").as_posix())
        self.handler = QCesiumHandler()
        self.channel = QtWebChannel.QWebChannel()

        self.channel.registerObject("handler", self.handler)
