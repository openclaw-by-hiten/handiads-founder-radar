let feedMode = "demo";
let signals = [
  {
    id: "japan-ai-summit",
    title: "Japan youth AI summit with sponsor support",
    source: "Founder opportunity watch",
    sourceUrl: "https://www.japan.go.jp/",
    authenticity: "Demo sample, not verified live news",
    date: "May 11-14",
    location: "Japan",
    fit: "High fit",
    tags: ["funded", "ai", "market"],
    sponsorship: "Stay, food, local travel",
    distanceFromIndia: "medium",
    airTravel: "self-funded",
    influencerValue: "high",
    summary:
      "A youth and AI-focused international program can help HandiAds meet founders, government teams, and AI builders while travel costs stay controlled.",
    why:
      "HandiAds can position itself as an Indian performance marketing partner for AI startups entering South Asia.",
    cost:
      "Food, stay, and local taxi support are covered in this example. Founder may need to cover flight tickets and visa costs.",
    nextMoves: [
      "Prepare a one-page HandiAds international partnership deck.",
      "Book meetings with AI startup exhibitors before arrival.",
      "Create daily founder content from the visit."
    ]
  },
  {
    id: "ai-ad-automation",
    title: "Brands are shifting budgets toward AI-generated ad testing",
    source: "Marketing technology signal",
    sourceUrl: "https://www.thinkwithgoogle.com/",
    authenticity: "Demo sample, not verified live news",
    date: "This week",
    location: "Global",
    fit: "High fit",
    tags: ["ai", "ads"],
    sponsorship: "No trip",
    distanceFromIndia: "remote",
    airTravel: "not needed",
    influencerValue: "medium",
    summary:
      "New creative automation tools are making fast campaign testing cheaper, which creates a service opportunity for performance agencies.",
    why:
      "HandiAds can launch an AI creative testing package for D2C and app clients.",
    cost: "Low setup cost if the team starts with existing creative and reporting tools.",
    nextMoves: [
      "Package 30 creatives in 30 days as a clear offer.",
      "Add before-and-after ad testing case studies to the website.",
      "Build a dashboard view for creative win rates."
    ]
  },
  {
    id: "mena-startups",
    title: "MENA startup programs are looking for India growth partners",
    source: "Market expansion watch",
    sourceUrl: "https://hub71.com/",
    authenticity: "Demo sample, not verified live news",
    date: "Open calls rotate monthly",
    location: "UAE, Saudi Arabia, Qatar",
    fit: "Medium fit",
    tags: ["market", "funded"],
    sponsorship: "Partial delegate support",
    distanceFromIndia: "near",
    airTravel: "self-funded",
    influencerValue: "medium",
    summary:
      "Accelerators and government-backed startup programs in the Middle East often need go-to-market support for companies expanding across regions.",
    why:
      "HandiAds can become the India acquisition partner for funded startups testing new markets.",
    cost: "Founder trips may be partially sponsored through startup events, trade missions, or accelerator invites.",
    nextMoves: [
      "Create a UAE landing page for performance marketing for startups.",
      "Track accelerator demo days and apply as a partner.",
      "Offer pilot campaigns with clear CAC targets."
    ]
  },
  {
    id: "privacy-attribution",
    title: "Privacy changes are increasing demand for better attribution",
    source: "Ad operations signal",
    sourceUrl: "https://business.google.com/",
    authenticity: "Demo sample, not verified live news",
    date: "Ongoing",
    location: "Global",
    fit: "High fit",
    tags: ["ads"],
    sponsorship: "No trip",
    distanceFromIndia: "remote",
    airTravel: "not needed",
    influencerValue: "low",
    summary:
      "As tracking becomes harder, founders need clearer reporting, first-party data setup, and stronger campaign measurement.",
    why:
      "HandiAds can sell attribution cleanup as a premium service before scaling ad spend.",
    cost: "Mostly team time and analytics expertise.",
    nextMoves: [
      "Build an attribution audit checklist.",
      "Create a fixed-price tracking cleanup offer.",
      "Use reports as content for LinkedIn and Instagram."
    ]
  }
];

