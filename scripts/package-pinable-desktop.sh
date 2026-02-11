#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKSPACE_DIR="$(cd "${SITE_DIR}/.." && pwd)"
DESKTOP_DIR="${WORKSPACE_DIR}/PinableAgents/pinable-desktop"
OUTPUT_DIR="${SITE_DIR}/assets/downloads"
BUILD_DIR="${DESKTOP_DIR}/build/bin"
WRAPPER_SRC="${DESKTOP_DIR}/../codeagent-wrapper"
WRAPPER_ASSETS_DIR="${DESKTOP_DIR}/internal/assets/wrapper/assets"
PREPARE_MODULES_SCRIPT="${DESKTOP_DIR}/scripts/prepare-modules.sh"
CLEANUP_MODULES_SCRIPT="${DESKTOP_DIR}/scripts/cleanup-modules.sh"
DO_PUSH=0
DO_COMMIT=0
AUTO_LFS=1
LFS_THRESHOLD_BYTES=$((50 * 1024 * 1024))
SKIP_BUILD=0

usage() {
  cat <<'EOF'
用法: package-pinable-desktop.sh [--commit] [--push] [--push-only] [--no-lfs]

选项:
  --commit 打包完成后执行 git add / git commit / git log
  --push   打包完成后执行 git push -f origin main（自动启用 --commit）
  --push-only 不编译，直接 push（不自动提交）
  --no-lfs 不自动判断/启用 git lfs
环境变量:
  SKIP_WINDOWS=1 跳过 Windows 构建
EOF
}

build_wrapper() {
  local os="$1"
  local arch="$2"
  local out="$3"
  CGO_ENABLED=0 GOOS="$os" GOARCH="$arch" go build -o "$out" ./cmd/codeagent-wrapper
}

prepare_wrapper_assets() {
  if [[ ! -d "${WRAPPER_SRC}" ]]; then
    echo "codeagent-wrapper 源码不存在: ${WRAPPER_SRC}"
    return 1
  fi
  if ! command -v go >/dev/null 2>&1; then
    echo "未找到 Go，无法构建 codeagent-wrapper。"
    return 1
  fi
  mkdir -p "${WRAPPER_ASSETS_DIR}"
  (
    cd "${WRAPPER_SRC}"
    build_wrapper "darwin" "arm64" "${WRAPPER_ASSETS_DIR}/codeagent-wrapper_darwin_arm64"
    build_wrapper "darwin" "amd64" "${WRAPPER_ASSETS_DIR}/codeagent-wrapper_darwin_amd64"
    build_wrapper "windows" "amd64" "${WRAPPER_ASSETS_DIR}/codeagent-wrapper_windows_amd64.exe"
  )
}

prepare_modules_assets() {
  if [[ ! -x "${PREPARE_MODULES_SCRIPT}" ]]; then
    echo "prepare-modules.sh 不存在或不可执行: ${PREPARE_MODULES_SCRIPT}"
    return 1
  fi
  "${PREPARE_MODULES_SCRIPT}"
}

cleanup_modules_assets() {
  if [[ ! -x "${CLEANUP_MODULES_SCRIPT}" ]]; then
    echo "cleanup-modules.sh 不存在或不可执行: ${CLEANUP_MODULES_SCRIPT}"
    return 1
  fi
  "${CLEANUP_MODULES_SCRIPT}"
}

prepare_windows_icon() {
  local src="${DESKTOP_DIR}/build/appicon.png"
  local dest="${DESKTOP_DIR}/build/windows/icon.ico"
  if [[ -f "${src}" ]] && command -v convert >/dev/null 2>&1; then
    convert "${src}" -define icon:auto-resize=256,128,64,48,32,16 "${dest}"
  fi
}

build_mac() {
  local arch="$1"
  local name="$2"
  local clean_flag="$3"
  wails build -platform "darwin/${arch}" -o "${name}" ${clean_flag}
}

