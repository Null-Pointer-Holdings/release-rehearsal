#!/bin/sh
# Installs the stand-in from npm, the way a real one-line installer would:
#
#   curl -fsSL https://github.com/Null-Pointer-Holdings/release-rehearsal/releases/latest/download/install.sh | sh
#   curl -fsSL …/install.sh | REHEARSAL_CHANNEL=beta sh
#
# Into your own folders, with no sudo: the package in ~/.local/share/nph-rehearsal, the command in
# ~/.local/bin/rehearsal. It needs Node.js 22.13 or newer and npm.
set -eu
CHANNEL="${REHEARSAL_CHANNEL:-stable}"
case "$CHANNEL" in stable) TAG=latest ;; beta) TAG=next ;; *) echo "REHEARSAL_CHANNEL is stable or beta." >&2; exit 1 ;; esac
command -v npm >/dev/null 2>&1 || { echo "It needs Node.js and npm." >&2; exit 1; }
PREFIX="$HOME/.local/share/nph-rehearsal"
BIN="$HOME/.local/bin"
mkdir -p "$PREFIX" "$BIN"
npm install --global --prefix "$PREFIX" --no-fund --no-audit --loglevel=error "nph-release-rehearsal@$TAG"
ln -sf "$PREFIX/bin/rehearsal" "$BIN/rehearsal"
echo "Installed: $("$BIN/rehearsal") on $CHANNEL, at $BIN/rehearsal"
