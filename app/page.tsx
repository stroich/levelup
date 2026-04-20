import { getMenuForToday } from './actions'
import RecipeCard from '@/components/RecipeCard'

export default async function Home() {
  const recipes = await getMenuForToday()
  const today = new Date()

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-l-4 border-slate-700 pl-6">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2">
            <span className="text-indigo-600">Меню на сегодня</span>
          </h1>
          <p className="text-slate-400 font-medium">
            {today.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </section>

        {recipes.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-recipe">
            <p className="text-lg font-semibold text-slate-700">Нет рецептов на сегодня.</p>
            <p className="mt-2 text-slate-500">Проверьте базу данных или добавьте записи для сегодняшнего дня.</p>
          </div>
        )}
      </div>
    </div>
  )
}