const growthIdeas = [
  {
    label: "International",
    title: "Build a founder travel pipeline",
    points: [
      "Track sponsored AI, startup, and youth leadership programs every morning.",
      "Prioritize events that cover stay, food, local transport, or delegate passes.",
      "Use each trip to meet 10 potential partners and publish proof of presence."
    ]
  },
  {
    label: "Revenue",
    title: "Launch AI creative testing as a product",
    points: [
      "Sell a monthly package for ad angles, creatives, testing, and learning reports.",
      "Price by speed and business outcome, not only by media buying effort.",
      "Turn top-performing ad learnings into public content."
    ]
  },
  {
    label: "Partnership",
    title: "Become India growth partner for global startups",
    points: [
      "Target AI, SaaS, app, and D2C companies entering India.",
      "Create region-specific proof pages on handiads.com.",
      "Offer a 45-day market entry pilot with clear spend and CAC targets."
    ]
  },
  {
    label: "Technology",
    title: "Add an intelligence layer to HandiAds",
    points: [
      "Monitor trends, competitor ads, funding news, and new platform features.",
      "Create client alerts when a trend affects their category.",
      "Use the app internally before making it a client-facing dashboard."
    ]
  },
  {
    label: "Brand",
    title: "Turn founder movement into trust",
    points: [
      "Post from events, airports, meetings, and learnings.",
      "Show HandiAds as a company that goes where the market is moving.",
      "Use simple stories: what changed, why it matters, what brands should do."
    ]
  },
  {
    label: "Operations",
    title: "Make daily opportunity review a habit",
    points: [
      "Review 10 signals each morning.",
      "Save 2 outreach targets and 1 content idea daily.",
      "Convert the best weekly signal into a business experiment."
    ]
  }
];

const sectionTitles = {
  radar: "Opportunity Radar",
  growth: "Growth Suggestions",
  content: "Instagram Content",
  saved: "Saved Leads"
};

const savedStorageKey = "handiads-saved-leads";
const refreshWorkflowUrl =
  "https://github.com/openclaw-by-hiten/handiads-founder-radar/actions/workflows/refresh-news.yml";
let latestFeedAgeHours = Infinity;
const newsStack = document.querySelector("#newsStack");
const growthGrid = document.querySelector("#growthGrid");
const sectionTitle = document.querySelector("#sectionTitle");
const postOutput = document.querySelector("#postOutput");
const feedStatus = document.querySelector("#feedStatus");
const contentSignal = document.querySelector("#contentSignal");
const savedList = document.querySelector("#savedList");
const savedSearch = document.querySelector("#savedSearch");

function scoreSignal(signal) {
  if (signal.priority) return signal.priority;

  let score = 0;
  const reasons = [];

  if (signal.tags.includes("funded")) {
    score += 45;
    reasons.push("Sponsored or partly sponsored program");
  }

  if (signal.distanceFromIndia === "near") {
    score += 25;
    reasons.push("Close to India");
  } else if (signal.distanceFromIndia === "medium") {
    score += 15;
    reasons.push("Reachable from India");
  }

  if (signal.airTravel === "self-funded") {
    score += 10;
    reasons.push("Only air travel may be self-funded");
  } else if (signal.airTravel === "not needed") {
    score += 6;
    reasons.push("No air travel needed");
  }

  if (signal.influencerValue === "high") {
    score += 20;
    reasons.push("Strong influencer and networking value");
  } else if (signal.influencerValue === "medium") {
    score += 12;
    reasons.push("Useful founder network value");
  }

  return {
    score,
    reasons,
    label: score >= 80 ? "Priority 1" : score >= 60 ? "Priority 2" : "Watchlist"
  };
}

function renderSignals() {
  const activeFilters = [...document.querySelectorAll("[data-filter]:checked")].map(
    (input) => input.dataset.filter
  );
  const filtered = signals
    .filter((signal) => signal.tags.some((tag) => activeFilters.includes(tag)))
    .map((signal) => ({ ...signal, priority: scoreSignal(signal) }))
    .sort((a, b) => b.priority.score - a.priority.score);

  newsStack.innerHTML = filtered
    .map(
      (signal, index) => `
      <article class="news-card ${index === 0 ? "active expanded" : ""}" data-id="${signal.id}">
        <button class="news-main" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <div class="score-top">
            <div>
              <span class="score-label">HandiAds relevance</span>
              <strong>${signal.priority.score}/100</strong>
            </div>
            <span>${signal.priority.label}</span>
          </div>
          <div class="auth-banner ${feedMode === "live" ? "live" : ""}">
            ${feedMode === "live" ? "Backend feed - verify source before action" : "Demo content - not verified live news"}
          </div>
          <div class="tag-row">
            <span class="tag source-type">${signal.sourceType || "Source"}</span>
            ${signal.tags.map((tag) => `<span class="tag">${tag.toUpperCase()}</span>`).join("")}
          </div>
          <h3>${signal.title}</h3>
          <p>${signal.summary}</p>
          <div class="card-meta">
            <span>${signal.source}</span>
            <span>${signal.date}</span>
            <span>${signal.location}</span>
          </div>
        </button>
        <div class="news-details">
          ${renderInlineDetail(signal)}
        </div>
      </article>
    `
    )
    .join("");

  if (!filtered[0]) {
    newsStack.innerHTML = `
      <article class="news-card empty-card">
        <div class="news-main">
          <h3>No signals match</h3>
          <p class="muted">Turn on more focus areas to widen the agent search.</p>
        </div>
      </article>
    `;
  }
}

