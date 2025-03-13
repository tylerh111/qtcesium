from __future__ import annotations

try:
    from ._version import __version__
except ImportError:
    __version__ = "0.0"

from .qcesium import QCesium

__all__ = [
    "QCesium",
]
