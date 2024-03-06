import { Injectable, WritableSignal, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public debugMode: WritableSignal<boolean> = signal(true);

  constructor() { }

  logIfDebug(message?: any, ...optionalParams: any[]) {
    if(this.debugMode()) {
      console.log(message,optionalParams);  
    }
  }

}
