import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Groupe, Utilisateur, Membre, Bloccage } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-newblocagealerte',
  templateUrl: './newblocagealerte.page.html',
  styleUrls: ['./newblocagealerte.page.scss'],
})
export class NewblocagealertePage implements OnInit {
  base:string = environment.apiUrl; 
  listUsers: Utilisateur[] = []; selectedUsers: any[] = [];
  newBloccage: Bloccage = {
    bloqueur: 0, bloque: 0, raison: "Raison inconnu", statut: "Bloqué", 
  };
  searchVB:string = "";   searchMode:boolean = false;

  constructor(public alerteService : AlerteService, public storageService : StorageService,
    private router: Router, private activatedRoute: ActivatedRoute, public actionSheetCtrl: ActionSheetController,
    private toastService : ToastService, private photoViewer: PhotoViewer,) { }

  ngOnInit() { this.loadData(); }

  async loadData(){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{ 
      this.alerteService.getAllUser().subscribe(res1=>{
        this.listUsers=res1;
        for(let us of this.listUsers){
          us.photo = this.base + us.photo;
          if(res.id != us.id){ 
            let b:boolean = true;
            this.selectedUsers.push({user: us, slt:'Faux', wantSee: b });
          }
        }
      },er=>{console.log(er);});
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }

  openProfile(path: string){ this.photoViewer.show(path, 'Mon image'); }

  loadSelected(selectedElem){
    if(selectedElem.slt == 'Vrai'){selectedElem.slt = 'Faux'; console.log("changé en ", selectedElem.slt); }      
    else if(selectedElem.slt == 'Faux'){selectedElem.slt = 'Vrai'; console.log("changé en ", selectedElem.slt);}    
  }

  ajouterCible(cibles){ 
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myOwnBlocks(res.id).subscribe(res1=>{
        for(let cb of cibles){
          if(cb.slt == "Vrai"){
            let notLinkedUser = 0;
            for(let test of res1){ if(test.bloque == cb.user.id ){notLinkedUser += 1;} }
            if(notLinkedUser != 0){
              console.log(cb.user.alias +" est deja bloqué");         
            }
            else if(notLinkedUser == 0){
              this.newBloccage.bloqueur = res.id; this.newBloccage.bloque = cb.user.id;
              this.alerteService.newBlocage(this.newBloccage).subscribe(res2=>{
                console.log(JSON.stringify(res2) ," bloqué avec succés"); 
              },er=>{console.log(er); });       
            }
          }
        } 
      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
    this.router.navigate(['/folder/blocages']);
  }

  loadChangeEvent(changeData){
    if(changeData == ""){ for(let sl of this.selectedUsers){ sl.wantSee = true; } }   
    else if(changeData != ""){
      for(let sl of this.selectedUsers){
        if(((sl.user.alias.toLocaleLowerCase()).indexOf(changeData.toLocaleLowerCase())) != -1){sl.wantSee = true;}
        else{ sl.wantSee = false; }
      }
    }
  }







}
