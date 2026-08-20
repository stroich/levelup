'use client'

import type { Nutrition } from '@/types/recipe'
import { useState } from 'react'

interface NutritionFactsProps {
    nutrition: Nutrition
}

export default function NutritionFacts({ nutrition }: NutritionFactsProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="rounded-[16px] border-2 border-teal-500 bg-white p-8 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-teal-500 mb-6">
                Пищевая ценность <span className="text-xs font-semibold">(на одну порцию)</span>
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-3xl font-black text-[#1F2937]">{nutrition.calories}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mt-1">
                        Калории
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-[#1F2937]">{nutrition.fat}g</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mt-1">
                        Жиры
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-[#1F2937]">{nutrition.carbs}g</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mt-1">
                        углеводы
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-[#1F2937]">{nutrition.protein}g</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mt-1">
                        Белки
                    </p>
                </div>
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition"
            >
                <span className="text-lg">📋</span>
                <span>{isExpanded ? 'Скрыть полезную информацию' : 'Показать полезную информацию'}</span>
            </button>

            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-nutrition-label leading-relaxed">
                        Пищевая ценность рассчитана на основе базы данных ингредиентов и должна рассматриваться как ориентировочная.
                        В случаях, когда указано несколько альтернативных ингредиентов, расчет производится по первому из списка.
                        Гарниры и дополнительные ингредиенты не учитываются.
                    </p>
                </div>
            )}
        </div>
    )
}
