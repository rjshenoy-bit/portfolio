/*
  ============================================================================
  SITE CONTENT — edit everything in this file.
  You should not need to touch index.html, styles.css, or main.js to update
  your content. See README.md for a full walkthrough.

  Fields marked "REPLACE ME" are placeholders — swap them for your own text
  and links before you publish.

  icon options: "bar", "line", "pie", "coins", "building", "calculator", "doc", "growth"
  accent options: "blue", "green", "gold"  (used for the card's tag + thumbnail color)
  ============================================================================
*/

const SITE_DATA = {

  profile: {
    name: "Rajath Shenoy",                       // REPLACE ME
    initials: "RS",                             // REPLACE ME — shown in the nav mark
    role: "Finance Professional",               // REPLACE ME
    tagline: "I build the models and the memos that back the decision — valuation, diligence, and analysis you can actually defend in the room.", // REPLACE ME
    email: "rj.shenoy23@gmail.com",           // REPLACE ME
    linkedin: "https://www.linkedin.com/in/rjshenoy/",
    resumeUrl: "assets/RAJATH SHENOY_CV_.pdf",             // REPLACE ME — drop your resume PDF in /assets and update this if the filename differs
    contactIntro: "Open to full-time roles, consulting work, and anything in between. The fastest way to reach me is email.", // REPLACE ME

    // Small circular photo shown above the "Let's talk numbers" heading.
    // REPLACE ME: drop a photo (square-ish crops work best) into
    // assets/images/ and point this at it, e.g. "assets/images/portrait.jpg".
    portraitUrl: "assets/images/Rajath_Photo.png",
    portraitAlt: "Rajath Shenoy",

    // Shows a small "placeholder" tag under the photo. Set to false once
    // you've swapped in your real photo above.
    portraitIsPlaceholder: false
  },

  // ---------------------------------------------------------------------
  // "Selected work" row — your models, one card each.
  // `link` can point to a Google Sheets/Drive link (set sharing to
  // "Anyone with the link"), a GitHub repo, a PDF export, or a Google Doc.
  // ---------------------------------------------------------------------
  projects: [
    {
      title: "Standalone DCF — ",              // REPLACE ME
      category: "Valuation",
      accent: "blue",
      icon: "line",
      summary: "3-statement build with a driver-based DCF and sensitivity grid.",
      description: "Revenue build-up by cohort, WACC derivation, and a football field triangulating DCF against comps and precedent transactions.",
      link: "#",                                            // REPLACE ME with your real link
      featured: true
    },
    {
      title: "3 Statemnent Model - ",              // REPLACE ME
      category: "Financial Modelling",
      accent: "green",
      icon: "building",
      summary: "Fully integrated income statement, balance sheet, and cash flow forecast.",
      description: "Links operational drivers to dynamic supporting schedules (debt, cap-ex, working capital) to generate balanced dynamic financial statement projections.",
      link: "#"
    },
    {
      title: "LBO Model - ",                    // REPLACE ME
      category: "Private Equity",
      accent: "gold",
      icon: "trending-up",
      summary: "Debt sizing, returns waterfall, and exit sensitivity analysis.",
      description: "Evaluates sponsor returns (IRR and MoIC) across varied leverage structures, debt paydown schedules, and exit multiple sensitivity scenarios.",
      link: "#"
    },
    {
      title: "Public Comps Set — Payments Sector",          // REPLACE ME
      category: "Equity research",
      accent: "blue",
      icon: "bar",
      summary: "Trading comps with a normalized EBITDA build.",
      description: "12-name comp set with calendarization, one-time item add-backs, and a multiple regression against growth and margin.",
      link: "#"
    },
    {
      title: "Working Capital & Cash Flow Bridge",          // REPLACE ME
      category: "FP&A",
      accent: "green",
      icon: "coins",
      summary: "13-week cash flow with a working capital driver tab.",
      description: "Rolling 13-week direct cash forecast tied back to the AR/AP aging schedule, built for a covenant-light lender update.",
      link: "#"
    }
  ],

  // ---------------------------------------------------------------------
  // "Case studies & write-ups" row — longer-form pieces.
  // ---------------------------------------------------------------------
  writeups: [
    {
      title: "HDFC - HDFC Bank Merger : Case Study",           // REPLACE ME
      category: "Deal analysis",
      accent: "gold",
      icon: "doc",
      summary: "Strategic analysis of India's largest banking merger and structural integration.",
      description: "Examines the swap ratio mechanics, regulatory hurdles, CRR/SLR compliance impacts, and long-term synergy potential of the HDFC mega-merger.",
      link: "#",
      featured: true
    },
    {
      title: "Reading a Bank's Balance Sheet in 10 Minutes", // REPLACE ME
      category: "Sector note",
      accent: "blue",
      icon: "calculator",
      summary: "A practical framework for financials sector diligence.",
      description: "NIM, provisioning, and capital ratios explained the way I actually check them before touching a model.",
      link: "#"
    },
    {
      title: "Three Valuation Methods, One Company",        // REPLACE ME
      category: "Methodology",
      accent: "green",
      icon: "growth",
      summary: "DCF vs. comps vs. precedent transactions, reconciled.",
      description: "Where the three approaches disagreed on a real name, and the judgment calls that closed the gap.",
      link: "#"
    }
  ],

  // ---------------------------------------------------------------------
  // Skills, grouped. Accent cycles blue / green / gold per group.
  // ---------------------------------------------------------------------
  skillGroups: [
    {
      title: "Modeling",
      accent: "green",
      items: ["Financial modeling", "DCF & LBO", "Scenario & sensitivity analysis", "Excel (advanced)"]
    },
    {
      title: "Markets & research",
      accent: "blue",
      items: ["Equity research", "Comparable company analysis", "Industry diligence", "Bloomberg Terminal"]
    },
    {
      title: "Tools & reporting",
      accent: "gold",
      items: ["PowerPoint / IC memos", "Power BI", "SQL", "Python for data work"]
    },
    {
      title: "Working style",
      accent: "blue",
      items: ["Cross-functional communication", "Deadline-driven delivery", "Attention to detail", "Client-facing"]
    }
  ],

  // ---------------------------------------------------------------------
  // Experience — a real sequence, most recent first.
  // ---------------------------------------------------------------------
  experience: [
    {
      role: "Senior Financial Analyst",                     // REPLACE ME
      org: "Company Name",                                  // REPLACE ME
      period: "2023 — Present",
      points: [
        "Led modeling for three sell-side processes, ranging from $40M to $220M in enterprise value.",
        "Built the standing template used by the team for quarterly board reporting.",
        "Mentored two incoming analysts on modeling standards."
      ]
    },
    {
      role: "Financial Analyst",                            // REPLACE ME
      org: "Previous Company",                              // REPLACE ME
      period: "2021 — 2023",
      points: [
        "Owned the monthly FP&A cycle across three business units.",
        "Partnered with operations to rebuild the working capital forecast, cutting variance by half."
      ]
    },
    {
      role: "Investment Banking Analyst",                   // REPLACE ME
      org: "First Company",                                 // REPLACE ME
      period: "2019 — 2021",
      points: [
        "Supported 6 closed transactions across M&A and capital markets.",
        "Built comps, precedent transaction, and DCF analyses for pitch and live deal work."
      ]
    }
  ],

  education: [
    { name: "Bachelor of Commerce", org: "Bangalore University", meta: "2021" },     // REPLACE ME
    { name: "Class 12th", org: "The Pupil Saveetha Eco School", meta: "2018" }    // REPLACE ME
  ],

  certifications: [
    { name: "Tally Prime", org: "Tally Education", meta: "2022" }, // REPLACE ME
    { name: "Excel Essentials", org: "Zell Education", meta: "2026" } // REPLACE ME
  ]
};
