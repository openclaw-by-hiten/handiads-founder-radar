export const config = {
  outputPath: "data/daily-feed.json",
  maxItemsPerFeed: 12,
  maxDailyItems: 24,
  maxArticleAgeDays: 10,
  requestTimeoutMs: 12000,
  companyContext:
    "HandiAds is a performance marketing company in Gujarat, India. The founder wants founder-focused startup events, AI summits, accelerator programs, business conferences, government-backed innovation opportunities, investor networking, and sponsored business opportunities. Avoid academic scholarships, university admissions, masters programs, student exchanges, and research fellowships.",

  officialPages: [
    {
      name: "Startup India",
      url: "https://www.startupindia.gov.in/content/sih/en/reources/startup_india_notes.html",
      sourceType: "Official"
    },
    {
      name: "JETRO Startup",
      url: "https://www.jetro.go.jp/en/startup/",
      sourceType: "Official"
    },
    {
      name: "Hub71 Programs",
      url: "https://www.hub71.com/",
      sourceType: "Official"
    },
    {
      name: "Hub71 AI Program",
      url: "https://www.hub71.com/index.php/program/hub71-plus-ai",
      sourceType: "Official"
    },
    {
      name: "Startup SG Programmes",
      url: "https://www.startupsg.gov.sg/programmes/",
      sourceType: "Official"
    },
    {
      name: "Devpost Hackathons",
      url: "https://devpost.com/hackathons",
      sourceType: "Opportunity"
    }
  ],

  trustedRssFeeds: [
    {
      name: "TechCrunch Startups",
      url: "https://techcrunch.com/category/startups/feed/",
      sourceType: "Trusted Tech"
    },
    {
      name: "TechCrunch AI",
      url: "https://techcrunch.com/category/artificial-intelligence/feed/",
      sourceType: "Trusted Tech"
    },
    {
      name: "VentureBeat AI",
      url: "https://venturebeat.com/category/ai/feed/",
      sourceType: "Trusted Tech"
    },
    {
      name: "MIT Technology Review",
      url: "https://www.technologyreview.com/feed/",
      sourceType: "Trusted Tech"
    },
    {
      name: "The Verge",
      url: "https://www.theverge.com/rss/index.xml",
      sourceType: "Trusted Tech"
    },
    {
      name: "MarTech",
      url: "https://martech.org/feed/",
      sourceType: "Trusted Marketing"
    },
  ],

  googleBackupFeeds: [
    {
      name: "Google Backup - Gujarat startup AI events",
      url:
        "https://news.google.com/rss/search?q=Gujarat%20Ahmedabad%20Gandhinagar%20GIFT%20City%20startup%20AI%20summit%20founder%20investor&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - India founder programs",
      url:
        "https://news.google.com/rss/search?q=India%20startup%20founder%20accelerator%20AI%20summit%20government%20program%20investor&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Government startup delegations",
      url:
        "https://news.google.com/rss/search?q=%22startup%20delegation%22%20%22India%22%20OR%20%22government%20program%22%20AI&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Performance marketing",
      url:
        "https://news.google.com/rss/search?q=%22performance%20marketing%22%20AI%20OR%20%22ad%20tech%22%20attribution%20privacy&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    }
  ],

  newsApiQueries: [
    "Gujarat Ahmedabad GIFT City startup AI founder investor event",
    "India startup founder accelerator AI summit government program",
    "sponsored startup founder program accelerator AI summit",
    "performance marketing AI ad tech",
    "startup delegation India Japan UAE Singapore"
  ],

  gdeltQueries: [
    "Gujarat startup AI founder investor event",
    "India startup founder accelerator AI summit",
    "sponsored startup founder program accelerator",
    "startup delegation India Japan UAE Singapore",
    "performance marketing AI ad tech"
  ]
};