function getRankedSignals() {
  const activeFilters = [...document.querySelectorAll("[data-filter]:checked")].map(
    (input) => input.dataset.filter
  );
  return signals
    .filter((signal) => signal.tags.some((tag) => activeFilters.includes(tag)))
    .map((signal) => ({ ...signal, priority: scoreSignal(signal) }))
    .sort((a, b) => b.priority.score - a.priority.score);
}

function renderInlineDetail(signal) {
  const priority = signal.priority || scoreSignal(signal);
  const saved = isLeadSaved(signal.id);
  return `
    <p class="panel-title">Why this score</p>
    <ul class="score-list">${priority.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>
    <p class="muted"><strong>Why it matters:</strong> ${signal.why}</p>
    <p class="muted"><strong>Cost note:</strong> ${signal.cost}</p>
    <p class="muted"><strong>Trip support:</strong> ${signal.sponsorship}</p>
    <p class="muted"><strong>Source type:</strong> ${signal.sourceType || "Unknown source type"}</p>
    <p class="muted"><strong>Authenticity:</strong> ${signal.authenticity}. The source button is for reference only until the live agent verifies exact program pages.</p>
    <p class="panel-title">Next moves</p>
    <ul>${signal.nextMoves.map((move) => `<li>${move}</li>`).join("")}</ul>
    <div class="source-row">
      <a class="source-button" href="${signal.sourceUrl}" target="_blank" rel="noopener noreferrer">
        Open Source
      </a>
      <button class="save-lead-button ${saved ? "saved" : ""}" type="button" data-save-id="${signal.id}">
        ${saved ? "Saved" : "Save Lead"}
      </button>
      <span>Verify before applying or booking travel.</span>
    </div>
  `;
}

function getSavedLeads() {
  try {
    return JSON.parse(window.localStorage.getItem(savedStorageKey)) || [];
  } catch {
    return [];
  }
}

function setSavedLeads(leads) {
  window.localStorage.setItem(savedStorageKey, JSON.stringify(leads));
}

function isLeadSaved(id) {
  return getSavedLeads().some((lead) => lead.id === id);
}

function findSignalById(id) {
  return signals.find((signal) => signal.id === id);
}

function saveLead(id) {
  const signal = findSignalById(id);
  if (!signal) return;
  const leads = getSavedLeads();
  if (leads.some((lead) => lead.id === id)) return;
  const priority = signal.priority || scoreSignal(signal);
  leads.unshift({
    id: signal.id,
    title: signal.title,
    summary: signal.summary,
    source: signal.source,
    sourceUrl: signal.sourceUrl,
    sourceType: signal.sourceType || "Source",
    location: signal.location,
    date: signal.date,
    score: priority.score,
    label: priority.label,
    savedAt: new Date().toISOString(),
    nextMoves: signal.nextMoves || []
  });
  setSavedLeads(leads);
  renderSavedLeads();
}

function deleteLead(id) {
  setSavedLeads(getSavedLeads().filter((lead) => lead.id !== id));
  renderSavedLeads();
  renderSignals();
}

