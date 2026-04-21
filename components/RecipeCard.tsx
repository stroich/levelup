'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Recipe } from '@/app/actions'
import React from 'react'


interface RecipeCardProps {
    recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [isLoading, setIsLoading] = React.useState(true)

    return (
        <Link href={`/recipes/${recipe.id}`}>
            <article className="group rounded-3xl border border-slate-200 bg-white shadow-recipe transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] flex flex-col cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 flex-shrink-0 rounded-t-3xl">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                        </div>
                    )}
                    <Image
                        src={recipe.image_url}
                        alt={recipe.title}
                        fill
                        className={`object-cover transition duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                </div>

                <div className="space-y-5 p-6 flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0FA894]">{recipe.meal_type}</p>
                        <span className="rounded-full bg-[#0FA894] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                            {recipe.nutrition.calories} кКал
                        </span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{recipe.title}</h3>
                    </div>
                </div>
            </article>
        </Link>
    )
}