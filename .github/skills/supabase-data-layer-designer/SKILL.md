---
name: supabase-data-layer-designer
description: Use this skill when you need to design, structure, or implement the data layer using Supabase in a Next.js App Router project (no `src/`).
---

## When to Use

- Interact with the database (select / insert / update / delete)
- Create a centralized data access layer
- Integrate Supabase with Server Components and Server Actions

Do NOT use for: UI-only tasks, authentication, or unstructured prototypes.

## Architecture

### File Structure

```
/utils
  /supabase
    client.ts
    server.ts
    /queries
      posts.ts
    /mutations
      posts.ts
```

### Workflow

1. **Define Data Boundaries** - Identify what data is needed and whether it's a read or write
2. **Create Client Layer** - Centralize Supabase client in `utils/supabase/server.ts` and `utils/supabase/client.ts`
3. **Extract Queries** - Isolate read operations in `/queries` folder
4. **Extract Mutations** - Isolate write operations in `/mutations` folder and Server Actions
5. **Connect to UI** - Server Components call queries, Server Actions call mutations

## Rules

- **Never** query Supabase from Client Components
- **Never** write queries inline in components
- Mutations only via Server Actions
- One function = one responsibility

## Examples

### Query

```ts
// utils/supabase/queries/posts.ts
import { createServerClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
}
```

### Mutation

```ts
// utils/supabase/mutations/posts.ts
import { createServerClient } from "@/utils/supabase/server";

export async function insertPost(title: string) {
  const supabase = await createServerClient();
  
  const { error } = await supabase
    .from("posts")
    .insert({ title });

  if (error) throw new Error(error.message);
}
```