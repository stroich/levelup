---
name: nextjs-frontend-architect
description: 'Design and build modern UI/UX with Next.js App Router, Server Components, and Tailwind CSS. Use for creating accessible, responsive recipe components and optimizing frontend performance. Follows best practices for component architecture, styling, and accessibility (ARIA).'
argument-hint: 'Component name and requirements (e.g., "RecipeCard with image, title, and rating")'
user-invocable: true
---

# Frontend Architect (Next.js + Tailwind)

Design and implement high-quality UI components for your Next.js application with modern best practices, accessibility, and responsive design.

## When to Use

Use this skill when:
- Creating new UI components (cards, forms, sections, modals)
- Building recipe-related components (hero, ingredients, instructions, nutrition)
- Optimizing component performance and accessibility
- Implementing responsive mobile-first designs
- Adding interactive elements with proper server/client separation
- Selecting and integrating UI libraries (shadcn/ui, Lucide icons)
- Ensuring WCAG accessibility standards and ARIA attributes

## Core Principles

### 1. Server Components by Default
- **Use Server Components** for static content, data fetching, and layout
- Minimize JavaScript sent to the browser
- Fetches happen on the server (secure database queries)
- Example: Recipe detail pages, ingredient lists

### 2. Client Components for Interactivity Only
- Use `'use client'` directive **only** when needed:
  - React hooks (useState, useEffect, useContext)
  - Event handlers (clicks, form submissions)
  - Real-time interactions
- Keep client components small and focused
- Example: Add to cart button, recipe rating component

### 3. Image Optimization with `next/image`
**⚠️ MANDATORY: Never use `<img>` tag. Always use `next/image`.**

Images are critical for SEO and Lighthouse performance scores:
- Use `Image` from `next/image` for all images
- Add `priority` prop for above-the-fold images (e.g., RecipeHero)
- For external images from Supabase Storage, configure `remotePatterns` in `next.config.ts`:
  ```typescript
  // next.config.ts
  export default {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'your-supabase-id.supabase.co',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  };
  ```
- Example:
  ```typescript
  import Image from 'next/image';
  
  export default function RecipeHero({ recipe }: { recipe: Recipe }) {
    return (
      <Image
        src={recipe.imageUrl}
        alt={`${recipe.name} - prepared dish`}
        width={1200}
        height={600}
        priority // for above-the-fold images
        className="w-full h-auto rounded-lg"
      />
    );
  }
  ```

### 4. Design System & Tailwind Configuration
**⚠️ MANDATORY: Use ONLY tokens from `tailwind.config.js`. No inline styles.**

- All colors, spacing, typography, and shadows must come from the config
- Never use magic numbers (e.g., `w-96`, `text-base`) — use semantic config variables
- Extend `tailwind.config.js` with project-specific design tokens
- Example configuration:
  ```javascript
  // tailwind.config.js
  export default {
    theme: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        success: '#06A77D',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
  };
  ```
- Use these tokens in components:
  ```typescript
  <div className="bg-primary p-md rounded-lg shadow-lg">
    <h2 className="text-xl font-bold text-white">Recipe Title</h2>
  </div>
  ```

### 5. Data Layer & Supabase Integration
**Separation of concerns:** Components never call Supabase directly.

- **All Supabase queries** go in `lib/db/queries/` or `app/actions`
- **Use TypeScript types** generated from Supabase:
  ```bash
  npx supabase gen types typescript --project-id YOUR_ID > lib/db/types.ts
  ```
- Example structure:
  ```
  lib/db/
  ├── types.ts (generated via supabase gen types)
  ├── queries/
  │   └── recipes.ts (data fetching)
  app/
  ├── actions.ts (Server Actions for mutations)
  ```
- Query example:
  ```typescript
  // lib/db/queries/recipes.ts
  import { createClient } from '@/utils/supabase/server';
  import type { Recipe } from '@/lib/db/types';
  
  export async function getRecipe(id: string): Promise<Recipe | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  ```
- Server Action example:
  ```typescript
  // app/actions.ts
  'use server';
  import { createClient } from '@/utils/supabase/server';
  
  export async function likeRecipe(recipeId: string) {
    const supabase = createClient();
    return supabase.from('likes').insert({ recipe_id: recipeId });
  }
  ```

