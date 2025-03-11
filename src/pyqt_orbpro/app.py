from __future__ import annotations

import signal
import subprocess
import sys
import importlib.resources

from PyQt6 import (
    QtCore,
    QtWidgets,
)

from .cesium import QCesium


class MainWindow(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.cesium = QCesium()
        self.setCentralWidget(self.cesium)
        self.centralWidget().setContentsMargins(0, 0, 0, 0)

        self.cesium.page().setUrl(QtCore.QUrl("qrc:///app.html"))
        self.cesium.page().setWebChannel(self.cesium.channel)


def main():
    signal.signal(signal.SIGINT, signal.SIG_DFL)

    subprocess.run([
        "rcc",
        "--binary",
        importlib.resources.files("pyqt_orbpro") / "app.qrc",
        "--output",
        importlib.resources.files("pyqt_orbpro") / "app.rcc",
    ])

    app = QtWidgets.QApplication(sys.argv)
    app.setApplicationName("DEMO")

    ui = MainWindow()
    ui.show()
    sys.exit(app.exec())

