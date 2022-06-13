import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.servic';
import { DataStorageService } from './../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });    
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
