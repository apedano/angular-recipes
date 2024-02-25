import { Injectable, WritableSignal, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public debugMode: WritableSignal<boolean> = signal(false);

  constructor() { }
}
