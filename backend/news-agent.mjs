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
  "delegate support"
];

const aiTerms = ["ai", "artificial intelligence", "machine learning", "genai", "automation"];
const marketTerms = ["startup", "founder", "summit", "accelerator", "delegation", "government", "incubator", "conference", "investor"];
const adTerms = ["ad tech", "performance marketing", "attribution", "media buying", "privacy"];
const gujaratTerms = ["gujarat", "ahmedabad", "gandhinagar", "surat", "rajkot", "gift city", "gift-city"];
const nearIndiaTerms = ["india", "uae", "dubai", "abu dhabi", "singapore", "nepal", "sri lanka", "qatar"];
const mediumDistanceTerms = ["japan", "thailand", "malaysia", "vietnam", "indonesia", "south korea"];
const influencerTerms = ["minister", "government", "investor", "top founder", "influencer", "ceo", "global leader"];
const founderTerms = ["founder", "startup", "accelerator", "incubator", "investor", "vc", "venture capital", "saas", "agency", "business", "enterprise"];
const academicBlockTerms = [
  "scholarship",
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
  "campus"
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
  "incubation"
];
const actionableTerms = [
  "application open",
  "applications open",
  "apply now",
  "register now",
  "registration open",
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
  "expo"
];
const registrationActiveTerms = [
  "application open",
  "applications open",
  "apply now",
  "apply here",
  "accepting applications",
  "invites applications",
  "inviting applications",
  "applications are open",
  "register now",
  "register here",
  "registration open",
  "registrations open",
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
  "nominate",
  "nominations open",
  "submission open",
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

  return dedupe([pageCandidate, ...links]).slice(0, config.maxItemsPerFeed);
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
  const text = `${item.title} ${item.summary} ${item.location}`;
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
    ...item,
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

  if (signal.tags.includes("gujarat")) {
    score += 55;
    reasons.push("Gujarat priority");
  } else if (signal.location === "India" || signal.distanceFromIndia === "near") {
    score += 35;
    reasons.push("India or nearby market priority");
  }
  if (signal.tags.includes("founder")) {
    score += 25;
    reasons.push("Founder and business growth relevance");
  }
  if (signal.tags.includes("funded")) {
    score += 30;
    reasons.push("Sponsored or partly sponsored business opportunity");
  } else if (signal.distanceFromIndia === "medium") {
    score += 15;
    reasons.push("Reachable from India");
  }
  if (signal.airTravel === "self-funded") {
    score += 10;
    reasons.push("Only air travel may be self-funded");
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
    score += 14;
    reasons.push("Official source");
  } else if (signal.sourceType === "Opportunity") {
    score += 10;
    reasons.push("Opportunity platform source");
  } else if (signal.sourceType?.includes("Trusted")) {
    score += 6;
    reasons.push("Trusted publisher source");
  } else if (signal.sourceType === "Global News") {
    score += 4;
    reasons.push("Global news intelligence source");
  } else if (signal.sourceType === "Aggregator Backup") {
    score -= 8;
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
  const title = (item.title || "").toLowerCase().trim();
  const url = (item.sourceUrl || "").toLowerCase();
  const officialEventLanding =
    item.sourceType === "Official" &&
    includesAny(`${title} ${url}`, [
      "event",
      "events",
      "connect",
      "startup",
      "program",
      "accelerator",
      "inception",
      "summit",
      "conference",
      "register",
      "apply"
    ]);
  if (officialEventLanding) return false;
  if (genericTitleTerms.includes(title)) return true;
  if (title.length < 18 && includesAny(title, ["program", "challenge", "startup", "career"])) return true;
  if (genericUrlPatterns.some((pattern) => url.includes(pattern))) return true;

  try {
    const parsed = new URL(item.sourceUrl);
    const pathName = parsed.pathname.replace(/\/+$/, "").toLowerCase();
    return pathName === "" || pathName === "/" || pathName.split("/").filter(Boolean).length < 2;
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
    "business grant",
    "founder program",
    "delegate pass"
  ]);
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
  return includesAny(text, [...eventTerms, "accelerator", "incubator", "program", "challenge", "grant"]);
}