function renderSavedLeads() {
  if (!savedList) return;
  const query = (savedSearch?.value || "").trim().toLowerCase();
  const leads = getSavedLeads().filter((lead) =>
    [lead.title, lead.summary, lead.source, lead.location, lead.label]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  if (leads.length === 0) {
    savedList.innerHTML = `
      <article class="saved-empty">
        <p class="panel-title">No saved leads</p>
        <h3>${query ? "No saved leads match your search." : "Save leads from the Radar feed."}</h3>
      </article>
    `;
    return;
  }

  savedList.innerHTML = leads
    .map(
      (lead) => `
      <article class="saved-card">
        <div class="saved-card-top">
          <span>${lead.score}/100 · ${lead.label}</span>
          <button class="delete-button" type="button" data-delete-id="${lead.id}">Delete</button>
        </div>
        <h3>${lead.title}</h3>
        <p>${lead.summary}</p>
        <div class="card-meta">
          <span>${lead.source}</span>
          <span>${lead.sourceType || "Source"}</span>
          <span>${lead.location}</span>
          <span>Saved ${new Date(lead.savedAt).toLocaleDateString("en-IN")}</span>
        </div>
        <div class="source-row">
          <a class="source-button" href="${lead.sourceUrl}" target="_blank" rel="noopener noreferrer">
            Open Source
          </a>
        </div>
      </article>
    `
    )
    .join("");
}

function renderGrowth() {
  growthGrid.innerHTML = growthIdeas
    .map(
      (idea) => `
      <article class="growth-card">
        <span class="pill">${idea.label}</span>
        <h3>${idea.title}</h3>
        <ul>${idea.points.map((point) => `<li>${point}</li>`).join("")}</ul>
      </article>
    `
    )
    .join("");
}

function renderContentTopicOptions() {
  if (!contentSignal) return;
  const currentValue = contentSignal.value;
  const options = getRankedSignals()
    .slice(0, 12)
    .map((signal) => {
      const priority = signal.priority || scoreSignal(signal);
      return `<option value="${signal.id}">${priority.score}/100 - ${signal.title}</option>`;
    })
    .join("");

  contentSignal.innerHTML = `
    <option value="custom">Select a news topic</option>
    ${options}
  `;

  if ([...contentSignal.options].some((option) => option.value === currentValue)) {
    contentSignal.value = currentValue;
  }
}

function selectedContentSignal() {
  if (!contentSignal || contentSignal.value === "custom") {
    return getRankedSignals()[0] || null;
  }
  return signals.find((signal) => signal.id === contentSignal.value) || null;
}

function renderPosts() {
  const selectedSignal = selectedContentSignal();
  const topic = selectedSignal?.title || "HandiAds growth signal";
  const tone = document.querySelector("#contentTone").value;
  const context = {
    location: selectedSignal?.location || "Global",
    why:
      selectedSignal?.why ||
      "This topic can become a useful founder insight for HandiAds and its clients.",
    source: selectedSignal?.source || "Founder Radar",
    summary:
      selectedSignal?.summary ||
      "A market signal that can be converted into content, partnerships, and business action.",
    nextMoves: selectedSignal?.nextMoves || ["Use this signal to explain what brands should do next."]
  };
  const shortTitle = topic.replace(/\s+-\s+[^-]+$/, "");
  const videoScript = [
    "Most people scroll past news like this.",
    `But as the founder of HandiAds, I see a business signal in: ${shortTitle}.`,
    `This matters because ${context.why}`,
    `The location or market angle is ${context.location}.`,
    "For brands, the lesson is simple: attention moves before budgets move.",
    "When a new market, AI trend, or startup program appears, early movers get cheaper learning.",
    "HandiAds can use this signal to study demand, meet better networks, and build sharper campaigns.",
    "If this becomes a real opportunity, the first step is not excitement.",
    "The first step is verification: source, dates, eligibility, cost, and who is attending.",
    "Then we convert it into action: meetings, content, client insights, and revenue experiments.",
    "That is how founders should read news.",
    "Not as information.",
    "As distribution, positioning, and growth."
  ];
  const ideas = [
    {
      title: "Hook options",
      body: "Use one of these as the first 3 seconds of the video.",
      extras: [
        `I found a news signal most marketers will ignore: ${shortTitle}.`,
        "This is how a performance marketing founder reads global news.",
        "If you run ads, do not just watch trends. Turn them into distribution."
      ]
    },
    {
      title: "Short video script",
      body: `${tone} video script for ${shortTitle}`,
      extras: videoScript
    },
    {
      title: "Shot plan",
      body: "Keep it simple and founder-led. Use fast cuts with clear proof.",
      extras: [
        "Shot 1: founder looking at the news on laptop or phone.",
        "Shot 2: screen recording of the source headline.",
        "Shot 3: founder speaking one key insight.",
        "Shot 4: quick text overlay: Signal, Market, Action.",
        "Shot 5: end with HandiAds logo and CTA."
      ]
    },
    {
      title: "Caption",
      body: `News is not just information. For HandiAds, ${shortTitle} is a signal to study the market, understand where attention is moving, and convert that into better performance marketing strategy.`,
      extras: ["CTA: Comment 'RADAR' if you want more founder signals.", "#HandiAds #PerformanceMarketing #FounderJourney #AIMarketing #GrowthMarketing"]
    },
    {
      title: "Use this angle",
      body: context.summary,
      extras: context.nextMoves.slice(0, 3)
    }
  ];

  if (!selectedSignal) {
    postOutput.innerHTML = `
      <article class="post-card">
        <p class="panel-title">Select news</p>
        <h3>Choose a news topic from the dropdown to generate content.</h3>
      </article>
    `;
    return;
  }

  postOutput.innerHTML = `
    <article class="content-brief">
      <p class="panel-title">Selected topic</p>
      <h3>${shortTitle}</h3>
      <p>${context.why}</p>
      <span>${context.source} · ${context.location}</span>
    </article>
    ${ideas
      .map(
        (idea) => `
        <article class="post-card">
          <p class="panel-title">${idea.title}</p>
          <h3>${idea.body}</h3>
          <ul>${idea.extras.map((extra) => `<li>${extra}</li>`).join("")}</ul>
        </article>
      `
      )
      .join("")}
  `;
}

document.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;

  const saveButton = event.target.closest("[data-save-id]");
  if (saveButton) {
    saveLead(saveButton.dataset.saveId);
    saveButton.textContent = "Saved";
    saveButton.classList.add("saved");
    return;
  }

  const deleteButton = event.target.closest("[data-delete-id]");
  if (deleteButton) {
    deleteLead(deleteButton.dataset.deleteId);
    return;
  }

  const tab = event.target.closest(".tab-button");
  if (tab) {
    document.querySelectorAll(".tab-button").forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".section-view").forEach((section) => section.classList.remove("active"));
    document.querySelector(`#${tab.dataset.section}Section`).classList.add("active");
    sectionTitle.textContent = sectionTitles[tab.dataset.section];
    if (tab.dataset.section === "saved") renderSavedLeads();
  }

  const card = event.target.closest(".news-card");
  if (card) {
    document.querySelectorAll(".news-card").forEach((item) => {
      if (item !== card) item.classList.remove("active", "expanded");
    });
    card.classList.add("active");
    const main = event.target.closest(".news-main");
    if (main) {
      const isExpanded = card.classList.toggle("expanded");
      main.setAttribute("aria-expanded", String(isExpanded));
      newsStack.classList.toggle("reading", isExpanded);
    }
  }
});

