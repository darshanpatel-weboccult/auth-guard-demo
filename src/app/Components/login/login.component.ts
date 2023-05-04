import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userActions } from 'src/app/Store/user.action';
import { User } from 'src/app/Store/user.reducer';

interface UserCreds{
  email: string;
  name:string;
  password: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string = '';
  password: string = '';
  users:UserCreds[] = [
    {
      name: 'Darshan',
      email:'admin@wot.com',
      password:'admin123',
      role:'admin'
    },
    {
      name: 'Someone',
      email:'user@wot.com',
      password:'user123',
      role:'user'
    },
  ]
  constructor(private store:Store<{user:User}>, private router:Router){}

  login():void{
    const index = this.users.findIndex((user:UserCreds) => user.email === this.email && user.password === this.password);
    if(index === -1){
      alert('invalid Creds');
      return;
    }
    const usr =  {
      name: this.users[index].name,
      role: this.users[index].role,
    }
    const uid = new Date().getTime();
    sessionStorage.setItem('uid', JSON.stringify(uid));
    localStorage.setItem('user', JSON.stringify({...usr, uid}));
    this.store.dispatch(userActions.updateUser({name:this.users[index].name, role:this.users[index].role}));

    if(this.users[index].role === 'admin'){
      this.router.navigate(['admin','dashboard']);
    }else{
      this.router.navigate(['user','dashboard']);
    }

  }
}
