# Feature: [Feature Name]

## Description
Краткое, понятное описание того, что делает эта функция.  
Кому она нужна (пользователи, админы, система) и почему.

**Example**: "Позволяет пользователям фильтровать рецепты по категориям и диетическим ограничениям"

---

## Acceptance Criteria

Четкий список требований, которые должны быть выполнены для принятия функции.

- [ ] Юзер может выбрать одну или несколько категорий
- [ ] Фильтры сохраняются в URL (для шеринга)
- [ ] Результаты обновляются в реальном времени
- [ ] На пустом результате показывается понятное сообщение
- [ ] Кнопка "Очистить фильтры" очищает все выбранные фильтры

---

## User Flow

Пошаговое описание того, как пользователь взаимодействует с функцией.

### 1. Initial State
- Пользователь открывает страницу рецептов
- Видит список всех рецептов

### 2. Applying Filters
- Пользователь открывает панель фильтров
- Выбирает категорию (Завтрак, Обед, Ужин, etc.)
- Выбирает диетическое ограничение (Веган, Без глютена, etc.)

### 3. Filtered Results
- Список обновляется, показывая только подходящие рецепты
- URL меняется: `/recipes?category=breakfast&diet=vegan`

### 4. Clearing Filters
- Пользователь нажимает "Очистить фильтры"
- Все выборы обнуляются, показываются все рецепты

---

## Technical Notes

Информация для разработчика о том, как это реализовать.

### Architecture
- **Component**: `RecipeFilters.tsx` (Client Component)
- **Data Source**: `getRecipesByFilters()` query в `utils/supabase/queries/recipes.ts`
- **State Management**: URL params через `useSearchParams`

### Dependencies
- `next/navigation` для работы с URL params
- Supabase для фильтрации на БД уровне

### Special Considerations
- Фильтры должны работать с Server-Side компонентом
- Используйте URL params, НЕ localStorage (для шеринга ссылок)
- Кэшируйте результаты на 1 минуту

### Performance
- Добавьте индекс на `category` и `diet_restrictions` в БД
- Используйте debounce при применении фильтров (если применяется по мере ввода)

---

## Database Changes

Если функция требует изменений в БД.

### New Tables
```sql
-- Нет новых таблиц
```

### Migrations
```sql
-- Добавить колонки если нужны
ALTER TABLE recipes ADD COLUMN category VARCHAR(50);
ALTER TABLE recipes ADD COLUMN diet_restrictions TEXT[];

-- Добавить индексы
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_diet ON recipes USING GIN(diet_restrictions);
```

### RLS Policies
```sql
-- Публичное чтение (для фильтров не нужны изменения RLS)
CREATE POLICY "Allow public read" ON recipes
  FOR SELECT USING (true);
```

---

## Related Features
- Search functionality
- Recipe detail page

## Blockers / Dependencies
- Нужны варианты категорий и ограничений в БД (enum или таблица)

---

**Status**: Не начата | В прогрессе | ✅ Завершена  
**Assigned to**: [Developer Name]  
**Due Date**: [Date]  
**Last Updated**: [Date]
