import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlerteService } from 'src/app/services/alerte.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Alerte } from 'src/app/types';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-histalerte',
  templateUrl: './histalerte.page.html',
  styleUrls: ['./histalerte.page.scss'],
})
export class HistalertePage implements OnInit {

  public mesAlerte : Alerte[] = []; public mesListEnCours : any[] = []; public autreListEnCours : any[] = [];
  backPage:string = "/folder/alertes/options/histalerte";
  public isMines:boolean = true; public isOthers:boolean = false;

  constructor(private authService: AuthService, public alerteService : AlerteService,
    public storageService : StorageService, private router: Router,) { }

  ngOnInit() { 
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myAlertes(res.id).subscribe(res1=>{
        this.mesAlerte = res1;
        for(let alrt of this.mesAlerte){
          if(alrt.statut=="Inactive" && alrt.utilisee=="Vrai"){
            this.authService.getCurrenttUser(alrt.auteur).subscribe((cu:any) => {
              this.mesListEnCours.push({alerte:alrt, user: cu});
            })
          }          
        }  
      },er=>{console.log(er); });

      this.alerteService.myLinkAlertes(res.id).subscribe(res2=>{
        this.mesAlerte = res2;        
        for(let alrt of res2){ 
          if(alrt.statut=="Inactive" && alrt.utilisee=="Vrai"){
            this.authService.getCurrenttUser(alrt.auteur).subscribe((cu:any) => {
              this.autreListEnCours.push({alerte:alrt, user: cu});
            })            
          }          
        }
      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
   }

   seeMines(){
      this.isMines = true; this.isOthers = false;
    }

    seeOthers(){
      this.isMines = false; this.isOthers = true;
    }

   myCoursDetails(elem){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',elem.id, {"backPage": this.backPage}]); 
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

}
