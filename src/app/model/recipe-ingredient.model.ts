import { Ingredient } from "./ingredient.model";
import { Unit } from "./unit.mode";

export class RecipeIngredient {
    constructor(public ingredient?: Ingredient, public amount?: Number, public unit?: Unit) {}    
}