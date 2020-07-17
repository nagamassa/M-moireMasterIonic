import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Alerte, Suivi_Alerte_Perso, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Groupe, Membre } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  lancerAlerteDirect(postData: any): Observable<any> {
    return this.httpService.lancerAlerteDirect('wallu/alertes/', postData);
  }

  loadCoordonnees(postData: any): Observable<any> {
    return this.httpService.loadCoordonnees(postData);
  }

  myAlertes(postData: any): Observable<Alerte[]>{
    return this.httpService.myAlertes('wallu/alertes/mines/', postData);
  }

  myLinkAlertes(postData: any): Observable<Alerte[]>{
    return this.httpService.myLinkAlertes('wallu/alertes/others/', postData);
  }

  myGroupes(postData: any): Observable<Groupe[]>{
    return this.httpService.myGroupes('wallu/utilisateurs/', postData);
  }

  myLinkGroupes(postData: any): Observable<Groupe[]>{
    return this.httpService.myLinkGroupes('wallu/utilisateurs/', postData);
  }

  getGroupe(postData: any): Observable<Groupe>{
    return this.httpService.getGroupe('wallu/groupes/', postData);
  }

  getGroupeAuteur(postData: any): Observable<Utilisateur>{
    return this.httpService.getGroupeAuteur('wallu/groupes/', postData);
  }

  getGroupeMembres(postData: any): Observable<Membre[]>{
    return this.httpService.getGroupeMembres('wallu/groupes/', postData);
  }

  getGroupeMembresUsers(postData: any): Observable<Utilisateur[]>{
    return this.httpService.getGroupeMembresUsers('wallu/groupes/', postData);
  }
// ===================================================

// ====================================================
  getAlerte(postData: any): Observable<Alerte>{
    return this.httpService.getAlerte('wallu/alertes/', postData);
  }

  getAlerteAuteur(postData: any): Observable<Utilisateur>{
    return this.httpService.getAlerteAuteur('wallu/alertes/', postData);
  }

  getAlerteCoordonnees(postData: any): Observable<Coordonnees[]>{
    return this.httpService.getAlerteCoordonnees('wallu/alertes/', postData);
  }

  getAlertePieces(postData: any): Observable<PieceJointe[]>{
    return this.httpService.getAlertePieces('wallu/alertes/', postData);
  }

  getAlerteGroups(postData: any): Observable<Suivi_Alerte_Group[]>{
    return this.httpService.getAlerteGroups('wallu/alertes/', postData);
  }

  getAlerteLocalites(postData: any): Observable<Suivi_Alerte_Localite[]>{
    return this.httpService.getAlerteLocalites('wallu/alertes/', postData);
  }

  getAlerteAgences(postData: any): Observable<Suivi_Alerte_Agence[]>{
    return this.httpService.getAlerteAgences('wallu/alertes/', postData);
  }

  uploadPiece(postData: any, id:any): Observable<PieceJointe> {
    console.log("alerteService() bien appellé");    
    return this.httpService.uploadPiece('wallu/alertes/', postData, id);
  }

  findByPhone(phone: number): Observable<any> {
    return this.httpService.findByPhone('wallu/utilisateurs/findByPhone/', phone);
  }

  ajouterPersonTarget(postData: Suivi_Alerte_Perso): Observable<Suivi_Alerte_Perso> {
    return this.httpService.ajouterPersonTarget('wallu/alertes/', postData);
  }

  getAlerteFollower(postData: any): Observable<Suivi_Alerte_Perso[]>{
    return this.httpService.getAlerteFollower('wallu/alertes/', postData);
  }





}
