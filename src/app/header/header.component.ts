import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSubscription: Subscription;
  collapsed = true;
  isAuthenticated:boolean=false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }
  
  ngOnInit(){
    this.userSubscription = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log("!user" + !user);
      console.log("!!user" + !!user);
    });
  }
  
  onSaveData(){
    this.dataStorageService.saveData();
  }

  onFetchData(){
    this.dataStorageService.fetchData().subscribe();
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
