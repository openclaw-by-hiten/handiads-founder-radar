export const config = {
  outputPath: "data/daily-feed.json",
  maxItemsPerFeed: 20,
  maxDailyItems: 18,
  maxArticleAgeDays: 10,
  requestTimeoutMs: 18000,
  maxCandidatePagesToVerify: 45,
  companyContext:
    "HandiAds is a performance marketing company in Gujarat, India. The founder wants founder-focused startup events, AI summits, accelerator programs, business conferences, government-backed innovation opportunities, investor networking, and sponsored business opportunities. Avoid academic scholarships, university admissions, masters programs, student exchanges, and research fellowships.",

  officialPages: [
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
      name: "Google Backup - Gujarat founder opportunities",
      url:
        "https://news.google.com/rss/search?q=%28Gujarat%20OR%20Ahmedabad%20OR%20Gandhinagar%20OR%20Surat%20OR%20Rajkot%20OR%20%22GIFT%20City%22%29%20%28startup%20OR%20founder%20OR%20accelerator%29%20%28apply%20OR%20registration%20OR%20summit%20OR%20conference%20OR%20grant%20OR%20challenge%29%20-scholarship%20-student%20-university&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Gujarat events and investor networking",
      url:
        "https://news.google.com/rss/search?q=%28Ahmedabad%20OR%20Gandhinagar%20OR%20Surat%20OR%20Rajkot%20OR%20%22GIFT%20City%22%29%20%28founder%20meetup%20OR%20startup%20event%20OR%20investor%20networking%20OR%20AI%20summit%20OR%20business%20conference%29%20-scholarship%20-student%20-college&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - India founder programs with applications",
      url:
        "https://news.google.com/rss/search?q=%28India%20OR%20%22Startup%20India%22%29%20%28founder%20OR%20startup%20OR%20SaaS%20OR%20agency%29%20%28%22applications%20open%22%20OR%20%22apply%20now%22%20OR%20registration%20OR%20accelerator%20OR%20incubator%20OR%20grant%20OR%20summit%29%20-scholarship%20-student%20-university%20-master&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - India AI and startup conferences",
      url:
        "https://news.google.com/rss/search?q=%28India%20OR%20Bengaluru%20OR%20Mumbai%20OR%20Delhi%20OR%20Hyderabad%29%20%28AI%20summit%20OR%20startup%20conference%20OR%20SaaS%20conference%20OR%20founder%20event%29%20%28register%20OR%20delegate%20OR%20speaker%20OR%20investor%29%20-scholarship%20-student&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Government startup delegations",
      url:
        "https://news.google.com/rss/search?q=%28%22startup%20delegation%22%20OR%20%22founder%20delegation%22%20OR%20%22innovation%20mission%22%29%20%28India%20OR%20UAE%20OR%20Singapore%20OR%20Japan%20OR%20Thailand%29%20-sponsored%20-scholarship%20-student&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Startup grants and accelerators near India",
      url:
        "https://news.google.com/rss/search?q=%28UAE%20OR%20Dubai%20OR%20Singapore%20OR%20Thailand%20OR%20Malaysia%20OR%20Vietnam%20OR%20Indonesia%29%20%28startup%20OR%20founder%29%20%28grant%20OR%20accelerator%20OR%20incubator%20OR%20summit%20OR%20conference%20OR%20delegate%29%20-scholarship%20-student%20-university&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - MNC startup credits and founder programs",
      url:
        "https://news.google.com/rss/search?q=%28Google%20OR%20Microsoft%20OR%20AWS%20OR%20NVIDIA%20OR%20Meta%29%20%28startup%20OR%20founder%20OR%20AI%20startup%29%20%28credits%20OR%20accelerator%20OR%20program%20OR%20grant%20OR%20applications%20open%29%20-scholarship%20-student%20-university&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Google AI startup events India",
      url:
        "https://news.google.com/rss/search?q=%28Google%20OR%20%22Google%20for%20Startups%22%29%20%28%22AI%20Days%22%20OR%20%22AI%20Day%22%20OR%20startup%20event%20OR%20founder%20event%29%20%28Ahmedabad%20OR%20Gujarat%20OR%20India%29%20%28register%20OR%20registration%20OR%20invite%20OR%20RSVP%29&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Ad tech and performance marketing intelligence",
      url:
        "https://news.google.com/rss/search?q=%28%22performance%20marketing%22%20OR%20%22ad%20tech%22%20OR%20%22marketing%20automation%22%20OR%20attribution%29%20%28AI%20OR%20startup%20OR%20founder%20OR%20conference%29&hl=en-IN&gl=IN&ceid=IN:en",
      sourceType: "Aggregator Backup"
    }
  ],

  newsApiQueries: [
    "Gujarat Ahmedabad Gandhinagar GIFT City startup founder accelerator applications open",
    "India startup founder accelerator applications open government innovation grant",
    "sponsored startup founder program accelerator AI summit applications open",
    "startup founder delegation India UAE Singapore Japan applications open",
    "Google AI Days for Startups Ahmedabad registration",
    "performance marketing AI ad tech",
    "business conference founder startup investor India Gujarat"
  ],

  gdeltQueries: [
    "Gujarat startup founder accelerator applications open",
    "India startup founder accelerator government innovation grant",
    "sponsored startup founder program applications open",
    "startup delegation founder India UAE Singapore Japan",
    "Google AI Days Startups Ahmedabad registration",
    "performance marketing AI ad tech"
  ]
};
