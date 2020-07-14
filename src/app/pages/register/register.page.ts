import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Base64 } from '@ionic-native/base64/ngx';

import {Camera, CameraOptions} from '@ionic-native/Camera/ngx';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import { ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import 'moment/locale/pt-br';

import { ActionSheetController } from '@ionic/angular'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  base64Image:any; croppedImage = null; imageChangedEvent: any = ''; finalImage: any;

  deviceError:any;  imageInfo:any; 

  postError = {usernameError: '',passwordError: '',emailError:'',};

  operateur = ''; numero = '';

  user = {username: '',password: '',first_name: '',last_name: '',email: '',alias: '',phone: null,
          dateNaissance: null,description: '',photo: null,localite: ''}

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService,
              private toastService : ToastService, private camera:Camera, private toastConroll:ToastController,
              private loadingCtrl:LoadingController, private alertCtrl:AlertController,
              public actionSheetCtrl: ActionSheetController, public platform: Platform,
              private activatedRoute: ActivatedRoute, private base64:Base64,
  ) { }

  async presentActionSheet() {
    const actionSheet =await this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera()
          }
        },{
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.openGallery()
          }
        },
      ]
    });
    actionSheet.present();
  } 
 
  openCamera(){
    const options : CameraOptions = {
      quality : 100,
      targetHeight:500,
      targetWidth:500,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    },(err)=>{

    });
  }
  
  openGallery(){
    const options : CameraOptions = {
      quality : 100,
      targetHeight:500,
      targetWidth:500,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    },(err)=>{

    });

  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  ngOnInit() {
  }

  dataURItoBlob(dataURI, type) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], { type: type });
    return bb;
}

  tryAddUser(){
    // moment.locale('fr');
    // const now =moment().format("dddd Do MMMM YYYY");
    // this.user.dateNaissance = now
    if (this.numero!=''){
      this.user.phone = Number(this.operateur+this.numero);
    }   
    let formData: FormData = new FormData();
        formData.append('username', this.user.username);
        formData.append('password', this.user.password);
        formData.append('email', this.user.email);        
        formData.append('phone', this.user.phone);  
    if (this.croppedImage){
      this.user.photo = this.dataURItoBlob(this.croppedImage, 'image/png');
      formData.append('photo', this.user.photo, this.user.username+'.png');
    }   
    
    this.authService.signup(formData).subscribe(data =>{
      this.authService.change_password(data.id, this.user.password).subscribe(res=>{
        this.postError.usernameError = ''; this.postError.passwordError = '';this.postError.emailError = '';
        this.deviceError='';  
        this.toastService.presentToast("Votre compte a été bien crée");
      }, err => {
        this.deviceError=JSON.stringify(err);        
      });
    }, 
    (error: any) => { 
      console.log(error);
      this.deviceError=JSON.stringify(error);   
      
      if (error.error.email){
        this.postError.emailError = error.error.email;
          this.postError.usernameError = ''; this.postError.passwordError = '';
      } else if (error.error.username){
        this.postError.usernameError = error.error.username;
          this.postError.passwordError = ''; this.postError.emailError = '';
      } else if (error.error.password){
        this.postError.passwordError = error.error.password;
          this.postError.usernameError = ''; this.postError.emailError = '';
      } else {
        this.toastService.presentToast(JSON.stringify(error))
      }
    });
  }




}
