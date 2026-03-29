# MUN Campus Compass 🧭

**Live App → [harshituppala.github.io/campus-compass](https://harshituppala.github.io/campus-compass)**

An interactive campus discovery platform for Memorial University of Newfoundland students — find events, study spaces, clubs, resources, food, health services, and career opportunities, all in one place with map and list views.

---

## The Problem

MUN has hundreds of events, resources, and spaces that students simply never discover. Information is scattered across department websites, Facebook groups, and bulletin boards. There's no single searchable, filterable interface for campus life.

## The Solution

Campus Compass aggregates everything into a clean, fast, searchable app with:
- **7 categories** — Events, Study Spaces, Clubs, Resources, Food, Health & Wellness, Career
- **List view** with search and tag filtering
- **Map view** with interactive pins on a campus layout
- **Detail panels** with capacity tracking, contact info, and registration links
- **Urgency indicators** — "Only 12 spots left!" when events fill up
- **Featured listings** for high-priority items

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Styling | Inline CSS with design tokens |
| Map | Custom SVG campus layout with coordinate projection |
| Deployment | GitHub Pages (`gh-pages`) |
| Data | Curated MUN campus dataset (extensible to REST API) |

---

## Architecture

```
App.js
  ├── Data Layer        ← LISTINGS[] with real MUN locations, coordinates, metadata
  ├── CampusMap         ← SVG map with lat/lng → pixel projection, clickable pins
  ├── ListingCard       ← Filterable card with urgency, category badge, featured flag
  ├── DetailPanel       ← Full detail view with capacity bar, tags, mailto CTA
  └── Filter System     ← Category tabs + full-text search with useMemo
```

**Coordinate Projection:**
Real lat/lng coordinates are projected to SVG pixel positions using a simple linear transform over MUN's bounding box — the same principle used in web mapping libraries like Leaflet.

---

## Running Locally

```bash
git clone https://github.com/harshituppala/campus-compass
cd campus-compass
npm install
npm start
# → http://localhost:3000
```

## Deploying to GitHub Pages (Free)

```bash
npm run deploy
# Builds and pushes to gh-pages branch automatically
# Live at https://harshituppala.github.io/campus-compass
```

---

## Roadmap

- [ ] REST API backend (Node.js + PostgreSQL) for real-time data
- [ ] Student auth via MUN login (OAuth)
- [ ] Event submission form for clubs and departments
- [ ] Push notifications for upcoming events
- [ ] Integration with MUN Events calendar API
- [ ] Google Maps API for accurate building navigation

---

## Project Context

Built as part of my CICS internship application portfolio. Addresses a genuine discoverability gap at MUN — information about campus life is fragmented across dozens of unconnected sources. This project demonstrates full-stack thinking (even in a frontend-only MVP), real product design decisions, and understanding of user needs within a community I'm part of.

---

## Author

**Harshit Kumar Uppala**
B.Sc. Computer Science, Memorial University of Newfoundland
[github.com/harshituppala](https://github.com/harshituppala) · hkuppala@mun.ca