### 6. Accessibility (ARIA) & Responsiveness
- Add semantic HTML: `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`
- Use ARIA labels for complex interactive elements: `aria-label`, `aria-expanded`, `aria-selected`
- Keyboard navigation: Focus states, tab order, keyboard shortcuts
- Mobile-first approach: Design for small screens, enhance for larger ones
- Test with screen readers (NVDA, JAWS) and keyboard navigation
- Ensure sufficient color contrast and readable font sizes

### 7. Recommended Libraries
- **shadcn/ui**: Pre-built, accessible components (buttons, inputs, dropdowns, etc.)
- **Lucide React**: 400+ clean, consistent icons
- Both are TypeScript-ready and Tailwind-compatible

## Component Creation Workflow

### Step 1: Define Component Purpose
- What does the component display or do?
- Is it static or interactive? (Determines Server vs Client)
- What data does it need? (Query from `lib/db/queries/`, not direct Supabase)
- What ARIA attributes are necessary?

### Step 2: Choose Server or Client
```typescript
// Server Component (default) - no directive needed
// Import data from lib/db/queries, NOT supabase directly
import { getRecipe } from '@/lib/db/queries/recipes';

export default async function RecipeDetail({ id }: { id: string }) {
  const recipe = await getRecipe(id); // Use query function, not supabase
  return <article>...</article>;
}

// Client Component - explicit 'use client'
// Use for interactivity and hooks ONLY
'use client';
import { useState } from 'react';
import { likeRecipe } from '@/app/actions'; // Use Server Actions for mutations

export default function RatingButton({ recipeId }: { recipeId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = async () => {
    await likeRecipe(recipeId);
    setIsLiked(!isLiked);
  };
  
  return <button onClick={handleLike}>...</button>;
}
```

### Step 3: Structure with Accessibility & Images
- Use semantic HTML tags
- Add ARIA attributes for clarity
- Ensure proper heading hierarchy (h1, h2, h3)
- **Always use `next/image`** for all images — never use `<img>` tag

```typescript
import Image from 'next/image';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article
      className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      aria-label={`Recipe: ${recipe.name}`}
    >
      {/* Use next/image, not <img> */}
      <Image
        src={recipe.imageUrl}
        alt={`${recipe.name} - prepared dish`}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
        <p className="text-gray-600">{recipe.description}</p>
      </div>
    </article>
  );
}
```

### Step 4: Apply Tailwind Design System
**⚠️ MANDATORY: Use ONLY design tokens from `tailwind.config.js`. No inline styles or arbitrary values.**

- Mobile-first: Start with base styles, add responsive variants
- Use semantic color names from config (primary, secondary, success, etc.)
- Use spacing scale from config (xs, sm, md, lg, xl)
- Never use magic numbers or arbitrary values like `w-96`, `px-7`, etc.

```typescript
// Mobile-first responsive design using config tokens only
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md p-lg">
  {/* Cards stack on mobile, 2 cols on tablet, 3 cols on desktop */}
</div>

// ✅ CORRECT: Uses tokens from tailwind.config.js
<button className="px-md py-sm bg-primary text-white hover:bg-primary-dark rounded-lg">
  Action
</button>

// ❌ WRONG: Never use inline styles or arbitrary values
<button style="padding: 10px 20px" className="px-[10px]">
  Wrong
</button>
```

### Step 5: Handle Interactivity & Server Actions
- Extract interactive logic into separate client components
- Keep client components small and focused
- Pass data from server component to client component
- Use Server Actions (`app/actions.ts`) for mutations

