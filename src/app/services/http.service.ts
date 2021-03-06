// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { headersToString } from 'selenium-webdriver/http';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { catchError, tap, map } from 'rxjs/operators';
import { Alerte, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Suivi_Alerte_Perso, Groupe, Membre, Localite, Article, Suivi_Article_Agence, Agence, Bloccage } from '../types';


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
// 
change_notification(id: any, idNotification: string) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }); 
  const options = { headers: headers, withCredintials: true };
  const url = environment.apiUrl +'/'+'wallu/utilisateurs/'+ id +'/change_notification/'+ idNotification +'/';
  return this.http.put(`${url}`, options);
}

addLocalite(serviceName: string, data: Localite) {
  const headers = new HttpHeaders({ });  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Localite>(`${url}`, data, options);
}
// 
signup(serviceName: string, data: any) {
    const headers = new HttpHeaders({
    });  
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl +'/'+ serviceName;
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

programmerAlerte(serviceName: string, data: any, titre: any) {
  const headers = new HttpHeaders({'Content-Type': 'application/json',});  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post(`${url}`, {"auteur": data.id, "utilisee":"Faux", "statut":"Inactive", "type":"Programmée", titre: titre}, options);
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

myGroupes(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Groupe[]>(`${url} ${id}/myGroupes/`, options);
}

myLinkGroupes(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Groupe[]>(`${url} ${id}/myGroupesLinked/`, options);
}


getGroupe(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Groupe>(`${url} ${id}/`, options);
}

getGroupeAuteur(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur>(`${url} ${id}/auteur/`, options);
}

getGroupeMembres(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Membre[]>(`${url} ${id}/membres/`, options);
}

getGroupeMembresUsers(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur[]>(`${url} ${id}/membres/users/`, options);
}

changeMember(serviceName: string, mbr: Membre) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<Membre>(`${url}${mbr.groupe}/membres/${mbr.id}/`, mbr, options);
}

deleteMember(serviceName: string, mbr: Membre) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${mbr.groupe}/membres/${mbr.id}/`, options);
}

addNewGroupe(serviceName: string, data: any) {
  const headers = new HttpHeaders({  });  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Groupe>(`${url}`, data, options);
}

addNewMembre(serviceName: string, data: any) {
  const headers = new HttpHeaders({  });  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Membre>(`${url}${data.groupe}/membres/`, data, options);
}

deleteGroupe(serviceName: string, id: any) {
  const headers = new HttpHeaders({  });  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${id}/`, options);
}

ajouterGroupeTarget(serviceName: string, data: Suivi_Alerte_Group) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Suivi_Alerte_Group>(`${url} ${data.alerte}/suivi_groups/`, data, options);
}

getAlerteUsersFollower(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur[]>(`${url} ${id}/suivi_perso/users/`, options);
}

getAlerteGroupsData(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Groupe[]>(`${url} ${id}/suivi_groups/data/`, options);
}

getAlerteLocalitesData(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Localite[]>(`${url} ${id}/suivi_localites/data/`, options);
}

allLocalites(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Localite[]>(`${url}`, options);
}

ajouterLocaliteTarget(serviceName: string, data: Suivi_Alerte_Localite) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Suivi_Alerte_Localite>(`${url}${data.alerte}/suivi_localites/`, data, options);
}

getLocaliteUsers(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur[]>(`${url}${id}/users/`, options);
}

changeSuiviAlertePerso(serviceName: string, data: Suivi_Alerte_Perso) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<Suivi_Alerte_Perso>(`${url}${data.follower}/${data.alerte}/`, data, options);
}

getSuiviAlertePersoFilter(serviceName: string, data: Suivi_Alerte_Perso) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Alerte_Perso>(`${url}${data.follower}/${data.alerte}/`, options);
}

changeAlerteInfos(serviceName: string, data: Alerte) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<Alerte>(`${url}${data.id}/`, data, options);
}

myAlertesProg(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Alerte[]>(`${url} ${id}/`, options);
}

