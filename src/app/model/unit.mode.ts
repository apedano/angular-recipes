import { IdEntity } from "./id-entity.model";


export class Unit implements IdEntity {
    constructor(public name?:string, public baseUnit?: Unit, public conversionRatio?: number, public id?: string | undefined) { }
}