import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte, Article } from 'src/app/types';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import 'moment/locale/pt-br';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {

  public myPublications : any[] = []; public otherPublications : any[] = [];
  public isMines:boolean = true; public isOthers:boolean = false;
  
  backPage:string = "/folder/articles/options/publications";

  constructor(private authService: AuthService, public alerteService : AlerteService,public articleService : ArticleService,
    public storageService : StorageService, private router: Router,) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.articleService.allPublication().subscribe(res1=>{        
        for(let artc of res1){          
          this.authService.getCurrenttUser(artc.auteur).subscribe((cu:any) => {
            if(cu.id == res.id){
              this.myPublications.push({article:artc, user: cu}); console.log("this is mine");
            }else if(cu.id != res.id){
              this.otherPublications.push({article:artc, user: cu}); console.log("this is not mine");
            }
          });      
        } 
      },er=>{console.log("Erreur getting all publications",er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

  articleDetails(elem: Article){
     this.router.navigate(['/folder/articles/options/articledetails',elem.id, {"backPage": this.backPage}]); 
  }

  seeMines(){
    this.isMines = true; this.isOthers = false;
  }

  seeOthers(){
    this.isMines = false; this.isOthers = true;
  }







}
