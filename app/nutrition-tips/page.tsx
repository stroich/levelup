import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Советы по питанию - DASH диета',
    description: 'Основные правила DASH-диеты для снижения давления и веса. Научно доказанный метод с практическими рекомендациями.',
}

const tips = [
    {
        title: 'Контроль натрия: главный шаг к здоровому давлению',
        icon: '🧂',
        content: [
            'Соль задерживает воду в организме, что увеличивает нагрузку на сосуды и сердце.',
            'Соблюдайте норму: ограничьте потребление соли до 1500–2300 мг в сутки (около одной чайной ложки).',
            'Скройте солонку: не подсаливайте блюда во время приготовления, добавляйте соль только в готовую тарелку.',
            'Изучайте этикетки: откажитесь от готовых соусов, маринадов, чипсов и полуфабрикатов — в них содержится до 80% всей скрытой соли.',
            'Используйте альтернативу: заменяйте соль лимонным соком, чесноком, зеленью и сухими специями без добавления натрия.',
        ]
    },
    {
        title: 'Фокус на минералы: калий, магний и кальций',
        icon: '💎',
        content: [
            'Эти элементы расслабляют стенки сосудов и помогают организму выводить избыток натрия.',
            'Калий: ежедневно съедайте 1–2 порции продуктов, богатых калием (бананы, авокадо, курага, чернослив, запеченный в кожуре картофель).',
            'Магний: добавьте в рацион горсть орехов (миндаль, грецкие) или семян, а также бурый рис и овсянку.',
            'Кальций: выбирайте нежирные молочные продукты (йогурт без сахара, творог до 5%, молоко 1.5%), которые укрепляют сердечно-сосудистую систему.',
        ]
    },
    {
        title: 'Изменение структуры рациона для снижения веса',
        icon: '🍽️',
        content: [
            'DASH-диета эффективно снижает вес за счет высокой плотности питательных веществ и низкой калорийности блюд.',
            'Правило тарелки: заполняйте половину тарелки овощами и зеленью, четверть — нежирным белком, четверть — цельнозерновыми крупами.',
            'Качественный белок: отдавайте предпочтение куриной грудке, индейке, кролику и рыбе. Два-три раза в неделю заменяйте мясо бобовыми (чечевица, нут, фасоль).',
            'Полезные жиры: минимизируйте сливочное масло и трансжиры. Используйте оливковое или льняное масло в сыром виде для заправки салатов.',
            'Отказ от жидких калорий: полностью исключите пакетные соки, газировку и сладкие кофейные напитки. Пейте чистую воду — не менее 1.5–2 литров в день.',
        ]
    },
    {
        title: 'Практические советы: с чего начать сегодня',
        icon: '✨',
        content: [
            'Замените привычный белый хлеб и макароны на цельнозерновые аналоги.',
            'Поставьте на видное место мытые овощи и фрукты для быстрых перекусок вместо печенья.',
            'Увеличивайте количество растительной пищи постепенно (на 1 порцию в день), чтобы избежать дискомфорта в кишечнике.',
        ]
    }
]

