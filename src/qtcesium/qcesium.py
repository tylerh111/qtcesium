from __future__ import annotations

import importlib.resources
from pathlib import Path

from PyQt6 import (
    QtCore,
    QtWebEngineCore,
    QtWebEngineWidgets,
    QtWebChannel,
)


QTCESIUM_RESOURCE_FILES: list[Path] = [
    importlib.resources.files("qtcesium") / "resource.qcesium.qrc",
    importlib.resources.files("qtcesium") / "resource.orbpro.qrc",
]


class QCesiumHandler(QtCore.QObject):

    cesium_add_marker = QtCore.pyqtSignal(float, float)


class QCesium(QtWebEngineWidgets.QWebEngineView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        settings = [
            QtWebEngineCore.QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls,
            QtWebEngineCore.QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls,
            QtWebEngineCore.QWebEngineSettings.WebAttribute.WebGLEnabled,
        ]

        for setting in settings:
            self.settings().setAttribute(setting, True)

        self.handler = QCesiumHandler()

        self.channel = QtWebChannel.QWebChannel()
        self.channel.registerObject("handler", self.handler)

        for file in QTCESIUM_RESOURCE_FILES:
            print(QtCore.QResource().children())
            print(f"loading file {file}")
            QtCore.QResource.registerResource(file.with_suffix(".rcc").as_posix())
