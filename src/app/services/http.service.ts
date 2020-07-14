// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headersToString } from 'selenium-webdriver/http';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { catchError, tap, map } from 'rxjs/operators';
import { Alerte, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Suivi_Alerte_Perso } from '../types';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient, private storageService: StorageService) { }

change_password(id: any, pass: string) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });  
  const options = { headers: headers, withCredintials: true };
  const url = environment.apiUrl +'/'+'wallu/utilisateurs/'+ id +'/'+ pass +'/';
  return this.http.put(`${url}`, options);
}
  
signup(serviceName: string, data: any) {
    const headers = new HttpHeaders({
    });  
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl +'/'+ serviceName;
    console.log(JSON.stringify(data))
    return this.http.post(`${url}`, data, options);
}

login(serviceName: string, data: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  const options = { headers: headers, withCredintials: true };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post(`${url}`, JSON.stringify(data), options);
}

getLogged(serviceName: string, token: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Token '+ token,});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<any>(`${url}`, options);
}

getCurrenttUser(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<any>(`${url} ${id}/`, options);
}

lancerAlerteDirect(serviceName: string, data: any) {
  const headers = new HttpHeaders({'Content-Type': 'application/json',});  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post(`${url}`, {"auteur": data.id}, options);
}

loadCoordonnees(data: any) {
  const headers = new HttpHeaders({'Content-Type': 'application/json',});  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/wallu/alertes/'+data.alerte+'/coordonnees/';
  return this.http.post(`${url}`, data, options);
}

myAlertes(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Alerte[]>(`${url} ${id}/`, options);
}

myLinkAlertes(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Alerte[]>(`${url} ${id}/`, options);
}

getAlerte(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Alerte>(`${url} ${id}/`, options);
}

getAlerteAuteur(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur>(`${url} ${id}/auteur/`, options);
}

getAlerteCoordonnees(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Coordonnees[]>(`${url} ${id}/coordonnees/`, options);
}

getAlertePieces(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<PieceJointe[]>(`${url} ${id}/pieces/`, options);
}

getAlerteGroups(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Alerte_Group[]>(`${url} ${id}/suivi_groups/`, options);
}

getAlerteLocalites(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Alerte_Localite[]>(`${url} ${id}/suivi_localites/`, options);
}

getAlerteAgences(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Alerte_Agence[]>(`${url} ${id}/suivi_agences/`, options);
}

uploadPiece(serviceName: string, data: any, id: any) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<PieceJointe>(`${url} ${id}/piecesUpload/`, data, options);
}

findByPhone(serviceName: string, phone: number) {  
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<any>(`${url}${phone}/`, options);
}

ajouterPersonTarget(serviceName: string, data: Suivi_Alerte_Perso) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Suivi_Alerte_Perso>(`${url} ${data.alerte}/suivi_perso/`, data, options);
}

getAlerteFollower(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Alerte_Agence[]>(`${url} ${id}/suivi_perso/`, options);
}




// getLogged(serviceName: string) {
//   this.storageService.get(AuthConstants.AUTH).then(value => {
//     const headers = new HttpHeaders({
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT', 'DELETE',
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Token '+ value,});
//     const options = { headers: headers, withCredintials: false };
//     const url = environment.apiUrl + serviceName;  
//     return this.http.get<any>(`${url}`, options);
//   });
// }
}

// [console.log]: {
//    "headers": {
//      "normalizedNames": {},
//      "lazyUpdate": null,
//      "headers": {}
//    },
//    "status": 0,
//    "statusText": "Unknown Error",
//    "url": "http://localhost:8000/auth/token/login",
//    "ok": false,
//    "name": "HttpErrorResponse",
//    "message": "Http failure response for http://localhost:8000/auth/token/login: 0 Unknown Error",
//    "error": {
//      "isTrusted": true
//    }
//  }






// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw