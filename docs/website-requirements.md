# Website Requirements — Pakistan Pet Shop + House-Call Vet Platform

*Keep this file updated as we refine things. Paste it into any new conversation so context carries over.*

---

## 1. Business concept
- A combined **pet shop (e-commerce) + house-call vet booking** website/app for the **Pakistan** market.
- Build tool: **Windsurf** (AI coding IDE).
- Target launch: single-city first (to be decided — likely Lahore, Karachi, or Islamabad), not nationwide claims at launch.

## 2. Closest reference business models (researched)
- **Supertails** (India, supertails.com) — closest match: e-commerce + at-home vet + pharmacy, built for a similarly-maturing pet-care market. Primary model to emulate.
- **Chewy** (USA) — e-commerce/pharmacy UX gold standard (Autoship, pet profiles, Rx flow).
- **BetterVet / Fuzzy / The Vets** (USA) — clean house-call booking flow.
- **ServiceMarket Dubai** — marketplace/aggregator model with transparent upfront pricing.
- **Petla** (Germany/EU) — city-based directory of mobile vets.

## 3. Design inspiration — visual direction

### From VetMobile (Singapore, vetmobilesg.com)
- **Feature to include:** an animated mascot (their orange cat) that moves/follows around the screen — decorative brand personality touch. To be built as a mouse-follow or scroll-parallax SVG animation. (Discussed but not yet built — revisit later.)
- Warm orange/peach color scheme, playful geometric animal illustrations.

### From The Housecall Vet (Singapore, thehousecallvet.com.sg) — PRIMARY visual reference
This is the main style reference for colors, grid, and cards. Confirmed from screenshots:

