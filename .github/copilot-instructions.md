---
applyTo: '**/*.tsx, **/*.ts, **/*.json'
---

# LevelUp Project - Copilot Instructions

## Project Overview

**LevelUp** — это Next.js приложение для работы с рецептами, использующее:
- **Framework**: Next.js 16.2.2 (App Router, без `src/` папки)
- **Frontend**: React 19.2.4 + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Development Tools**: ESLint, TypeScript 5

## Project Structure

```
app/                          # App Router (главное приложение)
├── layout.tsx               # Root layout
├── page.tsx                 # Home page
├── actions.ts               # Server Actions
├── recipes/                 # Recipes feature
│   └── [id]/
│       ├── page.tsx         # Страница рецепта
│       └── _components/     # Private компоненты
├── globals.css             # Глобальные стили
└── ...

components/                  # Переиспользуемые компоненты
utils/
├── supabase/
│   ├── server.ts          # Supabase server client
│   └── queries/
│       └── recipes.ts     # Database queries
docs/                       # 📝 FEATURE DOCUMENTATION (обязательна!)
├── features/
│   └── {feature_name}.md  # Описание функции
```

## Key Development Guidelines

### 1. Architecture Rules

#### Next.js App Router (Root-Based)
- **No `src/` folder** — файлы находятся в корне проекта
- Используйте file-based routing в `app/` папке
- Private компоненты в папке `_components/` (начинаются с `_`)
- Server Components по умолчанию

#### Supabase Data Layer
- Все запросы в `utils/supabase/queries/`
- Используйте Supabase client только на сервере (`utils/supabase/server.ts`)
- RLS (Row Level Security) обязателен для всех таблиц

### 2. File Naming & Organization

```
✅ Правильно:
- RecipeCard.tsx (PascalCase для компонентов)
- recipes.ts (camelCase для утилит)
- _components/ (private папки с _)
- page.tsx, layout.tsx (зарезервированные имена)

❌ Неправильно:
- recipe-card.tsx (используйте PascalCase)
- Recipes.tsx (неправильное использование PascalCase)
- components/ (в приватных папках — используйте _components/)
```

### 3. TypeScript & Type Safety

- Все файлы должны быть TypeScript (`.ts`, `.tsx`)
- Определяйте типы явно (избегайте `any`)
- Типы на уровне приложения в отдельных файлах
- Interface для типов компонентов

Пример:
```typescript
// types.ts
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
```

### 4. Component Patterns

#### Server Components (по умолчанию)
```typescript
// app/recipes/[id]/page.tsx
import { getRecipe } from "@/utils/supabase/queries/recipes";

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  return <RecipeContent recipe={recipe} />;
}
```

#### Client Components (когда нужны)
```typescript
"use client";

import { useState } from "react";

export function RecipeForm() {
  const [title, setTitle] = useState("");
  // ...
}
```

### 5. Styling Rules

- Используйте **Tailwind CSS** для всех стилей
- Глобальные стили в `app/globals.css`
- CSS Modules **не используются**
- BEM или утилит-класс подход в Tailwind

Пример:
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Recipe Title</h2>
</div>
```

### 6. Server Actions

- Определяйте в `app/actions.ts` или рядом с компонентом
- Используйте `"use server"` в начале файла
- Валидируйте все входные данные
- Обрабатывайте ошибки gracefully

Пример:
```typescript
// app/actions.ts
"use server";

import { createRecipe } from "@/utils/supabase/queries/recipes";

export async function addRecipeAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  
  if (!title) throw new Error("Title is required");
  
  return await createRecipe({ title });
}
```

## 📝 Feature Documentation Process

### Для Business Analyst (при добавлении новой функции)

**Когда создается новое задание (task/feature), BA должен:**

1. **Создать файл документации**
   ```
   docs/features/{feature_name}.md
   ```

2. **Заполнить полное описание**
   ```markdown
   # Feature: {Feature Name}
   
   ## Description
   Краткое описание функции
   
   ## Acceptance Criteria
   - [ ] Критерий 1
   - [ ] Критерий 2
   
   ## User Flow
   Описание пути пользователя через функцию
   
   ## Technical Notes
   Особенности реализации, зависимости
   
   ## Database Changes
   Если требуются новые таблицы/колонки
   ```

3. **Ссылка на документацию**
   - Добавить в задание ссылку на документацию в `docs/features/`

### Для Developer (при реализации)

1. **Прочитать документацию** в `docs/features/{feature_name}.md`
2. **Следовать Acceptance Criteria**
3. **Реализовать согласно Technical Notes**
4. **Обновить документацию** если что-то изменилось

## Code Quality Standards

### ESLint & TypeScript

```bash
# Проверить код
npm run lint

# Исправить ошибки
npm run lint -- --fix
```

### Database & Supabase

- **Все миграции** в документации функции
- **RLS policies** обязательны
- **Индексы** для часто используемых колонок
- **Soft delete** вместо hard delete где возможно

## Development Commands

```bash
# Развитие
npm run start        # Запустить dev server

# Production
npm run build        # Собрать проект
npm run prod           # Запустить production build

# Линтинг
npm run lint         # Проверить весь код
npm run lint -- --fix # Исправить ошибки
```

## Performance & Best Practices

1. **Image Optimization**: Используйте `next/image` для всех изображений
2. **Code Splitting**: Ленивая загрузка компонентов где возможно
3. **API Routes**: Минимум логики на сервере
4. **Caching**: Используйте Cache Control заголовки
5. **Monitoring**: Проверяйте Performance таб в DevTools

## Common Patterns & Tips

### Query Data from Supabase
```typescript
// utils/supabase/queries/recipes.ts
import { createClient } from "@supabase/ssr";

export async function getRecipe(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) throw error;
  return data;
}
```

### Reusable Components
```typescript
// components/RecipeCard.tsx
interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function RecipeCard({ title, description, imageUrl }: RecipeCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      {/* Component JSX */}
    </div>
  );
}
```

## Troubleshooting

### Build Errors
- Проверьте типы: `npx tsc --noEmit`
- Очистите `.next` папку: `rm -rf .next`
- Переустановите зависимости: `npm install`

## Additional Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React 19 Docs](https://react.dev)

---

**Last Updated**: May 2026  
**Project**: LevelUp - Recipe Management App