build_windows() {
  local name="$1"
  if command -v x86_64-w64-mingw32-gcc >/dev/null 2>&1; then
    prepare_windows_icon
    wails build -platform "windows/amd64" -o "${name}.exe"
  else
    echo "缺少 x86_64-w64-mingw32-gcc，无法在当前主机构建 Windows。"
    echo "请在 Windows 上运行:"
    echo "  wails build -platform windows/amd64 -o ${name}.exe"
    if [[ "${SKIP_WINDOWS:-}" == "1" ]]; then
      return 0
    fi
    return 2
  fi
}

for arg in "$@"; do
  case "${arg}" in
    --push)
      DO_PUSH=1
      DO_COMMIT=1
      ;;
    --push-only)
      DO_PUSH=1
      SKIP_BUILD=1
      ;;
    --commit)
      DO_COMMIT=1
      ;;
    --no-lfs)
      AUTO_LFS=0
      ;;
    -h|--help)
      usage
      exit 0
    ;;
    *)
      echo "未知参数: ${arg}"
      usage
      exit 1
      ;;
  esac
done

if [[ "${SKIP_BUILD}" != "1" ]]; then
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

  trap cleanup_modules_assets EXIT
  if ! prepare_wrapper_assets; then
    exit 1
  fi
  if ! prepare_modules_assets; then
    exit 1
  fi

  HOST_OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
  ARCH="$(uname -m)"
  APP_PATH=""

  if [[ "${HOST_OS}" == "darwin" ]]; then
    echo "==> 构建 macOS (darwin/arm64)"
    (
      cd "${DESKTOP_DIR}"
      build_mac "arm64" "MmoAgents-mac-arm64" "-clean"
    )

    echo "==> 构建 macOS (darwin/amd64)"
    (
      cd "${DESKTOP_DIR}"
      build_mac "amd64" "MmoAgents-mac-amd64" ""
    )

    if [[ "${ARCH}" == "arm64" && -d "${BUILD_DIR}/MmoAgents-mac-arm64.app" ]]; then
      APP_PATH="${BUILD_DIR}/MmoAgents-mac-arm64.app"
    elif [[ "${ARCH}" != "arm64" && -d "${BUILD_DIR}/MmoAgents-mac-amd64.app" ]]; then
      APP_PATH="${BUILD_DIR}/MmoAgents-mac-amd64.app"
    fi
  else
    echo "非 macOS 主机: ${HOST_OS}"
    echo "macOS 构建需要在 macOS 上运行。"
  fi

  if [[ -z "${APP_PATH}" ]]; then
    APP_PATH="$(find "${BUILD_DIR}" -maxdepth 1 -name "*.app" -print -quit)"
  fi

  if [[ -n "${APP_PATH}" ]]; then
    if command -v hdiutil >/dev/null 2>&1; then
      echo "==> 生成 DMG"
      hdiutil create -volname "PinableAgents" -srcfolder "${APP_PATH}" -ov -format UDZO "${OUTPUT_DIR}/PinableAgents-mac.dmg"
    else
      echo "hdiutil 不可用，无法生成 DMG。"
      echo "请手动将 ${APP_PATH} 打包为 PinableAgents-mac.dmg"
    fi
  else
    echo "未找到 .app 输出，请检查 wails build 日志。"
  fi

  if [[ "${SKIP_WINDOWS:-}" != "1" ]]; then
    echo "==> 构建 Windows (windows/amd64)"
    (
      cd "${DESKTOP_DIR}"
      build_windows "MmoAgents-windows-amd64"
    )

    EXE_PATH="${BUILD_DIR}/MmoAgents-windows-amd64.exe"
    if [[ ! -f "${EXE_PATH}" ]]; then
      EXE_PATH="$(find "${BUILD_DIR}" -maxdepth 1 -name "*.exe" -print -quit)"
    fi

    if [[ -n "${EXE_PATH}" ]]; then
      cp "${EXE_PATH}" "${OUTPUT_DIR}/PinableAgents-win.exe"
    else
      echo "未找到 .exe 输出，请检查 wails build 日志。"
    fi
  else
    echo "跳过 Windows 构建 (SKIP_WINDOWS=1)"
  fi

  echo "==> 完成。输出目录: ${OUTPUT_DIR}"