```typescript
// Server component
import { getRecipe } from '@/lib/db/queries/recipes';
import { RecipeHero } from './RecipeHero';
import { RatingSection } from './RatingSection';

export default async function RecipePage({ id }: { id: string }) {
  const recipe = await getRecipe(id);
  return (
    <>
      <RecipeHero recipe={recipe} />
      <RatingSection recipeId={id} /> {/* Client component */}
    </>
  );
}

// Client component (separate file: _components/RatingSection.tsx)
'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likeRecipe } from '@/app/actions'; // Server Action

export function RatingSection({ recipeId }: { recipeId: string }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    await likeRecipe(recipeId);
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className={`py-md px-lg rounded transition-colors ${
        isLiked
          ? 'bg-success text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } focus:outline-2 focus:outline-offset-2 focus:outline-success`}
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isLiked}
    >
      <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
}
```

### Step 6: Filtering & Forms with URL Query Parameters
**Use `useSearchParams()` for filters to enable shareable links.**

This allows users to share filtered recipe lists (e.g., `/recipes?cuisine=italian&dietary=vegan`).

```typescript
// Server component: reads URL params and fetches filtered data
import { searchParams } from 'next/navigation';
import { getRecipes } from '@/lib/db/queries/recipes';
import { RecipeFilter } from './_components/RecipeFilter';
import { RecipeGrid } from './_components/RecipeGrid';

export default async function RecipesPage() {
  const cuisine = searchParams.get('cuisine') || 'all';
  const dietary = searchParams.get('dietary') || 'all';
  
  const recipes = await getRecipes({ cuisine, dietary });
  
  return (
    <>
      <RecipeFilter /> {/* Client component */}
      <RecipeGrid recipes={recipes} />
    </>
  );
}

// Client component: handles filter updates
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export function RecipeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || 'all');
  const [dietary, setDietary] = useState(searchParams.get('dietary') || 'all');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (cuisine !== 'all') params.set('cuisine', cuisine);
    if (dietary !== 'all') params.set('dietary', dietary);
    
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="flex gap-md p-lg" role="search">
      <select
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="px-md py-sm border rounded"
        aria-label="Filter by cuisine"
      >
        <option value="all">All Cuisines</option>
        <option value="italian">Italian</option>
        <option value="asian">Asian</option>
        <option value="american">American</option>
      </select>

      <select
        value={dietary}
        onChange={(e) => setDietary(e.target.value)}
        className="px-md py-sm border rounded"
        aria-label="Filter by dietary preference"
      >
        <option value="all">All</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
      </select>

      <button
        onClick={handleFilter}
        className="px-lg py-sm bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
```

**Benefits:**
- Users can bookmark or share filtered results
- SEO-friendly: each filter state is a unique URL
- Browser back/forward navigation works
- Filters persist on page reload

## Development Standards Checklist

### Images
- [ ] Using `next/image`, never `<img>` tag
- [ ] `priority` prop on above-the-fold images (RecipeHero, thumbnails)
- [ ] Specified `width` and `height` for Image component
- [ ] External Supabase images configured in `remotePatterns` (next.config.ts)
- [ ] Descriptive `alt` text on all images

### Data Layer
- [ ] All Supabase queries in `lib/db/queries/`, NOT in components
- [ ] Mutations use Server Actions in `app/actions.ts`
- [ ] Types generated via `supabase gen types typescript` and stored in `lib/db/types.ts`
- [ ] Components import from `lib/db/queries/` or call `app/actions`, not direct supabase
- [ ] Proper error handling and loading states

### Styling & Design System
- [ ] All styles use Tailwind classes ONLY (no inline styles)
- [ ] Using only tokens from `tailwind.config.js` (colors, spacing, shadows, etc.)
- [ ] No arbitrary values like `w-96`, `px-7`, `text-base`
- [ ] Responsive design with `sm:`, `md:`, `lg:` prefixes
- [ ] Consistent spacing and typography across components

### Components & Interactivity
- [ ] Server Components by default
- [ ] Client Components (`'use client'`) only for interactivity and hooks
- [ ] Client components kept small and focused
- [ ] Filters use `useSearchParams()` and URL Query Parameters
- [ ] Form submissions use Server Actions

### Accessibility
- [ ] Semantic HTML tags (`<button>`, `<nav>`, `<article>`, `<main>`)
- [ ] ARIA labels and attributes (`aria-label`, `aria-pressed`, `aria-expanded`)
- [ ] Focus states with `focus:outline-2 focus:outline-offset-2`
- [ ] Keyboard navigation tested
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Proper heading hierarchy (h1 → h2 → h3)

### TypeScript & Type Safety
- [ ] All components properly typed
- [ ] Using generated Supabase types from `lib/db/types.ts`
- [ ] Function parameters and return types explicitly defined
- [ ] No `any` types

## Responsive Design Breakpoints

Use Tailwind's default breakpoints:
- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (small desktops)
- `xl`: 1280px (large desktops)
- `2xl`: 1536px (extra-large screens)

**Mobile-first principle**: Write base styles for mobile, then add breakpoints for larger screens.

```typescript
// Start with mobile, enhance for larger screens
<div className="text-sm sm:text-base md:text-lg">
  Responsive text
