import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { config } from "./config.mjs";

const sponsoredTerms = [
  "fully funded",
  "sponsored",
  "travel grant",
  "startup grant",
  "business grant",
  "innovation grant",
  "accommodation",
  "stay covered",
  "food covered",
  "delegate support",
  "equity-free",
  "startup credits",
  "cloud credits",
  "product credits"
];

const aiTerms = ["ai", "artificial intelligence", "machine learning", "genai", "automation"];
const marketTerms = ["startup", "founder", "summit", "accelerator", "delegation", "government", "incubator", "conference", "investor"];
const adTerms = ["ad tech", "performance marketing", "attribution", "media buying", "privacy"];
const gujaratTerms = ["gujarat", "ahmedabad", "gandhinagar", "surat", "rajkot", "gift city", "gift-city"];
const nearIndiaTerms = ["india", "uae", "dubai", "abu dhabi", "singapore", "nepal", "sri lanka", "qatar"];
const mediumDistanceTerms = ["japan", "thailand", "malaysia", "vietnam", "indonesia", "south korea"];
const influencerTerms = ["minister", "government", "investor", "top founder", "influencer", "ceo", "global leader"];
const vipTerms = [
  "sundar pichai", "satya nadella", "sam altman", "mark zuckerberg", 
  "jensen huang", "tim cook", "elon musk", "yann lecun", "marques brownlee", 
  "mkbhd", "mrwhosetheboss", "lex fridman", "andrew ng", "keynote speaker", 
  "special guest", "google ceo", "microsoft ceo", "meta ceo", "openai ceo"
];
const founderTerms = ["founder", "startup", "accelerator", "incubator", "investor", "vc", "venture capital", "saas", "agency", "business", "enterprise"];
const academicBlockTerms = [
  "master",
  "master's",
  "masters",
  "university admission",
  "admission",
  "student",
  "undergraduate",
  "phd",
  "doctoral",
  "research fellowship",
  "academic fellowship",
  "exchange program",
  "study abroad",
  "tuition",
  "campus",
  "internship",
  "internships"
];
const consumerBlockTerms = [
  "trade-in",
  "trade in",
  "cashback",
  "hardware exchange",
  "consumer offer",
  "used device",
  "recycle",
  "trade-in value",
  "consumer discount",
  "device exchange"
];
const genericBlockTerms = [
  "startup directory",
  "resource page",
  "mass listing",
  "startup blog",
  "startup newsletter",
  "find programs in your region",
  "find programs available to you",
  "student scholarship",
  "find programs",
  "join a community",
  "google for startups programs",
  "find out more"
];
const productSalesBlockTerms = [
  "cyberattacks",
  "data security solutions",
  "safeguard your infrastructure",
  "microsoft security solutions",
  "cybersecurity",
  "enterprise security",
  "request a demo",
  "pricing plan",
  "buy now",
  "software solution",
  "teams",
  "choose your path",
  "business guidance",
  "download now",
  "platform for work",
  "events | aws"
];
const opportunityTerms = [
  ...sponsoredTerms,
  "application open",
  "applications open",
  "apply now",
  "register now",
  "registration open",
  "deadline",
  "program",
  "open call",
  "call for startups",
  "founder fellowship",
  "summit",
  "delegation",
  "hackathon",
  "accelerator",
  "startup competition",
  "founder meetup",
  "investor meetup",
  "business conference",
  "innovation program",
  "incubation",
  "safety summit",
  "investor event",
  "policy summit",
  "congress",
  "earnings call",
  "shareholder meeting",
  "developer conference",
  "innovation month",
  "impact summit"
];
const actionableTerms = [
  "apply",
  "apply today",
  "application open",
  "applications open",
  "apply now",
  "submit your application",
  "register now",
  "registration open",
  "sign up",
  "join now",
  "get started",
  "deadline",
  "open call",
  "call for startups",
  "nomination",
  "pitch competition",
  "pitch event",
  "pitch day",
  "demo day",
  "cohort",
  "accelerator",
  "incubator",
  "challenge",
  "grant",
  "startup competition",
  "summit",
  "conference",
  "delegation",
  "meetup",
  "expo",
  "safety summit",
  "investor event",
  "policy summit",
  "congress",
  "earnings call",
  "shareholder meeting",
  "developer conference",
  "innovation month",
  "impact summit"
];
const registrationActiveTerms = [
  "apply",
  "apply today",
  "application open",
  "applications open",
  "apply now",
  "apply here",
  "submit your application",
  "complete the form",
  "accepting applications",
  "invites applications",
  "inviting applications",
  "applications are open",
  "register now",
  "register here",
  "registration open",
  "registrations open",
  "sign up",
  "sign-up",
  "join now",
  "join today",
  "get started",
  "request invite",
  "rsvp",
  "invite",
  "invitation",
  "invited",
  "book now",
  "book your seat",
  "confirm your seat",
  "reserve your seat",
  "tickets",
  "delegate pass",
  "delegate application",
  "nominate",
  "nominations open",
  "submission open",
  "attend in person",
  "save the date",
  "secure your spot",
  "submissions open",
  "deadline",
  "last date",
  "apply by",
  "applications close",
  "registration closes",
  "open call",
  "call for startups",
  "join the cohort"
];
const eventTerms = [
  "event",
  "session",
  "summit",
  "conference",
  "meetup",
  "workshop",
  "bootcamp",
  "expo",
  "forum",
  "webinar",
  "demo day",
  "ai days"
];
const pastVideoTerms = [
  "on demand",
  "on-demand",
  "watch sessions",
  "session replays",
  "highlights",
  "event highlights",
  "keynote replay",
  "past event",
  "catch up on"
];
const passiveCoverageTerms = [
  "held",
  "hosted",
  "was held",
  "took place",
  "concluded",
  "wrapped up",
  "wraps up",
  "kicked off",
  "inaugurated",
  "attended by",
  "speakers included"
];
const genericTitleTerms = [
  "programs and challenges",
  "explore startup programs and challenges",
  "corporate/accelerators",
  "startup directory",
  "startup careers",
  "i am a startup",
  "i am astartup",
  "programmes",
  "programs",
  "challenges",
  "home",
  "about",
  "search",
  "jobs"
];
const genericUrlPatterns = [
  "/content/sih/en/reources/startup_india_notes.html",
  "/content/sih/en/ams-application/application-listing.html",
  "/content/sih/en/search.html",
  "/startup_india_notes",
  "/startups",
  "/jobs",
  "/en/startup/",
  "/programmes/"
];
const officialDiscoveryTerms = [
  ...opportunityTerms,
  ...eventTerms,
  ...registrationActiveTerms,
  ...founderTerms,
  ...adTerms,
  ...aiTerms,
  "marketing",
  "advertising",
  "business",
  "business news",
  "connect",
  "developer",
  "developers",
  "cloud",
  "calendar",
  "events",
  "apply",
  "register"
];
const defaultFetchHeaders = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-IN,en;q=0.9",
  "user-agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 HandiAds-Founder-Radar/0.1"
};
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

