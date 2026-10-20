# Repository package - videos and transcripts supplied separately

This package intentionally excludes ALL video files and transcript files (including templates). The student reports all three videos and the cold run completed; those recordings are separate deliverables. The prior audit's IN PROGRESS statements are historical. Video completion is not a claim that hosted access, transcripts or every content requirement has been verified.

Start with SUBMIT_AND_PUBLISH.md. The three required written PDFs are in submission/; matching copies are in docs/. This is a complete runnable code/document/evidence package, not a complete final submission until the separate media/transcript/link requirements are fulfilled. The original student files and financial model have not been changed.

# Final submission checklist - October 19, 2026

**NOT READY. Video 3: IN PROGRESS.** COMPLETE means the listed evidence was inspected or tested; it does not promise rubric points. INCOMPLETE means a known gap; UNVERIFIED means evidence/access cannot be certified. This checklist supersedes older status prose and hardcoded missing-evidence lists in historical scripts/logs.

Portability follow-up: COMPLETE for the required runtime workflow on a relocated Windows copy with a fresh profile, Node-only PATH, no Git metadata, local Python, virtual environment or npm packages. Model, training, build, UI, source, regression and cold-run checks passed; HTTP dashboard reproduced $133.97. Evidence: `evidence/portability_verification.json`. Another physical computer and macOS/Linux remain untested; recipient requirements are Node.js 24 and a modern browser.

Authority: archived official brief, submission architecture, student checklist, AI boundary card and syllabus in `course_materials/`. Published rubric weights total 300: problem/decision 45, data 45, finance 60, technical 45, validation 75, communication 30. The full analytic performance-level descriptors are not in the supplied materials; the public `MAJOR-PROJECT-ANALYTIC-RUBRIC.md` URL returned 404 during this audit. Brightspace-specific rules, filename prefix, instructional access identities and any accommodations remain UNVERIFIED. No estimated grade is assigned.

