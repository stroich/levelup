'use client'

import Image from 'next/image'
import { Recipe } from '@/app/actions'
import React from 'react'

interface RecipeHeroProps {
    recipe: Recipe
}

export default function RecipeHero({ recipe }: RecipeHeroProps) {
    const [isLoading, setIsLoading] = React.useState(true)

    return (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-recipe overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-t-3xl">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                    </div>
                )}
                <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className={`object-cover transition duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoadingComplete={() => setIsLoading(false)}
                    priority
                />
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0FA894]">
                        {recipe.meal_type}
                    </p>
                    <span className="rounded-full bg-[#0FA894] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {recipe.nutrition.calories} кКал
                    </span>
                </div>

                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    {recipe.title}
                </h1>
            </div>
        </div>
    )
}
