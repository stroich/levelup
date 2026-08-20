import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { Recipe } from '@/types/recipe'

export async function getMenuForToday(): Promise<Recipe[]> {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const todayDayNumber = new Date().getDate()

    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('day_number', todayDayNumber)

    if (error) {
        console.error('Error fetching recipes:', error)
        return []
    }

    const mealOrder = ['breakfast', 'lunch', 'dinner']
    const sortedData = [...(data ?? [])].sort((a, b) => {
        return mealOrder.indexOf(a.meal_type) - mealOrder.indexOf(b.meal_type)
    })

    return sortedData as Recipe[]
}