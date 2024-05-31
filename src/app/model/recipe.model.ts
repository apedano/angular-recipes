import { IdEntity } from "./id-entity.model";
import { RecipeIngredient } from "./recipe-ingredient.model";

export class Recipe implements IdEntity {
    
    constructor(public name: string = "", 
    public numberOfPeople: number = 0, 
    public preparation: string = "",
    public ingredients: RecipeIngredient[] = new Array(),
    public id?: string) {
    }
}