import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Alerte, Groupe, Suivi_Alerte_Group, Membre, Utilisateur, Suivi_Alerte_Perso, Article, Agence, Suivi_Article_Agence } from 'src/app/types';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-newarticleagencefollower',
  templateUrl: './newarticleagencefollower.page.html',
  styleUrls: ['./newarticleagencefollower.page.scss'],
})
export class NewarticleagencefollowerPage implements OnInit {

  backPage:string = ""; 
  backPage2:string = "";
  isPublication:boolean = false;  isGestionnaire:boolean = false;  isSent:boolean = false;
  articleDetalis: Article;  allAgences: Agence[] = []; selectedAgence: any[] = [];
  suiviArticleAgence: Suivi_Article_Agence = {article: 0, agence: 0};

  constructor(public storageService: StorageService,public articleService : ArticleService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private PushService: PushservicesService, private authService: AuthService,
    ) { }

  ngOnInit() { this.loadInfos();}

  async loadInfos(){
    let from = this.activatedRoute.snapshot.params["from"];
    if(from == "publications"){this.backPage ="/folder/articles/options/publications"; this.isPublication = true;}
    else if(from = "prearticle"){this.backPage ="/folder/articles/options/prearticle"}
    else if(from = "postarticle"){this.backPage=="/folder/articles/options/postarticle"}
    const ARTICLEID = this.activatedRoute.snapshot.params["id"];      
    this.articleService.getArticle(ARTICLEID).subscribe(res1=>{
      this.articleDetalis=res1; this.backPage2 = "/folder/articles/options/articledetails/"+this.articleDetalis.id;
      this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
        this.articleService.allAgences().subscribe(res2=>{
          for (let i of res2) { this.allAgences.push(i); this.selectedAgence.push({agence:i, slt:'Faux'}); } 
        },er=>{console.log(er); });
      },err => { console.log('erreur getting local data', JSON.stringify(err)); });
    },er=>{console.log(er);});
  }

  loadSelected(selectedElem){
    this.ajouterCible(selectedElem, this.articleDetalis)
  }

  ajouterCible(cible, selectedArticle){    
    this.suiviArticleAgence.article = selectedArticle.id; this.suiviArticleAgence.agence = cible.agence.id;
    this.articleService.getArticleAgences(selectedArticle.id).subscribe(res4=>{
      let notLinked = 0;
      for (let i = 0; i < res4.length; i++) {if(res4[i].agence==cible.agence.id){notLinked += 1; }}
      if(notLinked == 0){
        this.articleService.ajouterAgenceTarget(this.suiviArticleAgence).subscribe(res=>{
        console.log(cible.agence.nom +" ajouté avec succés");
      },er=>{console.log("Erreur ajout de cible agence: ",JSON.stringify(er));});
      }      
    },er=>{console.log("Erreur getting agenceLinks: ",JSON.stringify(er));});

    this.router.navigate(['/folder/articles/options/articledetails',selectedArticle.id,  {"backPage": this.backPage}]); 
  }







  

}
