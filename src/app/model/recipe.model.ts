import { IdEntity } from "./id-entity.model";
import { RecipeIngredient } from "./recipe-ingredient.model";

export class Recipe implements IdEntity {
    constructor(public name?: string, numberOfPeople?: number, ingredients?: RecipeIngredient[], public id?: string, ) { }
}