function textOf(value = "") {
  return decodeEntities(value)
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value = "") {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function firstMatch(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? textOf(match[1]) : "";
}

function parseRss(xml, feed) {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map(([block]) => ({
    title: firstMatch(block, "title"),
    summary: firstMatch(block, "description"),
    source: feed.name,
    sourceUrl: firstMatch(block, "link"),
    date: firstMatch(block, "pubDate") || "Recent",
    location: inferLocation(`${firstMatch(block, "title")} ${firstMatch(block, "description")}`),
    sourceType: feed.sourceType || "RSS"
  }));
}

function parseHtmlLinks(html, page) {
  const pageTitle = metaContent(html, "og:title") || htmlTitle(html) || page.name;
  const pageSummary =
    metaContent(html, "description") ||
    metaContent(html, "og:description") ||
    opportunitySentence(readablePageText(html)) ||
    `${page.name} official page scan.`;
  const pageCandidate = {
    title: pageTitle,
    summary: pageSummary,
    source: page.name,
    sourceUrl: page.url,
    date: "Recent",
    location: inferLocation(`${pageTitle} ${pageSummary} ${page.name}`),
    sourceType: page.sourceType || "Official"
  };

  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => {
      const url = normalizeUrl(match[1], page.url);
      const title = textOf(match[2]);
      return {
        title,
        summary: `${page.name} official/opportunity page signal.`,
        source: page.name,
        sourceUrl: url,
        date: "Recent",
        location: inferLocation(`${title} ${page.name}`),
        sourceType: page.sourceType || "Official"
      };
    })
    .filter((item) => item.title.length > 12 && item.sourceUrl)
    .filter(isLikelyOfficialOpportunityLink);

  const embeddedLinks = extractEmbeddedOfficialLinks(html, page);

  const limit = page.name === "Techmeme Events" ? 500 : config.maxItemsPerFeed;
  return dedupe([pageCandidate, ...links, ...embeddedLinks]).slice(0, limit);
}

