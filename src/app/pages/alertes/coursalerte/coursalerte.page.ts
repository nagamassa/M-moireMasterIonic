import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte, Suivi_Alerte_Perso } from 'src/app/types';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import 'moment/locale/pt-br';


@Component({
  selector: 'app-coursalerte',
  templateUrl: './coursalerte.page.html',
  styleUrls: ['./coursalerte.page.scss'],
})
export class CoursalertePage implements OnInit {
  
  public mesAlerte : Alerte[] = []; public mesListEnCours : any[] = []; public autreListEnCours : any[] = [];
  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null,
  DateReception: null, DateReponse: null};

  constructor(private authService: AuthService, public alerteService : AlerteService,
              public storageService : StorageService, private router: Router,) { }

  ngOnInit () {    
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myAlertes(res.id).subscribe(res1=>{
        this.mesAlerte = res1;
        for(let alrt of this.mesAlerte){
          if(alrt.statut=="Active"){ 
            this.authService.getCurrenttUser(alrt.auteur).subscribe((cu:any) => {
              this.mesListEnCours.push({alerte:alrt, user: cu});
            })
          }          
        }  
      },er=>{console.log(er); });

      this.alerteService.myLinkAlertes(res.id).subscribe(res2=>{
        this.mesAlerte = res2;        
        for(let alrt of res2){ 
          if(alrt.statut=="Active"){
            this.authService.getCurrenttUser(alrt.auteur).subscribe((cu:any) => {
              this.autreListEnCours.push({alerte:alrt, user: cu});
            })            
            this.suiviAlertePerso.alerte = alrt.id; this.suiviAlertePerso.follower = res.id;            
            this.alerteService.getSuiviAlertePersoFilter(this.suiviAlertePerso).subscribe(res3=>{
              // 
              if(res3.reception=="Faux"){
                this.suiviAlertePerso = res3; this.suiviAlertePerso.reception = "Vrai";
                moment.locale('fr');
                const now = moment().format("YYYY-MM-DDTHH:mm:ss");
                this.suiviAlertePerso.DateReception = String(now);            
                this.alerteService.changeSuiviAlertePerso(this.suiviAlertePerso).subscribe(res4=>{ 
                  console.log("reception success");      
                },er=>{console.log(er); });
              }
              //
            },er=>{console.log(er); });
          }          
        }

      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });    
  }

  myCoursDetails(elem){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.suiviAlertePerso.alerte = elem.id; this.suiviAlertePerso.follower = res.id;
      this.alerteService.getSuiviAlertePersoFilter(this.suiviAlertePerso).subscribe(res3=>{
        if(res3.reponse=="Faux"){
          this.suiviAlertePerso = res3; this.suiviAlertePerso.reponse = "Vrai";
          moment.locale('fr');
          const now = moment().format("YYYY-MM-DDTHH:mm:ss");
          this.suiviAlertePerso.DateReponse = String(now);
          console.log("", JSON.stringify(now));            
          this.alerteService.changeSuiviAlertePerso(this.suiviAlertePerso).subscribe(res4=>{
            console.log("Alerte vu avec succés", JSON.stringify(res4));              
          },er=>{console.log(er); });
        }
      },er=>{console.log(er); });
      this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',elem.id]); 
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }


}
