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








}

