---
name: nextjs-root-architect
description: Use this skill when you need to **design or implement architecture in a Next.js App Router project** that uses a **root-based structure (no `src/` folder)**
---


## Environment Context

- **Project Structure:** Root-level folders (`app/`, `components/`, `utils/`)
- **Import Aliases:** 
  - `@/*` → project root
  - `@/app/*` → `app/` folder
  - `@/components/*` → `components/` folder
  - `@/utils/*` → `utils/` folder
- **Framework:** Next.js with App Router
- **Key Files:** `next.config.ts`, `tsconfig.json`

---

## Design Algorithm (Your Workflow)

When tackling a feature or page request, follow these steps:

### 1. **Define Routes**
   - Determine the URL path structure needed
   - Plan folder hierarchy within `app/` directory
   - Use file-based routing: `app/[feature]/page.tsx`, `app/[feature]/layout.tsx`, etc.
   - Create `_components/` subdirectories for route-specific components

### 2. **Component Splitting**
   - Identify static vs. interactive UI sections
   - **Server Components (default):** Data fetching, database queries, API calls
   - **Client Components:** Interactive elements requiring `useState`, event handlers, hooks
   - Wrap client-only sections in minimal client component wrappers
   - Avoid premature "use client" declarations

### 3. **Data Strategy**
   - **Fetching:** Always prioritize Server Components for data retrieval
   - **Writing:** Create separate `.ts` files with `"use server"` directive for Server Actions
   - Pass data down as props; never pass functions from server to client
   - Use revalidation strategies (`revalidatePath`, `revalidateTag`) for mutations

### 4. **Colocation Check**
   - If a component is unique to a single route, create it in `app/[route]/_components/`
   - If a component is reused across routes, place it in `/components/` (use `@/components/ComponentName`)
   - Use `_` prefix for folders that should not create routes
   - Import shared components using `@/components/*` alias

---

## Strict Technical Rules

### ❌ Never Use "use client" in Page/Layout Files
- `page.tsx` and `layout.tsx` must remain Server Components
- If interactivity is needed, create a separate client component and import it

**Example:**
```tsx
// app/products/page.tsx (Server Component - ✓)
import ProductList from '@/components/ProductList'
export default async function ProductsPage() {
  const products = await fetchProducts()
  return <ProductList initialProducts={products} />
}

// OR for route-specific component:
// app/products/_components/ProductFilters.tsx (Client Component)
'use client'
import { useState } from 'react'
export default function ProductFilters({ onFilter }) {
  const [category, setCategory] = useState('')
  return (
    <div>
      <input onChange={(e) => setCategory(e.target.value)} />
      <button onClick={() => onFilter(category)}>Filter</button>
    </div>
  )
}
```

### 🔒 Database Functions Require "use server"
- Never expose database calls directly in client components
- Create dedicated `.ts` files with `"use server"` directive
- Export functions for Server Actions only

**Example:**
```tsx
// app/actions.ts (Server Actions file)
'use server'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const price = formData.get('price') as string
  
  // TODO: Add your database logic
  await db.products.insert({ name, price })
  
  revalidatePath('/products')
}

// app/products/_components/AddProductForm.tsx (Client Component)
'use client'
import { addProduct } from '@/app/actions'

export default function AddProductForm() {
  return (
    <form action={addProduct}>
      <input name="name" placeholder="Product name" required />
      <input name="price" type="number" placeholder="Price" required />
      <button type="submit">Add Product</button>
    </form>
  )
}
```

### 🚫 No Function Props from Server to Client
- Server Components cannot pass event handlers or callbacks to Client Components
- Pass serializable data only (strings, numbers, objects, arrays)
- Use Server Actions as the bridge for client-side interactions

**Incorrect:**
```tsx
// ❌ This will fail
export default function Page() {
  const handleClick = () => console.log('clicked')
  return <ClientComp onClick={handleClick} /> // Error: functions can't be serialized
}
```

**Correct:**
```tsx
// app/page.tsx (Server Component)
import { myServerAction } from '@/app/actions'
import ClientButton from '@/components/ClientButton'

export default function Page() {
  return <ClientButton action={myServerAction} />
}

// components/ClientButton.tsx (Client Component)
'use client'
export default function ClientButton({ action }) {
  return (
    <button onClick={async () => await action()}>
      Click Me
    </button>
  )
}

// app/actions.ts
'use server'
export async function myServerAction() {
  console.log('Server action executed')
}
```

---

## Folder Usage Quick Reference

| Folder | Purpose | Use Case | Alias |
|--------|---------|----------|-------|
| `app/` | Routes & pages | Create new pages/routes | `@/app/*` |
| `app/[route]/_components/` | Route-specific components | Components used only on one page | Local import |
| `components/` | Shared components | Buttons, cards, headers reused across routes | `@/components/*` |
| `utils/` | Utilities & helpers | Database, auth, formatters, hooks | `@/utils/*` |
| `app/actions.ts` | Server Actions | Mutations, form submissions | `@/app/actions` |

### Decision Tree
1. **Building a new page?** → Create in `app/[feature]/page.tsx`
2. **Need interactive elements on that page?** → Create Client Component in `app/[feature]/_components/`
3. **Component used on multiple pages?** → Put in `components/` with `@/components/` import
4. **Fetching data?** → Do it in Server Component, pass as props
5. **Writing to database?** → Create Server Action in `app/actions.ts`

---

## Output Format

### Structure
Present the solution as a **folder tree** starting from project root:
```
app/
├── products/
│   ├── page.tsx (Server)
│   ├── layout.tsx (Server)
│   ├── _components/
│   │   ├── ProductFilters.tsx (Client)
│   │   └── ProductCard.tsx (Client)
│   └── [id]/
│       ├── page.tsx (Server)
│       └── _components/
│           └── ProductDetails.tsx (Client)
├── actions.ts (Server Actions)
└── layout.tsx (Server - root layout)

components/
├── Header.tsx (Client - reusable)
├── Navigation.tsx (Client - reusable)
└── Footer.tsx (Client - reusable)

utils/
└── db.ts (database utilities)
```

### Import Style Guide
- Reusable components: `import Header from '@/components/Header'`
- Route-specific components: No direct import needed (collocated in `_components/`)
- Server Actions: `import { addProduct } from '@/app/actions'`
- Utilities: `import { getUser } from '@/utils/db'`

---

## Example Prompt to Use This Skill

> "Create a product search feature. Users should be able to filter products by category and see results update in real-time. Products are stored in our database."

**Expected Response:**
1. Folder structure in `app/products/search/`
2. Server Component for page layout + data fetching
3. Client Component for search input and filtering
4. Server Action for database queries
5. Complete code samples with proper directives
