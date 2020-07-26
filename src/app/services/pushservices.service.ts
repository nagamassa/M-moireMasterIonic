import { Injectable } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
 
const { PushNotifications } = Plugins;
 

@Injectable({
  providedIn: 'root'
})
export class PushservicesService {

  constructor(private router: Router, private http: HttpClient, private storageService: StorageService,) { }

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
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          this.router.navigateByUrl(`/folder/alertes/options/coursalerte/mycoursdetails/${data.detailsId}`);
        }
      }
    );
  }

  // 
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
