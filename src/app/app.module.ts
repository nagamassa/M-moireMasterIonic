import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileUploadModule } from 'ng2-file-upload';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
// =========================================================
import { AngularCropperjsModule } from 'angular-cropperjs';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Network } from '@ionic-native/network/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import {DatePipe} from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { FormsModule } from '@angular/forms';
import { IonCustomScrollbarModule } from 'ion-custom-scrollbar';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
// =========================================================

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularCropperjsModule,
    ImageCropperModule,
    FileUploadModule,
    FormsModule,
    IonCustomScrollbarModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    Camera,  
    // FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    HttpService,
    CallNumber,
    Contacts,
    SMS,
    Crop,
    File,
    VideoPlayer,
    // ImagePicker,
    MediaCapture,
    Media,
    StreamingMedia,
    PhotoViewer,
    Geolocation,
    NativeGeocoder,
    FileTransferObject,
    FileTransfer,
    NativeStorage,
    DatePicker,
    DatePipe,
    Network,
    Base64,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
