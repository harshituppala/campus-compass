# Campus Compass

A React prototype for browsing campus events, study spaces and student resources at Memorial University of Newfoundland. Search, category filters and a schematic map give different ways to explore the same local dataset.

## Scope

Listings are hard-coded in `src/App.js`. Event dates, availability counts and contacts are illustrative and may be out of date. This is not an official university directory, booking system or live campus feed. Confirm details with the university before relying on a listing.

The map projects coordinates onto a custom SVG; it does not provide navigation or authoritative building geometry. The project is frontend-only: there is no account service, database or live capacity tracking.

## Run locally

```sh
npm ci
npm start
```

Open http://localhost:3000. `npm run build` creates a production build. `npm run deploy` publishes it to the repository's configured GitHub Pages destination; deployment availability has not been reverified in this documentation pass.

## Implementation

React manages the selected category, search query, map/list view and detail panel. Filtering runs over the bundled listings. Keeping the data in one file made the interaction prototype straightforward, but prevents independent content updates and makes stale dates easy to miss.

A useful next step would be a maintained data source with provenance and a visible last-reviewed date. Authentication and notifications would not solve the current data-quality problem.

No user study or automated interaction test suite is recorded in this repository.
