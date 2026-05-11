export interface OpportunityRow {
  id: string;
  page: string;
  folder: string;
  reasoning: string;
  dateCreated: string;
}

export interface ActionRow {
  id: string;
  page: string;
  opportunityDate: string;
  pageSlug: string;
  refreshBrief: string;
  landingPageRefresh: "view_output" | "human_review" | "run_playbook" | "loading";
  refreshedContent: string;
  published?: boolean;
}

export interface PlayListItem {
  id: string;
  title: string;
  starred: boolean;
  pendingOpportunities: number;
  totalRuns: number;
  lastEditInitial: string;
  lastEditColor: string;
  lastEdit: string;
}

export interface BriefData {
  topic: string;
  folder: string;
  action: string;
  brandKit: string;
  opportunityCriteria: string;
  triggerLabel: string;
  triggerSchedule: string;
}

export interface MetricCard {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  marker?: number;
}

// =============================================
// PLAYS LIST
// These are the plays visible in the sidebar.
// The first one is "ours" from the demo flow.
// The others show the product feels lived-in.
// =============================================
export const playsListData: PlayListItem[] = [
  {
    id: "play-1",
    title: "Bi-Weekly Food & Dining Refresh",
    starred: true,
    pendingOpportunities: 15,
    totalRuns: 10,
    lastEditInitial: "D",
    lastEditColor: "#6366f1",
    lastEdit: "4 days ago",
  },
  {
    id: "play-2",
    title: "New City Launch Pages",
    starred: false,
    pendingOpportunities: 5,
    totalRuns: 0,
    lastEditInitial: "S",
    lastEditColor: "#f59e0b",
    lastEdit: "4 days ago",
  },
  {
    id: "play-3",
    title: "Outdoor Adventure Gap Fill",
    starred: false,
    pendingOpportunities: 0,
    totalRuns: 10,
    lastEditInitial: "M",
    lastEditColor: "#10b981",
    lastEdit: "1 week ago",
  },
];

// =============================================
// BRIEF
// Matches the side panel from conversation script.
// =============================================
export const briefData: BriefData = {
  topic: "Food & Dining",
  folder: "/experiences, /blog",
  action: "Content Refresh",
  brandKit: "Acme Experiences",
  opportunityCriteria:
    "Pages with declining citation rates, outdated business references, pre-2025 content, or missing FAQ schema. Prioritized by existing traffic volume.",
  triggerLabel: "Schedule",
  triggerSchedule: "Every 2 weeks on Monday at 9:00 AM EST",
};

// =============================================
// OPPORTUNITIES
// Each page is distinct. Reasoning explains
// *why* this page was flagged, not just that
// it was. Mix of /experiences and /blog.
// =============================================
export const opportunitiesData: OpportunityRow[] = [
  {
    id: "opp-1",
    page: "/experiences/food-tour-la",
    folder: "experiences",
    reasoning:
      "35 AI citations last quarter, but citation rate dropped 18% in 30 days. Two listed restaurants permanently closed.",
    dateCreated: "April 29, 2026",
  },
  {
    id: "opp-2",
    page: "/blog/best-cooking-classes-2025",
    folder: "blog",
    reasoning:
      "Title references 2025. Competitor roundups with 2026 data are now outranking this page in AI answers.",
    dateCreated: "April 29, 2026",
  },
  {
    id: "opp-3",
    page: "/experiences/wine-tasting-napa",
    folder: "experiences",
    reasoning:
      "Pricing outdated by 14 months. No FAQ schema. Eater's Napa guide is getting cited where this page used to.",
    dateCreated: "April 29, 2026",
  },
  {
    id: "opp-4",
    page: "/experiences/street-food-bangkok",
    folder: "experiences",
    reasoning:
      "High organic traffic but zero AI citations. Missing structured data and no local business verification.",
    dateCreated: "April 30, 2026",
  },
  {
    id: "opp-5",
    page: "/blog/farm-to-table-portland",
    folder: "blog",
    reasoning:
      "Three of five featured restaurants changed menus or ownership. Internal links point to archived pages.",
    dateCreated: "April 30, 2026",
  },
];

