import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export interface Ingredient {
    name: string
    amount: string
}

export interface Nutrition {
    calories: number
    protein: number
    fat: number
    carbs: number
}

export interface Recipe {
    day_number: number
    meal_type: 'breakfast' | 'lunch' | 'dinner'
    title: string
    ingredients: Ingredient[]
    nutrition: Nutrition
    instructions: string[]
    image_url: string
}

export async function getMenuForToday(): Promise<Recipe[]> {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const today = new Date().getDate()

    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('day_number', today)

    if (error) {
        console.error('Error fetching recipes:', error)
        return []
    }

    // Sort recipes in order: breakfast, lunch, dinner
    const mealOrder = ['breakfast', 'lunch', 'dinner']
    const sortedData = data.sort((a, b) => {
        return mealOrder.indexOf(a.meal_type) - mealOrder.indexOf(b.meal_type)
    })

    return sortedData as Recipe[]
}