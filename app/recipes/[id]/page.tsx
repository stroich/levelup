import { getRecipeById } from '@/utils/supabase/queries/recipes'
import RecipeHero from './_components/RecipeHero'
import NutritionFacts from './_components/NutritionFacts'
import IngredientsSection from './_components/IngredientsSection'
import InstructionsSection from './_components/InstructionsSection'
import Link from 'next/link'
import { Metadata } from 'next'

interface RecipePageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata(
    { params }: RecipePageProps,
): Promise<Metadata> {
    const { id } = await params
    const recipe = await getRecipeById(id)

    if (!recipe) {
        return {
            title: 'Recipe Not Found',
        }
    }

    return {
        title: `${recipe.title} - Menu Recipe`,
        description: `${recipe.meal_type.charAt(0).toUpperCase() + recipe.meal_type.slice(1)} recipe with ${recipe.ingredients.length} ingredients`,
    }
}

export default async function RecipePage({ params }: RecipePageProps) {
    const { id } = await params
    const recipe = await getRecipeById(id)

    if (!recipe) {
        return (
            <div className="min-h-screen bg-slate-50 py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 font-semibold mb-10 transition"
                    >
                        <span>←</span>
                        <span>Back to Menu</span>
                    </Link>

                    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-recipe">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Recipe Not Found</h1>
                        <p className="text-slate-600 mb-6">
                            The recipe you&apos;re looking for doesn&apos;t exist. Please return to the menu and try again.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-2 bg-nutrition-primary text-white font-semibold rounded-lg hover:bg-nutrition-primary/90 transition"
                        >
                            Back to Menu
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-nutrition-primary hover:text-nutrition-primary/80 font-semibold mb-10 transition"
                >
                    <span>←</span>
                    <span>Back to Menu</span>
                </Link>

                <div className="flex justify-between gap-6">

                    <div className="mb-8 flex-1">
                        <RecipeHero recipe={recipe} />
                    </div>

                    <div className="flex-1">
                        <div className="mb-8">
                            <NutritionFacts nutrition={recipe.nutrition} />
                        </div>

                        <div className="mb-8">
                            <IngredientsSection ingredients={recipe.ingredients} />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <InstructionsSection instructions={recipe.instructions} />
                </div>
            </div>
        </div>
    )
}
