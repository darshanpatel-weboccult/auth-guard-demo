import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Store/user.reducer';
import { Store } from '@ngrx/store';
import { userActions } from './Store/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  constructor(private router:Router,private store:Store<{user:User}> ){}

  user!:User; 

  ngOnInit(): void {
      this.store.select('user').subscribe((user:User) => {
        this.user = user;
      })
  }
  
  navigate(...path:string[]):void{
    
    if(path.includes('dashboard')){      
      if(this.user && this.user.role === 'admin'){
        this.router.navigate(['admin','dashboard'])
      }else{
        this.router.navigate(['user','dashboard'])
      }
      return;
    }
    if(path.includes('login')){
      this.router.navigate(path);
      return;
    }
  }

  logout():void{
    this.store.dispatch(userActions.updateUser({name:'', role:''}));
    sessionStorage.removeItem('uid');
    this.router.navigate(['login']);
  }

  
}
