"""start_new_session makes the child the group leader, so its pgid is its pid by
construction. OpenBSD getpgid(2) refuses a cross-session read with EPERM, so the
spawn must record the group and its start-time fingerprint without a read-back.
"""

from __future__ import annotations

import os

from tools.environments.local import LocalEnvironment


def test_spawn_records_group_when_getpgid_refuses(monkeypatch):
    env = LocalEnvironment(cwd="/tmp", timeout=15, persistent=False)

    def refused(pid):
        raise PermissionError

    monkeypatch.setattr(os, "getpgid", refused)
    proc = env._run_bash("true", timeout=15)
    proc.wait(timeout=15)
    assert proc._hermes_pgid == proc.pid
    assert getattr(proc, "_hermes_pgid_start", None) is not None


def test_spawn_records_group_when_child_is_already_gone(monkeypatch):
    env = LocalEnvironment(cwd="/tmp", timeout=15, persistent=False)

    def gone(pid):
        raise ProcessLookupError

    monkeypatch.setattr(os, "getpgid", gone)
    proc = env._run_bash("true", timeout=15)
    proc.wait(timeout=15)
    # The group is the leader's pid by construction; the start-time fingerprint
    # is what lets _kill_process detect a recycled pid before signalling it.
    assert proc._hermes_pgid == proc.pid
    assert getattr(proc, "_hermes_pgid_start", None) is not None
