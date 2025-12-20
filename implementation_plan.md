# Pivot to Politics-Only Focus

## Goal Description
Transform the application into a specialized **Politics & Economy** news reader. The user feels the current categorization is poor and wants to focus strictly on "everything about the government and the country" (regulations, economy, politics).

## Proposed Changes

### 1. Simplify Topics
#### [MODIFY] [lib/constants.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/constants.ts)
- Reduce `MAIN_TOPICS` to just 3 core pillars:
    1.  **Política** (Executive, Legislative, Parties, Elections)
    2.  **Economía** (Markets, Taxes, Regulations, Macro)
    3.  **Sociedad** (Social impact of policies, major national events)
- **Remove**: CABA, PBA (unless they are national news, in which case they go to Politics/Society).

#### [MODIFY] [components/smart-news/SmartNewsLayout.tsx](file:///Users/joaquindelvecchio/Documents/basinfiltro/components/smart-news/SmartNewsLayout.tsx)
- Update tabs to: `["Top", "Política", "Economía", "Sociedad"]`.

### 2. Stricter AI Filtering & Categorization
#### [MODIFY] [lib/ai/build-prompt.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/ai/build-prompt.ts)
- **New Instruction**: "STRICTLY FILTER news. Only include articles related to Argentine politics, government regulations, the economy, or major social issues affecting the country. IGNORE sports, entertainment, or purely local news without national relevance."
- **Refine Definitions**:
    - **Política**: Government actions, decrees, opposition, congress.
    - **Economía**: Inflation, dollar, IMF, taxes, business regulations.
    - **Sociedad**: Protests, healthcare/education policy, crime trends (not isolated cases).

#### [MODIFY] [lib/rss/get-latest-articles.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/rss/get-latest-articles.ts)
- Update `TOPIC_KEYWORDS` to map everything into these 3 categories.
- Remove CABA/PBA specific keywords (map them to Politics if they involve the Mayor/Governor, otherwise ignore or map to Society).

### 3. Schema Updates
#### [MODIFY] [lib/ai/schema.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/ai/schema.ts)
- Update `TOPIC_ENUM` to `["Política", "Economía", "Sociedad"]`.

#### [MODIFY] [lib/types.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/types.ts)
- Update `Topic` type.

## Verification Plan
1.  **Clear Cache**: Run `/api/refresh-clusters`.
2.  **Check Feed**: Ensure no "filler" content (horoscope, sports, local traffic) appears.
3.  **Check Tabs**: Verify only the 3 new tabs exist and are populated correctly.
