import { IdEntity } from "./id-entity.model";
import { NameEntity } from "./name-entiry.model";

export class Ingredient implements NameEntity, IdEntity {
    constructor(public name: string, public id?: string) { }    
}