document.querySelectorAll("[data-filter]").forEach((input) => {
  input.addEventListener("change", () => {
    renderSignals();
    renderContentTopicOptions();
  });
});

document.querySelector("#refreshBtn").addEventListener("click", () => {
  if (latestFeedAgeHours > 24) {
    window.open(refreshWorkflowUrl, "_blank", "noopener,noreferrer");
    document.querySelector("#refreshBtn").textContent = "Open Actions";
    setTimeout(() => {
      document.querySelector("#refreshBtn").textContent = "Refresh";
    }, 1600);
    return;
  }

  loadDailyFeed();
  renderSignals();
  document.querySelector("#refreshBtn").textContent = "Updated";
  setTimeout(() => {
    document.querySelector("#refreshBtn").textContent = "Refresh";
  }, 1200);
});

document.querySelector("#generatePostBtn").addEventListener("click", renderPosts);

savedSearch?.addEventListener("input", renderSavedLeads);

contentSignal?.addEventListener("change", () => {
  renderPosts();
});

async function loadDailyFeed() {
  try {
    const response = await fetch(`data/daily-feed.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const feed = await response.json();
    if (!Array.isArray(feed.items) || feed.items.length === 0) return;

    feedMode = "live";
    signals = feed.items.map((item) => ({
      fit: "Watch",
      tags: [],
      sponsorship: "Unknown",
      distanceFromIndia: "remote",
      airTravel: "unknown",
      influencerValue: "low",
      sourceType: "Source",
      nextMoves: ["Open the source and verify the official page."],
      ...item
    }));

    if (feedStatus) {
      const generatedAt = new Date(feed.generatedAt);
      const ageHours = (Date.now() - generatedAt.getTime()) / (1000 * 60 * 60);
      latestFeedAgeHours = ageHours;
      const isStale = ageHours > 36;
      feedStatus.innerHTML = `
        <strong>${isStale ? "Backend stale" : "Backend active"}</strong>
        <span>Updated ${generatedAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata"
        })}. ${isStale ? "Use Refresh to open the GitHub manual scanner." : "Verify source links before applying."}</span>
      `;
    }
  } catch (error) {
    if (feedStatus) {
      feedStatus.innerHTML = `
        <strong>Demo feed</strong>
        <span>Local file preview is using sample cards. Hosted app will read the daily backend feed.</span>
      `;
    }
  } finally {
    renderSignals();
    renderContentTopicOptions();
    renderPosts();
  }
}

loadDailyFeed();
renderGrowth();
renderContentTopicOptions();
renderPosts();
renderSavedLeads();
