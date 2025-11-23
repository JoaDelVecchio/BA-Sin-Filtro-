# Expanding Story Cluster Collection

Comprehensive plan to ensure all sections (Top 5s, timelines, topic pages) are populated with sufficient story clusters from multiple RSS sources.

## Problem Analysis

Current limitations preventing sufficient story cluster generation:

1. **Limited article fetching**: Only 24 articles maximum, 4 per feed
2. **AI output constraints**: Limited to 3-5 clusters max, 2048 tokens
3. **Incomplete topic coverage**: Schema missing "CABA" and "Buenos Aires (PBA)" as topic options
4. **Topic categorization**: AI needs clear guidance to properly analyze and assign topics
5. **Insufficient clusters for all pages**: Homepage, topic pages, and popular pages all need multiple clusters

## User Review Required

> [!IMPORTANT]
> **Topic Categorization Enhancement**
> 
> The AI schema will be updated to include all 9 topics (including CABA and Buenos Aires PBA as topics, not just regions). The prompt will be enhanced to properly analyze each article and assign the most appropriate topic category for better organization across topic pages.

> [!WARNING]
> **Increased API Costs (Mitigated by Caching)**
> 
> Expanding from 24 to 60 articles and increasing max_output_tokens from 2048 to 16000 will increase OpenAI API costs **per generation**. However, with 24-hour caching enabled, the API will only be called once per day, significantly reducing overall costs compared to per-request generation.

## Proposed Changes

### RSS Sources Configuration

#### [KEEP] [sources.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/rss/sources.ts)

Keep the existing single source (La Nación) - it's a comprehensive site with enough content. No changes needed.

---

### AI Schema - Topic Coverage

#### [MODIFY] [lib/ai/schema.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/ai/schema.ts)

Update `TOPIC_ENUM` to include all 9 topics from `MAIN_TOPICS`:

```typescript
export const TOPIC_ENUM: Topic[] = [
  "Política y Gobierno",
  "Economía",
  "Salud",
  "Negocios",
  "Tecnología",
  "Ciencia",
  "Educación",
  "CABA",                    // NEW
  "Buenos Aires (PBA)",      // NEW
];
```

Update cluster limits to generate more clusters:
- `minItems`: 3 → **8**
- `maxItems`: 5 → **20**


---

### Article Fetching Configuration

#### [MODIFY] [story-clusters.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/story-clusters.ts)

Increase article limits to fetch more content from La Nación:
- `perFeedLimit`: 4 → **60** (get many articles from the single source)
- `maxArticles`: 24 → **60** (process more total articles)
- Keep `sinceMinutes`: 12 * 60 (12 hours)

After deduplication and clustering, send **60 articles** to AI (up from 24).


---

### AI Generation Parameters

#### [MODIFY] [generate-story-clusters.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/ai/generate-story-clusters.ts)

Increase token limit to allow more story clusters:
- `max_output_tokens`: 2048 → **16000**

This allows the AI to generate approximately **15-20 clusters** instead of ~5-8.

---

### AI Prompt Optimization

#### [MODIFY] [build-prompt.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/ai/build-prompt.ts)

Update prompt to encourage more cluster generation and better topic categorization:
- `MAX_ARTICLES`: 24 → **60** (process more articles)
- Add explicit instruction to generate **8-20 clusters** based on content diversity
- **Enhance topic analysis instructions**:

Add to the user prompt:
```typescript
const userPrompt = `Hoy es ${new Date().toISOString()}.
Analiza las notas JSON (con id, titulo, resumen, contenido y metadata) para crear story clusters para lectores del AMBA.

IMPORTANT: Para cada cluster, **analiza cuidadosamente el contenido** y asigna el topic más apropiado de esta lista:
- "Política y Gobierno" - gestión pública, instituciones, decisiones políticas
- "Economía" - inflación, tarifas, subsidios, datos macro
- "Salud" - sistema sanitario, hospitales, políticas de salud
- "Negocios" - empresas, PYMES, comercio
- "Tecnología" - innovación, digitalización, startups
- "Ciencia" - investigación, proyectos científicos
- "Educación" - escuelas, universidades, sistema educativo
- "CABA" - obras, servicios, gobierno porteño
- "Buenos Aires (PBA)" - medidas provinciales, intendencias, conurbano