export const additionalOpportunities: OpportunityRow[] = [
  {
    id: "opp-6",
    page: "/experiences/seafood-markets-seattle",
    folder: "experiences",
    reasoning:
      "Seasonal hours wrong for Pike Place vendors. Infatuation's Seattle guide now cited 2x more often.",
    dateCreated: "May 1, 2026",
  },
  {
    id: "opp-7",
    page: "/blog/michelin-guide-chicago",
    folder: "blog",
    reasoning:
      "References 2024 Michelin list. Two starred restaurants lost status, one new addition missing entirely.",
    dateCreated: "May 1, 2026",
  },
  {
    id: "opp-8",
    page: "/experiences/food-halls-austin",
    folder: "experiences",
    reasoning:
      "One featured food hall closed in March 2026. Page still ranks but trust signals are degrading fast.",
    dateCreated: "May 1, 2026",
  },
];

// =============================================
// ACTIONS
// These are pages that have been through the
// playbook. Mix of statuses to show the workflow.
// Page slugs should feel like real article titles.
// =============================================
export const actionData: ActionRow[] = [
  {
    id: "act-1",
    page: "https://acmeco.com/experie...",
    opportunityDate: "April 17, 2026",
    pageSlug: "LA's Best Food Tou...",
    refreshBrief: "Two restaurants closed, pric...",
    landingPageRefresh: "view_output",
    refreshedContent: "We walked 4 miles thr...",
    published: true,
  },
  {
    id: "act-2",
    page: "https://acmeco.com/blog/b...",
    opportunityDate: "April 17, 2026",
    pageSlug: "Best Cooking Class...",
    refreshBrief: "Title still says 2025. Compet...",
    landingPageRefresh: "human_review",
    refreshedContent: "Whether you're luftin...",
    published: false,
  },
  {
    id: "act-3",
    page: "https://acmeco.com/experie...",
    opportunityDate: "April 17, 2026",
    pageSlug: "Napa Wine Tasting:...",
    refreshBrief: "Pricing off by 14 months. No...",
    landingPageRefresh: "view_output",
    refreshedContent: "The best tasting roo...",
    published: true,
  },
  {
    id: "act-4",
    page: "https://acmeco.com/experie...",
    opportunityDate: "April 17, 2026",
    pageSlug: "Bangkok Street Foo...",
    refreshBrief: "High traffic, zero AI citatio...",
    landingPageRefresh: "view_output",
    refreshedContent: "Yaowarat Road after d...",
    published: false,
  },
  {
    id: "act-5",
    page: "https://acmeco.com/blog/f...",
    opportunityDate: "April 17, 2026",
    pageSlug: "Farm-to-Table Port...",
    refreshBrief: "3 of 5 restaurants changed m...",
    landingPageRefresh: "run_playbook",
    refreshedContent: "Portland's farm-to-ta...",
    published: false,
  },
];

// =============================================
// MEASURE
// Metrics should feel like realistic lift, not
// placeholder round numbers. These represent
// ~6 weeks of the play running bi-weekly.
// =============================================
export const measureMetrics: MetricCard[] = [
  { label: "Citation Rate", value: "10.1%", delta: "+1.6%", deltaPositive: true },
  { label: "Citation Share", value: "21.5%", delta: "+6.3%", deltaPositive: true },
  { label: "Unique Prompts", value: "843", delta: "+127", deltaPositive: true },
  { label: "Pages Refreshed", value: "76", delta: "of 312", deltaPositive: true },
];

// =============================================
// CHARTS
// Citation rate shows the dip-then-recovery arc.
// Markers align with play run dates (bi-weekly).
// =============================================
export const citationRateChartData: ChartDataPoint[] = [
  { date: "Mar 15", value: 9.8 },
  { date: "Mar 20", value: 9.4 },
  { date: "Mar 25", value: 9.1 },
  { date: "Mar 30", value: 8.7 },
  { date: "Apr 03", value: 8.5 },
  { date: "Apr 07", value: 8.2, marker: 1 },
  { date: "Apr 10", value: 8.4 },
  { date: "Apr 14", value: 8.9 },
  { date: "Apr 17", value: 9.3 },
  { date: "Apr 21", value: 9.5, marker: 2 },
  { date: "Apr 24", value: 9.8 },
  { date: "Apr 28", value: 10.1, marker: 3 },
];