function hasPassiveEventCoverage(text) {
  return includesAny(text, passiveCoverageTerms);
}

function isCandidateRelevant(item) {
  const text = `${item.title} ${item.summary} ${item.source} ${item.sourceUrl}`.toLowerCase();
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
  const text = `${item.title} ${item.summary} ${item.source} ${item.sourceUrl}`.toLowerCase();
  if (includesAny(text, academicBlockTerms)) return false;
  if (isGenericListingPage(item)) return false;
  if (hasOldStaticYear(text)) return false;
  if (!hasFounderOpportunityFocus(text)) return false;
  if (isPastEvent(text)) return false;
  if (hasPassiveEventCoverage(text) && !hasConfirmedRegistration(text)) return false;
  if (!hasConfirmedRegistration(text)) return false;

  const isMarketingIntel =
    item.sourceType?.includes("Trusted") &&
    includesAny(text, [...adTerms, "performance marketing"]) &&
    hasActionableOpportunity(text);
  return isMarketingIntel || (hasActionableOpportunity(text) && needsRegistrationProof(text));
}

function parseArticleDate(value) {
  if (!value || value === "Recent") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isRecentEnough(item) {
  const parsed = parseArticleDate(item.date);
  if (!parsed) return item.sourceType === "Official" || item.sourceType === "Opportunity";
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
    headers: {
      "user-agent": "HandiAds-Founder-Radar/0.1"
    }
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
  if (hasOldStaticYear(lowerPageText)) return null;
  if (!hasFounderOpportunityFocus(lowerPageText)) return null;
  if (!hasActionableOpportunity(lowerPageText)) return null;
  if (isPastEvent(lowerPageText)) return null;
  if (hasPassiveEventCoverage(lowerPageText) && !hasConfirmedRegistration(lowerPageText)) return null;
  if (!hasConfirmedRegistration(lowerPageText)) return null;
  if (!needsRegistrationProof(lowerPageText)) return null;

  return {
    ...item,
    title: genericTitleTerms.includes(item.title.toLowerCase().trim()) && pageTitle ? pageTitle : item.title,
    summary: description || item.summary
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
    headers: {
      "user-agent": "HandiAds-Founder-Radar/0.1"
    }
  });
  if (!response.ok) {
    throw new Error(`${feed.name} failed with ${response.status}`);
  }
  const xml = await response.text();
  return parseRss(xml, feed).slice(0, config.maxItemsPerFeed);
}

async function fetchHtmlPage(page) {
  const response = await fetchWithTimeout(page.url, {
    headers: {
      "user-agent": "HandiAds-Founder-Radar/0.1"
    }
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
      const url = new URL("https://newsapi.org/v2/everything");
      url.searchParams.set("q", query);
      url.searchParams.set("language", "en");
      url.searchParams.set("sortBy", "publishedAt");
      url.searchParams.set("pageSize", "10");
      url.searchParams.set("apiKey", apiKey);
      const response = await fetchWithTimeout(url);
      if (!response.ok) throw new Error(`NewsAPI ${query} failed with ${response.status}`);
      const data = await response.json();
      return (data.articles || []).map((article) => ({
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
        headers: {
          "user-agent": "HandiAds-Founder-Radar/0.1"
        }
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
    .map(classify)
    .filter((item) => item.tags.length > 0)
    .map((item) => ({ ...item, priority: scoreSignal(item) }))
    .sort((a, b) => b.priority.score - a.priority.score)
    .slice(0, config.maxDailyItems);

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
        await writeOutput(previous);
        console.warn("No fresh items fetched. Kept the last successful feed.");
        return;
      }
    } catch {
      console.warn("No fresh items fetched and no previous feed was available.");
    }
  }

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
