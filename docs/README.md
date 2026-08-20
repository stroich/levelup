# Documentation Guidelines

This folder contains all feature documentation created by Business Analysts.

## Structure

```
features/
├── TEMPLATE.md           # Шаблон для новых функций
├── feature-1.md          # Описание функции 1
├── feature-2.md          # Описание функции 2
└── ...
```

## How to Add a New Feature

### For Business Analysts

1. **Copy template**: Используйте `TEMPLATE.md` как основу
2. **Create file**: `docs/features/{feature_name}.md`
3. **Fill sections**: Заполните все секции в документе
4. **Link in task**: Добавьте ссылку на документацию в задание (Jira, GitHub Issues, etc.)

### Naming Convention

```
❌ Bad:
- new_feature.md
- Feature123.md

✅ Good:
- recipe-filters.md
- user-authentication.md
- admin-dashboard.md
```

## Sections Explained

| Section | Purpose | For Whom |
|---------|---------|----------|
| **Description** | What and why | Everyone |
| **Acceptance Criteria** | Definition of done | QA + Developer |
| **User Flow** | How users interact | Designer + Developer |
| **Technical Notes** | How to build it | Developer |
| **Database Changes** | SQL migrations | Backend Developer |

## Review Process

1. BA создает документацию
2. Техлид ревьюит (опционально)
3. Developer использует при разработке
4. QA проверяет Acceptance Criteria

---

**Created**: May 2026  
**Maintained by**: Business Analyst Team
