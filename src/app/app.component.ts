import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { Network } from '@ionic-native/network/ngx';
import { ToastService } from './services/toast.service';
import { AlerteService } from './services/alerte.service';
import { AuthConstants } from './config/auth-constants';
import { Coordonnees } from './types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  disconnected:Boolean=false;
  address: string;
  coordonnees = {alerte: null,dateCoordonnees: '',longitude: 1.0,latitude: 1.0}
  displayUserData: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Alertes',
      url: '/folder/alertes',
      icon: 'warning'
    },
    {
      title: 'Articles',
      url: '/folder/articles',
      icon: 'newspaper' 
    },
    {
      title: 'Groupes',
      url: '/folder/groupes',
      icon: 'people-circle'
    },
    {
      title: 'Blocages',
      url: '/folder/blocages',
      icon: 'lock-closed'
    },
    {
      title: 'Autres articles',
      url: '/folder/autresarticles',
      icon: 'newspaper'
    },
    {
      title: 'Signals',
      url: '/folder/signals',
      icon: 'alert-circle' 
    },
    {
      title: 'Agences',
      url: '/folder/agences',
      icon: 'business'
    },
    {
      title: 'Profil',
      url: '/folder/profil',
      icon: 'person-circle'
    },   
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar,
    private router: Router, private authService: AuthService, public network : Network,
    public toastService : ToastService, public storageService : StorageService,
    public alerteService : AlerteService, private geolocation: Geolocation, 
    private nativeGeocoder: NativeGeocoder,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.router.navigateByUrl('login');
      this.splashScreen.hide();
    });
  }

  url= '';
  ngOnInit() {
    this.authService.userData$.subscribe(res => {
      this.url = environment.apiUrl + res.photo;
    });
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }    
    this.authService.userData$.subscribe(res => {
      this.displayUserData = res;
    });      
  }

  logoutAction() {
    this.authService.logout();
  }


  lancerAlerteDirect(){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.lancerAlerteDirect(res).subscribe(res=>{
        this.coordonnees.alerte = res.id;
        this.geolocation.getCurrentPosition().then((resp) => {
          this.coordonnees.latitude = resp.coords.latitude;
          this.coordonnees.longitude = resp.coords.longitude;
          this.getAddress(this.coordonnees.latitude, this.coordonnees.longitude);
          this.alerteService.loadCoordonnees(this.coordonnees).subscribe(res =>{
            console.log('coordonnes loaded avec success');            
          },err=>{
            console.log(err);            
          })     
         }).catch((error) => {
           console.log('Error getting location', error);
         });         
         let watch = this.geolocation.watchPosition();
         watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
         }); 
         this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',res.id]); 
      }, err =>{
        console.log(JSON.stringify(err));        
      });
    }, error => {
      this.toastService.presentToast("Dédolé, veuillez vous connecter dabord!")     
    });
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  // get address using coordinates
  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
      alert('Adresse: '+ this.address);
    })
    .catch((error: any) => {
      alert('Error getting address'+ JSON.stringify(error));
    });
  }

  // address
  pretifyAddress(addresse){
    let obj = [];
    let data = "";
    for (let key in addresse) {
      obj.push(addresse[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return addresse.slice(0, -2);
  }


  

}
