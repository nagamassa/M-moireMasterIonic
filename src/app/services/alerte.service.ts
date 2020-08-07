import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Alerte, Suivi_Alerte_Perso, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Groupe, Membre, Localite } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  programmerAlerte(postData: any, titre: any): Observable<any> {
    return this.httpService.programmerAlerte('wallu/alertes/', postData, titre);
  }

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

  changeMember(postData: Membre): Observable<Membre>{
    return this.httpService.changeMember('wallu/groupes/', postData);
  }

  deleteMember(postData: Membre): Observable<any>{
    return this.httpService.deleteMember('wallu/groupes/', postData);
  }

  addNewGroupe(postData: any): Observable<Groupe>{
    return this.httpService.addNewGroupe('wallu/groupes/', postData);
  }

  addNewMembre(postData: any): Observable<Membre>{
    return this.httpService.addNewMembre('wallu/groupes/', postData);
  }

  deleteGroupe(postData: any): Observable<any>{
    return this.httpService.deleteGroupe('wallu/groupes/', postData);
  }

  ajouterGroupeTarget(postData: Suivi_Alerte_Group): Observable<Suivi_Alerte_Group> {
    return this.httpService.ajouterGroupeTarget('wallu/alertes/', postData);
  }

  getAlerteUsersFollower(postData: any): Observable<Utilisateur[]>{
    return this.httpService.getAlerteUsersFollower('wallu/alertes/', postData);
  }

  getAlerteGroupsData(postData: any): Observable<Groupe[]>{
    return this.httpService.getAlerteGroupsData('wallu/alertes/', postData);
  }

  getAlerteLocalitesData(postData: any): Observable<Localite[]>{
    return this.httpService.getAlerteLocalitesData('wallu/alertes/', postData);
  }

  allLocalites(): Observable<Localite[]>{
    return this.httpService.allLocalites('wallu/localites/');
  }

  ajouterLocaliteTarget(postData: any): Observable<Suivi_Alerte_Localite>{
    return this.httpService.ajouterLocaliteTarget('wallu/alertes/', postData);
  }

  getLocaliteUsers(postData: any): Observable<Utilisateur[]>{
    return this.httpService.getLocaliteUsers('wallu/localites/', postData);
  }

  changeSuiviAlertePerso(postData: Suivi_Alerte_Perso): Observable<Suivi_Alerte_Perso> {
    return this.httpService.changeSuiviAlertePerso('wallu/alertes/suivi_perso/', postData);
  }

  getSuiviAlertePersoFilter(postData: Suivi_Alerte_Perso): Observable<Suivi_Alerte_Perso> {
    return this.httpService.getSuiviAlertePersoFilter('wallu/alertes/suivi_perso/', postData);
  }

  changeAlerteInfos(postData: Alerte): Observable<Alerte> {
    return this.httpService.changeAlerteInfos('wallu/alertes/', postData);
  }

  myAlertesProg(postData: any): Observable<Alerte[]>{
    return this.httpService.myAlertesProg('wallu/alertes/minesProg/', postData);
  } 

  deleteSuiviAlertePerso(postData: Suivi_Alerte_Perso): Observable<any> {
    return this.httpService.deleteSuiviAlertePerso("wallu/alertes/"+postData.alerte+"/suivi_perso/", postData);
  }

  deleteGroupeTarget(postData: Suivi_Alerte_Group): Observable<any> {
    return this.httpService.deleteGroupeTarget("wallu/alertes/"+postData.alerte+"/suivi_groups/", postData);
  }
  deleteLocaliteTarget(postData: Suivi_Alerte_Localite): Observable<any> {
    return this.httpService.deleteLocaliteTarget("wallu/alertes/"+postData.alerte+"/suivi_localites/", postData);
  } 

  killAlerte(postData: Alerte): Observable<any> {
    return this.httpService.killAlerte('wallu/alertes/', postData);
  }

// ===================================================

  killPiece(postData: PieceJointe): Observable<any> {
    return this.httpService.killPiece('wallu/alertes/'+postData.alerte+'/pieces/'+postData.id+'/');
  }
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
