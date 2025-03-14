from __future__ import annotations

try:
    from ._version import __version__
except ImportError:
    __version__ = "0.0"

from .qcesium import (
    QCesium,
    QCesiumRemote,
    QTCESIUM_RESOURCE_FILES,
    QTCESIUM_RESOURCE_FILES_COMPILED,
)

__all__ = [
    "QCesium",
    "QCesiumRemote",
    "QTCESIUM_RESOURCE_FILES",
    "QTCESIUM_RESOURCE_FILES_COMPILED",
]
