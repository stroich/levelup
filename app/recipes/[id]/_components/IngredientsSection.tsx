import { Ingredient } from '@/app/actions'

interface IngredientsSectionProps {
    ingredients: Ingredient[]
}

export default function IngredientsSection({ ingredients }: IngredientsSectionProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight text-center">
                Ингредиенты
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-recipe">
                <ul className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700">
                            <span className="text-[#0FA894] font-bold mt-0.5">•</span>
                            <span className="text-base leading-relaxed">
                                <strong>{ingredient.name}</strong> — {ingredient.amount}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