function extractEmbeddedOfficialLinks(html, page) {
  const pageHost = new URL(page.url).hostname.replace(/^www\./, "");
  const rawUrls = [
    ...html.matchAll(/https?:\\?\/\\?\/[^"'<>\\\s]+/gi),
    ...html.matchAll(/"url"\s*:\s*"([^"]+)"/gi),
    ...html.matchAll(/"href"\s*:\s*"([^"]+)"/gi)
  ]
    .map((match) => match[1] || match[0])
    .map((url) => url.replace(/\\\//g, "/").replace(/[),.;]+$/g, ""))
    .filter((url) => /^https?:\/\//i.test(url));

  return [...new Set(rawUrls)]
    .map((url) => normalizeUrl(url, page.url))
    .filter((url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, "");
        return host === pageHost || host.endsWith(`.${pageHost}`);
      } catch {
        return false;
      }
    })
    .map((url) => ({
      title: titleFromUrl(url),
      summary: `${page.name} embedded official link found in page data.`,
      source: page.name,
      sourceUrl: url,
      date: "Recent",
      location: inferLocation(`${url} ${page.name}`),
      sourceType: page.sourceType || "Official"
    }))
    .filter((item) => item.title.length > 8)
    .filter(isLikelyOfficialOpportunityLink);
}

function titleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const lastUseful = [...segments].reverse().find((segment) => !/^(en|en-us|en-in|intl)$/i.test(segment));
    return decodeURIComponent(lastUseful || parsed.hostname)
      .replace(/\.(html|aspx|php)$/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

function normalizeUrl(value, base) {
  try {
    return new URL(value, base).toString();
  } catch {
    return "";
  }
}

function includesAny(text, terms) {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function isLikelyOfficialOpportunityLink(item) {
  const text = `${item.title} ${item.summary} ${item.sourceUrl}`.toLowerCase();
  if (!item.sourceUrl || !/^https?:\/\//i.test(item.sourceUrl)) return false;
  if (item.sourceUrl.includes("#")) return false;
  if (includesAny(text, ["privacy", "cookie", "terms of use", "contact us", "sign in", "login"])) {
    return false;
  }
  return includesAny(text, officialDiscoveryTerms);
}

const monthIndex = new Map(
  [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ].flatMap((month, index) => [
    [month, index],
    [month.slice(0, 3), index]
  ])
);

function endOfLocalDay(year, month, day) {
  const date = new Date(year, month, day);
  date.setHours(23, 59, 59, 999);
  return date;
}

function inferredYear(yearText) {
  return yearText ? Number(yearText) : currentYear;
}

function extractEventEndDate(text) {
  const lower = text.toLowerCase();
  const monthFirst = [
    ...lower.matchAll(
      /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})(?:\s*(?:-|to|–|—)\s*(\d{1,2}))?(?:,?\s*(20\d{2}))?\b/g
    )
  ];
  const dayFirst = [
    ...lower.matchAll(
      /\b(\d{1,2})(?:\s*(?:-|to|–|—)\s*(\d{1,2}))?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?(?:,?\s*(20\d{2}))?\b/g
    )
  ];
  const dates = [
    ...monthFirst.map((match) =>
      endOfLocalDay(
        inferredYear(match[4]),
        monthIndex.get(match[1].slice(0, 3)),
        Number(match[3] || match[2])
      )
    ),
    ...dayFirst.map((match) =>
      endOfLocalDay(
        inferredYear(match[4]),
        monthIndex.get(match[3].slice(0, 3)),
        Number(match[2] || match[1])
      )
    )
  ].filter((date) => !Number.isNaN(date.getTime()));

  if (dates.length === 0) return null;
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

function inferLocation(text) {
  const lower = text.toLowerCase();
  if (includesAny(lower, gujaratTerms)) return "Gujarat";
  if (lower.includes("japan")) return "Japan";
  if (lower.includes("uae") || lower.includes("dubai") || lower.includes("abu dhabi")) return "UAE";
  if (lower.includes("singapore")) return "Singapore";
  if (lower.includes("india")) return "India";
  if (lower.includes("qatar")) return "Qatar";
  if (lower.includes("saudi")) return "Saudi Arabia";
  return "Global";
}

function classify(item) {
  const text = businessText(item);
  const tags = new Set();
  if (includesAny(text, sponsoredTerms)) tags.add("funded");
  if (includesAny(text, aiTerms)) tags.add("ai");
  if (includesAny(text, marketTerms)) tags.add("market");
  if (includesAny(text, adTerms)) tags.add("ads");
  if (includesAny(text, gujaratTerms)) tags.add("gujarat");
  if (includesAny(text, founderTerms)) tags.add("founder");

  const distanceFromIndia = includesAny(text, nearIndiaTerms)
    ? "near"
    : includesAny(text, mediumDistanceTerms)
      ? "medium"
      : "remote";

  const sponsorship = tags.has("funded")
    ? "Possible sponsored or partly sponsored support. Needs official verification."
    : "No sponsorship found in headline or snippet.";

  const airTravel = tags.has("funded") && distanceFromIndia !== "remote" ? "self-funded" : "unknown";
  const influencerValue = includesAny(text, influencerTerms) ? "high" : tags.has("market") ? "medium" : "low";

  return {
    ...Object.fromEntries(Object.entries(item).filter(([key]) => key !== "searchText")),
    searchText: undefined,
    id: slugify(item.title),
    tags: [...tags],
    sponsorship,
    distanceFromIndia,
    airTravel,
    influencerValue,
    authenticity: buildAuthenticity(item.sourceType),
    fit: tags.has("funded") || tags.has("ai") ? "High fit" : "Watch",
    why: buildWhy(tags, item.location),
    cost: buildCost(sponsorship, airTravel),
    nextMoves: buildNextMoves(tags)
  };
}

function buildAuthenticity(sourceType = "RSS") {
  if (sourceType === "Official") return "Official source scan. Verify exact eligibility and dates before applying.";
  if (sourceType === "Opportunity") return "Opportunity platform scan. Verify with the organizer or official page.";
  if (sourceType.includes("Trusted")) return "Trusted publication scan. Use as news intelligence, then verify original source.";
  if (sourceType === "News API") return "News API scan. Verify original publisher and program source.";
  if (sourceType === "Global News") return "Global news scan. Verify the original publisher and official program source.";
  if (sourceType === "Aggregator Backup") return "Aggregator backup scan. Open and verify the original publisher.";
  return "Fetched from web source. Verify before applying.";
}

function buildWhy(tags, location) {
  if (tags.has("funded")) {
    return `This can help HandiAds build international presence in ${location} while keeping founder travel cost controlled.`;
  }
  if (tags.has("ads")) {
    return "This can become a new service, client alert, or content angle for performance marketing clients.";
  }
  return "This may reveal a market, partnership, or founder network that HandiAds can use for growth.";
}

function buildCost(sponsorship, airTravel) {
  if (airTravel === "self-funded") {
    return `${sponsorship} Flight may still need to be paid by the founder.`;
  }
  return sponsorship;
}

function buildNextMoves(tags) {
  const moves = ["Open the source and verify the official application page."];
  if (tags.has("funded")) moves.push("Check eligibility, deadline, covered costs, visa needs, and flight cost.");
  if (tags.has("ai")) moves.push("Prepare an AI and performance marketing partnership angle for HandiAds.");
  if (tags.has("ads")) moves.push("Turn the signal into a client-facing ad growth insight.");
  moves.push("Save the lead if it can create meetings, content, or revenue.");
  return moves;
}

function scoreSignal(signal) {
  let score = 0;
  const reasons = [];

  const txt = businessText(signal).toLowerCase();
  const topTierBoost = includesAny(txt, [
    "google for startups", "microsoft for startups", "nvidia", "aws startups", "apple", "meta", "amazon", "salesforce", "accenture", "adobe",
    "startup mahakumbh", "gitex", "web summit", "g20", "youthjapan", "japan youth summit",
    "fully funded", "all expenses paid", "travel grant", "100% sponsored", "delegate pass included"
  ]);
  
  if (topTierBoost) {
    score += 30;
    reasons.push("Top-Tier Ecosystem / Sponsored Priority");
  }

  const hasVIP = includesAny(txt, vipTerms);
  if (hasVIP) {
    score += 25;
    reasons.push("VIP / Celebrity Star-Power Detected");
  }

  // Duration Boost Calculation
  const rangeMatch = txt.match(/\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})\s*(?:-|to|–|—)\s*(\d{1,2})\b/);
  if (rangeMatch) {
    const startDay = parseInt(rangeMatch[1], 10);
    const endDay = parseInt(rangeMatch[2], 10);
    if (endDay >= startDay && (endDay - startDay) <= 30) {
      const days = (endDay - startDay) + 1;
      const durationScore = Math.min(days * 3, 15);
      if (durationScore > 0) {
        score += durationScore;
        reasons.push(`Event Duration Bonus (${days} days)`);
      }
    }
  }

  if (signal.tags.includes("gujarat")) {
    score += 55;
    reasons.push("Gujarat / Priority 1");
  } else if (signal.location === "India") {
    score += 40;
    reasons.push("India / Priority 2");
  } else if (signal.distanceFromIndia === "near" || signal.distanceFromIndia === "medium") {
    score += 25;
    reasons.push("Cheaper Flights / Priority 3");
  } else {
    if (!signal.tags.includes("funded") && !topTierBoost && !hasVIP) {
      score -= 20;
      reasons.push("Global un-sponsored penalty");
    }
  }

  if (signal.tags.includes("founder")) {
    score += 20;
    reasons.push("Founder and business growth relevance");
  }
  if (signal.tags.includes("funded")) {
    score += 25;
    reasons.push("Sponsored business opportunity");
  }

  if (signal.influencerValue === "high") {
    score += 20;
    reasons.push("Strong influencer and networking value");
  } else if (signal.influencerValue === "medium") {
    score += 12;
    reasons.push("Useful founder network value");
  }
  if (signal.tags.includes("ai")) {
    score += 8;
    reasons.push("AI relevance for HandiAds positioning");
  }
  if (signal.tags.includes("ads")) {
    score += 8;
    reasons.push("Performance marketing relevance");
  }
  if (signal.sourceType === "Official") {
    score += 10;
    reasons.push("Official source");
  } else if (signal.sourceType === "Opportunity") {
    score += 5;
    reasons.push("Opportunity platform source");
  } else if (signal.sourceType === "Aggregator Backup") {
    score -= 10;
    reasons.push("Aggregator backup source");
  }

  return {
    score: Math.min(score, 100),
    reasons,
    label: score >= 80 ? "Priority 1" : score >= 60 ? "Priority 2" : "Watchlist"
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function canonicalTitleKey(value = "") {
  return value
    .toLowerCase()
    .replace(/\s+-\s+[^-]+$/g, "")
    .replace(/\b(20\d{2})\b/g, "")
    .replace(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{1,2}(?:\s*(?:-|to|–|—)\s*\d{1,2})?/g, "")
    .replace(/\b\d{1,2}(?:\s*(?:-|to|–|—)\s*\d{1,2})?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 12)
    .join(" ");
}

function dedupe(items) {
  const seen = new Set();
  return items.filter((item) => {
    const urlKey = (item.sourceUrl || "").toLowerCase().replace(/[?#].*$/, "");
    const titleKey = canonicalTitleKey(item.title);
    if (!item.title || !item.sourceUrl || !titleKey) return false;
    if (seen.has(urlKey) || seen.has(titleKey)) return false;
    seen.add(urlKey);
    seen.add(titleKey);
    return true;
  });
}

function isGenericListingPage(item) {
  if (item.sourceType === "Official") return false; // Never block official sub-pages

  const title = (item.title || "").toLowerCase().trim();
  const url = (item.sourceUrl || "").toLowerCase();

  // Allow flagship event root domains like japanyouthsummit.com or summit.adobe.com
  const isFlagshipRoot = includesAny(title, ["summit", "conference", "connect", "gtc", "dreamforce", "re:invent", "techmeme"]);

  if (!isFlagshipRoot && genericTitleTerms.includes(title)) return true;
  if (!isFlagshipRoot && title.length < 18 && includesAny(title, ["program", "challenge", "startup", "career"])) return true;
  if (!isFlagshipRoot && genericUrlPatterns.some((pattern) => url.includes(pattern))) return true;

  try {
    const parsed = new URL(item.sourceUrl);
    const pathName = parsed.pathname.replace(/\/+$/, "").toLowerCase();
    if (!isFlagshipRoot && (pathName === "" || pathName === "/" || pathName.split("/").filter(Boolean).length < 2)) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

function hasOldStaticYear(text) {
  const years = [...text.matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1]));
  if (years.length === 0) return false;
  const hasCurrentWindow = years.some((year) => year >= currentYear && year <= nextYear);
  const hasOldYear = years.some((year) => year < currentYear - 1);
  return hasOldYear && !hasCurrentWindow;
}

function hasFounderOpportunityFocus(text) {
  return includesAny(text, [
    ...gujaratTerms,
    ...founderTerms,
    "startup event",
    "startup summit",
    "ai summit",
    "business conference",
    "investor networking",
    "innovation mission",
    "trade mission",
    "market access",
    "go-to-market",
    "gtm",
    "startup grant",
    "startup credits",
    "cloud credits",
    "equity-free",
    "business grant",
    "founder program",
    "startup program",
    "startup programme",
    "delegate pass",
    "activate",
    "inception",
    "launchpad"
  ]);
}

function countBySource(items) {
  return items.reduce((counts, item) => {
    counts[item.source] = (counts[item.source] || 0) + 1;
    return counts;
  }, {});
}

function hasActionableOpportunity(text) {
  return includesAny(text, actionableTerms);
}

function hasConfirmedRegistration(text) {
  return includesAny(text, registrationActiveTerms);
}

function isPastEvent(text) {
  const dateSensitiveTerms = [
    ...eventTerms,
    "deadline",
    "last date",
    "apply by",
    "applications close",
    "registration closes",
    "submissions close"
  ];
  if (!includesAny(text, dateSensitiveTerms)) return false;
  const eventEndDate = extractEventEndDate(text);
  if (!eventEndDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventEndDate < today;
}

function needsRegistrationProof(text) {
  return includesAny(text, [
    ...eventTerms,
    "accelerator",
    "incubator",
    "program",
    "programme",
    "challenge",
    "grant",
    "credits",
    "startup credits",
    "cloud credits",
    "activate",
    "inception",
    "launchpad",
    "hackathon"
  ]);
}

function hasPassiveEventCoverage(text) {
  return includesAny(text, passiveCoverageTerms);
}

function businessText(item) {
  return `${item.title} ${item.summary} ${item.source} ${item.sourceUrl} ${item.searchText || ""}`.toLowerCase();
}

function isCandidateRelevant(item) {
  const text = businessText(item);
  if (includesAny(text, academicBlockTerms)) return false;
  if (isGenericListingPage(item)) return false;
  if (hasOldStaticYear(text)) return false;
  if (isPastEvent(text)) return false;

  if (item.sourceType === "Official" || item.sourceType === "Opportunity") {
    return includesAny(text, [
      ...opportunityTerms,
      ...eventTerms,
      ...registrationActiveTerms,
      ...founderTerms,
      ...adTerms,
      ...aiTerms,
      "marketing",
      "advertising",
      "business news",
      "connect"
    ]);
  }

  return isBusinessRelevant(item);
}

function isBusinessRelevant(item) {
  const text = businessText(item);
  if (includesAny(text, academicBlockTerms)) return false;
  if (includesAny(text, consumerBlockTerms)) return false;
  if (includesAny(text, genericBlockTerms)) return false;
  if (includesAny(text, productSalesBlockTerms)) return false;
  if (isGenericListingPage(item)) return false;
  if (hasOldStaticYear(text)) return false;
  if (includesAny(text, pastVideoTerms)) return false;
  if (includesAny(text, ["hiring", "careers", "jobs at"])) return false;

  const isMNC = includesAny(text, ["aws", "amazon", "microsoft", "google", "meta", "salesforce", "adobe", "apple", "nvidia"]);
  if (isMNC && item.sourceType !== "Official") {
    const hasDate = extractEventEndDate(text) !== null;
    const hasLocation = includesAny(text, [...gujaratTerms, ...nearIndiaTerms, ...mediumDistanceTerms, "san francisco", "new york", "london", "online", "virtual", "taipei", "osaka"]);
    if (!hasDate && !hasLocation) {
      return false; // Strict block: if it's an MNC page from news without dates or locations, it's a generic product page
    }
  }

  if (!hasFounderOpportunityFocus(text)) return false;
  if (isPastEvent(text)) return false;
  if (hasPassiveEventCoverage(text) && !hasConfirmedRegistration(text)) return false;
  const isIntel = item.sourceType?.includes("Trusted") || ["Global News", "News API", "Aggregator Backup"].includes(item.sourceType);
  if (isIntel) return true;
  if (!hasConfirmedRegistration(text)) return false;

  const isMarketingIntel =
    item.sourceType?.includes("Trusted") &&
    includesAny(text, [...adTerms, "performance marketing"]) &&
    hasActionableOpportunity(text);
  return hasActionableOpportunity(text) && needsRegistrationProof(text);
}

function parseArticleDate(value) {
  if (!value || value === "Recent") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isRecentEnough(item) {
  const parsed = parseArticleDate(item.date);
  if (!parsed) return item.sourceType === "Official" || item.sourceType === "Opportunity" || item.sourceType === "Aggregator Backup";
  const ageMs = Date.now() - parsed.getTime();
  const maxAgeMs = config.maxArticleAgeDays * 24 * 60 * 60 * 1000;
  return ageMs <= maxAgeMs && ageMs >= -30 * 24 * 60 * 60 * 1000;
}

function metaContent(html, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${escapedName}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+property=["']${escapedName}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escapedName}["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escapedName}["']`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return textOf(match[1]);
  }
  return "";
}

function htmlTitle(html) {
  return textOf(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function readablePageText(html) {
  return textOf(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<\/(p|li|h1|h2|h3|section|article|div)>/gi, ". ")
  );
}

function opportunitySentence(text) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 45 && sentence.length < 280);
  return (
    sentences.find((sentence) =>
      includesAny(sentence, [...actionableTerms, ...founderTerms, ...sponsoredTerms])
    ) || sentences[0] || ""
  );
}

function shouldVerifyCandidatePage(item) {
  return ["Official", "Opportunity", "Aggregator Backup", "Global News", "News API"].includes(item.sourceType);
}

async function verifyCandidatePage(item) {
  if (!shouldVerifyCandidatePage(item)) return item;

  const response = await fetchWithTimeout(item.sourceUrl, {
    headers: defaultFetchHeaders
  });
  if (!response.ok) return null;

  const html = await response.text();
  const pageTitle = metaContent(html, "og:title") || htmlTitle(html);
  const description =
    metaContent(html, "description") ||
    metaContent(html, "og:description") ||
    opportunitySentence(readablePageText(html));
  const pageText = `${item.title} ${pageTitle} ${description} ${readablePageText(html).slice(0, 2400)}`;
  const lowerPageText = pageText.toLowerCase();

  if (includesAny(lowerPageText, academicBlockTerms)) return null;
  if (includesAny(lowerPageText, consumerBlockTerms)) return null;
  if (includesAny(lowerPageText, genericBlockTerms)) return null;
  if (includesAny(lowerPageText, productSalesBlockTerms)) return null;
  if (hasOldStaticYear(lowerPageText)) return null;
  if (includesAny(lowerPageText, pastVideoTerms)) return null;
  if (!hasFounderOpportunityFocus(lowerPageText)) return null;
  const isIntel = item.sourceType?.includes("Trusted") || ["Global News", "News API", "Aggregator Backup"].includes(item.sourceType);
  if (!isIntel && !hasActionableOpportunity(lowerPageText)) return null;
  if (isPastEvent(lowerPageText)) return null;
  if (hasPassiveEventCoverage(lowerPageText) && !hasConfirmedRegistration(lowerPageText)) return null;
  if (!isIntel && !hasConfirmedRegistration(lowerPageText)) return null;
  if (!isIntel && !needsRegistrationProof(lowerPageText)) return null;

  return {
    ...item,
    title: genericTitleTerms.includes(item.title.toLowerCase().trim()) && pageTitle ? pageTitle : item.title,
    summary: description || item.summary,
    searchText: pageText.slice(0, 5000)
  };
}

async function verifyCandidatePages(items) {
  const verified = [];
  for (const item of items.slice(0, config.maxCandidatePagesToVerify || 40)) {
    try {
      const result = await verifyCandidatePage(item);
      if (result) verified.push(result);
    } catch {
      if (!shouldVerifyCandidatePage(item)) verified.push(item);
    }
  }
  return verified;
}

async function fetchFeed(feed) {
  const response = await fetchWithTimeout(feed.url, {
    headers: defaultFetchHeaders
  });
  if (!response.ok) {
    throw new Error(`${feed.name} failed with ${response.status}`);
  }
  const xml = await response.text();
  return parseRss(xml, feed).slice(0, config.maxItemsPerFeed);
}

async function fetchHtmlPage(page) {
  const response = await fetchWithTimeout(page.url, {
    headers: defaultFetchHeaders
  });
  if (!response.ok) {
    throw new Error(`${page.name} failed with ${response.status}`);
  }
  const html = await response.text();
  return parseHtmlLinks(html, page);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.requestTimeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchNewsApi() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const results = await Promise.allSettled(
    config.newsApiQueries.map(async (query) => {
      let allArticles = [];
      for (let page = 1; page <= 3; page++) {
        const url = new URL("https://newsapi.org/v2/everything");
        url.searchParams.set("q", query);
        url.searchParams.set("language", "en");
        url.searchParams.set("sortBy", "publishedAt");
        url.searchParams.set("pageSize", "100");
        url.searchParams.set("page", page.toString());
        url.searchParams.set("apiKey", apiKey);
        
        try {
          const response = await fetchWithTimeout(url);
          if (!response.ok) break;
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            allArticles.push(...data.articles);
          }
          if (!data.articles || data.articles.length < 100) break;
        } catch {
          break;
        }
      }
      
      return allArticles.map((article) => ({
        title: article.title || "",
        summary: article.description || article.content || "",
        source: article.source?.name || "NewsAPI",
        sourceUrl: article.url,
        date: article.publishedAt || "Recent",
        location: inferLocation(`${article.title} ${article.description}`),
        sourceType: "News API"
      }));
    })
  );

  return results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function fetchTheNewsApi() {
  const apiKey = process.env.THENEWSAPI_KEY;
  if (!apiKey) return [];

  const results = await Promise.allSettled(
    config.newsApiQueries.map(async (query) => {
      const url = new URL("https://api.thenewsapi.com/v1/news/all");
      url.searchParams.set("api_token", apiKey);
      url.searchParams.set("search", query);
      url.searchParams.set("language", "en");
      url.searchParams.set("limit", "10");
      const response = await fetchWithTimeout(url);
      if (!response.ok) throw new Error(`TheNewsAPI ${query} failed with ${response.status}`);
      const data = await response.json();
      return (data.data || []).map((article) => ({
        title: article.title || "",
        summary: article.description || article.snippet || "",
        source: article.source || article.domain || "TheNewsAPI",
        sourceUrl: article.url,
        date: article.published_at || "Recent",
        location: inferLocation(`${article.title} ${article.description}`),
        sourceType: "News API"
      }));
    })
  );

  return results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function fetchGdelt() {
  const results = await Promise.allSettled(
    config.gdeltQueries.map(async (query) => {
      const url = new URL("https://api.gdeltproject.org/api/v2/doc/doc");
      url.searchParams.set("query", query);
      url.searchParams.set("mode", "ArtList");
      url.searchParams.set("format", "json");
      url.searchParams.set("maxrecords", "20");
      url.searchParams.set("sort", "HybridRel");
      const response = await fetchWithTimeout(url, {
        headers: defaultFetchHeaders
      });
      if (!response.ok) throw new Error(`GDELT ${query} failed with ${response.status}`);
      const data = await response.json();
      return (data.articles || []).map((article) => ({
        title: article.title || "",
        summary: article.seendate ? `GDELT article seen ${article.seendate}.` : "GDELT global news signal.",
        source: article.domain || "GDELT",
        sourceUrl: article.url,
        date: article.seendate || "Recent",
        location: inferLocation(`${article.title} ${article.domain}`),
        sourceType: "Global News"
      }));
    })
  );

  return results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

async function run() {
  const historyPath = path.join(path.dirname(config.outputPath), "news-history.json");
  let history = {};
  try {
    history = JSON.parse(await readFile(historyPath, "utf8"));
  } catch {
    history = {};
  }
  const now = new Date();

  const sourceJobs = [
    ...config.officialPages.map((source) => ({ source, type: "html", job: fetchHtmlPage(source) })),
    ...config.trustedRssFeeds.map((source) => ({ source, type: "rss", job: fetchFeed(source) })),
    { source: { name: "GDELT Global News" }, type: "api", job: fetchGdelt() },
    { source: { name: "TheNewsAPI optional" }, type: "api", job: fetchTheNewsApi() },
    ...config.googleBackupFeeds.map((source) => ({ source, type: "rss", job: fetchFeed(source) })),
    { source: { name: "NewsAPI optional" }, type: "api", job: fetchNewsApi() }
  ];

  const results = await Promise.allSettled(sourceJobs.map((entry) => entry.job));
  const failedFeeds = results
    .map((result, index) => ({ result, feed: sourceJobs[index].source }))
    .filter(({ result }) => result.status === "rejected")
    .map(({ result, feed }) => ({
      name: feed.name,
      error: result.reason?.message || "Unknown error"
    }));

  for (const failure of failedFeeds) {
    console.warn(`Feed failed: ${failure.name} - ${failure.error}`);
  }

  const fetched = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const uniqueFetched = dedupe(fetched);
  const recentCandidates = uniqueFetched.filter(isRecentEnough);
  const candidates = recentCandidates.filter(isCandidateRelevant);
  const verifiedCandidates = await verifyCandidatePages(candidates);
  const items = verifiedCandidates
    .filter(isBusinessRelevant)
    .filter((item) => {
      const urlKey = (item.sourceUrl || "").toLowerCase().replace(/[?#].*$/, "");
      const titleKey = canonicalTitleKey(item.title);
      const firstSeen = history[urlKey] || history[titleKey];
      if (firstSeen) {
        const daysOld = (now - new Date(firstSeen)) / (1000 * 60 * 60 * 24);
        if (daysOld > 3) return false;
      }
      return true;
    })
    .map(classify)
    .filter((item) => item.tags.length > 0)
    .map((item) => ({ ...item, priority: scoreSignal(item) }))
    .sort((a, b) => b.priority.score - a.priority.score)
    .slice(0, config.maxDailyItems);
  const fetchedBySource = countBySource(fetched);
  const candidatesBySource = countBySource(candidates);
  const verifiedBySource = countBySource(verifiedCandidates);
  const finalBySource = countBySource(items);
  const failedBySource = Object.fromEntries(failedFeeds.map((failure) => [failure.name, failure.error]));
  const sourceStats = sourceJobs.map(({ source, type }) => ({
    name: source.name,
    type,
    fetched: fetchedBySource[source.name] || 0,
    candidates: candidatesBySource[source.name] || 0,
    verified: verifiedBySource[source.name] || 0,
    final: finalBySource[source.name] || 0,
    error: failedBySource[source.name] || ""
  }));

  const output = {
    generatedAt: new Date().toISOString(),
    timezone: "Asia/Kolkata",
    status: "multi-source-fetched-needs-human-verification",
    searchedFeeds: sourceJobs.length,
    sourcePlan: {
      officialPages: config.officialPages.length,
      trustedRssFeeds: config.trustedRssFeeds.length,
      gdeltQueries: config.gdeltQueries.length,
      googleBackupFeeds: config.googleBackupFeeds.length,
      fetchedSignals: fetched.length,
      uniqueSignals: uniqueFetched.length,
      recentSignals: recentCandidates.length,
      candidatePagesQueued: candidates.length,
      candidatePagesVerified: verifiedCandidates.length,
      finalItems: items.length,
      newsApiEnabled: Boolean(process.env.NEWS_API_KEY),
      theNewsApiEnabled: Boolean(process.env.THENEWSAPI_KEY)
    },
    sourceStats,
    failedFeeds,
    items
  };

  if (items.length === 0 && fetched.length === 0 && failedFeeds.length > 0) {
    try {
      const previous = JSON.parse(await readFile(config.outputPath, "utf8"));
      if (Array.isArray(previous.items) && previous.items.length > 0) {
        previous.status = "using-last-successful-feed";
        previous.lastFailedRefreshAt = output.generatedAt;
        previous.failedFeeds = failedFeeds;
        await writeFile(config.outputPath, JSON.stringify(previous, null, 2));
        console.warn("No fresh items fetched. Kept the last successful feed.");
        return;
      }
    } catch {
      console.warn("No fresh items fetched and no previous feed was available.");
    }
  }

  items.forEach((item) => {
    const urlKey = (item.sourceUrl || "").toLowerCase().replace(/[?#].*$/, "");
    const titleKey = canonicalTitleKey(item.title);
    if (!history[urlKey]) history[urlKey] = now.toISOString();
    if (!history[titleKey]) history[titleKey] = now.toISOString();
  });
  
  for (const [key, dateStr] of Object.entries(history)) {
    if ((now - new Date(dateStr)) / (1000 * 60 * 60 * 24) > 14) {
      delete history[key];
    }
  }
  await writeFile(historyPath, JSON.stringify(history, null, 2));

  await writeOutput(output);
  console.log(`Saved ${items.length} items to ${config.outputPath}`);
}

async function writeOutput(output) {
  await mkdir(path.dirname(config.outputPath), { recursive: true });
  await writeFile(config.outputPath, JSON.stringify(output, null, 2), "utf8");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
