import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ILogged } from '../../models/Post/LoggedUser/ilogged.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _HttpClient = inject(HttpClient)
  userInfo:WritableSignal<ILogged|null> = signal<ILogged|null>(null)
  constructor(){
    const localStorageUser = localStorage.getItem('userInfo')
    if(localStorageUser){
      this.userInfo.set(JSON.parse(localStorageUser))
    }
  }

}
