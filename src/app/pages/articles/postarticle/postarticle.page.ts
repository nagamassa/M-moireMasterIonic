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
  selector: 'app-postarticle',
  templateUrl: './postarticle.page.html',
  styleUrls: ['./postarticle.page.scss'],
})
export class PostarticlePage implements OnInit {
  
  public mesArticlesPostes : any[] = [];
  backPage:string = "/folder/articles/options/postarticle";

  constructor(
    private router: Router, private authService: AuthService, private articleService: ArticleService,
    public toastService : ToastService, public storageService : StorageService, public alerteService : AlerteService,
    private PushService: PushservicesService,public actionSheetCtrl: ActionSheetController, private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.articleService.allPostedArticles(res.id).subscribe(res1=>{      console.log(JSON.stringify(res1));
                
        for(let artc of res1){          
          this.authService.getCurrenttUser(artc.auteur).subscribe((cu:any) => {
            this.mesArticlesPostes.push({article:artc, user: cu});
          });      
        } 
      },er=>{console.log("Erreur getting all articles en postés",er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

  articleDetails(elem: Article){
    this.router.navigate(['/folder/articles/options/articledetails',elem.id, {"backPage": this.backPage}]); 
  }








}