</div>
```

## Common Patterns

### Icons with Lucide React
```typescript
import { Heart, Clock, Users, Filter } from 'lucide-react';

// Use semantic size and color from design system
<Heart 
  size={20} 
  className="text-success hover:text-success-dark transition-colors"
  aria-hidden="true" // decorative icons
/>
```

### Accessible Button
```typescript
<button
  onClick={handleClick}
  className="px-lg py-md bg-primary text-white rounded hover:bg-primary-dark focus:outline-2 focus:outline-offset-2 focus:outline-primary transition-colors disabled:opacity-50"
  aria-label="descriptive action"
  disabled={isLoading}
>
  Action
</button>
```

### Image with Responsive Sizing (using next/image)
```typescript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="descriptive text"
  width={600}
  height={400}
  priority={isAboveFold}
  className="w-full h-auto object-cover rounded-lg"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 600px"
/>
```

### Responsive Typography
```typescript
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Large Heading
</h1>
```

### Form with Server Action
```typescript
'use client';

import { addRecipeToFavorites } from '@/app/actions';
import { useTransition } from 'react';

export function AddFavoriteButton({ recipeId }: { recipeId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await addRecipeToFavorites(recipeId);
        });
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="px-lg py-md bg-primary text-white rounded disabled:opacity-50"
        aria-busy={isPending}
      >
        {isPending ? 'Adding...' : 'Add to Favorites'}
      </button>
    </form>
  );
}
```

### Responsive Grid
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md p-lg">
  {recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))}
</div>
```

## Performance Optimization

- **Image optimization**: Always use `next/image` with `priority` for critical images
- **Code splitting**: Keep client components small, lazy-load heavy components with `dynamic()`
- **Server-side rendering**: Use Server Components by default for faster page loads
- **Reduce re-renders**: Memoize components only when necessary (profile first)
- **CSS optimization**: Tailwind automatically purges unused styles in production
- **Bundle size**: Avoid large dependencies; prefer shadcn/ui components (tree-shakeable)

Example lazy loading:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});

export default function Page() {
  return <HeavyComponent />;
}
```

## File Organization

Follow this structure to keep frontend and data layers separate:

```
app/
├── actions.ts                    ⭐ Server Actions for mutations
├── layout.tsx                    (Server)
├── page.tsx                      (Server)
├── recipes/
│   ├── page.tsx                  (Server: fetch via lib/db/queries)
│   ├── [id]/
│   │   ├── page.tsx              (Server: recipe detail page)
│   │   └── _components/          (Shared within this route)
│   │       ├── RecipeHero.tsx     (Server: static display, uses next/image)
│   │       ├── RatingButton.tsx   (Client: interactivity only, calls app/actions)
│   │       ├── IngredientsSection.tsx (Server: content)
│   │       └── InstructionsSection.tsx (Server: content)

components/                       (Global shared components)
├── RecipeCard.tsx                (Server, shows recipe summary)
├── RecipeGrid.tsx                (Server, renders grid of cards)
└── ...

lib/db/
├── types.ts                      ⭐ Generated via: supabase gen types typescript
├── queries/
│   ├── recipes.ts                (getRecipe, getRecipes, etc.)
│   ├── ingredients.ts            (ingredient queries)
│   └── ...                        (organized by domain)

