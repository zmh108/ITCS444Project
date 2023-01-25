import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Plugins} from '@capacitor/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const { Storage } = Plugins;

const TOKEN_KEY = 'user-token';

export interface User {
  name: string;
  role: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor(private router: Router) {
    this.loadUser();
   }

   loadUser(){
    Storage['get']({ key: TOKEN_KEY }).then((res: { value: string; }) => {
      if(res.value){
        this.currentUser.next(JSON.parse(res.value));
      }
      else{
        this.currentUser.next(false);
      }
    });

   }

   signIn(name: string){

    let userObj: User;

    if(name==='user'){
      userObj = {
        name: 'TonyTest',
        role: 'USER',
        permissions: ['read']
      };
      }
      else if (name === 'admin') {
        userObj = {
          name: 'AdamAdmin',
          role: 'ADMIN',
          permissions: ['read', 'write']
        };
      }

      /*return of(userObj).pipe(
        tap(user => {
          Storage['set']({ key: TOKEN_KEY, VALUE: JSON.stringify(user)});
          this.currentUser.next(user);
        })
      );*/
    }

    getUser(){
      return this.currentUser.asObservable();
    }

    async logout(){
      await Storage['remove']({ key:TOKEN_KEY});
      this.currentUser.next(false);
      this.router.navigateByUrl('/', {replaceUrl: true});
    }

    hasPermission(permissions: string[]): boolean{
      for (const permission of permissions){
        if (!this.currentUser.value || !this.currentUser.value.permissions.includes(permission)) {
          return false;
        }
      }
      return true;
   }

  }



