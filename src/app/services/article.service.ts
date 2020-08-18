import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { Article, PieceJointe, Suivi_Article_Agence, Localite, Agence } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router) { }

  allPublication(): Observable<Article[]>{
    return this.httpService.allPublication('wallu/articles/all_publications/');
  }

  allAgences(): Observable<Agence[]>{
    return this.httpService.allAgences('wallu/agences/');
  }

  ajouterAgenceTarget(postData: Suivi_Article_Agence): Observable<Suivi_Article_Agence> {
    return this.httpService.ajouterAgenceTarget('wallu/articles/', postData);
  }

  articleLoadeChanges(postData: Article): Observable<Article> {
    return this.httpService.articleLoadeChanges('wallu/articles/', postData);
  }

  deleteSuiviArticleAgence(postData: Suivi_Article_Agence): Observable<any> {
    return this.httpService.deleteSuiviArticleAgence("wallu/articles/"+postData.article+"/suivi_agences/", postData);
  }

  allGestionArticles(postData: any): Observable<Article[]>{
    return this.httpService.allGestionArticles('wallu/articles/all_gestion_articles/', postData);
  }
  
  getArticle(postData: any): Observable<Article>{
    return this.httpService.getArticle('wallu/articles/', postData);
  }

  getArticlePieces(postData: any): Observable<PieceJointe[]>{
    return this.httpService.getArticlePieces('wallu/articles/', postData);
  }

  getArticleAgences(postData: any): Observable<Suivi_Article_Agence[]>{
    return this.httpService.getArticleAgences('wallu/articles/', postData);
  }

  getArticleLocalite(postData: any): Observable<Localite>{
    return this.httpService.getArticleLocalite('wallu/localites/', postData);
  }

  getAgenceLocalite(postData: any): Observable<Localite>{
    return this.httpService.getArticleLocalite('wallu/localites/', postData);
  }

  getAgenceData(postData: any): Observable<Agence>{
    return this.httpService.getAgenceData('wallu/agences/', postData);
  }

  killPiece(postData: PieceJointe): Observable<any> {
    return this.httpService.killPiece('wallu/articles/'+postData.article+'/pieces/'+postData.id+'/');
  }

  pieceLoadCanges(postData: PieceJointe): Observable<any> {
    return this.httpService.pieceLoadCanges('wallu/articles/'+postData.article+'/pieces/'+postData.id+'/', postData);
  }

  killArticle(postData: Article): Observable<any> {
    return this.httpService.killArticle('wallu/articles/', postData);
  }

  programmerArticle(postData: any): Observable<any> {
    return this.httpService.programmerArticle('wallu/articles/', postData);
  }

  allPostedArticles(postData: any): Observable<Article[]>{
    return this.httpService.allPostedArticles('wallu/articles/all_posted_articles/', postData);
  }








}

