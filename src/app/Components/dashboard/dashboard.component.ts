import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/Store/user.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  mode:string = '';

  constructor(private store:Store<{user:User}>){}
  ngOnInit(): void {
      this.store.select('user').subscribe((user:User) => {
        this.mode = user.role.toUpperCase();
      })
  }
}
