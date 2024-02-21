import { Injectable, WritableSignal, signal } from '@angular/core';
import { GenericHttpBasedService } from './generic.service';
import { IdEntity } from './model/id-entity.model';
import { HttpClient } from '@angular/common/http';
import { Unit } from './model/unit.mode';

@Injectable({
  providedIn: 'root'
})
export abstract class SignalBasedGenericService<T extends IdEntity>  {
  
  allValues: WritableSignal<T[]> = signal([] as T[])
  
  constructor() {
    
  }


  



}
