# Cold-run recording checklist - no recording claimed

READY technically: automated isolated end-to-end run and HTTP checks pass. NOT yet recorded. Same-host source-only copy with fresh processes; do not describe it as a clean OS, new dependency installation or partner run.

## Before pressing record

- Open a fresh PowerShell and this checklist/README; choose a recording location outside the frozen package if possible.
- Check readable terminal/browser font, microphone and webcam unless accommodated. Close private tabs/notifications.
- Port4390 was already occupied during audit. Do not kill an unknown process. Use4391 for the cold-copy server, or another unused port. The existing4390 response matched the frozen dashboard during audit, but that alone is not evidence of the new cold copy.
- Keep the originals `fd52a28`, `f8139c1`, Edition A and student reflection unchanged. This is not a repeat of the human locked prediction test.

## Start recording, then run these commands

```powershell
cd 'C:\Users\jklai\Documents\Courses\AIFinance2026\JKLai\Project1_Final'
Get-Date -Format o
node --version
node cold_run.mjs
```

Show all seven steps and `first_failure: null` only if that is the actual result. The JSON contains real command stdout/stderr, elapsed time and the unique destination. If a step fails, retain it and diagnose it; do not erase or invent a failure segment.

```powershell
$coldLog = Get-ChildItem -LiteralPath '.\evidence' -Filter 'cold_run_*.json' | Sort-Object Name | Select-Object -Last 1
$coldReport = Get-Content -LiteralPath $coldLog.FullName -Raw | ConvertFrom-Json
$coldReport.steps | Select-Object command,exit_code,elapsed_seconds
$coldReport.destination
Set-Location -LiteralPath $coldReport.destination
$env:PORT = '4391'
node serve.mjs
```

Open `http://127.0.0.1:4391/#workbench` and show the fresh copy's visible output, one driver, reset, failure and recovery. The server command remains running; this is expected. If4391 is occupied, the program now prints actionable guidance: set4392 instead and use that same URL. Do not open4390 and call it the cold-copy output.

## After the demonstration

- Stop your server with Ctrl+C, then run `Remove-Item Env:PORT -ErrorAction SilentlyContinue` in that shell.
- Save the actual recording with its real date/duration. Keep first failure, fix and rerun if any. Note recording filename, exact log filename and timestamps in your evidence index.
- Return to the original project directory before any submission/manifest work.
- Refer to the actual cold recording in Video2; a JSON log alone is not a video. Do not invent elapsed time, partner involvement, transcript or environment claims.
- This automated source copy omits submission artifacts and full history intentionally. It tests the runnable application; the separate final package preserves human evidence and PDFs.
