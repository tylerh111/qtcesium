from __future__ import annotations

import os
import signal
import subprocess
import sys
from pathlib import Path

from PyQt6 import (
    QtCore,
    QtWidgets,
)

from .qcesium import (
    QCesium,
    QTCESIUM_RESOURCE_FILES,
)


class _MainWindow(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.cesium = QCesium()
        self.setContentsMargins(0, 0, 0, 0)
        self.setCentralWidget(self.cesium)
        # self.centralWidget().setContentsMargins(0, 0, 0, 0)

        self.cesium.page().setUrl(QtCore.QUrl("qrc:/qtcesium/qcesium.html"))
        self.cesium.page().setWebChannel(self.cesium.channel)


def _setup_environment():
    signal.signal(signal.SIGINT, signal.SIG_DFL)

    os.environ["QTWEBENGINE_DICTIONARIES_PATH"] = "/usr/share/hunspell"
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--ignore-gpu-blocklist"
    os.environ["QTWEBENGINE_REMOTE_DEBUGGING"] = "5544"


def _compile_resource_files(
    files: list[Path],
    *,
    force: bool = False,
):
    for file in files:
        file_compiled = file.with_suffix(".rcc")
        if force or not file_compiled.exists():
            subprocess.run([
                "rcc",
                "--binary",
                file,
                "--output",
                file_compiled,
            ])


def demo():
    _setup_environment()
    _compile_resource_files(QTCESIUM_RESOURCE_FILES, force=True)

    app = QtWidgets.QApplication(sys.argv)
    app.setApplicationName("DEMO")

    ui = _MainWindow()
    ui.show()
    return app.exec()
