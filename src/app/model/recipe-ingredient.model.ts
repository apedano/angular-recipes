import { Ingredient } from "./ingredient.model";
import { Unit } from "./unit.mode";

export class RecipeIngredient {
    constructor(public ingredient: Ingredient, amount: number, unit: Unit) { }    
}