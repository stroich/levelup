# Feature: Recipe Details Page with Nutrition Facts

## Description
Позволяет пользователям просматривать полную информацию о рецепте, включая ингредиенты, инструкции и информацию о пищевой ценности. Функция предоставляет удобный интерфейс для изучения рецепта перед приготовлением.

---

## Acceptance Criteria

- [ ] Страница отображает название рецепта, описание и изображение
- [ ] Показаны все ингредиенты с количеством и единицей измерения
- [ ] Пошаговые инструкции приготовления четко отображены
- [ ] Информация о пищевой ценности (калории, белки, жиры, углеводы) видна
- [ ] Время приготовления и выход указаны
- [ ] Если рецепт не найден, показывается 404 страница
- [ ] Страница загружается быстро (< 2 сек)

---

## User Flow

### Step 1: Browse Recipes
- Пользователь видит список рецептов на главной странице
- Выбирает интересующий рецепт

### Step 2: View Details
- Нажимает на рецепт
- Переходит на URL: `/recipes/[recipe-id]`

### Step 3: Read Full Information
- Видит красивую карточку с изображением рецепта
- Читает полное описание
- Изучает ингредиенты с количеством

### Step 4: Check Instructions
- Видит пошаговые инструкции
- Каждый шаг четко разделен

### Step 5: Nutrition Info (Optional)
- Может открыть информацию о пищевой ценности
- Видит калории, белки, жиры, углеводы

---

## Technical Notes

### Architecture
- **Route**: `app/recipes/[id]/page.tsx` (Server Component)
- **Components**:
  - `RecipeHero.tsx` - заголовок и изображение
  - `IngredientsSection.tsx` - список ингредиентов
  - `InstructionsSection.tsx` - шаги приготовления
  - `NutritionFacts.tsx` - информация о пищевой ценности
- **Data Layer**: `getRecipe(id)` в `utils/supabase/queries/recipes.ts`

### Implementation Details
- Используйте Server Component для SSR
- Fetch данные на сервере перед рендером
- Если рецепт не найден — вернуть 404
- Изображение оптимизировать через `next/image`

### Performance
- Кэшируйте результаты на 1 час (ISR)
- Используйте `next/image` для оптимизации
- Минимизируйте JavaScript на странице

---

## Database Changes

### Table Structure (Already Exists)
```sql
CREATE TABLE recipes (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(512),
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ingredients (
  id UUID PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2),
  unit VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE instructions (
  id UUID PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nutrition_facts (
  id UUID PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  calories INTEGER,
  protein DECIMAL(5,2),
  fat DECIMAL(5,2),
  carbohydrates DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX idx_ingredients_recipe_id ON ingredients(recipe_id);
CREATE INDEX idx_instructions_recipe_id ON instructions(recipe_id);
CREATE INDEX idx_nutrition_facts_recipe_id ON nutrition_facts(recipe_id);
```

### RLS Policies
```sql
-- Allow public read access
CREATE POLICY "Allow public read recipes" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Allow public read ingredients" ON ingredients
  FOR SELECT USING (true);

CREATE POLICY "Allow public read instructions" ON instructions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read nutrition" ON nutrition_facts
  FOR SELECT USING (true);
```

---

## Related Features
- Recipe list/search
- User authentication (for saved recipes)
- Recipe ratings and reviews

## Notes
- Страница должна работать быстро, т.к. она основная функция приложения
- Design следует макетам в Figma (ссылка: [insert figma link])

---

**Status**: ✅ Завершена  
**Assigned to**: Frontend Team  
**Started**: May 2026  
**Completed**: May 2026
