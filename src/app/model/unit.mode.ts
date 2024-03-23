import { IdEntity } from "./id-entity.model";
import { NameEntity } from "./name-entiry.model";


export class Unit implements IdEntity, NameEntity {
    constructor(public name:string, public baseUnit?: Unit, public conversionRatio?: number, public id?: string | undefined) { }
}