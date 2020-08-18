import { Component, OnInit } from '@angular/core';
import { Groupe } from 'src/app/types';
import { AlerteService } from 'src/app/services/alerte.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.page.html',
  styleUrls: ['./groupes.page.scss'],
})
export class GroupesPage implements OnInit {
  public mesGroupes : Groupe[] = [];  public MyOwneGroupes : Groupe[] = [];  public MyLinkGroupes : Groupe[] = []; wantAdd: boolean = false;
  newGroupe = {nombreMembre: "1", nom: ""};
  newMembre = {user_member: "0", groupe: "0", isAdmin: "Vrai" , isFondateur: "Vrai"};
  public isMines:boolean = true; public isOthers:boolean = false;

  constructor(private alerteService: AlerteService, public storageService: StorageService, private router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit () { this.loadData(); }

  loadData(){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myGroupes(res.id).subscribe(res1=>{
        this.mesGroupes = res1; this.MyOwneGroupes = this.mesGroupes;
      },er=>{console.log(er); });
      this.alerteService.myLinkGroupes(res.id).subscribe(res2=>{
        this.mesGroupes = res2; this.MyLinkGroupes = this.mesGroupes;        
      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

  seeMines(){
    this.isMines = true; this.isOthers = false;
  }

  seeOthers(){
    this.isMines = false; this.isOthers = true;
  }

  myGroupeDetails(elem){
    this.router.navigate(['/folder/groupes/groupedetails/',elem.id]);
  }

  addGroupeArea(){
    if(this.wantAdd==true){this.wantAdd=false; this.newGroupe.nom = "";}
    else if(this.wantAdd==false){this.wantAdd=true; this.newGroupe.nom = "";}
  }

  addNewGroupe(){  
  this.alerteService.addNewGroupe(this.newGroupe).subscribe(gr =>{
    this.newGroupe.nom = ""; this.loadData();
    this.storageService.get(AuthConstants.AUTHDATA).then(res1 =>{
      this.newMembre.groupe = String(gr.id); this.newMembre.user_member = res1.id;
      this.alerteService.addNewMembre(this.newMembre).subscribe(data =>{
        this.newMembre.groupe = "0"; this.newMembre.user_member = "0"; this.loadData();        
      },(error: any) => { console.log("Error add membre", JSON.stringify(error)); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });    
  },(error: any) => { console.log("Error add groupe", JSON.stringify(error)); });
    
  }
}
