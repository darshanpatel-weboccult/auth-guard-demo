import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../Store/user.reducer';
import { userActions } from '../Store/user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ user: User }>, private router: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const { role } = route.data;

    const usr = JSON.parse(localStorage.getItem('user') ?? '""');
    const uid = JSON.parse(sessionStorage.getItem('uid') ?? '""');

    if(uid && usr.uid && uid === usr.uid){
      this.store.dispatch(userActions.updateUser({name: usr.name, role:usr.role}))
    }

    const user: User = await new Promise((resolve, reject) => {
      this.store.select('user').subscribe((user: User) => {
        resolve(user);
      });
    });
    console.log('hey', user);

    if (!role) {
      if (user.name !== '') {
        this.router.navigate([user.role, 'dashboard']);
        return false;
      }
      return true;
    } else {
      if (user.role === '') {
        this.router.navigate(['login']);
        return false;
      }
      if (role === 'admin') {
        if (user.role !== 'admin') {
          this.router.navigate([user.role, 'dashboard']);
          return false;
        }
        return true;
      } else {
        if (user.role !== 'user') {
          this.router.navigate([user.role, 'dashboard']);
          return false;
        }
        return true;
      }
    }

    return true;
  }
}