fi

if [[ "${DO_COMMIT}" == "1" ]]; then
  if ! command -v git >/dev/null 2>&1; then
    echo "git 未安装或不在 PATH 中，无法执行提交。"
    exit 1
  fi

  DMG_OUT="${OUTPUT_DIR}/PinableAgents-mac.dmg"
  EXE_OUT="${OUTPUT_DIR}/PinableAgents-win.exe"

  file_size_bytes() {
    local path="$1"
    if stat -f%z "${path}" >/dev/null 2>&1; then
      stat -f%z "${path}"
    else
      stat -c%s "${path}"
    fi
  }

  NEED_LFS=0
  if [[ "${AUTO_LFS}" == "1" ]]; then
    if [[ -f "${DMG_OUT}" ]]; then
      DMG_SIZE="$(file_size_bytes "${DMG_OUT}")"
      if [[ "${DMG_SIZE}" -ge "${LFS_THRESHOLD_BYTES}" ]]; then
        NEED_LFS=1
      fi
    fi
    if [[ -f "${EXE_OUT}" ]]; then
      EXE_SIZE="$(file_size_bytes "${EXE_OUT}")"
      if [[ "${EXE_SIZE}" -ge "${LFS_THRESHOLD_BYTES}" ]]; then
        NEED_LFS=1
      fi
    fi
  fi

  if [[ "${AUTO_LFS}" == "1" && "${NEED_LFS}" == "1" ]]; then
    if git lfs --version >/dev/null 2>&1; then
      GIT_ATTR="${SITE_DIR}/.gitattributes"
      TRACK_DMG=1
      TRACK_EXE=1

      if [[ -f "${GIT_ATTR}" ]]; then
        if grep -E '^\*.dmg[[:space:]].*filter=lfs' "${GIT_ATTR}" >/dev/null 2>&1; then
          TRACK_DMG=0
        fi
        if grep -E '^\*.exe[[:space:]].*filter=lfs' "${GIT_ATTR}" >/dev/null 2>&1; then
          TRACK_EXE=0
        fi
      fi

      if [[ "${TRACK_DMG}" == "1" || "${TRACK_EXE}" == "1" ]]; then
        echo "==> 检测到大文件，启用 git lfs 跟踪"
        (
          cd "${SITE_DIR}"
          git lfs install
          if [[ "${TRACK_DMG}" == "1" ]]; then
            git lfs track "*.dmg"
          fi
          if [[ "${TRACK_EXE}" == "1" ]]; then
            git lfs track "*.exe"
          fi
        )
      fi
    else
      echo "未安装 git lfs，跳过自动启用（可用 --no-lfs 关闭提示）。"
    fi
  fi

  echo "==> 提交构建产物"
  (
    cd "${SITE_DIR}"
    if [[ -f "${DMG_OUT}" ]]; then
      git add "${DMG_OUT}"
    fi
    if [[ -f "${EXE_OUT}" ]]; then
      git add "${EXE_OUT}"
    fi
    if [[ -f "${SITE_DIR}/.gitattributes" ]]; then
      git add "${SITE_DIR}/.gitattributes"
    fi

    if git diff --cached --quiet; then
      echo "没有可提交的变更。"
      exit 0
    fi

    COMMIT_TIME="$(date +"%Y-%m-%d %H:%M:%S %z")"
    git commit -m "build: update desktop artifacts ${COMMIT_TIME}"
    git log -1 --stat
  )
fi

if [[ "${DO_PUSH}" == "1" ]]; then
  if ! command -v git >/dev/null 2>&1; then
    echo "git 未安装或不在 PATH 中，无法执行 push。"
    exit 1
  fi
  echo "==> 推送到 origin main"
  (
    cd "${SITE_DIR}"
    GIT_SSH_COMMAND="ssh -i ~/.ssh/id_devops -o IdentitiesOnly=yes" \
      git push -f origin main
  )
fi
