from __future__ import annotations

import importlib.resources
from pathlib import Path

from PySide6 import (
    QtCore,
    QtWebEngineCore,
    QtWebEngineWidgets,
    QtWebChannel,
)

_ROOT = importlib.resources.files("qtcesium")

QTCESIUM_RESOURCE_FILES: list[Path] = [
    _ROOT / "resource.qcesium.qrc",
    _ROOT / "resource.orbpro.qrc",
]
QTCESIUM_RESOURCE_FILES_COMPILED: list[Path] = [
    file.with_suffix(".rcc") for file in QTCESIUM_RESOURCE_FILES
]


class QCesiumRemote(QtCore.QObject):
    pass


class QCesium(QtWebEngineWidgets.QWebEngineView):

    def __init__(
        self,
        page: QtCore.QUrl | None = None,
        remote: QCesiumRemote | None = None,
        **kwargs,
    ):
        super().__init__(**kwargs)
        settings = [
            QtWebEngineCore.QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls,
            QtWebEngineCore.QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls,
            QtWebEngineCore.QWebEngineSettings.WebAttribute.WebGLEnabled,
        ]

        for setting in settings:
            self.settings().setAttribute(setting, True)

        self.remote = None
        self.channel = QtWebChannel.QWebChannel()

        self.setup_resources()
        self.setup_channel(remote)
        self.setup_page(page)

    def setup_channel(self, remote: QCesiumRemote | None = None):
        if remote is None:
            remote = QCesiumRemote()
        else:
            remote = remote

        self.remote = remote
        self.channel.registerObject("remote", self.remote)
        self.page().setWebChannel(self.channel)

    @staticmethod
    def setup_resources():

        for file in QTCESIUM_RESOURCE_FILES_COMPILED:
            print(f"loading '{file}'")
            QtCore.QResource.registerResource(file.with_suffix(".rcc").as_posix())

    def setup_page(self, page: QtCore.QUrl | str | None = None):
        if page is None:
            page = QtCore.QUrl("qrc:/qtcesium/index.html")
        elif isinstance(page, str):
            page = QtCore.QUrl(page)

        self.page().setUrl(page)
