from __future__ import annotations

import pytest

from hermes_cli.gateway_openbsd import (
    CrontabReadError,
    cron_marker,
    install_boot_line,
    merge_crontab,
    missing_crontab,
    remove_marked_lines,
    render_cron_line,
    system_scope_error,
)


def test_render_cron_line_does_not_use_bare_hermes():
    line = render_cron_line(["/home/raw/hermes-agent/.venv/bin/hermes", "gateway", "run"],
                            "/home/raw/.hermes", "default")
    assert line.startswith("@reboot ")
    assert "PATH=/usr/local/bin:/usr/bin:/bin:" in line
    assert "/home/raw/hermes-agent/.venv/bin/hermes" in line
    assert "@reboot hermes " not in line
    assert line.endswith(">> /home/raw/.hermes/logs/gateway.log 2>&1 # hermes-gateway home=/home/raw/.hermes profile=default")


def test_merge_replaces_existing_marker():
    marker = cron_marker("/home/raw/.hermes", "default")
    existing = "0 * * * * echo keep\n@reboot old # hermes-gateway home=/home/raw/.hermes profile=default\n"
    merged = merge_crontab(existing, "@reboot new " + marker, marker)
    assert merged.count("@reboot") == 1
    assert "echo keep" in merged
    assert "old" not in merged


def test_remove_marked_line_keeps_unrelated():
    marker = cron_marker("/home/raw/.hermes", "default")
    existing = "0 * * * * echo keep\n@reboot gone " + marker + "\n"
    assert remove_marked_lines(existing, marker).strip() == "0 * * * * echo keep"


def test_missing_crontab_is_only_that_stderr():
    assert missing_crontab(1, "crontab: no crontab for raw\n")
    assert not missing_crontab(1, "crontab: you (raw) are not allowed to use this program\n")
    assert not missing_crontab(0, "")


def test_read_failure_does_not_write():
    calls = []

    def run(argv, **kwargs):
        calls.append(argv)

        class R:
            returncode = 1
            stdout = ""
            stderr = "crontab: you (raw) are not allowed to use this program\n"
        return R()

    with pytest.raises(CrontabReadError):
        install_boot_line(["/usr/local/bin/hermes", "gateway", "run"], "/home/raw/.hermes", "default", run=run)
    assert calls == [["crontab", "-l"]]


def test_system_scope_message():
    assert system_scope_error(False) is None
    assert system_scope_error(True) == (
        "gateway install --system is not supported on OpenBSD. "
        "The gateway belongs to the invoking user. "
        "Run hermes gateway install without --system."
    )
