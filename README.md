# Repository package - videos and transcripts supplied separately

This package intentionally excludes ALL video files and transcript files (including templates). The student reports all three videos and the cold run completed; those recordings are separate deliverables. The prior audit's IN PROGRESS statements are historical. Video completion is not a claim that hosted access, transcripts or every content requirement has been verified.

Start with SUBMIT_AND_PUBLISH.md. The three required written PDFs are in submission/; matching copies are in docs/. This is a complete runnable code/document/evidence package, not a complete final submission until the separate media/transcript/link requirements are fulfilled. The original student files and financial model have not been changed.

# Purdue FIN 43900 Project 1 - NVIDIA

This local valuation workbench supports a hypothetical investment committee with no NVDA position. The student's independent recommendation is **DO NOT INITIATE**. The restored model's mechanical rule is **WATCH / DEFER**, with base FCFF value **$133.97/share**, scenario range **$54.05-$220.58**, and historical September 1, 2026 price **$217.44**. The investment horizon is 3-5 years. Monetary statements use USD millions; per-share values use USD/share.

**Submission status: media/transcripts intentionally supplied separately.** See [FINAL_SUBMISSION_CHECKLIST.md](FINAL_SUBMISSION_CHECKLIST.md) for verified evidence and [LAST_MINUTE_ACTIONS.md](LAST_MINUTE_ACTIONS.md) for remaining personal actions. This package does not claim a Brightspace submission or accessible hosted repository/videos.

## Software and setup

Install Node.js 24 or later (tested: 24.19.0). The dashboard/model use only Node built-ins: no npm install, credentials, external services or internet access is needed at runtime. Extract the ZIP fully. Open its extracted project folder in File Explorer, right-click inside it and select **Open in Terminal** (PowerShell). The folder must contain `package.json`, `model.mjs` and `README.md`.

**For another computer:** copy the entire ZIP, extract it to a writable local folder, and install Node.js 24 if needed. Do not copy just `dashboard.html` if you want to rerun the model. Python, Git, VS Code, RStudio, your original coursework folders and your Windows username are not required to run the dashboard, tests or cold run. A modern browser is required to view the dashboard. All commands below start in the extracted project root.

On macOS/Linux, open a terminal in that folder and use the same `node ...` commands. To change the port use `PORT=4391 node serve.mjs`. The PowerShell navigation/environment commands below are Windows-specific. Cross-platform behavior has been reviewed, but execution was tested on Windows only.

```powershell
Get-Location
Test-Path .\package.json
node --version
node test.mjs
node training_test.mjs
node ui_test.mjs
node serve.mjs
```

Open **http://127.0.0.1:4390** in a browser. The terminal stays occupied while serving; Ctrl+C stops only that server. You can also double-click `outputs/dashboard.html` for offline use; its controls work, but Markdown links are easier to read through the server.

## If the port is occupied

Keep the other process running and use a different port in the same PowerShell window:

```powershell
$env:PORT = '4391'
node serve.mjs
```

Open **http://127.0.0.1:4391**. Substitute 4392 if necessary. After stopping the server with Ctrl+C, restore the default with:

```powershell
Remove-Item Env:PORT -ErrorAction SilentlyContinue
```

## Operate the dashboard

The student recommendation is shown separately from the model rule. Use bounded drivers to explore the statements and valuation, then **Reset** to restore the base. Change AR days from 65 to 80 to see value fall to about $132.85. The deliberate balance-sheet/terminal-boundary demonstrations should show a visible failure; Reset restores the valid base. Scenario selection displays low/base/high statements. Exploratory changes are not saved into `inputs.json`.

## Reproduce from a fresh copy

From the extracted project root, run:

```powershell
node cold_run.mjs
if ($LASTEXITCODE -ne 0) { throw 'Cold run failed; inspect the printed log.' }
$coldLog = Get-ChildItem .\evidence\cold_run_*.json | Sort-Object LastWriteTime | Select-Object -Last 1
$cold = Get-Content -Raw -LiteralPath $coldLog.FullName | ConvertFrom-Json
$cold.destination
Set-Location -LiteralPath $cold.destination
$env:PORT = '4391'
node serve.mjs
```

Open **http://127.0.0.1:4391** to view the freshly generated dashboard. Use another free port if needed. The destination is created automatically inside `evidence/cold_<timestamp>`; do not guess its name or use an older machine's absolute path. The script runs tests, training, build, UI, peer diligence, draft-document generation and inventory in new Node processes. It records commands, exit codes, elapsed time and first failure. This is an isolated copy on the same host, not a clean operating-system installation. Its generated draft documents are disposable reproduction outputs; the submitted documents remain in the parent project's `docs/` and `submission/` folders.

After Ctrl+C, return to the project root:

```powershell
Set-Location ..\..
Remove-Item Env:PORT -ErrorAction SilentlyContinue
```

