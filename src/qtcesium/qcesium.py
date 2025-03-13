from __future__ import annotations

from PyQt6 import (
    QtCore,
    QtWebEngineCore,
    QtWebEngineWidgets,
)


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

