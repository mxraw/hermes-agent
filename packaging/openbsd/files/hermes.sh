#!/bin/sh
prefix=/usr/local
share="$prefix/share/hermes-agent"
# Chat launches the bundled TUI with this interpreter. PM has no OpenBSD
# Node build, so do not let it download the Linux one.
export HERMES_NODE="$prefix/bin/node"
export HERMES_BUNDLED_SKILLS="$share/skills"
export HERMES_OPTIONAL_SKILLS="$share/optional-skills"
export HERMES_BUNDLED_PLUGINS="$share/plugins"
export HERMES_BUNDLED_LOCALES="$share/locales"
export HERMES_OPTIONAL_MCPS="$share/optional-mcps"
name=${0##*/}
exec "$prefix/libexec/hermes-agent/$name" "$@"
