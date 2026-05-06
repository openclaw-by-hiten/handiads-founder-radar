# HandiAds Founder Radar

A first-version web app for daily founder intelligence.

## What It Does

- Tracks opportunity-style signals for HandiAds, such as sponsored AI summits, youth programs, startup programs, market-entry events, and ad tech changes.
- Converts each signal into practical next steps for HandiAds.
- Suggests growth plays for revenue, international partnerships, and new technology adoption.
- Generates Instagram content angles for HandiAds from founder opportunities and market news.

## How To Open

Open `index.html` in a browser.

## How To Host On handias.com

Upload these files to a folder on your website hosting, for example:

- `/founder-radar/index.html`
- `/founder-radar/styles.css`
- `/founder-radar/app.js`

Then open:

`https://handias.com/founder-radar/`

For GitHub Pages hosting on `radar.handiads.com`, use `GITHUB_DEPLOY.md`.

## Next Step For Live News

This first version is static and ready to host. A backend scaffold has now been added in `backend/news-agent.mjs`.

Run it with:

```bash
npm run refresh-news
```

It creates:

```text
data/daily-feed.json
```

When hosted, the frontend reads this file and shows the latest prioritized opportunities.

The agent should:

1. Runs every morning.
2. Searches trusted sources, RSS feeds, Google News, LinkedIn/company pages, Instagram leads, government program pages, and startup event calendars.
3. Scores each result for HandiAds fit.
4. Saves the best results into a JSON file or database.
5. Lets this front end display the latest daily intelligence.

More setup details are in `BACKEND_SETUP.md`.

Suggested search topics:

- sponsored AI summit founder program
- youth leadership program sponsored travel AI
- startup delegation sponsored travel
- government AI summit application
- ad tech privacy attribution update
- performance marketing AI tools
- India market entry startup program
- UAE startup accelerator India expansion

## Priority Rules

The app should rank opportunities like this:

1. Sponsored trip or partly sponsored program is the highest priority.
2. Programs close to India get more priority because they are easier and cheaper to attend.
3. Programs where only air travel is self-funded are still useful because stay, food, and local travel may be covered.
4. Programs with reputed founders, top influencers, government people, investors, or startup leaders get extra priority.

Current scoring model:

- Sponsored or partly sponsored: +45
- Close to India: +25
- Reachable from India: +15
- Only air travel self-funded: +10
- No travel needed: +6
- Strong influencer/network value: +20
- Medium network value: +12

The app sorts cards by this score, so the best founder opportunities appear first.

## How The AI Fetching Should Work

For the hosted version, the web app should connect to a backend agent. The backend can run every morning and do this:

1. Search the web for your topics.
2. Open each result and extract the program name, country, dates, eligibility, sponsorship details, travel support, source link, and notable attendees.
3. Ask AI to classify the result into fields like `sponsorship`, `distanceFromIndia`, `airTravel`, `influencerValue`, `marketFit`, and `risk`.
4. Score the result using the priority rules above.
5. Save the top results into a database or a daily JSON file.
6. The web app reads that file and displays the best opportunities first.

Best source types:

- Government program pages
- Embassy and trade mission pages
- Startup accelerator application pages
- AI summit and conference pages
- University youth leadership programs
- Investor and founder event pages
- Reputed business media
- LinkedIn posts from verified organizers

Instagram can be used as an early signal, but the agent should verify the same opportunity on an official website before giving it high priority.
