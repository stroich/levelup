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

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export interface Recipe {
    id: number
    day_number: number
    meal_type: MealType
    title: string
    ingredients: Ingredient[]
    nutrition: Nutrition
    instructions: string[]
    image_url: string
}
