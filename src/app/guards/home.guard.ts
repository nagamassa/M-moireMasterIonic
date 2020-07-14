import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
      .get(AuthConstants.AUTH)
      .then(res => {
        if (res) {
          resolve(true);
        } else {
          this.router.navigate(['']);
          resolve(false);
        }
      })
      .catch(err => {
        resolve(false); 
      });
    });
  }
  
}

// canActivate: [IndexGuard]