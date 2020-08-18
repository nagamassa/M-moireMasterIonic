import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlerteService } from 'src/app/services/alerte.service';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Suivi_Alerte_Perso, Alerte, Article } from 'src/app/types';
import * as moment from "moment";
import 'moment/locale/pt-br';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-prearticle',
  templateUrl: './prearticle.page.html',
  styleUrls: ['./prearticle.page.scss'],
})
export class PrearticlePage implements OnInit {

  public mesArticles : Article[] = []; public mesArticlesCours : any[] = []; public mesArticlesRejetes : any[] = [];  
  backPage:string = "/folder/articles/options/prearticle";
  public isPre:boolean = true; public isRej:boolean = false;

  constructor(
    private router: Router, private authService: AuthService, private articleService: ArticleService,
    public toastService : ToastService, public storageService : StorageService, public alerteService : AlerteService,
    private PushService: PushservicesService,public actionSheetCtrl: ActionSheetController, private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.articleService.allGestionArticles(res.id).subscribe(res1=>{                
        for(let artc of res1){          
          this.authService.getCurrenttUser(artc.auteur).subscribe((cu:any) => {
            if(artc.etat == "Préparation" && artc.auteur == res.id){
              this.mesArticlesCours.push({article:artc, user: cu}); console.log("this is Preparation"+artc.auteur+" "+res.id);
            }else if(artc.etat == "Rejeté" && artc.auteur == res.id){
              this.mesArticlesRejetes.push({article:artc, user: cu}); console.log("this is Rejete"+artc.auteur+" "+res.id);
            }
          });      
        } 
      },er=>{console.log("Erreur getting all articles en gestion",er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); }); 
  }

  async programmerArticle(){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.articleService.programmerArticle(res).subscribe(res2=>{
        this.router.navigate(['/folder/articles/options/articledetails',res2.id, {"backPage": this.backPage}]); 
      }, err =>{
        console.log(JSON.stringify(err));        
      });
    }, error => {
      this.toastService.presentToast("erreur de creation d'alerte programmée")     
    });
  }

  articleDetails(elem: Article){
    this.router.navigate(['/folder/articles/options/articledetails',elem.id, {"backPage": this.backPage}]); 
  }

  seePre(){
    this.isPre = true; this.isRej = false;
  }

  seeRej(){
    this.isPre = false; this.isRej = true;
  }

}