utils/supabase/
├── server.ts                     (Supabase client instance)
└── ...
```

**Key Rules:**
- Never call `supabase.from()` in components
- Components → import from `lib/db/queries/` for data
- Mutations → call `app/actions` from client components
- All types → use generated `lib/db/types.ts`

## Example: Complete Recipe Card Component (Production)

```typescript
// components/RecipeCard.tsx (Server Component)
import Image from 'next/image';
import { Heart, Clock, Users } from 'lucide-react';
import type { Recipe } from '@/lib/db/types';
import { RatingButton } from './RatingButton';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article
      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
      aria-label={`Recipe: ${recipe.name}`}
    >
      {/* Hero Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={recipe.image_url}
          alt={`${recipe.name} - prepared dish`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-md">
        <h2 className="text-lg font-bold mb-sm line-clamp-2">
          {recipe.name}
        </h2>

        <p className="text-sm text-gray-600 mb-lg line-clamp-2">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div
          className="flex gap-lg text-sm text-gray-500 mb-lg"
          aria-label="Recipe details"
        >
          <span className="flex items-center gap-xs">
            <Clock size={16} aria-hidden="true" />
            {recipe.prep_time_minutes} min
          </span>
          <span>•</span>
          <span className="flex items-center gap-xs">
            <Users size={16} aria-hidden="true" />
            {recipe.servings} servings
          </span>
        </div>

        {/* Rating Button (Client Component) */}
        <RatingButton recipeId={recipe.id} />
      </div>
    </article>
  );
}
```

```typescript
// components/RatingButton.tsx (Client Component)
'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likeRecipe } from '@/app/actions';

interface RatingButtonProps {
  recipeId: string;
}

export function RatingButton({ recipeId }: RatingButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLoading(true);
      await likeRecipe(recipeId);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to like recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`w-full py-md px-lg rounded transition-colors font-medium ${
        isLiked
          ? 'bg-success text-white hover:bg-success-dark'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } focus:outline-2 focus:outline-offset-2 focus:outline-success disabled:opacity-50`}
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isLiked}
      aria-busy={isLoading}
    >
      <span className="flex items-center justify-center gap-sm">
        <Heart
          size={18}
          fill={isLiked ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {isLoading ? 'Saving...' : isLiked ? 'Liked' : 'Like'}
      </span>
    </button>
  );
}
```

```typescript
// app/actions.ts (Server Actions)
'use server';

import { createClient } from '@/utils/supabase/server';
import type { Database } from '@/lib/db/types';

export async function likeRecipe(recipeId: string) {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('likes')
      .insert({ recipe_id: recipeId, created_at: new Date() });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error liking recipe:', error);
    throw new Error('Failed to like recipe');
  }
}
```

```typescript
// lib/db/queries/recipes.ts (Data Layer)
import { createClient } from '@/utils/supabase/server';
import type { Recipe } from '@/lib/db/types';

export async function getRecipe(id: string): Promise<Recipe | null> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getRecipes(
  filters?: { cuisine?: string; dietary?: string }
): Promise<Recipe[]> {
  const supabase = createClient();
  
  try {
    let query = supabase.from('recipes').select('*');
    
    if (filters?.cuisine && filters.cuisine !== 'all') {
      query = query.eq('cuisine', filters.cuisine);
    }
    
    if (filters?.dietary && filters.dietary !== 'all') {
      query = query.eq('dietary_tag', filters.dietary);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}
```

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/react/use-client)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
- [MDN: Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Supabase TypeScript Types](https://supabase.com/docs/reference/cli/supabase-gen-types)

## Getting Started

1. **Generate Supabase types** (do this once, then regenerate when schema changes):
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/db/types.ts
   ```

2. **Create query functions** in `lib/db/queries/`:
   ```typescript
   export async function getRecipes() {
     // Use generated types
   }
   ```

3. **Build Server Components** that fetch data:
   ```typescript
   import { getRecipes } from '@/lib/db/queries/recipes';
   
   export default async function RecipesPage() {
     const recipes = await getRecipes();
     // render...
   }
   ```

4. **Create Client Components** for interactivity:
   ```typescript
   'use client';
   import { likeRecipe } from '@/app/actions';
   // handle interactions...
   ```

5. **Always use `next/image`** and Tailwind design tokens.

## Next Steps

Try these prompts to use this skill:
- "Create a responsive ingredient list component with full accessibility and next/image"
- "Build a filtering recipe page using URL query parameters"
- "Refactor this component for better performance and accessibility"
- "Add a rating form using Server Actions"

---

**Last Updated**: May 2026 | **Version**: 2.0

