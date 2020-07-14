import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { Camera } from '@ionic-native/Camera/ngx';
import { ImageCropperModule } from 'ngx-image-cropper';


import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    RegisterPageRoutingModule,
    ImageCropperModule,
    ReactiveFormsModule
  ],
  providers: [
    Camera,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
