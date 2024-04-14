import { IdEntity } from "./id-entity.model";
import { RecipeIngredient } from "./recipe-ingredient.model";

export class Recipe implements IdEntity {
    
    public ingredients: RecipeIngredient[] = new Array();

    constructor(public name?: string, public numberOfPeople?: number, public id?: string, ) {
    }
}