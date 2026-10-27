# Homepage Prototype QA

## Responsive layout

The page was checked in a browser at each width below. No horizontal overflow or broken content images were found. The empty lightbox image receives a source only after a gallery item is opened.

| Viewport width | Result |
| ---: | --- |
| 320px | Pass |
| 375px | Pass |
| 390px | Pass |
| 767px | Pass |
| 768px | Pass |
| 1024px | Pass |
| 1440px | Pass |

The hero heading stays within two lines at 1440px, 768px, and 390px. The final inspector run found no responsive layout or overflow problems; it reports one style-rule failure because the supplied design uses the “Pahrump, Nevada” and “Meet Marci” labels above headings. Those labels are retained to match the requested reference.

## Interaction checks

- Mobile navigation opens and closes with Escape.
- Location, Type, Bedrooms, Baths, and Sort By options match the supplied website screenshots. The sample search filters by available demo data, sorts by date, price, beds, and baths, reports invalid price ranges, and reset restores all three sample cards in newest-first order.
- The gallery carousel advances and wraps in both directions; its active photo opens in the lightbox, which still supports arrow-key navigation and Escape.
- The contact form rejects missing required fields and displays a demo-only confirmation when valid. No message is sent.
- The contact section now matches the supplied two-panel reference: a full-width landscape backdrop behind the introduction and phone link, with the demo message form in a separate white panel.
- Office information is in its own section below contact, with an embedded, interactive Google Map instead of the previous landscape image. The office name, full street address, phone number, daily hours, and after-hours appointment note match the live website.
- The contact form retains all three required, labeled fields; invalid submission is blocked, and valid submission displays the existing demo-only confirmation. Phone links and the external directions link remain available.
- All in-page anchor targets resolve, all checked content images load, and no JavaScript page errors were observed.

## Build, lint, and visual inspection

- `npm run build` — passed.
- `node --check src/main.js` — passed.
- Design lint — **0 failures**, 1 warning for the existing outlined control.
- Design inspector — **0 failures** at 1440px, 768px, and 390px; 4 warnings:
  - The affiliation section uses four matching panels to follow the supplied reference; similar repeated cards also appear in the requested listing and services groups.
  - Warm paper/surface colors are retained to match the existing brand and supplied visual direction.
  - Seventeen computed font sizes remain across display, body, and form/control typography.
  - No video is used; the available local clip was unrelated geology footage, not a representative real-estate or Pahrump scene.
- Contact and office layouts checked at 320px, 375px, 390px, 767px, 768px, 900px, 1024px, and 1440px; no horizontal overflow was measured.
- The Google Maps iframe loaded successfully in the browser. The contact form and office details were reviewed at desktop and mobile sizes.
- Added the requested professional affiliations section immediately after the home-search/listings section, with the supplied heading and supporting copy and four responsive organization panels.
- The affiliation marks are decorative CSS/SVG illustrations with readable organization names; on narrow screens each name sits beside its mark to keep the cards legible.
- The affiliation marks are locally drawn, logo-inspired treatments rather than official logo files; confirm the Pahrump Valley Chamber of Commerce affiliation before production.
- Redesigned the Marci introduction to match the supplied reference: three-decade headline, horizontal benefit columns with separators, source portrait with an offset background block, and an overlapping “Realtor for nearly 3 decades” badge. The full 4:5 portrait remains uncropped on mobile.
- Updated the portrait badge to use the latest supplied design: a small mountain-line mark, left accent rule, and “3 decades” emphasis. This reuses the already-approved “nearly three decades” homepage claim.
- Updated the hero to match the supplied Pahrump reference: location eyebrow above the title, darker left-side photo scrim, larger two-line headline, and paired home-search/about actions.
- Fixed hero CTA hover/focus motion so the primary button lifts vertically rather than shifting horizontally, its arrow moves subtly forward, and the secondary link gets a small directional nudge. Existing reduced-motion rules suppress the animation when requested.
- Updated the footer Quick links to match the header navigation labels and destinations: Home, Listings, Let's Move, and About Us.
- Removed the “Any” placeholder from the minimum- and maximum-price fields; the optional filters remain empty until the visitor enters a value.
- Fixed the price-field currency prefix spacing so the entered number no longer overlaps the dollar sign; the more specific search-field padding now preserves room for the prefix.
- Removed the beige decorative block and vertical accent line from the Marci portrait section; the portrait, experience badge, and content remain unchanged.
- Reduced the header wordmark width for desktop and mobile breakpoints while preserving its aspect ratio.
- Updated the hero copy to match the supplied image: “MARCI METZGER - THE RIDGE REALTY GROUP” above “PAHRUMP REALTOR.” The company line is intentionally styled as an eyebrow to match the reference; the existing home-exploration and contact actions remain available.
- Centered the hero eyebrow, headline, and action group to match the latest supplied reference; rechecked the desktop, tablet, and mobile hero screenshots.
- Refreshed the hero to match the latest supplied design: left-aligned “Pahrump, Nevada” eyebrow with an accent rule, a two-line “Pahrump / Realtor” headline with a gold accent on “Realtor,” concise supporting copy, and paired filled/outlined CTAs. The longer content wraps cleanly on mobile.
- Rebuilt and re-inspected the updated hero at 1440px, 768px, and 390px: 0 failures, with the eyebrow exception allowed for the requested visual style. All nine responsive screenshots were reviewed. Five warnings remain, including a mobile title-copy heuristic warning; the mobile screenshot visibly includes the supporting real-estate description.
- Expanded the Pahrump photo gallery from four images to eight. Added four original-site property and community photographs, gave each image descriptive alt text and a matching lightbox index.
- Re-inspected the updated page at 1440px, 768px, and 390px: 0 failures and 4 existing warnings. Reviewed all nine final responsive screenshots; confirmed all eight gallery images load and the last image opens as “Photo 8 of 8” in the lightbox.
- The latest design inspection reports **1 failure and 7 warnings**. The failure is the inspector's eyebrow rule for “Pahrump, Nevada,” “Meet Marci,” and the badge label “Realtor for nearly,” all retained to match the supplied references. It does not indicate a layout, overflow, or headline-wrap issue. Warnings cover existing repeated card layouts, the retained warm palette, type-size variety, no video, the badge's micro-label, one low-contrast text treatment, and one small text block. All screenshots at 1440px, 768px, and 390px were reviewed after the badge change.

