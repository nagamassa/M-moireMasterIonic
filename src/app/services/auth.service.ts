import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { AppComponent } from '../app.component';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
    ) {}

  getUserDataS(){      
    this.storageService.get(AuthConstants.AUTHDATA).then(res => {
      this.userData$.next(res);
      console.log(this.userData$);
    });
  }
  
  change_password(id: any, pass: string): Observable<any> {
    return this.httpService.change_password(id, pass);
  }

  // 
  change_notification(id: any, idNotification: string): Observable<any> {
    return this.httpService.change_notification(id, idNotification);
  }
  // 
  getUserData(postData: any): Observable<any> {
    return this.httpService.getLogged('auth/users/me/', postData);
  }

  getCurrenttUser(postData: any): Observable<any> {
    return this.httpService.getCurrenttUser('wallu/utilisateurs/', postData);
  }

  login(postData: any): Observable<any> {
    return this.httpService.login('auth/token/login/', postData);
  }
    
  signup(postData: any): Observable<any> {
    return this.httpService.signup('auth/users/', postData);
  }

  logout() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res => {
      this.change_notification(res.id, "nothing").subscribe(res2=>{},er=>{});      
    });
    this.storageService.removeItem(AuthConstants.AUTH).then(res => {
      this.storageService.clear();
      this.userData$.next('');
    });
    
    this.router.navigate(['/login']);
  }
}
