param(
    [string]$Root = (Split-Path -Parent $PSScriptRoot),
    [switch]$RequireInstallers
)

$ErrorActionPreference = "Stop"
$Required = @(
    "src\KeyFloat.Win\Data\shortcuts-windows.json",
    "src\KeyFloat.Win\Assets\KeyFloat.ico",
    "WINDOWS_SHORTCUT_ADAPTATION_REPORT.json",
    "WINDOWS_SHORTCUT_VALIDATION_REPORT.json",
    "WINDOWS_ICON_REPORT.json"
)
foreach ($Relative in $Required) {
    $Path = Join-Path $Root $Relative
    if (-not (Test-Path $Path)) { throw "Missing required release input: $Relative" }
}

if ($RequireInstallers) {
    $Installers = @(
        "artifacts\installer\KeyFloat-Win-1.0.5-x64-Setup.exe",
        "artifacts\installer\KeyFloat-Win-1.0.5-arm64-Setup.exe"
    )
    foreach ($Relative in $Installers) {
        $Path = Join-Path $Root $Relative
        if (-not (Test-Path $Path)) { throw "Missing required Windows installer: $Relative" }
    }
}

node (Join-Path $Root "Tools\validate-windows-data.js")
node (Join-Path $Root "Tools\validate-project.mjs")
node (Join-Path $Root "Tools\validate-publish.js")
python (Join-Path $Root "Tools\verify-source-unchanged.py")
dotnet run --project (Join-Path $Root "tests\KeyFloat.Core.Smoke\KeyFloat.Core.Smoke.csproj") -c Release -- `
    (Join-Path $Root "src\KeyFloat.Win\Data\shortcuts-windows.json")
Write-Host "KeyFloat Windows release verification passed."
