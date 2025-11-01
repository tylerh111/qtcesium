from __future__ import annotations

import inspect
import os
import signal
import subprocess
import sys
from pathlib import Path

from PySide6 import (
    QtCore,
    QtWidgets,
)

from .qcesium import (
    QCesium,
    QCesiumRemote,
    QTCESIUM_RESOURCE_FILES,
)

class _DemoDebugger(QtWidgets.QDialog):

    def __init__(self, ui: "_Demo", *args, **kwargs):
        super().__init__(parent=ui, *args, **kwargs)

        QtCore.qDebug("starting demo-debugger")

        self.ui = ui
        self._layout = QtWidgets.QVBoxLayout()

        self.setWindowTitle("DEMO DEBUGGER")
        self.setGeometry(2560, 0, 250, 100)
        self.setMinimumSize(250, 100)
        self.setLayout(self._layout)

        self._button_test = QtWidgets.QPushButton("test")
        self._button_test.clicked.connect(self._on_test)
        self._layout.addWidget(self._button_test)

        self._button_entity = QtWidgets.QPushButton("entity")
        self._button_entity.clicked.connect(self._on_entity)
        self._layout.addWidget(self._button_entity)

    def _debug_message(self, msg: str = ""):
        QtCore.qDebug(f"::DEBUGGER:: <{inspect.stack()[1][3]}> {msg}")

    def _on_test(self, _):
        self._debug_message()
        print(type(self.ui.cesium.remote.qcesium_run_debug))
        print(dir(self.ui.cesium.remote.qcesium_run_debug))
        self.ui.cesium.remote.qcesium_run_debug.emit({"id":"what"})
        self._debug_message("(done)")

    def _on_entity(self, _):
        self.p = getattr(self, "p", 0)
        self.p += 1
        self._debug_message()
        self.ui.cesium.remote.qcesium_create_entity_fixed_geographic_coordinates.emit({
            "id": "hello",
            "lat": 0,
            "lon": 0,
        })
        self.ui.cesium.remote.qcesium_create_entity_fixed_geographic_coordinates.emit({
            "id": "test",
            "lat": 40.812305,
            "lon": -77.856176,
            "label": "state college",
        })
        self._debug_message("(done)")


class _DemoCesiumRemote(QCesiumRemote):
    """Custom cesium remote for demo"""


class _Demo(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.cesium = QCesium(remote=_DemoCesiumRemote())
        self.setCentralWidget(self.cesium)


def _setup_environment():
    signal.signal(signal.SIGINT, signal.SIG_DFL)

    os.environ["QTWEBENGINE_DICTIONARIES_PATH"] = "/usr/share/hunspell"
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--ignore-gpu-blocklist"
    # os.environ["QTWEBENGINE_REMOTE_DEBUGGING"] = "5544"


def _compile_resource_files(
    files: list[Path],
    *,
    force: bool = False,
):
    for file in files:
        file_compiled = file.with_suffix(".rcc")
        if force or not file_compiled.exists():
            print(f"compiling '{file}'")
            subprocess.run([
                "pyside6-rcc",
                "--binary",
                file,
                "--output",
                file_compiled,
            ])
            print(f"compiling '{file}' (done)")


def demo():
    _setup_environment()
    _compile_resource_files(QTCESIUM_RESOURCE_FILES, force=True)

    app = QtWidgets.QApplication(sys.argv)
    app.setApplicationName("DEMO")

    ui = _Demo()
    ui.show()

    db = _DemoDebugger(ui)
    db.show()

    return app.exec()
