import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Alerte, Groupe, Suivi_Alerte_Group, Membre, Utilisateur, Suivi_Alerte_Perso } from 'src/app/types';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-newgroupefollowers',
  templateUrl: './newgroupefollowers.page.html',
  styleUrls: ['./newgroupefollowers.page.scss'],
})
export class NewgroupefollowersPage implements OnInit {

  alerteDetalis : Alerte;  mesGroupes: Groupe[] = []; MyOwneGroupes: Groupe[] = []; MyLinkGroupes: Groupe[] = [];
  allGroupe: Groupe[] = [];  selectedGroupe: any[] = []; membres: Membre[]=[];
  suiviAlerteGroupe: Suivi_Alerte_Group = {alerte: 0, groupe: 0, nombreReception: 0, nombreReponse: 0};
  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null, reception: "Faux",
  reponse: "Faux", DateReception: null, DateReponse: null}; 
  pesonnesFollower: Suivi_Alerte_Perso[]; groupFollowerData: Groupe[]=[];

  constructor(public storageService: StorageService,public alerteService : AlerteService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private PushService: PushservicesService, private authService: AuthService,
    ) { }

  ngOnInit() { this.loadInfos(); }

  async loadInfos(){
    const ALERTEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
      this.alerteDetalis=res1;
      this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
        this.alerteService.myGroupes(res.id).subscribe(res2=>{
          this.mesGroupes = res2; this.MyOwneGroupes = this.mesGroupes;
        },er=>{console.log(er); });
        this.alerteService.myLinkGroupes(res.id).subscribe(res3=>{
          this.mesGroupes = res3; this.MyLinkGroupes = this.mesGroupes;  
          for (let i of this.MyOwneGroupes) { this.allGroupe.push(i); this.selectedGroupe.push({realID:i.id, id:this.allGroupe.length-1,slt:'Faux',nom:i.nom}); }  
          for (let i of this.MyLinkGroupes) { this.allGroupe.push(i); this.selectedGroupe.push({realID:i.id, id:this.allGroupe.length-1,slt:'Faux',nom:i.nom}); }  
          console.log("la taille est: ", this.allGroupe.length);  
        },er=>{console.log(er); });
      },err => { console.log('erreur getting local data', JSON.stringify(err)); });
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
      this.alerteService.getAlerteGroupsData(selectedAlerte.id).subscribe(res11=>{ this.groupFollowerData = res11;
        // 
        for(let g of this.groupFollowerData){ if(g.id==cibles[i].realID){notLinked += 1; }}
        if(cibles[i].slt == "Vrai" && notLinked == 0){
          this.suiviAlerteGroupe.alerte = selectedAlerte.id; this.suiviAlerteGroupe.groupe = cibles[i].realID;
          this.alerteService.ajouterGroupeTarget(this.suiviAlerteGroupe).subscribe(res=>{
            console.log("cible groupe bien ajouté", JSON.stringify(res));
            this.alerteService.getGroupeMembres(cibles[i].realID).subscribe(res2=>{
              this.membres = res2;
                for(let m of this.membres){ 
                  notLinkedUser = 0; 
                  for(let f of this.pesonnesFollower){if(m.user_member==f.follower){notLinkedUser += 1;}} 
                  if(notLinkedUser == 0){
                    this.suiviAlertePerso.alerte = selectedAlerte.id; this.suiviAlertePerso.follower = m.user_member;
                    // 
                    this.alerteService.ajouterPersonTarget(this.suiviAlertePerso).subscribe(res=>{
                      this.authService.getCurrenttUser(res.follower).subscribe((cu:any) => {
                        this.authService.userData$.subscribe(res0 => {
                          this.PushService.lancerNotification(selectedAlerte.id, cu.idNotification, res0 );
                        });
                      })
                      console.log("cible personne bien ajouté", JSON.stringify(res));
                    },er=>{console.log("Erreur ajout de cible personne: ",JSON.stringify(er));});
                    // 
                  } else{ console.log("membre is follower"); }
                  notLinkedUser = 0;
                }              
            },er=>{console.log(er);});
          },er=>{console.log("Erreur ajout de cible groupe: ",JSON.stringify(er));});
      } else {console.log(cibles[i].nom," erreur de ciblage");}
        notLinked = 0;
        // 
      },er=>{console.log(er);})
    }
    this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',selectedAlerte.id]); 
  }











}

