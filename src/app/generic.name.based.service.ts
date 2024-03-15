import { Observable } from "rxjs/internal/Observable";
import { NameEntity } from "./model/name-entiry.model";

export interface GenericNameBasedService<T extends NameEntity> {

   getByName(name: string): Observable<T> 


}