|Requirement|Status|Supporting file(s)|Remaining action / qualification|
|---|---|---|---|
|Official brief, architecture, checklist and 300-point weights reviewed|COMPLETE|course_materials/projects__project-1-corporate-finance-application.md; PROJECT-SUBMISSION-ARCHITECTURE.md; syllabus.txt|Full private rubric descriptors remain unavailable|
|Full analytic rubric and authenticated assignment header|UNVERIFIED|course_materials/syllabus.txt; official public rubric URL unavailable|Check Brightspace requirements/prefix and deadline; syllabus says Oct 19 11:59 p.m. Eastern|
|Eligible operating-company target; user, decision, horizon, date, currency, share basis and exclusions|COMPLETE|MODEL_GUIDE.md; docs/decision-memo.md; inputs.json|NVDA, no current position, 3-5 years, Sep 1 2026, USD and diluted proxy disclosed|
|Historical inputs traced to filings, units and definitions|COMPLETE|sources/register.json; sources/sec_verified_facts.json; outputs/source_audit.json|87 checks pass; ledger is AI-transcribed, not a human certification|
|Facts distinguished from normalization, forecast and model output|COMPLETE|SOURCE_NORMALIZATION.md; ASSUMPTIONS.md; MODEL_GUIDE.md|Keep beta/ERP/spread, market inputs and forecasts qualified|
|Personalized driver architecture and assumption-challenge record|COMPLETE|ASSUMPTIONS.md; outputs/driver_sensitivities.md|No invented peer attribution|
|Five-year three-statement forecast and fail-loud articulation|COMPLETE|model.mjs; outputs/statements.csv; test.mjs|H2 FY27 plus FY28-31, with H1 actuals; timing/roll approximation disclosed|
|FCFF linked to operating statements, WACC and terminal reinvestment|COMPLETE|model.mjs; outputs/results.json|Forecast plausibility remains judgment|
|Enterprise-to-equity and per-share bridge|COMPLETE|outputs/capital_bridge_review.md; test.mjs|Restricted investments counted once; spot/share assumptions qualified|
|Base valuation approximately $133.97|COMPLETE|outputs/results.json; evidence/final_audit_results.json|Reproduced $133.97273639515174|
|Causal low/base/high, WACC/g, terminal share, reverse DCF|COMPLETE|outputs/results.json; prerecord_audit.mjs|Low/base/high $54.05/$133.97/$220.58; not confidence bounds|
|Peer policy plus consistent EV and equity multiples|COMPLETE|PEER_POLICY.md; outputs/peer_capitalization_review.md; test.mjs|Annualized H1 screens; provisional spot capitalization is retained limitation|
|Explain method disagreement; avoid mechanical averaging|COMPLETE|docs/decision-memo.md; PEER_POLICY.md|No unsuitable transaction multiple added|
|Own-company one-at-a-time operating profit/FCF/value rankings and range dependence|COMPLETE|outputs/driver_sensitivities.md; outputs/driver_sensitivities.json|Ranges are analyst stresses|
|Attributed Weeks 5-6 fresh-eyes feedback|INCOMPLETE|docs/validation-and-ai-use.md|No attributable completed feedback found; add only genuine existing evidence, otherwise disclose absence|
|Conditional range, recommendation, reversal triggers and committee ask|COMPLETE|docs/decision-memo.md; outputs/dashboard.html|Student DO NOT INITIATE versus mechanical WATCH / DEFER explicitly distinguished|
|Bounded interface, exact reset, live sensitivities and visible failures|COMPLETE|outputs/dashboard.html; evidence/ui_*.json; evidence/prerecord_audit_*.json|Script/HTTP tests pass; no new interactive browser session disturbed recording|
|Synthetic known-answer and nine-cell reconciliation|COMPLETE|training_test.mjs; evidence/training_*.json|$27.4973704 rounds to official $27.50|
|Independent source/definition check and tested AI disposition|COMPLETE|sources/sec_verified_facts.json; outputs/filing_revision_review.md; docs/validation-and-ai-use.md|Restricted investment omission and amortization corrected; later AI verification disclosed|
|Directional changed-input prediction before execution|COMPLETE|evidence/engineering_prediction.json; evidence/tests_*.json|AI engineering prediction is separate from required human record|
|Locked human changed-input prediction, commits and screenshots preserved|COMPLETE|prediction_before_test.md; LOCKED_CHANGED_INPUT_BLANK.md; evidence/$93 Proof.png; evidence/$133 Revalue.png; submission/Project1_GitHistory_FinalAudit.bundle|Commits fd52a28 then f8139c1 corroborate sequence; stale BLANK header is preserved original text|
|Complete human record fields and independent AI-off ownership|UNVERIFIED|docs/validation-and-ai-use.md; outputs/student_test_review.md|Changed-input hash/original input snapshot and original diagnosis fields incomplete; later AI diagnosis is retrospective. Do not recreate/backdate|
|Accounting, DCF monotonicity/boundaries, bridge and highest-risk failure|COMPLETE|test.mjs; evidence/tests_*.json|19 checks pass; preserves original failures and limitations|
|Clean isolated end-to-end reproduction|COMPLETE|cold_run.mjs; evidence/cold_run_1792463777851.json|Seven steps pass; fresh processes/same host, not clean OS|
|Actual recorded cold run|COMPLETE|recordings/Cold Run.mp4; evidence/cold_run_1792462514299.json; evidence/final_media_audit/|Full media decode passes; sampled frames show command/log, destination and dashboard $133.97 at port 4399. Spoken content not transcribed|
|Original independent Edition A and first successful checkpoint PDF/receipt|INCOMPLETE|submission/Edition_A_Retrospective_Recollection.md.txt; submission/PROFESSOR_RESPONSE_PACKAGING_NOTE.md|Original independent draft unavailable; receipt/PDF not verified. Reported professor plan is not authorship certification|
|Preserved supplied AI-revised Edition A plus clearly retrospective recollection|COMPLETE|submission/Project 1 Edition A - NVIDIA.md; submission/Edition_A_Retrospective_Recollection.md.txt|Original bytes retained; current PDF rendering is not historical receipt evidence|
|Edition B comparison, evidence for changes and student reflection|COMPLETE|docs/research-evolution.md; submission/Research-Evolution.pdf; submission/Edition_B_Student_Reflection.md|A-to-B limitations candidly stated; preserved originals reproduced as appendices|
|Memo PDF <=2 pages with content-equivalent repository copy|COMPLETE|submission/Decision-Memo.pdf; docs/decision-memo.pdf; docs/decision-memo.md|2 pages; hashes and rendered pages checked|
|Research/validation frozen PDFs match repository sources|COMPLETE|submission/Research-Evolution.pdf; submission/Validation-and-AI-Use.pdf; evidence/frozen_pdf_provenance.json|Stale provenance failure corrected after backing up originals; 6/3 pages respectively|
|Named material AI use, dates, disclosed version and dispositions|COMPLETE|docs/validation-and-ai-use.md; AI_USE.md|Exact backend revision unavailable; final packaging work identified as AI-assisted|
|Runnable code, dependencies and portable README|COMPLETE|package.json; README.md; model.mjs; cold_run.mjs|Node 24; no runtime package install; fresh-copy launch/port commands checked|
|Visible executed results without running code|COMPLETE|outputs/dashboard.html; outputs/results.json; outputs/statements.md|Base inputs, as-of date and decision visible|
|Accessible GitHub repository and corroborating history|INCOMPLETE|submission/Project1_GitHistory_FinalAudit.bundle; project-submission-manifest-template.csv|History bundled/verified, but no configured remote or accessible repository URL found|
|Video 1 exists, playable, <=3:00, webcam|COMPLETE|recordings/Video 1.mp4; evidence/final_media_audit/media_report.json|2:19.967; full audio/video decode; webcam in sampled frames|
|Video 1 required research-evolution and tested-AI evidence spoken accurately|UNVERIFIED|evidence/final_media_audit/Video 1.jpg|Sampled frames show Edition A, retrospective, reflection, filing correction and changed-input review; corrected transcript needed|
|Video 2 exists, playable and webcam|COMPLETE|recordings/Video 2.mp4; evidence/final_media_audit/media_report.json|Full audio/video decode; sampled code/results/test/peer-policy screens|
|Video 2 <=5:00|INCOMPLETE|recordings/Video 2.mp4|Duration 5:01.100; trim at least 1.10 seconds of nonessential material or confirm applicable accommodation; original preserved|
|Video 2 technical ownership/validation spoken content|UNVERIFIED|evidence/final_media_audit/Video 2.jpg|Corrected transcript and complete content review required|
|Video 3 <=5:00, webcam, opening live demo, bounded change/reset, failing check/recovery, committee defense|INCOMPLETE|README.md; VIDEO_RECORDING_GUIDE.md|IN PROGRESS; not copied or treated as complete until user supplies finished file|
|Corrected plain-text transcripts 1/2/3 and captions|INCOMPLETE|docs/transcript-video-*-TEMPLATE.txt|Templates only. Actual docs/transcript-video-1.txt, -2.txt, -3.txt absent; review substantive terms/numbers against recordings|
|Three stable YouTube Unlisted/Public or approved Purdue links, titles/durations and timestamp index|INCOMPLETE|project-submission-manifest-template.csv|Populate real hosted links; local MP4 paths alone do not satisfy this|
|Private repository instructional access and video access checks|UNVERIFIED|project-submission-manifest-template.csv|Confirm correct grader identities and logged-out video access|
|Course 12-row manifest (11 required, one optional)|INCOMPLETE|project-submission-manifest-template.csv|Local entries updated; hosting/transcript/access gaps remain|
|No credentials required; no .env needed|COMPLETE|package.json; sources/register.json|Runtime uses no credentials; package excludes .git metadata/runtime caches|
|Submission filename prefix, attachments and final receipt|UNVERIFIED|LAST_MINUTE_ACTIONS.md|Confirm Brightspace header, upload PDFs/transcripts/manifest as requested, save successful receipt; ZIP alone is not the required frozen bundle|
|Clean package, exact inventory, ZIP extraction and reproduction|COMPLETE|SUBMISSION_MANIFEST.md; sibling *_VERIFICATION.json|Archive verified after extraction; readiness remains NOT READY|
|Live hosting, extra interface polish, extra transactions, new partner arrangement tonight|COMPLETE|Official brief/checklist|Optional/not separately required; not added for packaging|

Remaining finance qualifications: approximate balance roll; share proxy; beta/ERP/spread support; peer capitalization; terminal reinvestment/fade; public/private realization assumptions; end-customer return evidence. These are preserved limitations, not silently repaired assumptions.

Historical scripts such as `presentation_test.mjs` use frozen-file snapshots. The final audit refreshes only the expected hashes of intentionally regenerated PDFs and their provenance; the original snapshot is retained in evidence. Historical cold logs contain old absolute destinations and hardcoded "missing" messages; these are evidence of those runs, not a current readiness assessment.
