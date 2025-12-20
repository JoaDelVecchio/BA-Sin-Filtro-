# SmartNews Mimicry Verification

## Changes Implemented
- **UI Overhaul**: Replaced the homepage with a SmartNews-like tabbed interface.
- **Components**:
    - `SmartNewsLayout`: Manages tabs and state.
    - `NewsFeed`: Renders the list of articles.
    - `NewsCard`: Displays individual articles (standard and featured).
    - `SmartView`: A clean, distraction-free reading experience.
- **Data Expansion**:
    - Increased article fetching limit to 60.
    - Increased AI cluster generation to 8-20.
    - Added "CABA" and "Buenos Aires (PBA)" topics.
    - Implemented 24h caching.

## Verification Steps

### 1. Build Verification
- [x] Run `npm run build` to ensure no type errors or build failures. (Build Succeeded)

### 2. Manual Verification
- [ ] **Homepage**:
    - Verify the new tabbed layout appears.
    - Verify tabs are scrollable and clickable.
    - Verify the "Top" tab shows articles.
- [ ] **Tab Navigation**:
    - Click "Política y Gobierno", "Economía", etc.
    - Verify the feed updates with relevant articles.
- [ ] **SmartView**:
    - Click on an article card.
    - Verify the SmartView overlay appears.
    - Verify content (headline, image, axioms) is displayed correctly.
    - Verify the "Close" button works.
- [ ] **Data**:
    - Verify that we have enough articles (around 8-20 total) to populate the tabs.
