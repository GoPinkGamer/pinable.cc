#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKSPACE_DIR="$(cd "${SITE_DIR}/.." && pwd)"
DESKTOP_DIR="${WORKSPACE_DIR}/PinableAgents/pinable-desktop"
OUTPUT_DIR="${SITE_DIR}/assets/downloads"
BUILD_DIR="${DESKTOP_DIR}/build/bin"

if ! command -v wails >/dev/null 2>&1; then
  echo "wails CLI 未安装或不在 PATH 中。"
  echo "请先安装: go install github.com/wailsapp/wails/v2/cmd/wails@latest"
  exit 1
fi

if [[ ! -d "${DESKTOP_DIR}" ]]; then
  echo "找不到 pinable-desktop 目录: ${DESKTOP_DIR}"
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"

ARCH="$(uname -m)"
if [[ "${ARCH}" == "arm64" ]]; then
  MAC_PLATFORM="darwin/arm64"
else
  MAC_PLATFORM="darwin/amd64"
fi

echo "==> 构建 macOS (${MAC_PLATFORM})"
(
  cd "${DESKTOP_DIR}"
  wails build -platform "${MAC_PLATFORM}"
)

APP_PATH="$(find "${BUILD_DIR}" -maxdepth 1 -name "*.app" -print -quit)"
if [[ -z "${APP_PATH}" ]]; then
  echo "未找到 .app 输出，请检查 wails build 日志。"
  exit 1
fi

if command -v hdiutil >/dev/null 2>&1; then
  echo "==> 生成 DMG"
  hdiutil create -volname "PinableAgents" -srcfolder "${APP_PATH}" -ov -format UDZO "${OUTPUT_DIR}/PinableAgents-mac.dmg"
else
  echo "hdiutil 不可用，无法生成 DMG。"
  echo "请手动将 ${APP_PATH} 打包为 PinableAgents-mac.dmg"
fi

if [[ "${SKIP_WINDOWS:-}" != "1" ]]; then
  echo "==> 构建 Windows (windows/amd64)"
  (
    cd "${DESKTOP_DIR}"
    wails build -platform windows/amd64
  )

  EXE_PATH="$(find "${BUILD_DIR}" -maxdepth 1 -name "*.exe" -print -quit)"
  if [[ -z "${EXE_PATH}" ]]; then
    echo "未找到 .exe 输出，请检查 wails build 日志。"
    exit 1
  fi

  cp "${EXE_PATH}" "${OUTPUT_DIR}/PinableAgents-win.exe"
else
  echo "跳过 Windows 构建 (SKIP_WINDOWS=1)"
fi

echo "==> 完成。输出目录: ${OUTPUT_DIR}"
