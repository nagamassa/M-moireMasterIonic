import { Injectable } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Suivi_Alerte_Perso } from '../types';
import { AuthService } from './auth.service';
import { AlerteService } from './alerte.service';
import * as moment from "moment";
import 'moment/locale/pt-br';
 
const { PushNotifications } = Plugins;
 

@Injectable({
  providedIn: 'root'
})
export class PushservicesService {

  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null,
    DateReception: null, DateReponse: null};
  backPage:string = "/folder/alertes/options/coursalerte";

  constructor(private router: Router, private http: HttpClient, private storageService: StorageService,private authService: AuthService, public alerteService : AlerteService,) { }

  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }
 
  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My device token is: ' + JSON.stringify(token.value));
        this.storageService.store(AuthConstants.AUTHDEVICE, token.value);       
      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
    
    
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
        const data = notification.data;
        if (data.detailsId) { this.RecevoirAlerte(data.detailsId); }
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        const data = notification.notification.data;        
        if (data.detailsId) {
          this.lireAlerte(data.detailsId);
          this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',data.detailsId,  {"backPage": "/folder/alertes/options/coursalerte"}]);
        }
      }
    );
  }

  //
  RecevoirAlerte(alerteID) {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.suiviAlertePerso.alerte = alerteID; this.suiviAlertePerso.follower = res.id;
      this.alerteService.getSuiviAlertePersoFilter(this.suiviAlertePerso).subscribe(res3=>{
        if(res3.reception=="Faux"){
          this.suiviAlertePerso = res3; this.suiviAlertePerso.reception = "Vrai";
          moment.locale('fr');
          const now = moment().format("YYYY-MM-DDTHH:mm:ss");
          this.suiviAlertePerso.DateReception = String(now);
          console.log("", JSON.stringify(now));            
          this.alerteService.changeSuiviAlertePerso(this.suiviAlertePerso).subscribe(res4=>{
            console.log("Alerte reçu avec succés", JSON.stringify(res4));              
          },er=>{console.log(er); });
        }
      },er=>{console.log(er); });
      this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',alerteID, {"backPage": this.backPage}]); 
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

  lireAlerte(alerteID) {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.suiviAlertePerso.alerte = alerteID; this.suiviAlertePerso.follower = res.id;
      this.alerteService.getSuiviAlertePersoFilter(this.suiviAlertePerso).subscribe(res3=>{
        if(res3.reponse=="Faux"){
          this.suiviAlertePerso = res3; this.suiviAlertePerso.reponse = "Vrai";
          moment.locale('fr');
          const now = moment().format("YYYY-MM-DDTHH:mm:ss");
          this.suiviAlertePerso.DateReponse = String(now);
          console.log("", JSON.stringify(now));            
          this.alerteService.changeSuiviAlertePerso(this.suiviAlertePerso).subscribe(res4=>{
            console.log("Alerte vu avec succés", JSON.stringify(res4));              
          },er=>{console.log(er); });
        }
      },er=>{console.log(er); });
      this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',alerteID, {"backPage": this.backPage}]); 
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }
  // 
  lancerNotification(detailsId: number, target: string, victime:any) {
    const bodyMessage = "Victime: "+victime?.alias;   const title = "Nouveaux SOS en cours";
    const Authkey = "AAAAC3C4oXg:APA91bEvsm8tTGzQXcbCZOqF591B-Ic8KFTtIPjpWZaayXZO2q_YRLxJjgadAf2vHkD7pgfMPHJXgDgX5v0250EJ6hHTUf0038-PSizKpO5ygFUQcI7oQ3Dy1brf8p2DmNMSYsJcfGPX";
    const topic = target;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'key=' + Authkey });
    let body = { "to": topic, "priority": "high", "notification": { "body": bodyMessage, "title": title, }, "data": { "detailsId": detailsId } };
    const options = { headers: headers };
    const url = "https://fcm.googleapis.com/fcm/send";
    return this.http.post(`${url}`, body, options).subscribe(data => {
      console.log("PUSH Notification lancé avec success: ", JSON.stringify(data));
    }, er=>{console.log("erreur de push notifications: ", JSON.stringify(er)); });
  }

  // const bodyMessage = "Nouvelle alerte en cours";   const title = "SOS";
  // const Authkey = "AAAAC3C4oXg:APA91bEvsm8tTGzQXcbCZOqF591B-Ic8KFTtIPjpWZaayXZO2q_YRLxJjgadAf2vHkD7pgfMPHJXgDgX5v0250EJ6hHTUf0038-PSizKpO5ygFUQcI7oQ3Dy1brf8p2DmNMSYsJcfGPX";
  // const topic = "frMB5S_OSii5m6euj4x0g5:APA91bEMY-2HEXmhF_TU9sjIDcN_IVikR-7ouneTt0kX7imGOPxuhuVHzqshN2QNU_3VLBLvlKk_L0kESAg8-0TibSK0xGJ8gXuZpNBoXgJVRT3QfucjQHTg1LJLrJHzGWTXb3xCstgJ";
  // let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'key=' + Authkey });
  // let body = { "condition": "!('anytopicyoudontwanttouse' in topics)", "priority": "high", "notification": { "body": bodyMessage, "title": title, } };
  // let URL = "https://fcm.googleapis.com/fcm/send"
  // let options = new RequestOptions({ headers: headers });
  // this.http.post(URL, body, options).subscribe(data => {
  // })

}