El topic debe reflejar el TEMA PRINCIPAL del cluster, no solo la ubicación geográfica.
Si una nota trata sobre economía EN CABA, el topic es "Economía" y region es "CABA".
Si una nota trata sobre decisiones del gobierno DE CABA, el topic es "CABA".

Genera entre 8 y 20 clusters cubriendo diversos topics y ángulos.
Cada cluster debe centrarse en un ángulo claro y citar 1-3 ids de notas relevantes en "sourceArticleIds".

Requisitos:
- Headline breve y subtitulo de contexto.
- Lede en 1-2 oraciones sintetizando el hecho.
- 3 a 7 axioms siguiendo las reglas.
- Tags opcionales con entidades (sin #) de hasta 4 items.
- region solo CABA o PBA cuando el foco geográfico sea claro.
- Todo debe estar en español.

${AXIOM_RULES}

Dataset:
${datasetJson}`;
```

This ensures the AI:
1. **Analyzes content** to determine the primary topic theme
2. **Distinguishes** between topic (theme) and region (location)
3. **Covers all 9 topic categories** when appropriate
4. **Generates more clusters** (8-20 instead of 3-5)


---

### Data Caching Strategy

#### [MODIFY] [story-clusters.ts](file:///Users/joaquindelvecchio/Documents/basinfiltro/lib/story-clusters.ts)

Implement Next.js `unstable_cache` to cache story clusters for 24 hours:

```typescript
import { unstable_cache } from 'next/cache';

const fetchLiveClusters = unstable_cache(
  async (): Promise<StoryCluster[]> => {
    // ... existing fetch logic
  },
  ['story-clusters'], // cache key
  {
    revalidate: 86400, // 24 hours in seconds
    tags: ['story-clusters']
  }
);
```

**Benefits**:
- ✅ Cached across all users and pages
- ✅ Only fetches/generates once every 24 hours
- ✅ Fast page loads (serves from cache)
- ✅ Significantly reduced API costs

**Cache invalidation options**:
- Automatic: Every 24 hours
- Manual: Call `revalidateTag('story-clusters')` when needed

---

### Page-Level Caching

#### [MODIFY] [app/(public)/page.tsx](file:///Users/joaquindelvecchio/Documents/basinfiltro/app/(public)/page.tsx)

Add revalidation configuration to homepage.

#### [MODIFY] [app/(public)/tema/[topic]/page.tsx](file:///Users/joaquindelvecchio/Documents/basinfiltro/app/(public)/tema/[topic]/page.tsx)

Add revalidation configuration to topic pages.

#### [MODIFY] [app/(public)/mas-buscados/[topic]/page.tsx](file:///Users/joaquindelvecchio/Documents/basinfiltro/app/(public)/mas-buscados/[topic]/page.tsx)

Add revalidation configuration to popular topic pages.

For each page, export:
```typescript
export const revalidate = 86400; // 24 hours
```

This ensures Next.js uses Incremental Static Regeneration (ISR) and caches the entire page for 24 hours.


## Verification Plan

### Automated Tests

```bash
# Build the project
npm run build

# Start dev server
npm run dev
```

### Manual Verification

1. **Homepage verification**:
   - Verify Top 5 section has 5 articles
   - Verify timeline has 10+ articles
   - Verify popular tabs can find matching articles

2. **Topic pages verification**:
   - Visit `/tema/politica-y-gobierno`
   - Verify Top 5 section has 5 articles
   - Verify timeline has additional articles
   - Verify "No encontramos artículos" doesn't appear

3. **Popular topic pages verification**:
   - Visit a popular topic page (e.g., `/mas-buscados/subte`)
   - Verify Top 5 has 5 articles
   - Verify timeline has content
   - Verify quick facts show article count

4. **Diversity verification**:
   - Check that clusters come from multiple sources (not just one outlet)
   - Verify different topics are represented
   - Confirm both CABA and PBA regions appear when appropriate

5. **Cache verification**:
   - Load homepage and note the content
   - Refresh the page multiple times - content should be identical (served from cache)
   - Check Network tab - no new API calls to OpenAI
   - Open different pages (`/tema/politica-y-gobierno`, `/tema/economia`) - same clusters used
   - Wait 24 hours and verify content updates automatically
   - Check `.next/cache` directory for cached data