export const citationShareChartData: ChartDataPoint[] = [
  { date: "Mar 15", value: 15.2 },
  { date: "Mar 20", value: 15.8 },
  { date: "Mar 25", value: 16.1 },
  { date: "Mar 30", value: 16.5 },
  { date: "Apr 03", value: 17.0 },
  { date: "Apr 07", value: 17.8, marker: 1 },
  { date: "Apr 10", value: 18.2 },
  { date: "Apr 14", value: 18.9 },
  { date: "Apr 17", value: 19.4 },
  { date: "Apr 21", value: 20.1, marker: 2 },
  { date: "Apr 24", value: 20.8 },
  { date: "Apr 28", value: 21.5, marker: 3 },
];

// =============================================
// REVIEW PANEL CONTENT (per action)
// Each action row has its own full article and
// playbook execution trace. Keyed by action ID.
// =============================================

export interface ReviewPanelData {
  title: string;
  articleTitle: string;
  articleContent: string;
  wordCount: number;
  charCount: number;
  steps: { label: string; type: string; source?: string; icon?: "airops" }[];
}

export const reviewPanelContentByAction: Record<string, ReviewPanelData> = {
  "act-1": {
    title: "Food & Dining Content Refresh",
    articleTitle: "LA's best food tours worth booking in 2026",
    articleContent: `<p>Los Angeles has always been a food city, but the dining scene moves fast. Tours that were essential a year ago might now skip the best new openings or send you to restaurants that quietly closed. We walked every route on this list in April 2026 to make sure each one still delivers.</p>
<p>Here's what's actually worth your time and money right now.</p>
<h2>Hollywood Taco Crawl with LA Bites</h2>
<p>LA Bites restructured this route in early 2026 after two of the original stops closed. The new version starts at Sonoratown, hits Tire Shop Taqueria, and ends with a mole tasting at Guelaguetza. Three hours, six stops, and you'll skip the lunch rush at all of them if you book the 10 AM slot.</p>
<p>Price: $89 per person (up from $75 in 2024). Group size capped at 12.</p>
<h2>Arts District to Little Tokyo</h2>
<p>This crossover tour works because the neighborhoods are close enough to walk but different enough to feel like two trips. You start with coffee at Endorffeine and end with hand-pulled noodles at Marugame Monzo. The guide, Marco, has been running this route for three years and knows every kitchen by name.</p>
<ul>
<li>Duration: 3.5 hours on foot. Wear comfortable shoes.</li>
<li>Includes 7 tastings, enough to replace lunch entirely.</li>
<li>Runs Thursday through Sunday. Book 48 hours ahead.</li>
</ul>
<p>The biggest change from last year: they dropped the Grand Central Market stop (too crowded, too touristy) and added Bavel for a focaccia tasting that's become the highlight of the whole route.</p>
<h2>Venice Canals to Abbot Kinney</h2>
<p>This one isn't strictly a food tour, but the eating is the best part. You start with pastries at Gjusta, walk the canals (genuinely beautiful in the morning light), then work your way up Abbot Kinney with stops at The Butcher's Daughter and Salt & Straw.</p>
<p>Price: $69 per person. Runs Saturday and Sunday mornings only.</p>
<h2>Frequently asked questions</h2>
<p><strong>How far in advance should I book an LA food tour?</strong> Most tours fill up 5 to 7 days out, especially weekend slots. Weekday tours are easier to grab last-minute.</p>
<p><strong>Are LA food tours worth it for locals?</strong> Yes, if you pick neighborhood-specific routes. The Hollywood Taco Crawl and Arts District tours hit spots that even longtime Angelenos tend to miss.</p>
<p><strong>Do food tours accommodate dietary restrictions?</strong> Most operators can handle vegetarian and gluten-free with 48 hours notice. Vegan-only tours are harder to find but LA Bites runs one monthly.</p>
<p><strong>What's the average cost of a food tour in Los Angeles?</strong> Expect to pay between $65 and $95 per person for a 3-hour tour. Premium tours with wine pairings run $120 and up.</p>
<p><strong>Which LA neighborhood has the best food tour?</strong> For variety, the Arts District to Little Tokyo crossover is hard to beat. For pure depth, the Hollywood Taco Crawl goes deeper into one cuisine than any other tour in the city.</p>`,
    wordCount: 2340,
    charCount: 3842,
    steps: [
      { label: "I'll start by searching for best AEO tools using Google Search.", type: "description" },
      { label: "Searched Google", type: "completed" },
      { label: "Gather the title, snippet, and content for each of the top 15 ranking pages", type: "description" },
      { label: "Compared domains with SEMRush", type: "completed" },
      { label: "AirOps to list Knowledge Bases", type: "tool", icon: "airops" },
      { label: "AirOps to list Brand Kits", type: "tool", icon: "airops" },
      { label: "Now let me fetch the most relevant Q1 2026 product pages in parallel, and also pull the current brand kit details.", type: "description" },
      { label: "I now have all the context I need. Let me write the comprehensive suggestion file.", type: "description" },
      { label: "Used 3 tools", type: "completed" },
    ],
  },

  "act-2": {
    title: "Food & Dining Content Refresh",
    articleTitle: "Best cooking classes to take in 2026",
    articleContent: `<p>The best cooking classes do more than teach you a recipe. They change how you think about an ingredient, a technique, or a whole cuisine. We tested 22 classes across 9 cities in early 2026 to find the ones that actually deliver on that promise.</p>
<p>Every class on this list was attended in person between January and March 2026. Pricing, availability, and instructor info are current as of publication.</p>
<h2>Sur La Table: Handmade Pasta Workshop (multiple cities)</h2>
<p>Sur La Table overhauled their pasta curriculum in late 2025. The new version spends the first 45 minutes on dough science before you touch a rolling pin. By the end of three hours, you'll have made four shapes from scratch and eaten all of them.</p>
<p>Price: $99 per person. Available in 47 locations. The Brooklyn and San Francisco studios book out fastest.</p>
<h2>Hot Bread Kitchen: Flatbreads of the World (New York)</h2>
<p>Naan, tortillas, injera, and lavash in a single session. Hot Bread Kitchen's instructors come from the communities where these breads originate, and it shows. The tortilla technique alone was worth the price of admission.</p>
<p>Price: $125 per person. Runs twice monthly on Saturdays. Their Long Island City kitchen is small, which keeps group sizes to 8.</p>
<h2>The Civic Kitchen: Seasonal Market Class (San Francisco)</h2>
<p>You start at the Ferry Building farmers market, buy what looks good, then walk to The Civic Kitchen and cook a three-course meal from whatever you picked. No two classes are the same. Chef Leah handles the menu on the fly and makes it look easy.</p>
<p>Price: $145 per person (includes market purchases). Thursday evenings and Saturday mornings.</p>
<h2>Hipcooks: Date Night Cooking (Los Angeles)</h2>
<p>Less technique-heavy, more fun. Hipcooks pairs you up, puts wine in your hand, and walks you through a full meal. The vibe is loose but the food is legitimately good. Their Thai night and Italian night are the most popular.</p>
<p>Price: $75 per person. BYOB is free. Multiple LA locations, all walkable from transit.</p>
<h2>Frequently asked questions</h2>
<p><strong>What should I look for in a cooking class?</strong> Small group sizes (under 12), hands-on time (not just watching a demo), and an instructor who explains the why, not just the how.</p>
<p><strong>Are cooking classes worth the price?</strong> The best ones teach transferable skills you'll use for years. A $100 pasta class that changes how you cook at home pays for itself quickly.</p>
<p><strong>Can beginners take advanced cooking classes?</strong> Most classes on this list are designed for mixed skill levels. The Civic Kitchen's market class is the most adaptive since the menu changes every session.</p>
<p><strong>How far ahead should I book a cooking class?</strong> Popular weekend classes fill 2 to 3 weeks out. Weeknight classes are easier to book last-minute.</p>`,
    wordCount: 2180,
    charCount: 3654,
    steps: [
      { label: "Verified class schedules and availability", type: "completed" },
      { label: "Called Sur La Table, Hot Bread Kitchen, Civic Kitchen, and Hipcooks to confirm 2026 pricing and formats", type: "description" },
      { label: "Updated title from '2025' to '2026'", type: "completed" },
      { label: "AirOps Knowledge Base", type: "tool", source: "Fetched competitor class roundups for gap analysis" },
      { label: "AirOps Brand Kit", type: "tool", source: "Loaded Acme Experiences tone and style" },
      { label: "Rewrote intro to reference 2026 testing dates and removed closed class references.", type: "description" },
      { label: "Added structured FAQ schema for 4 common cooking class queries.", type: "description" },
      { label: "Updated internal links", type: "completed" },
      { label: "Validated schema markup", type: "completed" },
    ],
  },

  "act-3": {
    title: "Food & Dining Content Refresh",
    articleTitle: "Napa wine tasting: the honest guide for 2026",
    articleContent: `<p>Napa Valley has over 400 wineries and most of them want your money. The trick is finding the ones that are worth the trip, worth the tasting fee, and won't feel like you're standing in line at a theme park. We visited 30 tasting rooms in March 2026 to sort this out.</p>
<p>Fair warning: Napa prices have climbed again. Budget accordingly.</p>
<h2>Frog's Leap Winery</h2>
<p>Still the best value in Napa. Their estate tour includes a walk through the organic garden, a barrel tasting, and a seated flight of five wines. The Sauvignon Blanc is one of the best in the valley and has been for a decade.</p>
<p>Tasting fee: $50 per person (up from $40 in 2024). Reservations required. Book 10 days ahead for weekends.</p>
<h2>Domaine Carneros</h2>
<p>The chateau looks like it was airlifted from Champagne, and the sparkling wines hold up to the setting. The terrace tasting is the move, especially on a clear afternoon. Skip the indoor seated experience unless it's raining.</p>
<p>Tasting fee: $65 per person for the terrace flight. Walk-ins accepted on weekdays only.</p>
<h2>Stag's Leap Wine Cellars</h2>
<p>This is where the 1973 Cabernet that won the Judgment of Paris was made. The FAY vineyard tour is the one to book. It's pricier but you taste library wines you can't get in the regular room.</p>
<p>Tasting fee: $75 standard, $150 for the FAY experience. Book 2 weeks ahead minimum.</p>
<h2>Hall Wines</h2>
<p>The architecture alone is worth a visit. The HALL Cabernet is their flagship and it's consistently excellent year over year. The art collection throughout the property is genuinely world-class.</p>
<p>Tasting fee: $60 per person. Their 10 AM slot is the least crowded.</p>
<h2>Frequently asked questions</h2>
<p><strong>How much does a day of wine tasting in Napa cost?</strong> Budget $200 to $300 per person for 3 to 4 tasting rooms, including fees, tips, and a driver. Add $100 if you're buying bottles.</p>
<p><strong>Do you need reservations for Napa wineries?</strong> Almost always, yes. Post-pandemic reservation requirements stuck. A few places accept walk-ins on slow weekdays but don't count on it.</p>
<p><strong>What's the best time of year to visit Napa?</strong> September and October for harvest. March and April for smaller crowds and lower prices. Summer is beautiful but packed and hot.</p>
<p><strong>Is Napa or Sonoma better for wine tasting?</strong> Napa for Cabernet and polished experiences. Sonoma for Pinot Noir, casual vibes, and lower prices. Most people who visit both prefer Sonoma for a return trip.</p>
<p><strong>How many wineries can you visit in one day?</strong> Three to four is the sweet spot. More than that and palate fatigue sets in. Space them 90 minutes apart.</p>`,
    wordCount: 2510,
    charCount: 4120,
    steps: [
      { label: "Verified winery hours and reservation policies", type: "completed" },
      { label: "Cross-referenced Frog's Leap, Domaine Carneros, Stag's Leap, and Hall Wines websites for 2026 pricing", type: "description" },
      { label: "Pulled current tasting fees", type: "completed" },
      { label: "AirOps Knowledge Base", type: "tool", source: "Fetched competitor Napa guides from Eater and Infatuation" },
      { label: "AirOps Brand Kit", type: "tool", source: "Loaded Acme Experiences tone and style" },
      { label: "Rewrote intro with March 2026 visit date. Removed 2 wineries that switched to private events only.", type: "description" },
      { label: "Added structured FAQ schema for 5 common Napa tasting queries.", type: "description" },
      { label: "Updated internal links", type: "completed" },
      { label: "Validated schema markup", type: "completed" },
    ],
  },

  "act-4": {
    title: "Food & Dining Content Refresh",
    articleTitle: "Bangkok street food: where to eat and what to skip",
    articleContent: `<p>Bangkok's street food reputation is earned, but the city has changed faster than most travel guides acknowledge. Vendors move, neighborhoods gentrify, and the stalls tourists line up for aren't always the ones locals would choose. We spent two weeks eating our way through Bangkok in February 2026 to build this guide from scratch.</p>
<p>Everything below was verified on foot. If a stall moved or closed, we dropped it.</p>
<h2>Yaowarat Road (Chinatown) after dark</h2>
<p>Still the single best street food strip in the city. Start at the Mangkon Road intersection and walk south. The crab omelet at Nai Mong Hoi Thod is the anchor, but the real discovery is the charcoal-grilled pork neck two stalls down. No sign, just look for the smoke.</p>
<p>Best time: 6 PM to 10 PM. Weeknights are less chaotic. Budget 300 to 500 baht per person to eat until you can't anymore.</p>
<h2>Or Tor Kor Market</h2>
<p>This is where Bangkok's chefs shop. The produce is pristine, the prepared food stalls are excellent, and you can eat a full meal of som tum, grilled chicken, and sticky rice for under 200 baht. It's right next to Chatuchak Weekend Market but a completely different experience.</p>
<p>Open daily 6 AM to 6 PM. Go early for the best selection. The durian here is the best in Bangkok, if you're ready for it.</p>
<h2>Thonglor Soi 38 (what's left)</h2>
<p>This used to be the most famous late-night food street in Bangkok. Development thinned it out, but a handful of stalls survived and they're as good as ever. The pad thai at Pad Thai Thip Samai's satellite stall and the boat noodles at the corner are both worth the trip.</p>
<p>Open 5 PM to midnight. Grab a seat at the plastic tables and don't expect menus in English.</p>
<h2>Bang Rak and the Sathorn sois</h2>
<p>The neighborhood around Bangrak Fire Station has some of the best lunch food in the city. Khao gaeng shops (curry over rice) line the sois, and the quality is consistently high because the customer base is local office workers who eat here every day.</p>
<p>Best between 11 AM and 1 PM. Prices are 40 to 80 baht per plate. By 2 PM most shops are closed.</p>
<h2>Frequently asked questions</h2>
<p><strong>Is Bangkok street food safe to eat?</strong> Yes. Look for stalls with high turnover (food doesn't sit), active cooking (made to order), and a crowd of locals. We ate at 40+ stalls in two weeks with zero issues.</p>
<p><strong>How much does street food cost in Bangkok?</strong> A full meal at a street stall runs 50 to 150 baht ($1.50 to $4.50 USD). Even tourist-area stalls rarely charge more than 200 baht.</p>
<p><strong>What should I skip in Bangkok?</strong> Khao San Road food stalls (overpriced, low turnover). Any stall that has a menu with photos in six languages. And the scorpion-on-a-stick vendors, which exist purely for Instagram.</p>
<p><strong>Do I need cash for Bangkok street food?</strong> Yes. Some stalls accept PromptPay (Thai QR payment), but cash is king. Carry small bills. A 1,000 baht note at a 50-baht stall will not make you popular.</p>`,
    wordCount: 2680,
    charCount: 4380,
    steps: [
      { label: "Verified vendor locations and hours", type: "completed" },
      { label: "Cross-referenced Google Maps, Wongnai (Thai Yelp), and travel forums for closures and relocations", type: "description" },
      { label: "Confirmed current pricing in Thai baht and USD", type: "completed" },
      { label: "AirOps Knowledge Base", type: "tool", source: "Fetched competitor Bangkok street food guides" },
      { label: "AirOps Brand Kit", type: "tool", source: "Loaded Acme Experiences tone and style" },
      { label: "Rewrote intro with February 2026 visit date. Removed 3 stalls that relocated or closed.", type: "description" },
      { label: "Added structured FAQ schema for 4 common Bangkok street food queries.", type: "description" },
      { label: "Updated internal links", type: "completed" },
      { label: "Validated schema markup", type: "completed" },
    ],
  },

  "act-5": {
    title: "Food & Dining Content Refresh",
    articleTitle: "Portland's farm-to-table restaurants that actually deliver",
    articleContent: `<p>Every restaurant in Portland claims to be farm-to-table. The phrase has been stretched thin enough to be meaningless. So we focused on something specific: restaurants where the chef can name the farm, the menu changes with what's available, and the price reflects the work involved in sourcing locally.</p>
<p>We re-visited 14 restaurants in March 2026. Five didn't make the cut this time. Here's who did.</p>
<h2>Arden</h2>
<p>Chef Sarah Pliner's tasting menu at Arden is the most ambitious farm-to-table dining in Portland right now. The menu changes weekly based on what she picks up from Gathering Together Farm and Deep Roots. The duck course in late winter was the best single dish we ate in the city this year.</p>
<p>Price: $95 for the tasting menu, $55 wine pairing. Reservations essential. Open Wednesday through Saturday.</p>
<h2>Canard</h2>
<p>The casual sibling of Canard shares sourcing with the mothership but the vibe is walk-in wine bar. The fried chicken changes based on the bird (sometimes quail, sometimes guinea hen), and the natural wine list rotates constantly. Get the tartare, whatever the protein is that week.</p>
<p>Price: $15 to $35 per plate. No reservations. Expect a 20-minute wait on weekends after 7 PM.</p>
<h2>Holdfast</h2>
<p>A 24-seat dining room in an old house on Williams Ave. Chef Joel Stocks cooks a 10-course menu and serves it himself. The intimacy is the point. You watch the food being finished from your seat and Joel will tell you exactly where every ingredient came from.</p>
<p>Price: $165 per person, beverages included. Thursday through Saturday. Books out 3 weeks ahead.</p>
<h2>Gado Gado</h2>
<p>Southeast Asian flavors with Willamette Valley produce. Chef Thomas Pisha-Duffly sources from 12 local farms and the menu changes seasonally. The coconut curry with seasonal greens is always on, and it's always different. Indonesian comfort food made with Oregon ingredients sounds unusual but it works completely.</p>
<p>Price: $16 to $28 per plate. Open for dinner Tuesday through Saturday. Their lunch service launched in January 2026 and is still under the radar.</p>
<h2>Tusk</h2>
<p>Vegetable-forward Mediterranean with produce from 47th Avenue Farm. Tusk has been open since 2016 and the kitchen hasn't lost a step. The smoked beet dip and the chicories salad are permanent fixtures for a reason. Everything else changes seasonally.</p>
<p>Price: $14 to $32 per plate. Reservations recommended for dinner. Walk-ins welcome at the bar.</p>
<h2>Frequently asked questions</h2>
<p><strong>What does farm-to-table actually mean in Portland?</strong> At its best, it means the chef has direct relationships with local farms and the menu reflects what's in season. At its worst, it's a marketing label slapped on a Sysco delivery. The restaurants on this list are the real thing.</p>
<p><strong>How much should I budget for farm-to-table dining in Portland?</strong> Casual spots run $30 to $50 per person. Tasting menus range from $95 to $165. Wine pairings add $45 to $75.</p>
<p><strong>Is Portland still a good food city?</strong> Yes. The pandemic closures were brutal but the restaurants that survived are cooking at a higher level than before. The new wave of openings in 2025 and 2026 has been strong.</p>
<p><strong>Which Portland restaurant should I try first?</strong> For a single best experience, Arden. For a casual night out, Canard. For something you've never had before, Gado Gado.</p>`,
    wordCount: 2450,
    charCount: 4050,
    steps: [
      { label: "Verified restaurant status and hours", type: "completed" },
      { label: "Confirmed 3 of 5 original featured restaurants changed ownership or menus since last update", type: "description" },
      { label: "Pulled current menu pricing", type: "completed" },
      { label: "AirOps Knowledge Base", type: "tool", source: "Fetched Portland dining competitor content" },
      { label: "AirOps Brand Kit", type: "tool", source: "Loaded Acme Experiences tone and style" },
      { label: "Rebuilt article with 9 restaurants verified in March 2026. Removed 5 that no longer qualify.", type: "description" },
      { label: "Added structured FAQ schema for 4 common Portland dining queries.", type: "description" },
      { label: "Fixed 3 broken internal links to archived pages", type: "completed" },
      { label: "Validated schema markup", type: "completed" },
    ],
  },
};

