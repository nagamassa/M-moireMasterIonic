import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Groupe, Utilisateur, Membre } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-groupedetails',
  templateUrl: './groupedetails.page.html',
  styleUrls: ['./groupedetails.page.scss'],
})
export class GroupedetailsPage implements OnInit {

  groupeDetalis : Groupe;        isGroupeDetalis: boolean = false;
  auteur: Utilisateur;           isAuteur: boolean = false;
  membres: Membre[];        isMembres: boolean = false;
  userMembers: Utilisateur[];    isUserMembers: boolean = false;

  constructor(public alerteService : AlerteService, public storageService : StorageService,
    private router: Router, private activatedRoute: ActivatedRoute, public actionSheetCtrl: ActionSheetController,
    private toastService : ToastService,) { }

  ngOnInit() { this.loadData() }

  async loadData(){
    const GROUPEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getGroupe(GROUPEID).subscribe(res1=>{
      this.groupeDetalis=res1;  if(this.groupeDetalis){this.isGroupeDetalis = true;}      
      this.alerteService.getGroupeAuteur(GROUPEID).subscribe(res2=>{
        this.auteur = res2; if(this.auteur){this.isAuteur = true;} this.auteur.photo = environment.apiUrl + this.auteur.photo;        
        this.alerteService.getGroupeMembres(GROUPEID).subscribe(res3=>{
          this.membres = res3; if(this.membres){this.isMembres = true;}          
          this.alerteService.getGroupeMembresUsers(GROUPEID).subscribe(res4=>{
            this.userMembers = res4; {this.isUserMembers = true;}   
            console.log("=========", JSON.stringify(this.userMembers));
                         
          },er=>{console.log(er);});
        },er=>{console.log(er);});
      },er=>{console.log(er);});
    },er=>{console.log(er);});
  }

















}
