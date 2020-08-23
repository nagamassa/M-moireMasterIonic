import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Alerte, Groupe, Suivi_Alerte_Group, Membre, Utilisateur, Suivi_Alerte_Perso, Agence, Suivi_Alerte_Agence } from 'src/app/types';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-newalerteagencefollower',
  templateUrl: './newalerteagencefollower.page.html',
  styleUrls: ['./newalerteagencefollower.page.scss'],
})
export class NewalerteagencefollowerPage implements OnInit {

  alerteDetalis : Alerte;  allAgences: Agence[] = []; selectedAgence: any[] = [];
  suiviAlerteAgence: Suivi_Alerte_Agence = {alerte: 0, agence: 0};
  backPage:string = ""; backPage2:string = ""; isCoursAlerte:boolean = false;  isPreAlerte:boolean = false;

  constructor(public storageService: StorageService,public alerteService : AlerteService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private PushService: PushservicesService, private authService: AuthService,
    public articleService : ArticleService
    ) { }

  ngOnInit() { this.loadInfos();}

  async loadInfos(){
    let from = this.activatedRoute.snapshot.params["from"];
    if(from == "coursalerte"){this.backPage ="/folder/alertes/options/coursalerte"; this.isCoursAlerte = true;}
    else if(from = "prealerte"){this.backPage ="/folder/alertes/options/prealerte"; this.isPreAlerte = true;}
    else if(from = "histalerte"){this.backPage=="/folder/alertes/options/histalerte"}

    const ALERTEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
      this.alerteDetalis=res1; 
      this.backPage2 = "/folder/alertes/options/coursalerte/mycoursdetails/"+this.alerteDetalis.id;
      this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
        this.articleService.allAgences().subscribe(res2=>{ 
          this.selectedAgence = [];
          for (let i of res2) { this.allAgences.push(i); this.selectedAgence.push({agence:i, slt:'Faux'}); } console.log(JSON.stringify(this.selectedAgence));
        },er=>{console.log(er); });
      },err => { console.log('erreur getting local data', JSON.stringify(err)); });
    },er=>{console.log(er);});
  }

  loadSelected(selectedElem){
    this.ajouterCible(selectedElem, this.alerteDetalis)
  }

  ajouterCible(cible, selectedAlerte){    
    this.suiviAlerteAgence.alerte = selectedAlerte.id; this.suiviAlerteAgence.agence = cible.agence.id;
    this.alerteService.getAlerteAgences(selectedAlerte.id).subscribe(res4=>{
      let notLinked = 0;
      for (let i = 0; i < res4.length; i++) {if(res4[i].agence==cible.agence.id){notLinked += 1; }}
      if(notLinked == 0){
        this.alerteService.ajouterAgenceTarget(this.suiviAlerteAgence).subscribe(res=>{
        console.log(cible.agence.nom +" ajouté avec succés");
      },er=>{console.log("Erreur ajout de cible agence: ",JSON.stringify(er));});
      }      
    },er=>{console.log("Erreur getting agenceLinks: ",JSON.stringify(er));});

    this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',selectedAlerte.id,  {"backPage": this.backPage}]); 
  }


}
