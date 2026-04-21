import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Recipe } from "@/app/actions";

export async function getRecipeById(id: string): Promise<Recipe | null> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching recipe:", error);
        return null;
    }

    return data as Recipe;
}
