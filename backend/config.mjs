export const config = {
  outputPath: "data/daily-feed.json",
  maxItemsPerFeed: 20,
  maxDailyItems: 18,
  maxArticleAgeDays: 10,
  requestTimeoutMs: 18000,
  maxCandidatePagesToVerify: 1500,
  companyContext:
    "HandiAds is a performance marketing company in Gujarat, India. The founder wants founder-focused startup events, AI summits, accelerator programs, business conferences, government-backed innovation opportunities, investor networking, and sponsored business opportunities. Avoid academic scholarships, university admissions, masters programs, student exchanges, and research fellowships.",

  officialPages: [
    {
      name: "Meta Business News",
      url: "https://www.facebook.com/business/news",
      sourceType: "Official"
    },
    {
      name: "Meta Company News",
      url: "https://about.fb.com/news/",
      sourceType: "Official"
    },
    {
      name: "Meta Connect",
      url: "https://www.meta.com/en-gb/connect/",
      sourceType: "Official"
    },
    {
      name: "Google for Startups Programs",
      url: "https://startup.google.com/programs/",
      sourceType: "Official"
    },
    {
      name: "Google India Company News",
      url: "https://blog.google/intl/en-in/company-news/",
      sourceType: "Official"
    },
    {
      name: "Google Play Accelerator India",
      url: "https://blog.google/intl/en-in/company-news/empowering-indian-app-innovators-applications-open-for-google-play-accelerator-india/",
      sourceType: "Official"
    },
    {
      name: "Google for Startups Immersion",
      url: "https://blog.google/intl/en-in/company-news/helping-founders-build-stronger-ai-products-introducing-google-for-startups-immersion/",
      sourceType: "Official"
    },
    {
      name: "Google Cloud Events",
      url: "https://cloud.google.com/events",
      sourceType: "Official"
    },
    {
      name: "Microsoft for Startups",
      url: "https://www.microsoft.com/en-us/startups",
      sourceType: "Official"
    },
    {
      name: "AWS Startup Events",
      url: "https://aws.amazon.com/startups/events/",
      sourceType: "Official"
    },
    {
      name: "AWS Startups",
      url: "https://aws.amazon.com/startups/",
      sourceType: "Official"
    },
    {
      name: "NVIDIA Inception",
      url: "https://www.nvidia.com/en-us/startups/",
      sourceType: "Official"
    },
    {
      name: "NVIDIA Events",
      url: "https://www.nvidia.com/en-us/events/",
      sourceType: "Official"
    },
    {
      name: "Adobe Business Events",
      url: "https://business.adobe.com/resources/events.html",
      sourceType: "Official"
    },
    {
      name: "Salesforce Events",
      url: "https://www.salesforce.com/events/",
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
    },
    {
      name: "Apple Newsroom",
      url: "https://www.apple.com/newsroom/",
      sourceType: "Official"
    },
    {
      name: "JETRO Startups",
      url: "https://www.jetro.go.jp/en/invest/",
      sourceType: "Official"
    },
    {
      name: "Global AI Summit",
      url: "https://globalaisummit.org/en/",
      sourceType: "Official"
    },
    {
      name: "Japan Youth Summit",
      url: "https://japanyouthsummit.com/",
      sourceType: "Official"
    },
    {
      name: "Google Developers Events Directory",
      url: "https://developers.google.com/events",
      sourceType: "Official"
    },
    {
      name: "Adobe Summit",
      url: "https://summit.adobe.com/",
      sourceType: "Official"
    },
    {
      name: "NVIDIA GTC Hub",
      url: "https://www.nvidia.com/en-us/gtc/",
      sourceType: "Official"
    },
    {
      name: "Meta Connect",
      url: "https://about.meta.com/connect/",
      sourceType: "Official"
    },
    {
      name: "Microsoft Events",
      url: "https://events.microsoft.com/",
      sourceType: "Official"
    },
    {
      name: "Microsoft Virtual Training Days",
      url: "https://events.microsoft.com/en-us/mvtd",
      sourceType: "Official"
    },
    {
      name: "Apple Developer Events",
      url: "https://developer.apple.com/events/",
      sourceType: "Official"
    },
    {
      name: "AWS Events and Conferences",
      url: "https://aws.amazon.com/events/",
      sourceType: "Official"
    },
    {
      name: "Salesforce Dreamforce",
      url: "https://www.salesforce.com/dreamforce/",
      sourceType: "Official"
    },
    {
      name: "Alphabet Investor Events",
      url: "https://abc.xyz/investor/",
      sourceType: "Official"
    },
    {
      name: "NVIDIA Investor Events",
      url: "https://investor.nvidia.com/events-and-presentations/default.aspx",
      sourceType: "Official"
    },
    {
      name: "Microsoft Build",
      url: "https://build.microsoft.com/",
      sourceType: "Official"
    },
    {
      name: "Microsoft Investor Events",
      url: "https://www.microsoft.com/en-us/investor/events",
      sourceType: "Official"
    },
    {
      name: "Meta for Developers Events",
      url: "https://developers.facebook.com/blog/",
      sourceType: "Official"
    },
    {
      name: "Meta Investor Events",
      url: "https://investor.fb.com/investor-events/",
      sourceType: "Official"
    },
    {
      name: "LinkedIn Marketing Events",
      url: "https://business.linkedin.com/marketing-solutions/events",
      sourceType: "Official"
    },
    {
      name: "LinkedIn Pressroom",
      url: "https://news.linkedin.com/",
      sourceType: "Official"
    },
    {
      name: "US AI.gov",
      url: "https://ai.gov/",
      sourceType: "Official"
    },
    {
      name: "NIST Events Calendar",
      url: "https://www.nist.gov/news-events/events",
      sourceType: "Official"
    },
    {
      name: "NIST AI Risk Management Framework",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      sourceType: "Official"
    },
    {
      name: "US AI Congress",
      url: "https://www.aiforusa.com/",
      sourceType: "Official"
    },
    {
      name: "UK AI Safety Institute",
      url: "https://www.aisi.gov.uk/",
      sourceType: "Official"
    },
    {
      name: "European AI Alliance",
      url: "https://digital-strategy.ec.europa.eu/en/policies/european-ai-alliance",
      sourceType: "Official"
    },
    {
      name: "India AI Events",
      url: "https://indiaai.gov.in/events",
      sourceType: "Official"
    },
    {
      name: "ITU AI for Good Global Summit",
      url: "https://aiforgood.itu.int/",
      sourceType: "Official"
    },
    {
      name: "UNIDIR Global Conference on AI",
      url: "https://unidir.org/events/",
      sourceType: "Official"
    },
    {
      name: "Techmeme Events",
      url: "https://www.techmeme.com/events",
      sourceType: "Official"
    }
  ],

  trustedRssFeeds: [
    {
      name: "Meta Newsroom Feed",
      url: "https://about.fb.com/news/feed/",
      sourceType: "Official"
    },
    {
      name: "AWS Startups Blog",
      url: "https://aws.amazon.com/blogs/startups/feed/",
      sourceType: "Official"
    },
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
    },
    {
      name: "Google Backup - Global Funded Founder Travel",
      url:
        "https://news.google.com/rss/search?q=%22fully%20funded%22%20%28summit%20OR%20delegation%20OR%20startup%29%20applications%20open&hl=en-US&gl=US&ceid=US:en",
      sourceType: "Aggregator Backup"
    },
    {
      name: "Google Backup - Top MNC Startup Events",
      url:
        "https://news.google.com/rss/search?q=%28Meta%20OR%20Google%20OR%20Amazon%20OR%20Salesforce%20OR%20Accenture%20OR%20Adobe%20OR%20Apple%20OR%20NVIDIA%29%20sponsored%20%28summit%20OR%20accelerator%20OR%20event%29%20founder&hl=en-US&gl=US&ceid=US:en",
      sourceType: "Aggregator Backup"
    }
  ],

  newsApiQueries: [
    '"fully funded" (summit OR delegation OR startup) applications open',
    '"all expenses paid" (founder OR business) travel',
    '"fully sponsored" international summit apply',
    '(Meta OR Google OR Amazon OR Salesforce OR Accenture OR Adobe OR Apple OR NVIDIA) sponsored (summit OR event OR accelerator) founder',
    '(marketing OR adtech) founder networking event sponsored',
    'Japan Youth Summit apply'
  ],

  gdeltQueries: [
    '"fully funded" summit OR delegation OR startup applications open',
    '"all expenses paid" founder OR business travel',
    '"fully sponsored" international summit apply',
    'Meta OR Google OR Amazon OR Salesforce OR Accenture OR Adobe OR Apple OR NVIDIA sponsored summit OR event OR accelerator founder',
    'marketing OR adtech founder networking event sponsored',
    'Japan Youth Summit'
  ]
};
