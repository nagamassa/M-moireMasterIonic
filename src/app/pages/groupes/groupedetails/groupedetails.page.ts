import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Groupe, Utilisateur, Membre } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-groupedetails',
  templateUrl: './groupedetails.page.html',
  styleUrls: ['./groupedetails.page.scss'],
})
export class GroupedetailsPage implements OnInit {

  groupeDetalis : Groupe;           isGroupeDetalis: boolean = false;
  auteur: Utilisateur;              isAuteur: boolean = false;
  membres: Membre[]=[];             isMembres: boolean = false;
  userMembers: Utilisateur[]=[];    isUserMembers: boolean = false; isOther: boolean = true;
  cantDelete: boolean = true;

  constructor(public alerteService : AlerteService, public storageService : StorageService,
    private router: Router, private activatedRoute: ActivatedRoute, public actionSheetCtrl: ActionSheetController,
    private toastService : ToastService, private photoViewer: PhotoViewer,) {  }

  ngOnInit() { this.loadData(); }

  async loadData(){
    const GROUPEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getGroupe(GROUPEID).subscribe(res1=>{
      this.groupeDetalis=res1;  if(this.groupeDetalis){this.isGroupeDetalis = true;}      
      this.alerteService.getGroupeAuteur(GROUPEID).subscribe(res2=>{
        this.auteur = res2; if(this.auteur){this.isAuteur = true;} this.auteur.photo = environment.apiUrl + this.auteur.photo;        
        this.alerteService.getGroupeMembres(GROUPEID).subscribe(res3=>{
          this.membres = res3; if(this.membres){this.isMembres = true;}          
          this.alerteService.getGroupeMembresUsers(GROUPEID).subscribe(res4=>{
            this.userMembers = res4; if(this.userMembers){this.isUserMembers = true;} 
            for(let us of this.userMembers){ us.photo = environment.apiUrl + us.photo;}
            this.storageService.get(AuthConstants.AUTHDATA).then(res5 =>{
              if(res5.id == res2.id){ this.isOther=false; this.cantDelete = false}
              for (let i = 0; i < this.membres.length; i++) { const mbr = this.membres[i];
                if(mbr.user_member == res5.id && mbr.isAdmin == "Vrai"){ this.isOther=false; }                
              }
            },er=>{console.log(er);})
          },er=>{console.log(er);});
        },er=>{console.log(er);});
      },er=>{console.log(er);});
    },er=>{console.log(er);});
  }

  openProfile(path: string){ this.photoViewer.show(path, 'Mon image'); }

  PutAdmin(mbr:Membre){ mbr.isAdmin = "Vrai"; this.changeAdmin(mbr); }

  removeAdmin(mbr:Membre){ mbr.isAdmin = "Faux"; this.changeAdmin(mbr); }

  changeAdmin(mbr:Membre){
    this.alerteService.getGroupe(mbr.groupe).subscribe(res1=>{
      this.alerteService.changeMember(mbr).subscribe(res4=>{
        console.log("cool vous êtes Admin"); 
        this.loadData();
      },er=>{console.log(" Erreur change", JSON.stringify(er));});
    },er=>{console.log(er);});
  }

  deleteMembre(mbr:Membre){
    this.alerteService.getGroupe(mbr.groupe).subscribe(res1=>{
      this.alerteService.deleteMember(mbr).subscribe(res4=>{
        console.log("Membre bien supprimé"); 
        this.loadData();
      },er=>{console.log(" Erreur suppression", JSON.stringify(er));});
    },er=>{console.log(er);});
  }

  deleteGroupe(gr:Groupe){
    this.alerteService.deleteGroupe(gr.id).subscribe(res1=>{
      console.log("Groupe bien supprimé"); 
      this.router.navigate(['/folder/groupes/']);  
    },er=>{console.log(" Erreur suppression Groupe", JSON.stringify(er));});
  }

  goTocontact(){
    const GROUPEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getGroupe(GROUPEID).subscribe(res1=>{
      this.groupeDetalis=res1;  if(this.groupeDetalis){this.isGroupeDetalis = true;}      
      this.router.navigate(['/folder/groupes/contactsgroupe/', this.groupeDetalis.id]);
    },er=>{console.log(er);});
  }















}
