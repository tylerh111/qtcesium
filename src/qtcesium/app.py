from __future__ import annotations

import os
import signal
import sys

from PyQt6 import QtWidgets

from .cesium import QCesium

signal.signal(signal.SIGINT, signal.SIG_DFL)


class MainWindow(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.cesium = QCesium()
        self.setCentralWidget(self.cesium)


def set_global_configs():
    os.environ["QTWEBENGINE_DICTIONARIES_PATH"] = "/usr/share/hunspell"
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--ignore-gpu-blocklist"


def main():

    app = QtWidgets.QApplication(sys.argv)
    app.setApplicationName("DEMO")

    ui = MainWindow()
    ui.show()
    return app.exec()
