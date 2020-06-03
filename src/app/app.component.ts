import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  loader:boolean = false;

  constructor(private spinner: NgxSpinnerService, private authService: AuthService){}

  ngOnInit(){    
    this.authService.onReloadPage();
  }
}
