# Design Guidelines: RSS Feed Dashboard

## Design Approach

**Selected Approach:** Design System - Modern Dashboard Pattern
**Inspiration:** Linear, Notion, and modern SaaS dashboards
**Rationale:** This is a utility-focused application prioritizing clarity, scannability, and efficient data presentation. The design should feel lightweight, professional, and purposeful.

**Core Principles:**
1. Information hierarchy optimized for scanning article lists
2. Minimal visual noise to keep focus on content
3. Responsive layout that works seamlessly across devices
4. Smooth theme transitions without jarring visual shifts

---

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) for UI elements and body text
- Monospace: JetBrains Mono for technical elements/URLs if needed

**Type Scale:**
- Page Title: text-3xl, font-semibold (Dashboard header)
- Section Headers: text-xl, font-medium
- Article Titles: text-base, font-medium
- Body/Links: text-sm, font-normal
- Metadata: text-xs, font-normal

**Line Height:**
- Headers: leading-tight
- Article titles: leading-normal
- Body text: leading-relaxed

---

## Layout System

**Spacing Primitives:** We will use Tailwind units of 2, 4, 6, 8, 12, and 16 (e.g., p-4, m-8, gap-6)

**Container Structure:**
```
- Maximum width: max-w-6xl
- Centered layout: mx-auto
- Horizontal padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Vertical rhythm: py-8 for sections, py-12 for major sections
```

**Grid/Spacing:**
- Card spacing: gap-4 between items
- Section spacing: mb-8 to mb-12 between major sections
- Compact spacing for metadata: gap-2

---

## Component Library

### 1. Header Navigation
**Structure:**
- Full-width sticky header (sticky top-0)
- Height: h-16
- Contains: Dashboard title (left), Theme toggle button (right)
- Separator: Subtle border-bottom
- Background: Translucent with backdrop blur (backdrop-blur-md)

**Layout:**
- Flexbox with justify-between
- Items vertically centered (items-center)
- Inner container: max-w-6xl mx-auto

### 2. Dashboard Content Area
**Main Container:**
- Padding: py-8 to py-12
- Single column layout on mobile, optimized width on desktop

**Action Bar:**
- Positioned above article list
- Contains: RSS Feed input field (if needed) + Refresh button
- Layout: Flex with gap-4
- Refresh button: Prominent with icon (refresh/reload symbol from Heroicons)
- Full-width on mobile, inline on desktop

### 3. Article List Component
**Card-based List:**
- Each article: Rounded card (rounded-lg)
- Padding per card: p-6
- Spacing between cards: gap-4 in a flex column layout
- Subtle border or surface elevation
- Hover state: Slight scale transform (scale-[1.01]) with smooth transition

**Article Card Structure:**
```
- Article Title (clickable, full card area)
- Metadata row: Published date/time (if available)
- External link indicator icon
- Vertical spacing: gap-2 internal
```

**Interactive States:**
- Clickable entire card area
- Cursor pointer on hover
- Visual feedback: subtle scale and shadow change
- Link opens in new tab

**Empty State:**
- Centered message when no articles
- Iconography: Document/RSS icon from Heroicons
- Helpful text: "No articles yet. Click refresh to load RSS feed."

### 4. Loading State
- Skeleton loaders for article cards
- Animated pulse effect
- Maintains layout structure during load
- Shows 3-5 skeleton cards

### 5. Refresh Button
**Design:**
- Icon + Text combination: Refresh icon + "Refresh Feed"
- Size: px-6 py-3
- Rounded: rounded-lg
- Font: font-medium text-sm
- Icon position: Left of text with gap-2
- Hover: Scale slightly (scale-105)
- Active: Scale down (scale-95)
- Loading state: Spinning icon animation when fetching

### 6. Theme Toggle
**Design:**
- Icon-only button in header
- Size: p-2, rounded-md
- Icons: Sun (light mode), Moon (dark mode) from Heroicons
- Smooth icon transition/crossfade
- Accessible tooltip on hover
- Positioned top-right of header

### 7. Error Handling
**Error Banner:**
- Appears above article list when webhook fails
- Rounded: rounded-lg
- Padding: p-4
- Contains: Error icon + Error message + Dismiss button
- Icon: Alert/Warning from Heroicons

---

## Animations & Interactions

**Minimal, Purposeful Motion:**
- Page transitions: None (instant page loads)
- Theme toggle: Smooth 200ms transition on all theme-dependent properties
- Card hover: 150ms ease-out transform
- Refresh button click: Quick scale bounce (100ms)
- Loading spinner: Continuous rotate animation
- List updates: Fade-in for new articles (300ms)

**No Distracting Animations:**
- No scroll-triggered effects
- No parallax
- No elaborate page transitions
- Focus on micro-interactions only

---

## Accessibility

**Keyboard Navigation:**
- All interactive elements keyboard accessible
- Visible focus states: 2px offset ring
- Skip to main content link
- Tab order: Header → Input → Refresh → Articles

**Screen Reader:**
- Semantic HTML: header, main, article tags
- ARIA labels for icon-only buttons
- Live region for dynamic content updates
- Alt text for all icons

**Visual Accessibility:**
- Minimum contrast ratios maintained in both themes
- Focus indicators visible in all states
- Text remains readable at 200% zoom

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile (< 768px):**
- Stack all elements vertically
- Full-width buttons and inputs
- Reduced padding: px-4, py-6
- Simplified header with hamburger if needed (not likely for this simple app)

**Tablet (768px - 1024px):**
- Maintain single column for article list
- Inline action bar (input + button side by side)
- Increased padding: px-6, py-8

**Desktop (> 1024px):**
- Maximum container width: max-w-6xl
- Optimal reading width for article cards: max-w-3xl within container
- Generous spacing and padding

---

## Icon Library

**Selected Library:** Heroicons (via CDN)
**Icons Needed:**
- Refresh/Arrow Path: Refresh button
- Sun: Light mode indicator
- Moon: Dark mode indicator
- External Link: Article card link indicator
- Document/RSS: Empty state icon
- Alert Circle: Error states

---

## Performance Considerations

- Lazy load article list if becomes very long (>50 items)
- Debounce refresh button (prevent spam clicking)
- Store theme preference in localStorage
- Optimize re-renders on theme toggle
- Efficient webhook polling if implementing auto-refresh