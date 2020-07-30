import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Alerte, Utilisateur, Suivi_Alerte_Perso, Localite, Suivi_Alerte_Localite } from 'src/app/types';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-newlocalitefollowers',
  templateUrl: './newlocalitefollowers.page.html',
  styleUrls: ['./newlocalitefollowers.page.scss'],
})
export class NewlocalitefollowersPage implements OnInit {

  alerteDetalis : Alerte;  allLocalites: Localite[] = []; selectedLocalite: any[] = [];
  localiteUsers: Utilisateur[] = [];
  suiviAlerteLocalite: Suivi_Alerte_Localite = {alerte: 0, localite: 0, nombreReception: 0, nombreReponse: 0};
  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null, reception: "Faux", reponse: "Faux",
  DateReception: null, DateReponse: null};
  pesonnesFollower: Suivi_Alerte_Perso[]; localiteFollowerData: Localite[]=[];
  backPage:string = ""; isCoursAlerte:boolean = false;

  constructor(public storageService: StorageService,public alerteService : AlerteService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private PushService: PushservicesService, private authService: AuthService,
  ) { }

  ngOnInit() { this.loadInfos(); }

  async loadInfos(){
    let from = this.activatedRoute.snapshot.params["from"];
    if(from == "coursalerte"){this.backPage ="/folder/alertes/options/coursalerte"; this.isCoursAlerte = true;}
    else if(from = "prealerte"){this.backPage ="/folder/alertes/options/prealerte"}
    else if(from = "histalerte"){this.backPage=="/folder/alertes/options/histalerte"}

    const ALERTEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
      this.alerteDetalis=res1;
        this.alerteService.allLocalites().subscribe(res2=>{
          this.allLocalites = res2;
          for (let i of this.allLocalites) {this.selectedLocalite.push({realID:i.id, id:this.allLocalites.length-1,slt:'Faux',region:i.region, adresse:i.adresse});}
        },er=>{console.log(er); });
    },er=>{console.log(er);});
  }

  loadSelected(selectedElem){
    if(selectedElem.slt == 'Vrai'){selectedElem.slt = 'Faux'; console.log("changé en ", selectedElem.slt); }      
    else if(selectedElem.slt == 'Faux'){selectedElem.slt = 'Vrai'; console.log("changé en ", selectedElem.slt);}    
  }

  ajouterCible(cibles, selectedAlerte){  
    this.alerteService.getAlerteFollower(selectedAlerte.id).subscribe(res8=>{ this.pesonnesFollower = res8;},er=>{console.log(er);})
    let notLinked = 0; let notLinkedUser = 0;
    for (let i = 0; i < cibles.length; i++) {
      notLinked = 0;
      this.alerteService.getAlerteLocalitesData(selectedAlerte.id).subscribe(res12=>{this.localiteFollowerData = res12;
        for(let l of this.localiteFollowerData){ if(l.id==cibles[i].realID){notLinked += 1; }}
        if(cibles[i].slt == "Vrai" && notLinked == 0){
          this.suiviAlerteLocalite.alerte = selectedAlerte.id; this.suiviAlerteLocalite.localite = cibles[i].realID;
          this.alerteService.ajouterLocaliteTarget(this.suiviAlerteLocalite).subscribe(res=>{
            console.log("cible localite bien ajouté", JSON.stringify(res));
            this.alerteService.getLocaliteUsers(cibles[i].realID).subscribe(res2=>{
              for(let m of res2){ 
                notLinkedUser = 0; 
                for(let f of this.pesonnesFollower){if(m.id==f.follower){notLinkedUser += 1;}} 
                if(notLinkedUser == 0){
                  this.suiviAlertePerso.alerte = selectedAlerte.id; this.suiviAlertePerso.follower = m.id;
                  this.alerteService.ajouterPersonTarget(this.suiviAlertePerso).subscribe(res=>{
                    if(this.isCoursAlerte){
                      this.authService.getCurrenttUser(res.follower).subscribe((cu:any) => {
                        this.authService.userData$.subscribe(res0 => {
                          this.PushService.lancerNotification(selectedAlerte.id, cu.idNotification, res0 );
                        });
                      })
                    }                    
                    console.log("cible personne bien ajouté", JSON.stringify(res));
                  },er=>{console.log("Erreur ajout de cible personne: ",JSON.stringify(er));});
                } else{ console.log("membre is follower"); }
                notLinkedUser = 0;
              }
            },er=>{console.log(er);});
            alert(this.backPage)
          },er=>{console.log("Erreur ajout de cible localite: ",JSON.stringify(er));});
      } else {console.log(cibles[i].nom," erreur de ciblage");}
        notLinked = 0;
    },er=>{console.log(er);})
    }
    this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',selectedAlerte.id, {"backPage": this.backPage}]); 
  }














}
