import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlerteService } from 'src/app/services/alerte.service';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Suivi_Alerte_Perso, Alerte } from 'src/app/types';
import * as moment from "moment";
import 'moment/locale/pt-br';

@Component({
  selector: 'app-prealerte',
  templateUrl: './prealerte.page.html',
  styleUrls: ['./prealerte.page.scss'],
})
export class PrealertePage implements OnInit {

  public mesAlerte : Alerte[] = []; public mesListProg : any[] = [];
  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null, reception: "Vrai", reponse: "Vrai",
  DateReception: null, DateReponse: null};
  backPage:string = "/folder/alertes/options/prealerte";

  constructor(
    private router: Router, private authService: AuthService,
    public toastService : ToastService, public storageService : StorageService, public alerteService : AlerteService,
    private PushService: PushservicesService,public actionSheetCtrl: ActionSheetController, private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myAlertes(res.id).subscribe(res1=>{
        this.mesAlerte = res1;
        for(let alrt of this.mesAlerte){
          if(alrt.statut=="Inactive" && alrt.type == "Programmée" && alrt.utilisee == "Faux"){ 
            this.authService.getCurrenttUser(alrt.auteur).subscribe((cu:any) => {
              this.mesListProg.push({alerte:alrt, user: cu});
            })
          }          
        }  
      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });       
  }

  async preProgrammerAlerte(){
    const actionSheet = await this.alertController.create({
      message:"titre de l'alerte:",
      inputs: [
        { name: 'titre',
          type: "text",
          placeholder: "entrez votre titre ici",
        },
      ],
      buttons: [
        { text: 'Créer',
          handler: (data) => { this.programmerAlerte(data.titre) }
        },
      ]
    });
    actionSheet.present();
  }

  programmerAlerte(titre){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.programmerAlerte(res, titre).subscribe(res2=>{
        this.suiviAlertePerso.alerte = res2.id; this.suiviAlertePerso.follower = res.id;
        moment.locale('fr');
        const now = moment().format("YYYY-MM-DDTHH:mm:ss");
        this.suiviAlertePerso.DateReception = String(now);
        this.suiviAlertePerso.DateReponse = String(now); 
        this.alerteService.ajouterPersonTarget(this.suiviAlertePerso).subscribe(res=>{
          console.log("cible personne bien ajouté", JSON.stringify(res));
        },er=>{console.log("Erreur ajout de cible personne: ",JSON.stringify(er));});
         this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',res2.id, {"backPage": this.backPage}]);
      }, err =>{
        console.log(JSON.stringify(err));        
      });
    }, error => {
      this.toastService.presentToast("erreur de creation d'alerte programmée")     
    });
  }

  myProgDetails(elem){
    this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',elem.id, {"backPage": this.backPage}]);
  }







}
