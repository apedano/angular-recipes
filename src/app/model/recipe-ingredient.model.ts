import { Ingredient } from "./ingredient.model";
import { Unit } from "./unit.mode";

export class RecipeIngredient {
    constructor(public ingredient?: Ingredient, public amount?: number, public unit?: Unit) {}    
}