// Keep backward-compatible default export pointing to act-1
export const reviewPanelContent = reviewPanelContentByAction["act-1"];

// =============================================
// AGENT CONVERSATION
// Simulated Quill thread showing the agent
// working through a single page refresh.
// This is what plays inside the review panel
// to show *how* the playbook executed.
// =============================================

export interface AgentMessage {
  role: "agent" | "tool_call" | "tool_result" | "user";
  text: string;
  delayMs?: number;
}

export const agentConversation: AgentMessage[] = [
  {
    role: "agent",
    text: "Starting refresh on /experiences/food-tour-la. Let me verify the current state of this page.",
    delayMs: 0,
  },
  {
    role: "tool_call",
    text: "Fetching page content from https://acmeco.com/experiences/food-tour-la",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "Page retrieved. 2,180 words. Last modified: September 14, 2025. 3 external business links, 4 internal links, 0 FAQ schema.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Page hasn't been touched in 7 months. Running local business verification on the 6 restaurants and tour operators referenced.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "Checking Google Maps, Yelp, and business websites for: LA Bites, Sonoratown, Tire Shop Taqueria, Guelaguetza, Endorffeine, Marugame Monzo",
    delayMs: 600,
  },
  {
    role: "tool_result",
    text: "4 of 6 businesses verified and active. Sonoratown: confirmed open, hours unchanged. Tire Shop Taqueria: permanently closed (March 2026). Guelaguetza: open, new weekend hours. Endorffeine: confirmed open. Marugame Monzo: confirmed open, price increase. LA Bites: tour route restructured in January 2026.",
    delayMs: 800,
  },
  {
    role: "agent",
    text: "Found 2 issues. Tire Shop Taqueria closed, and LA Bites changed their route. I need to update the tour listing and find a replacement stop. Let me check what LA Bites is running now.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "Fetching current tour routes from labites.com/tours",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "Hollywood Taco Crawl updated January 2026. New route: Sonoratown, Mariscos Jalisco, Guelaguetza. 6 stops total. Price: $89/person (was $75). Group size: 12 max.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Got the updated route and pricing. Now pulling the brand kit to match voice and tone for the rewrite.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "AirOps Brand Kit: Loading Acme Experiences tone and style",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "Brand kit loaded. Voice: confident, specific, first-person plural. Avoid superlatives without evidence. Price transparency required. FAQ schema standard: minimum 4 questions per page.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Rewriting the intro to reference our April 2026 verification, updating the Hollywood Taco Crawl section with the new route and pricing, and removing the Tire Shop Taqueria reference.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "AirOps Knowledge Base: Checking competitor LA food tour content",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "Eater LA published updated food tour guide March 12, 2026. Covers 8 tours. Does not include Arts District to Little Tokyo route. Infatuation LA has no 2026 food tour content.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Good. Our Arts District to Little Tokyo section is a differentiator since neither Eater nor Infatuation covers it. I'll strengthen that section and add the Bavel stop they added this year. Now writing the structured FAQ schema.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "Generating FAQ schema for 6 common LA food tour queries",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "FAQ schema generated. 6 questions: booking timeline, local value, dietary restrictions, average cost, best neighborhood, group size options.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Checking internal links. This page links to 4 other pages on acmeco.com.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "Validating internal links: /blog/la-restaurants-2025, /experiences/cooking-classes-la, /blog/best-food-cities, /experiences/wine-tasting-la",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "3 of 4 links valid. /blog/la-restaurants-2025 redirects to archived page. Replaced with /blog/la-restaurants-2026.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Fixed the broken link. Running final schema validation.",
    delayMs: 400,
  },
  {
    role: "tool_call",
    text: "Validating schema markup on refreshed page",
    delayMs: 400,
  },
  {
    role: "tool_result",
    text: "Schema valid. Article schema, FAQ schema (6 items), and LocalBusiness references all passing. No errors.",
    delayMs: 600,
  },
  {
    role: "agent",
    text: "Refresh complete. Updated 2 business references, rewrote the intro with a 2026 verification date, added FAQ schema with 6 questions, fixed 1 broken internal link, and validated all markup. Ready for review.",
    delayMs: 400,
  },
];