**Color palette:**
- Header bar: sage/mint green (#a8c9b8-ish tone)
- Body background: warm cream/beige (#EDEADF-ish tone)
- Accent/secondary background: soft teal-green for buttons and icon fills
- Text: navy/dark blue for headings, dark gray for body copy
- Logo mark: two-tone blue (steel blue + white) animal silhouettes inside a teal house-shape icon
- White section breaks with organic "wave" dividers between cream and white sections

**Layout/UI patterns to replicate:**
1. **Hero section:** centered logo/icon mark, tagline, soft organic blob shapes in background corners (cream, sage, tan blobs), circular cropped photo peeking in from bottom edge.
2. **About section:** two-column layout — circular-cropped photo on one side, heading + body text + on the other. Wavy/squiggle line as a small divider under headings. Organic blob shapes as background decoration.
3. **"Why Us" benefit grid:** 3-column x 2-row icon grid. Each cell = flat-style icon illustration + bold caps heading + 1–2 line description. Clean white background, generous spacing, no card borders/shadows — just icon + text stacked and centered.
4. **Vet/team bio section:** repeats the circular photo + text layout, includes a CTA button ("Learn More") in the mint/teal color with white centered caps text.
5. **"How It Works" section:** numbered steps (Step 1, Step 2...) in a **staggered/offset zigzag layout** (alternating left-right, not a straight vertical list), each with a small flat icon, heading, and short description. Thin diagonal/dotted connecting lines between steps.
6. **Services & Pricing section:** icon accents (syringe, pill capsule) scattered near heading, wavy divider under the section title, simple dash-prefixed (–) list for services, followed by a clearly formatted pricing block (bold price line + fine print underneath).
7. **Testimonials:** circular customer photo + quote + name + date, presented as clean stacked cards/sections rather than boxed cards with borders.
8. **General aesthetic:** soft, rounded, "clinic-but-friendly" feel — organic blob/wave shapes throughout, no harsh straight lines or heavy shadows, flat-illustration icon style (not photographic icons), generous white space, all-caps tracked-out headings paired with normal-case body text.

## 4. Functional features requested (from earlier research/discussion)
- WhatsApp-based booking option (high priority for Pakistan market)
- Web-based vet booking flow: service type → date/time slot → address → confirm
- Transparent starting prices shown before booking
- Vet credential/bio pages (with PVMC registration shown for trust)
- Pet profile system (species, breed, age, weight, allergies)
- Product catalog / pet shop e-commerce
- Pharmacy/Rx section with prescription upload or in-house vet confirmation
- Cash-on-delivery/visit checkout support (COD only; no online payment gateway integration for MVP)
- Single-city coverage map/area shown honestly
- Basic digital pet health record (vaccination history, weight tracking)
- Autoship/subscribe-and-save for recurring items (later phase)
- Live chat or callback support option
- Bilingual (Urdu/English) key CTAs at minimum
- Numbered "How It Works" explainer section (borrowed from Housecall Vet SG layout)
- Icon-grid "Why Us" trust/benefits section (borrowed from Housecall Vet SG layout)
- Testimonials section with real names/photos where possible
- Animated mascot/brand character element (borrowed from VetMobile SG) — to be scoped later

## 5. Discovery session — decisions locked in

| Decision | Answer |
|---|---|
| Launch city | **Lahore** (single-city launch, expand later) |
| Vet model | **In-house vets**, hired directly by the business |
| Vets currently confirmed | **1–2 vets already confirmed** — ready to list real bios/credentials on launch |
| Animals served | **Dogs, cats, and small pets** (birds, rabbits, hamsters) — no exotics or livestock at launch |
| Visual style | **Housecall Vet SG palette/layout** (teal + cream, organic blob shapes, soft rounded aesthetic) as the primary style, **plus the walking-cat mascot animation from VetMobile SG** as the one borrowed feature — nothing else from VetMobile |
| Pet shop fulfillment | **Owner stocks and ships products themselves** (not a marketplace/dropship model) |
| Platform | **Website first**; mobile app is a planned Phase 2, not needed at launch |
| Timeline | **No fixed deadline — quality over speed** |
| Payments | **Cash on delivery/visit only.** No online payment gateway integration is required for MVP. |
| Language | **UPDATED: English only, no Urdu.** Client decided against Urdu touches after further thought — keep it simple. |
| Vet booking UX | **UPDATED (superseded earlier decision):** request-and-confirm model, not a fully automated live calendar. Customer selects a preferred date/time from a calendar-style picker → request lands in the admin panel → admin (currently the client, acting as the vet) manually confirms/reassigns → customer gets notified via automated WhatsApp message. This is simpler to build than true live-slot booking and matches how the business will actually operate with 1-2 vets managing things manually for now. Revisit true live-availability calendar once there's enough booking volume to justify it. |
| Brand name | **Pet Care by Akasha** — final decision, named after the client's wife. Confirmed no conflicts found (only unrelated near-matches: a Tokyo vet clinic "Akasaka Animal Hospital" and an individual US veterinarian named "Dr. Akashi" — neither is a real collision). This gives the brand a genuine personal founder story to use on the About page, in line with the warm/caring tone direction. Earlier candidates ruled out during discovery: PawNest, PawHaven, TenderPaws, PetGo, VetNow, PetVetCo, Petopia, Vetopia, CozyPaws (all had existing conflicts). **Client should still independently verify via domain registrar + Pakistan IPO trademark search before final commitment.** |
| Windsurf familiarity | Client has **used Windsurf before / knows the basics** — build instructions can assume some technical comfort, don't need to over-explain the tool itself |

## 5a. New features added (this session)

**Emergency red button**
- Persistent, always-visible button (top of site, likely fixed/sticky in header or a floating corner button) styled in red/alert color to stand out against the calm teal/cream palette.
- **UPDATED:** on click, shows one lightweight confirmation tap (e.g. "Call the vet now?") before placing the call/opening WhatsApp — not a fully zero-friction single tap. This prevents accidental misclicks and prank calls from tying up the vet's line, while still being fast enough for a genuine emergency (one extra tap, no form, no delay beyond that).
- Design note: needs to visually contrast intentionally against the soft palette without breaking the overall calm aesthetic — e.g. a solid red pill/circle button, not a jarring banner.

**AI chat assistant ("Ask a Vet Bot")**
- Purpose: answer **basic, non-diagnostic questions** — food/diet advice, general care tips, common husbandry questions (e.g. "how often should I bathe my rabbit").
- Scope: **smarter/more conversational AI**, not just canned FAQ buttons — but explicitly **must not attempt diagnosis** of symptoms, illnesses, or medical conditions.
- Needs a clear disclaimer in the chat UI (e.g. "I can help with general pet care questions. For anything about your pet's health or symptoms, please book a vet visit.") and should actively redirect medical/symptom questions to the booking flow or emergency button rather than answering them.
- Technical implication: this requires an LLM API integration — **UPDATED: Google Gemini API (via Google AI Studio), chosen for its genuine free tier (no credit card, no expiring trial credit)**, replacing the originally planned Anthropic/OpenAI option to avoid ongoing per-token API costs — with a carefully scoped system prompt restricting it to general care topics. Note: on the free tier, Google may use prompts to improve their models (disclosed in their terms); low-stakes tradeoff here since no sensitive personal/medical data is involved. This is a distinct build task from the booking calendar work and should be scoped separately.

## 6. Tech stack — FINALIZED

| Layer | Choice | Why |
|---|---|---|
| **Framework** | **Next.js** (React) | Full-stack in one project — frontend + backend API routes together. Works well with Windsurf. Industry-standard for this kind of build. |
| **Styling** | **Tailwind CSS** | Fast to implement the soft/organic Housecall Vet-style design (custom colors, rounded shapes, spacing) without fighting a heavy CSS framework. |
| **Database + Auth + Storage** | **Supabase** (Postgres) | Handles user accounts, vet availability/bookings (with real-time subscriptions — good fit for the live calendar), product/order data, and image storage all in one place. Generous free tier for an MVP. |
| **AI chat backend** | Next.js API route → **Google Gemini API** (via `@google/generative-ai` package) | Keeps the API key server-side and safe. Genuine free tier, no card required. The route enforces the "no diagnosis, redirect medical questions" system prompt logic. |
| **Payments** | **Cash on delivery/visit only** — no payment gateway integration needed for MVP | COD is handled purely as an order status flag; no gateway work required. |
| **Hosting** | **Vercel** | Built for Next.js, simplest deployment path, free tier is enough for launch. |
| **Booking calendar** | Custom-built on Supabase real-time tables (not a 3rd-party calendar plugin) | Gives full control over vet availability logic (1-2 vets, Lahore-only, specific time slots) rather than fighting a generic scheduling tool. |

**Why not simpler (plain HTML/CSS/JS or WordPress)?** Both the live booking calendar and the AI chat need a real backend and database — a static site or basic WordPress site can't safely handle either. This stack is still lightweight enough for a 1-2 vet, single-city MVP, and it's a pattern Windsurf handles well since it's extremely common.

## 8. Sitemap — finalized

**Primary navigation:**
1. Home — hero, "why house-call vet" trust icon-grid (Housecall Vet SG style), featured shop products, always-visible emergency button, CTA to book
2. Shop — product catalog (dog/cat/small pet categories), filters, cart, checkout
3. Book a Vet — real-time calendar booking flow (service type → date/time → address → confirm)
4. Our Vets — bios/credentials for the 1-2 confirmed vets, PVMC registration shown
5. About — founder story (Pet Care by Akasha), Lahore focus, mission
6. Contact — WhatsApp, phone, email, service area map

**AI chat assistant access:** both a persistent chat bubble available on every page (like Intercom) AND a dedicated full page for longer conversations — not gated behind a single access point.

**Utility/footer pages:**
7. Cart / Checkout (linked from cart icon, not nav)
8. Order tracking / My Orders (optional account feature)
9. My Pets — pet profile management (optional account feature)
10. My Bookings — past/upcoming appointments (optional account feature)
11. FAQ — important given house-call vets are a new concept in this market
12. Privacy Policy / Terms of Service — standard compliance and trust pages
13. Returns/Refund Policy

**Account model:** guest checkout and guest booking both allowed — no forced account creation. Account features (My Pets, My Bookings, Order history) are available but optional, for returning customers who want them.

**Explicitly deferred to Phase 2 (not in MVP):** livestock/farm-animal page, multi-city selector, mobile app links, loyalty/points program page.



## 9. Logo — finalized direction

After testing ~8 concepts (house+paw illustration, side-by-side wordmark variants in multiple colors, monogram, full script), settled on:

- **Layout**: stacked lockup — abstract paw mark (mix of filled and outline circles, not a literal cartoon paw) centered above the wordmark. Chosen specifically because a stacked mark crops cleanly into a square for app icons/favicons/social profile photos, unlike a side-by-side lockup.
- **Color**: deep sage green (#33574A) as primary, light sage (#7FAF95) as accent, cream (#F5F1E4) for reversed/dark-background use. Sage chosen as the middle ground between clinical (teal/charcoal, too cold for a pet shop) and playful (bright orange/terracotta, undercuts vet trust) — also closest to the original Housecall Vet SG reference palette.
- **Wordmark**: "petcare" in Poppins Bold, lowercase, tight letter-spacing — clean modern sans, not cursive/illustrated (cursive fails at small sizes — favicon/app icon legibility was a hard requirement).
- **Signature line**: "by akasha" in Caveat (script font), smaller, lighter color — personal touch under the main wordmark, named after the client's wife.
- **Deliverables produced**: (1) primary lockup for website header/most uses, (2) standalone icon-only version (mark in a rounded square, cream on dark sage) for favicon/app icon/WhatsApp profile photo, (3) reversed version (cream text/mark on dark sage) for dark backgrounds, footers, dark packaging.
- **Rejected directions and why**: literal house+animal illustration (read as generic/dated), full script wordmark (illegible at small sizes), monogram-only "A" (doesn't communicate "pets" at a glance to a first-time viewer).

## 11. Product categories — finalized

Adapted from petico.my's taxonomy (species → category → subcategory pattern), trimmed for a realistic MVP launch — not organized by brand, so it stays flexible regardless of which suppliers are used.

**Cat**
- Food & Treats: Dry Cat Food, Wet Cat Food, Cat Treats, Milk, Catnip & Cat Grass
- Hygiene & Litter: Cat Litter, Litter Boxes & Scoops, Shampoo & Conditioner, Grooming Tools, Pet Wipes
- Healthcare: Flea & Tick, Supplements & Vitamins, Dental Care
- Accessories & Toys: Cat Toys, Bowls & Feeders, Beds & Mats, Collars & Leashes, Carriers & Cages, Cat Trees & Scratchers

**Dog**
- Food & Treats: Dry Dog Food, Wet Dog Food, Dog Treats, Milk
- Hygiene: Pet Wipes, Poop Bags & Dispenser, Shampoo & Conditioner, Grooming Tools
- Healthcare: Flea & Tick, Supplements & Vitamins, Dental Care
- Accessories & Toys: Beds & Mats, Bowls & Feeders, Collar & Harness, Leashes, Toys, Carriers & Cages

**Small Pets** (birds, rabbits, hamsters)
- Accessories: Cages & Playpens, Cage Accessories, Bowls & Feeders, Hideouts, Toys
- Food & Treats: Hay/Seed Mix, Pellets, Treats
- Healthcare: Vitamins & Supplements
- Hygiene: Bedding & Litter, Cleaners & Sprays

**Explicitly cut from the reference site for MVP, to add in Phase 2:**
- Cooked & Frozen / Raw & Fresh food — requires cold-chain storage and insulated delivery, too much operational overhead for launch
- Sample & Trial Packs — depends on supplier relationships that offer sample sizes, revisit once suppliers are locked in
- Wearables / Gadgets — low-priority niche category, add once core categories are proven

## 13. Delivery / service area — finalized
- **House-call vet visits**: Lahore only, matching the in-house vet model (1-2 vets based in Lahore)
- **Product delivery**: nationwide across Pakistan, via standard courier partners (e.g. TCS, Leopards, PostEx) — no cold-chain needed since Cooked & Frozen/Raw & Fresh food is already deferred to Phase 2

## 14. Community feature — new, finalized

A peer-to-peer community board where pet owners post concerns/questions/photos and other users comment and discuss.

- **Vet involvement**: none — purely peer-to-peer, vets do not participate or moderate content
- **Access**: account required to view or post (not public)
- **Structure**: feed + categories — General/Photos, Behavior & Training, Adoption & Rescue, Health Concerns
- **Safety consideration**: since there's no vet moderation and health-related crowd advice carries real risk if followed uncritically, the "Health Concerns" category gets a standing, non-intrusive disclaimer directing people to book a vet visit or use the AI chat assistant instead of relying solely on peer advice
- **Baseline moderation**: report/flag button on every post and comment (minimum viable safety feature for any user-generated content platform)
- **Photo upload** supported on posts
- **Not in MVP scope**: threading/nested replies, likes/reactions system, vet verification badges — keep launch version simple
- **Tech note**: this adds meaningful scope — user accounts (already planned, now becomes required for this feature specifically), image storage (Supabase Storage), and a moderation/reporting data model. Should be sequenced as a distinct build phase from the core shop + booking flow, not built simultaneously.

## 15. Admin panel — new, finalized

Given the manual request-and-confirm booking model above, a proper admin panel is required, not optional. Scope:

- **Product management**: full CRUD (add/edit/delete products, categories, pricing, stock)
- **Order management**: view all shop orders, change order status (e.g. pending → confirmed → shipped → delivered), view customer/order details
- **Booking management**: view all vet visit booking requests, confirm/reassign/reschedule, change booking status (e.g. requested → confirmed → completed → cancelled)
- **Automated notifications**: **UPDATED — switched from WhatsApp to email**, since automated WhatsApp Business API has real per-message/setup costs and the client wants to avoid paid API fees. Order and booking status changes will trigger an automated email instead (e.g. "Your booking is confirmed for Tuesday 3pm" or "Your order has shipped"), sent via **Resend** (confirmed genuinely free at this scale: 3,000 emails/month, 100/day, no credit card required — comfortably covers a single-city, 1-2 vet MVP). Pairs natively with the Next.js + Supabase stack, no extra infrastructure needed.

**Technical flag — WhatsApp stays link-only, not automated:** the *emergency button* and general *contact* WhatsApp links remain simple, free `wa.me` links — no API needed for those. Automated WhatsApp notifications (triggered by status changes) are explicitly deferred to a future paid addition, not part of MVP. For now, the admin can still manually message customers via regular WhatsApp if needed, alongside the automated email.

**Access**: admin panel should be a separate authenticated area (not part of the public site), restricted to the client/business owner initially, since there's no separate staff/employee structure yet.

## 16. Vet visit payment timing — UPDATED
**Cash on delivery/visit only.** Customer pays on-site at the visit in cash, consistent with how local clinics typically operate. No online payment step is needed in the booking flow for MVP.

## 17. Still open (for next session)
- Hand off final logo SVG files to a designer/Windsurf for production-ready assets (current versions are concept-stage, built for review, not final print/production files)
- Real vet bios needed before launch: actual names, photos, and PVMC registration numbers for the "Our Vets" page — client confirmed these will be added later, launch with a placeholder "meet the team soon" state rather than fabricated content
- WhatsApp Business API setup — explicitly deferred as a future paid addition, not needed for MVP

---
*This doc is now feature-complete for a first Windsurf build prompt. Recommended build sequencing: (1) core site + shop + booking calendar, (2) AI chat + emergency button, (3) community feature as a distinct phase given its added scope.*