## Design critique

Direction: **The place carries it** (`place-carries-it`, seed `1625833905`); no redraws.

ROUND 1  
Seen in one second: Marci Metzger’s Pahrump real-estate homepage, with a clear path to explore homes.  
Idea (one sentence): Pahrump’s Mountain Falls landscape becomes the full-bleed opening and the visual thread through the home-search journey.  
Live thing: A thumb-friendly property search that filters clearly labeled sample records.  
Layout words by section: hero=full-bleed / about=split / sell=feature-and-proof / search=filter-and-list / gallery=mosaic / services=three-card row / contact=three-column / footer=directory.  
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1  
Caps applied: creativity capped at 7 because the place-based idea could also fit a nearby Pahrump competitor.  
Top three problems (most visible first), each with the screenshot it shows in and the fix:  
1. Sample listing photos do not always match their displayed category, especially Commercial property (desktop-page-01 and mobile-page-01); replace the sample images and records with verified examples before launch.  
2. The nearly 90 clients and $28.5M volume are historical 2021 figures (desktop-page-01 and tablet-page-01); confirm or replace them with approved current results.  
3. Some Pahrump community photographs repeat between listings, gallery, and services (desktop-page-01 and desktop-page-02); replace repeats with distinct approved property and community photos when available.

ROUND 2 — contact-section refinement  
Seen in one second: The contact destination is clearly split between a direct phone option and a message form, followed by a separate office location and live map.  
Idea (one sentence): Mountain Falls frames the invitation to contact Marci, then the office's actual map anchors the location details.  
Live thing: A client-side validated demo message form with an explicit confirmation that no message is sent; the office map can be opened in Google Maps for directions.  
Layout words by section: contact=landscape backdrop / message form; office=interactive map / verified details; mobile=vertical stack.  
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1  
Remaining top problems are listed in Round 1; this refinement does not replace the sample listings or verify the historical sales figures.

ROUND 3 — Marci portrait badge  
Seen in one second: The portrait and benefit points reinforce Marci's experience, with the experience badge clearly visible at the lower-right of her image.  
Idea (one sentence): Marci's Pahrump landscape motif becomes a small mountain-line mark on her nearly-three-decades badge.  
Live thing: The existing property search remains the homepage's live prototype interaction.  
Layout words by section: about=experience copy / benefit row / cropped portrait with overlapping badge; mobile=full portrait with compact badge.  
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1  
Remaining top problems are listed in Round 1; the portrait refinement does not replace sample listings or verify historical sales figures.

## Imagery and content to confirm

- The visible images are bundled local copies of assets from Marci’s existing website: `marci-live-wordmark.png`, `marci-live-portrait.jpg`, `marci-full-portrait.png` (the supplied full portrait), `mountain-falls-pond.jpg`, `beacon-ridge-alt.jpg`, `beacon-ridge-home.jpg`, `roseworthy-home.jpg`, `ailanto-interior.jpg`, `ailanto-exterior.jpg`, `ailanto-garden.jpg`, and `beacon-ridge-pool.jpg`. The two newly added gallery photos were downloaded from the original website’s image host; reuse rights should be confirmed before production. No Wikimedia/open-collection images are used on the page.
- The office section uses a live Google Maps embed for 3190 HW-160, Suite F, Pahrump, Nevada 89048, United States; Google Maps provides its own map attribution.
- No video is used. The available local clip was geology footage rather than a suitable Pahrump or real-estate scene.
- Verify the three sample listing categories, prices, and matching photographs before replacing the prototype search with live listings.
- Confirm the historical 2021 statistics and all business details before launch.
- Connect property search and contact email delivery to production services. Both remain prototype-only; the current form intentionally sends nothing.

## Gallery carousel update

- The gallery now presents one of its eight photographs at a time, with labeled previous/next buttons and an announced “Photo X of 8” counter. Navigation wraps from the first image to the last and vice versa.
- The active photograph still opens in the existing lightbox, which can navigate all eight images independently. With JavaScript disabled, all eight images remain visible and carousel controls stay hidden.
- `npm run build` and `node --check src/main.js` passed. Browser interaction checks confirmed one visible slide, both wrap directions, and lightbox captions advancing from photo 1 to photo 2 with no JavaScript errors.
- The final design inspection reported **0 failures and 4 warnings** at 1440px, 768px, and 390px. All nine final fold/page screenshots were reviewed; the carousel layout and controls are visible and usable in each responsive view.
