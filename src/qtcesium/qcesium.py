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
    """A QWebChannel object that connects to javascript.

    Signals are connected to slots in javascript.
    All signals and slots communicate through a single argument.
    The argument a JSON serializable dictionary.
    """


class QCesium(QtWebEngineWidgets.QWebEngineView):
    """A Qt widget for Cesium.

    Args:
        page: Url for web engine to load.
        remote: Remote for communicating with cesium.
        kwargs: Base class initialization arguments.
    """

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
        """Register remote in web channel.

        Args:
            remote: Remote to register with channel. Defaults to None.
        """
        if remote is None:
            remote = QCesiumRemote()
        else:
            remote = remote

        self.remote = remote
        self.channel.registerObject("remote", self.remote)
        self.page().setWebChannel(self.channel)

    @staticmethod
    def setup_resources():
        """Register required resources for QCesium."""
        for file in QTCESIUM_RESOURCE_FILES_COMPILED:
            print(f"loading '{file}'")
            QtCore.QResource.registerResource(file.with_suffix(".rcc").as_posix())

    def setup_page(self, page: QtCore.QUrl | str | None = None):
        """Set page in resource files for QCesium.

        Args:
            page: Page to load in web engine view. Defaults to None.
        """
        if page is None:
            page = QtCore.QUrl("qrc:/qtcesium/index.html")
        elif isinstance(page, str):
            page = QtCore.QUrl(page)

        self.page().setUrl(page)
