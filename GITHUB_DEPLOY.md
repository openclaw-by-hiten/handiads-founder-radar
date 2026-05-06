# Deploy Founder Radar To GitHub Pages

Use this when you do not have Hostinger web hosting. GitHub Pages will host the website, and GitHub Actions will refresh `data/daily-feed.json` every morning.

## How This Works

- GitHub Pages hosts the frontend at `radar.handiads.com`.
- GitHub Actions runs `backend/news-agent.mjs` every day.
- The action updates `data/daily-feed.json`.
- The website reads `data/daily-feed.json` as a static file.

GitHub Pages cannot run a live Node.js server. This setup is still good because the scanner runs in GitHub Actions before 4 AM IST and saves the result.

## Step 1: Create GitHub Repository

1. Create a new GitHub repo, for example:

```text
handiads-founder-radar
```

2. Upload/push this full project to GitHub.

Required files:

```text
index.html
styles.css
app.js
assets/
backend/
data/
package.json
CNAME
.github/workflows/refresh-news.yml
```

## Step 2: Enable GitHub Pages

In GitHub:

```text
Repository → Settings → Pages
```

Set:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

Save.

GitHub docs: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Step 3: Add Custom Domain

In:

```text
Repository → Settings → Pages → Custom domain
```

Enter:

```text
radar.handiads.com
```

Save.

This project already includes a `CNAME` file with:

```text
radar.handiads.com
```

GitHub docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Step 4: Add DNS Record

Wherever DNS for `handiads.com` is managed, add:

```text
Type: CNAME
Name: radar
Value: YOUR_GITHUB_USERNAME.github.io
```

Example:

```text
radar → hiten.github.io
```

Use your actual GitHub Pages username or organization domain.

DNS can take up to 24 hours to fully propagate.

## Step 5: Enable HTTPS

After DNS is working:

```text
Repository → Settings → Pages → Enforce HTTPS
```

Turn it on.

## Step 6: Daily 3:30 AM IST Refresh

The workflow file is:

```text
.github/workflows/refresh-news.yml
```

It runs at:

```cron
0 22 * * *
```

That is 10:00 PM UTC, equal to 3:30 AM IST.

GitHub Actions schedules use UTC. GitHub docs: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onschedule

## Step 7: Test Manual Refresh

In GitHub:

```text
Repository → Actions → Refresh Founder Radar News → Run workflow
```

After it runs, check:

```text
data/daily-feed.json
```

The `generatedAt` value should update.

On the live website, the `Refresh` button cannot secretly run the scanner by itself because GitHub Pages is static and exposing a GitHub token in the browser would be unsafe. If the feed is older than one day, the button opens the GitHub Actions workflow page so you can press `Run workflow`.

## Optional API Keys

Go to:

```text
Repository → Settings → Secrets and variables → Actions → New repository secret
```

Add optional keys:

```text
NEWS_API_KEY
THENEWSAPI_KEY
```

The scanner still works without these keys using official pages, RSS feeds, GDELT, and Google backup.
