# HandiAds Founder Radar Backend

The frontend is ready. The backend agent should run every morning before 4 AM Indian Standard Time and create `data/daily-feed.json`.

## What The Backend Does

1. Searches official pages, opportunity platforms, trusted RSS feeds, GDELT, optional news APIs, and Google News backup for founder opportunities, AI summits, sponsored trips, startup programs, government programs, ad tech, and performance marketing news.
2. Extracts title, summary, date, source link, and likely location.
3. Classifies each item into tags such as `funded`, `ai`, `market`, and `ads`.
4. Scores each item using the HandiAds priority rules.
5. Saves the best opportunities into `data/daily-feed.json`.
6. The frontend reads that JSON and shows the highest-priority cards first.

## Run Manually

First go to the project folder:

```powershell
cd "C:\Users\hiten\Documents\Codex\2026-04-28\i-need-you-to-creat-an"
```

If `npm` works:

```bash
npm run refresh-news
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```powershell
npm.cmd run refresh-news
npm.cmd start
```

Or double-click these files from the project folder:

```text
start-radar.cmd
refresh-news.cmd
open-radar.cmd
```

These scripts automatically run from the correct folder.

If you see `Could not read package.json` and the path is `C:\Users\hiten\package.json`, it means the command was run from the wrong folder. Run the `cd` command above first or use the `.cmd` launchers.

If `npm` is not available but `node` works:

```bash
node backend/news-agent.mjs
```

This command creates or updates:

```text
data/daily-feed.json
```

## Daily Schedule Before 4 AM IST

First test a manual refresh:

```powershell
npm.cmd run refresh-news
```

Then check `data/daily-feed.json`. The `generatedAt` value should change to the current date and time.

If your server uses Indian time, run it at 3:30 AM:

```cron
30 3 * * * cd /path/to/founder-radar && npm run refresh-news
```

On your Windows computer, run this once in PowerShell from the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\create-windows-daily-task.ps1
```

That creates a Windows Task Scheduler job at 3:30 AM.

To check whether the Windows task exists, open Task Scheduler and look for:

```text
HandiAds Founder Radar Daily News
```

If the website shows `Backend stale`, it means the daily task or Hostinger cron did not run successfully.

If your server uses UTC, 3:30 AM IST is 10:00 PM UTC on the previous day:

```cron
0 22 * * * cd /path/to/founder-radar && npm run refresh-news
```

Hostinger cron jobs use UTC, so use:

```cron
0 22 * * *
```

Command:

```bash
cd /home/YOUR_USER/domains/radar.handiads.com/public_html && npm run refresh-news
```

If Hostinger does not accept special shell syntax in the command box, upload `scripts/refresh-news.sh` and set the custom cron command to the full path of that file.

The scan starts at 3:30 AM IST and should usually finish before 4:00 AM IST.

## Priority Rules

- Sponsored or partly sponsored program: +45
- Close to India: +25
- Reachable from India: +15
- Only air travel self-funded: +10
- Strong influencer/networking value: +20
- Medium networking value: +12
- AI relevance: +8
- Performance marketing relevance: +8

## Real AI Upgrade

The current backend has deterministic scoring, so it works without paid API keys. For stronger quality, connect OpenAI and ask the model to return structured JSON for:

- sponsorship details
- covered costs
- air travel requirement
- distance from India
- influencer/founder/network value
- authenticity risk
- why it matters to HandiAds
- next moves

Use official source URLs whenever possible. Instagram can be used as an early signal, but the backend should not mark the opportunity verified until it finds an official event, government, university, accelerator, or organizer page.

OpenAI's current model docs list Responses API support and structured outputs for suitable models, so the AI classification step should use the Responses API with a structured JSON schema.

## Local Browser Preview

Opening `index.html` directly is fine for the demo UI, but browser security may block the frontend from reading `data/daily-feed.json` from a local file path.

For the real backend feed preview, start the local server:

```bash
node backend/serve.mjs
```

Then open:

```text
http://localhost:4173
```

## Why `npm` May Not Work

If `node -v` works but `npm -v` does not, usually one of these is true:

- Node was installed without npm.
- The terminal was opened before Node was installed, so PATH did not refresh.
- Codex is seeing its bundled Node runtime, not your system Node installation.
- PowerShell is blocking `npm.ps1` because script execution is disabled.

Fixes:

1. Close and reopen PowerShell.
2. Restart Codex.
3. In a normal PowerShell window, run `where node` and `where npm`.
4. If `npm` is still missing, reinstall Node.js from the official installer and keep the npm option enabled.
5. If `where npm` shows `npm.cmd`, run `npm.cmd` instead of `npm` in PowerShell.