export default function NutritionTipsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4 border-b-4 border-teal-500">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-8 transition"
                    >
                        <span>←</span>
                        <span>Вернуться назад</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
                                <span className="text-teal-600">DASH</span>
                                <br />
                                <span className="text-slate-900">Диета</span>
                            </h1>
                            <p className="text-xl text-slate-700 font-semibold mb-6 leading-relaxed">
                                Научно доказанный метод борьбы с повышенным давлением и лишним весом
                            </p>
                            <p className="text-base text-slate-600 leading-relaxed">
                                DASH-диета работает за счет снижения уровня натрия и насыщения организма калием, магнием и кальцием. Используйте эти базовые рекомендации как руководство на каждый день.
                            </p>
                        </div>

                        <div className="relative h-96 rounded-3xl overflow-hidden shadow-recipe">
                            <Image
                                src="/images/dash-diet.svg"
                                alt="DASH диета - здоровое питание"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {tips.map((tip, index) => (
                            <article
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white shadow-recipe hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] transition duration-300 overflow-hidden"
                            >
                                <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400" />

                                <div className="p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <span className="text-4xl">{tip.icon}</span>
                                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                                            {tip.title}
                                        </h2>
                                    </div>

                                    <ul className="space-y-4">
                                        {tip.content.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex gap-3 text-slate-700 leading-relaxed">
                                                <span className="text-teal-500 font-bold flex-shrink-0 mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommended Beverages Section */}
            <div className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                        <span className="text-teal-600">Рекомендуемые</span>
                        <br />
                        напитки
                    </h2>
                    <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                        Выбирайте правильные напитки для поддержания здоровья и снижения давления
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Hibiscus Tea Card */}
                        <article className="rounded-3xl border-2 border-teal-400 bg-gradient-to-br from-red-50 to-pink-50 shadow-recipe hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] transition duration-300 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-red-500 to-pink-500" />

                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-5xl">🍵</span>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">
                                            Чай каркаде
                                        </h3>
                                        <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mt-1">
                                            Рубиновый помощник против гипертонии
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-700 leading-relaxed mb-6">
                                    Если вы ищете полезную альтернативу обычному чаю или кофе, обратите внимание на каркаде (настой цветков гибискуса). Многочисленные медицинские исследования (включая тесты ученых из Тафтса) подтвердили, что этот напиток является мощным природным средством для снижения давления.
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex gap-3 items-start">
                                        <span className="text-red-500 font-bold text-lg">✓</span>
                                        <p className="text-slate-700">
                                            <span className="font-semibold">Доказанная эффективность:</span> исследования показывают, что регулярное потребление каркаде помогает снизить систолическое давление на 7-10 мм рт.ст.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-red-500 font-bold text-lg">✓</span>
                                        <p className="text-slate-700">
                                            <span className="font-semibold">Богат антиоксидантами:</span> содержит антоцианы и полифенолы, которые защищают сердце и сосуды
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-red-500 font-bold text-lg">✓</span>
                                        <p className="text-slate-700">
                                            <span className="font-semibold">Улучшает кровообращение:</span> помогает расслабить стенки сосудов и улучшить кровоток
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-red-500 font-bold text-lg">✓</span>
                                        <p className="text-slate-700">
                                            <span className="font-semibold">Без кофеина:</span> идеален для тех, кто избегает кофеина, особенно людям с гипертонией
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-red-100 rounded-2xl p-4 border border-red-200">
                                    <p className="text-sm text-red-900">
                                        <span className="font-bold">Рекомендация:</span> пейте 2-3 чашки чая каркаде в день для достижения максимального эффекта. Лучше всего пить в первой половине дня.
                                    </p>
                                </div>
                            </div>
                        </article>

                        {/* Water & Healthy Drinks */}
                        <article className="rounded-3xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-recipe hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] transition duration-300 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />

                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-5xl">💧</span>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">
                                            Вода и полезные напитки
                                        </h3>
                                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mt-1">
                                            Основа здорового образа жизни
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Вода — главный помощник</h4>
                                        <p className="text-slate-700 leading-relaxed">
                                            Пейте 1.5–2 литра чистой воды в день. Вода помогает выводить натрий из организма и поддерживает оптимальное кровяное давление.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Зеленый чай</h4>
                                        <p className="text-slate-700 leading-relaxed">
                                            Содержит полифенолы, которые помогают снижению давления. Пейте 1-2 чашки в день.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Травяные чаи</h4>
                                        <p className="text-slate-700 leading-relaxed">
                                            Ромашка, мелисса и мята помогают расслабиться и улучшить сон, что косвенно влияет на давление.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-100 rounded-2xl p-4 border border-blue-200">
                                    <p className="text-sm text-blue-900">
                                        <span className="font-bold">Совет:</span> избегайте напитков с сахаром, газированных напитков и избыточного кофеина. Они только увеличивают давление.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* Summary Card */}
            <div className="py-12 px-4 bg-gradient-to-br from-teal-500 to-teal-600">
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 lg:p-12">
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                            Начните прямо сейчас
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Шаг 1', text: 'Убедитесь что вы потребляете достаточно воды ежедневно' },
                                { title: 'Шаг 2', text: 'Заполняйте половину тарелки овощами и зеленью' },
                                { title: 'Шаг 3', text: 'Отслеживайте прогресс и чувствуйте разницу' },
                            ].map((step, index) => (
                                <div key={index} className="text-white">
                                    <p className="text-sm font-bold uppercase tracking-wider mb-2 text-teal-100">
                                        {step.title}
                                    </p>
                                    <p className="text-lg font-semibold">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