Automated logs do not prove human recording. The supplied cold-run video is intentionally excluded from this repository package; its automated logs remain in evidence/.

## Source and file map

- `inputs.json`, `model.mjs`: assumptions and accounting/FCFF engine.
- `build.mjs`, `enhance.mjs`, `presentation.mjs`, `student_decision.mjs`, `serve.mjs`: dashboard/output construction and local serving.
- `outputs/dashboard.html`, `results.json`, `statements.csv`, `statements.md`: visible executed results.
- `docs/decision-memo.md` and `submission/Decision-Memo.pdf`: committee judgment and conditions.
- `docs/research-evolution.md` and `submission/Research-Evolution.pdf`: A-to-B evidence plus clearly identified preserved historical and retrospective appendices.
- `docs/validation-and-ai-use.md` and `submission/Validation-and-AI-Use.pdf`: tests, original human record, subsequent AI diagnosis and named disclosures.
- `submission/Project 1 Edition A - NVIDIA.md`, `Edition_A_Retrospective_Recollection.md.txt`, `Edition_B_Student_Reflection.md`: unchanged supplied originals.
- `sources/`, `SOURCE_NORMALIZATION.md`, `ASSUMPTIONS.md`, `PEER_POLICY.md`: source captures, locators, definitions, driver challenges and qualifications.
- `evidence/`: historical failures, predictions, screenshots and actual validation/cold-run logs. Repeated disposable working copies are excluded from the submission.
- Videos and transcript files: intentionally excluded; add corrected transcripts separately and link hosted recordings in the course manifest.
- `project-submission-manifest-template.csv`: course's 12-row link/file manifest; blank URLs/access fields remain genuine gaps.
- `SUBMISSION_MANIFEST.md`: exact packaged-file sizes and SHA256 hashes. The manifest excludes its own hash to avoid a circular hash.

## Additional checks and regeneration

```powershell
node source_audit.mjs
node workbench_regression.mjs
node prerecord_audit.mjs
```

`prerecord_audit.mjs` checks the existing port 4390 if available; its report states whether that HTTP check succeeded. UI tests start their own temporary server. `node build.mjs` regenerates numerical/dashboard outputs if inputs change; run it only on a working copy after `node test.mjs` and `node training_test.mjs`. Do not rerun old migration/finalization scripts or `refresh_current_docs.mjs` on the frozen submission: they can replace curated documentation. No underlying model changes were made to pass the final audit.

The app does not need Python. Optional PDF regeneration and the official manifest checker require Python 3.12+ and the pinned `requirements-artifacts.txt` packages. The supplied PDF generator also requires visual inspection after regeneration. Existing PDFs are included, so installation is unnecessary for grading the model. The official checker can return exit 0 while printing missing evidence; it is not a readiness certificate.

Optional historical ownership-review scripts are separate from running the product: `student_test_review.mjs` requires Git and the original commit history. The old presentation-preservation test is omitted because it depends on deliberately excluded historical bundles. Already-executed validation evidence remains included. The standard run commands and seven-step cold run were verified in a relocated folder with a fresh profile and no Python, Git metadata, virtual environment or npm packages; see `evidence/portability_verification.json`.

## Known limitations and integrity

The valuation preserves a historical information boundary; it is not a current market quote. Forecasts, beta/ERP/spread, investment haircuts and entry thresholds are judgments. The July-to-September balance roll, diluted-share proxy, peer spot capitalizations, terminal assumptions and end-customer returns remain qualified. See MODEL_GUIDE.md and the memo.

The original independent Edition A draft is unavailable. The supplied AI-revised historical file and later retrospective recollection are explicitly distinguished. A reported professor response supports the proposed packaging plan, without certifying independence or grading. The locked human prediction and screenshots remain unchanged; subsequent AI arithmetic review is retrospective. No missing peer feedback, receipt, transcript or human evidence is invented.

## Troubleshooting

- **Node not recognized:** install Node.js, reopen PowerShell, and check `node --version`.
- **Cannot find module/file:** open the extracted project root, not the ZIP viewer or its parent. `Test-Path .\package.json` must print True.
- **Port in use:** use the PORT commands above. Do not stop an unrelated recording/server process.
- **PowerShell npm policy error:** use the `node ...` commands above; npm is unnecessary.
- **Test fails:** retain the full output and timestamped evidence log. Do not change financial inputs to force a pass.
- **Cold-copy historical paths do not exist:** paths in old logs describe their original run. Use the new log's `destination` for this run.
- **Fresh-copy docs differ:** cold run regenerates AI drafts; the frozen PDFs/Markdown in the main package are the submission record.
- **Missing transcripts/URLs:** complete LAST_MINUTE_ACTIONS.md; a local video file does not satisfy hosted access requirements by itself.

## Final submission

Follow SUBMIT_AND_PUBLISH.md to publish this folder and supply videos/transcripts separately. The enclosing ZIP is a transfer package; do not treat it as a substitute for the required Brightspace attachments.
