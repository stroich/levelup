import { getMenuForToday } from './actions'
import RecipeCard from '@/components/RecipeCard'

const workoutPlan = [
  {
    title: 'Утренний заряд',
    time: '15 минут',
    text: 'Лёгкая активация: мобилизация суставов, дыхание и короткая кардио-разминка.',
  },
  {
    title: 'Основная тренировка',
    time: '35–45 минут',
    text: 'Силовой блок на ноги, корпус и плечи с фокусом на стабильность и силу.',
  },
  {
    title: 'Восстановление',
    time: '10 минут',
    text: 'Растяжка, работа на дыхание и заминка после нагрузки.',
  },
]

const beautyRoutine = [
  'Увлажняющий крем после утреннего умывания',
  'Скраб или мягкий пилинг вечером не чаще 1–2 раз в неделю',
  'Нанесение маски и защита SPF на выходе на улицу',
]

const dailyChecklist = [
  '1. Сначала вода и зарядка.',
  '2. Приготовь завтрак и обед по расписанию.',
  '3. Сделай тренировку и восстанови тело после неё.',
  '4. Не забудь про уход и вечерний отдых.',
]

export default async function Home() {
  const recipes = await getMenuForToday()
  const today = new Date()

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-l-4 border-teal-600 pl-6">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2">
            <span className="text-teal-600">План на сегодня</span>
          </h1>
          <p className="text-slate-400 font-medium">
            {today.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-recipe">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Питание</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900">3 приёма</h2>
            <p className="mt-2 text-slate-600">Завтрак, обед и ужин подобраны под твой день и энергию.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-recipe">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Спорт</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900">60 минут</h2>
            <p className="mt-2 text-slate-600">Силовой блок, кардио и восстановление без перегруза.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-recipe">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Красота</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900">3 шага</h2>
            <p className="mt-2 text-slate-600">Уход, питание кожи и поддержка самочувствия в течение дня.</p>
          </div>
        </section>

        <section id="menu" className="mb-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">Что приготовить</h2>
            <span className="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              menu
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {recipes.length === 0 && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-recipe">
              <p className="text-lg font-semibold text-slate-700">Нет рецептов на сегодня.</p>
              <p className="mt-2 text-slate-500">Проверьте базу данных или добавьте записи для сегодняшнего дня.</p>
            </div>
          )}
        </section>

        <section id="workouts" className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-recipe">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Тренировки</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900">Сессия на сегодня</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workoutPlan.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{item.time}</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="beauty" className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-recipe">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-500">Красота</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900">Что сделать для себя</h2>

            <ul className="mt-6 space-y-4">
              {beautyRoutine.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700 leading-relaxed">
                  <span className="mt-1 text-teal-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-teal-200 bg-teal-50 p-8 shadow-recipe">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">Распорядок</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900">Чек-лист дня</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              {dailyChecklist.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-teal-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
