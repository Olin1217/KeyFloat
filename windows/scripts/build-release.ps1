param(
    [ValidateSet("x64", "arm64", "all")]
    [string]$Architecture = "all",
    [string]$Configuration = "Release",
    [string]$InnoSetup = "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Artifacts = Join-Path $Root "artifacts"
$Project = Join-Path $Root "src\KeyFloat.Win\KeyFloat.Win.csproj"
$Data = Join-Path $Root "src\KeyFloat.Win\Data\shortcuts-windows.json"

Push-Location $Root
try {
    node Tools/build-windows-data.js
    node Tools/validate-windows-data.js
    node Tools/validate-project.mjs
    dotnet restore KeyFloat.Win.sln
    dotnet build KeyFloat.Win.sln -c $Configuration --no-restore
    dotnet run --project tests/KeyFloat.Core.Smoke/KeyFloat.Core.Smoke.csproj -c $Configuration --no-build -- $Data

    $Targets = if ($Architecture -eq "all") { @("x64", "arm64") } else { @($Architecture) }
    foreach ($Target in $Targets) {
        $Rid = "win-$Target"
        $Output = Join-Path $Artifacts "publish\$Rid"
        if (Test-Path $Output) { Remove-Item $Output -Recurse -Force }
        dotnet publish $Project -c $Configuration -r $Rid --self-contained true -o $Output `
            -p:PublishSingleFile=true `
            -p:IncludeNativeLibrariesForSelfExtract=true `
            -p:PublishTrimmed=false `
            -p:DebugType=None `
            -p:DebugSymbols=false

        if (Test-Path $InnoSetup) {
            & $InnoSetup "/DMyArch=$Target" "/DMySource=$Output" (Join-Path $Root "installer\KeyFloat.iss")
        } else {
            Write-Warning "Inno Setup was not found. The publish folder is ready; install Inno Setup 6 to create the signed installer."
        }
    }
}
finally {
    Pop-Location
}