deleteSuiviAlertePerso(serviceName: string, data: Suivi_Alerte_Perso) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

deleteGroupeTarget(serviceName: string, data: Suivi_Alerte_Group) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

deleteLocaliteTarget(serviceName: string, data: Suivi_Alerte_Localite) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

deleteAgenceTarget(serviceName: string, data: Suivi_Alerte_Agence) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

killAlerte(serviceName: string, data: Alerte) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

killPiece(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}`, options);
}

pieceLoadCanges(serviceName: string, postData:PieceJointe) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<any>(`${url}`, postData ,options);
}

allPublication(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Article[]>(`${url}`, options);
}

getArticle(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Article>(`${url}${id}/`, options);
}

getArticlePieces(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<PieceJointe[]>(`${url} ${id}/pieces/`, options);
}

getArticleAgences(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Suivi_Article_Agence[]>(`${url} ${id}/suivi_agences/`, options);
}

getArticleLocalite(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Localite>(`${url} ${id}/`, options);
}

getAgenceData(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Agence>(`${url} ${id}/`, options);
}

allGestionArticles(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Article[]>(`${url} ${id}/`, options);
}

allAgences(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Agence[]>(`${url}`, options);
}

ajouterAgenceTarget(serviceName: string, data: Suivi_Article_Agence) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Suivi_Article_Agence>(`${url} ${data.article}/suivi_agences/`, data, options);
}


deleteSuiviArticleAgence(serviceName: string, data: Suivi_Article_Agence) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

articleLoadeChanges(serviceName: string, data: Article) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<Article>(`${url} ${data.id}/`, data, options);
}

killArticle(serviceName: string, data: Article) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}${data.id}/`, options);
}

programmerArticle(serviceName: string, data: any) {
  const headers = new HttpHeaders({'Content-Type': 'application/json',});  
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post(`${url}`, {"auteur": data.id}, options);
}

allPostedArticles(serviceName: string, id: any) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Article[]>(`${url} ${id}/`, options);
}

getAllAlerteCoordonnees(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Coordonnees[]>(`${url}`, options);
}

ajouterAgenceTargetAlerte(serviceName: string, data: Suivi_Alerte_Agence) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Suivi_Alerte_Agence>(`${url} ${data.alerte}/suivi_agences/`, data, options);
}

myOwnBlocks(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Bloccage[]>(`${url}`, options);
}

myOtherBlocks(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Bloccage[]>(`${url}`, options);
}

// =======================================================

newBlocage(serviceName: string, data: Bloccage) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.post<Bloccage>(`${url}`, data, options);
}

blockLoadeChanges(serviceName: string, data: any) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.put<Bloccage>(`${url}`, data, options);
}

unlockLoadeChanges(serviceName: string, data: any) {
  const headers = new HttpHeaders({  });
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.delete<any>(`${url}`, options);
}

getAllUser(serviceName: string) {  
  const headers = new HttpHeaders({'Content-Type': 'application/json',});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl +'/'+ serviceName;
  return this.http.get<Utilisateur[]>(`${url}`, options);
}

// =====================================================

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





// Google Cloud platform
// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw
// key = API_KEY AIzaSyDZgBnzwL8kiO7p2eKzAAR0PvA5kCqicHw

// FireBase Cloud Messaging (FCM)
// key = AAAAC3C4oXg:APA91bEvsm8tTGzQXcbCZOqF591B-Ic8KFTtIPjpWZaayXZO2q_YRLxJjgadAf2vHkD7pgfMPHJXgDgX5v0250EJ6hHTUf0038-PSizKpO5ygFUQcI7oQ3Dy1brf8p2DmNMSYsJcfGPX
// key = AAAAC3C4oXg:APA91bEvsm8tTGzQXcbCZOqF591B-Ic8KFTtIPjpWZaayXZO2q_YRLxJjgadAf2vHkD7pgfMPHJXgDgX5v0250EJ6hHTUf0038-PSizKpO5ygFUQcI7oQ3Dy1brf8p2DmNMSYsJcfGPX