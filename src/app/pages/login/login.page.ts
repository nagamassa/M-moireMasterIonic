import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  deviceError:any;

  postError = {
    usernameError: '',
    passwordError: '',
    dataError:'',
  };

  postData = {
    username: '',
    password: ''
    };
    
    constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService : ToastService
    ) {}

  ngOnInit() {}
  
  
    
    loginAction() {
      this.storageService.clear();
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          if (res.auth_token) {
            // Storing the token.
            this.storageService.store(AuthConstants.AUTH, res.auth_token);                   
            // storing the logged user
            this.authService.getUserData(res.auth_token).subscribe(
              (us: any) => {
                // stockage de current user
                this.authService.getCurrenttUser(us.id).subscribe((cu:any) => {
                  this.storageService.store(AuthConstants.AUTHDATA, cu);
                })
              },
              (error: any) => {
                console.log('erreur getting utilisateur');
              }
            );
            this.router.navigate(['/welcome']);
          } else {
            this.toastService.presentToast('incorrect password.');
          }
        },
        (error: any) => {
          console.log(error);
          
          if (error.error.username){
            this.postError.usernameError = error.error.username;
              this.postError.passwordError = '';
              this.postError.dataError = '';
          } else if (error.error.password){
            this.postError.passwordError = error.error.password;
              this.postError.usernameError = '';
              this.postError.dataError = '';
          } else if (error.error.non_field_errors){
            this.postError.dataError = 'login et/ou mot de passe incorrecte(s)';
              this.postError.usernameError = '';
              this.postError.passwordError = '';
          } else {
            this.toastService.presentToast(JSON.stringify(error));
            this.deviceError=JSON.stringify(error);
          }
        }
      );
    }

}
