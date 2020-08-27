import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlerteService } from 'src/app/services/alerte.service';
import { PushservicesService } from 'src/app/services/pushservices.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Suivi_Alerte_Perso, Alerte, Bloccage } from 'src/app/types';
import * as moment from "moment";
import 'moment/locale/pt-br';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blocages',
  templateUrl: './blocages.page.html',
  styleUrls: ['./blocages.page.scss'],
})
export class BlocagesPage implements OnInit {
  isSeeBlockInfos: Boolean = true;   isSeeDetails: Boolean = true; 
  base:string = environment.apiUrl; 

  public mesBloccages : Bloccage[] = []; public mesOwnBloccages : any[] = []; public mesOthersBloccages : any[] = [];
  newBloccage: Bloccage = {};
  public isMines:boolean = true; public isOthers:boolean = false;

  constructor(
    private router: Router, private authService: AuthService,
    public toastService : ToastService, public storageService : StorageService, public alerteService : AlerteService,
    private PushService: PushservicesService,public actionSheetCtrl: ActionSheetController, private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myOwnBlocks(res.id).subscribe(res1=>{
        this.mesBloccages = res1;
        for(let blc of this.mesBloccages){
          if(blc.statut=="Bloqué"){ 
            this.authService.getCurrenttUser(blc.bloqueur).subscribe((cu1:any) => {
              this.authService.getCurrenttUser(blc.bloque).subscribe((cu2:any) => {
                cu1.photo = this.base + cu1.photo;  cu2.photo = this.base + cu2.photo;
                this.mesOwnBloccages.push({bloqueur: cu1, bloque: cu2, block: blc, isSeeDetails: true});
              })
            })
          }          
        } 
      },er=>{console.log(er); });
      this.alerteService.myOtherBlocks(res.id).subscribe(res1=>{
        this.mesBloccages = res1;
        for(let blc of this.mesBloccages){
          if(blc.statut=="Bloqué"){ 
            this.authService.getCurrenttUser(blc.bloqueur).subscribe((cu1:any) => {
              this.authService.getCurrenttUser(blc.bloque).subscribe((cu2:any) => {
                cu1.photo = this.base + cu1.photo;  cu2.photo = this.base + cu2.photo;
                this.mesOthersBloccages.push({bloqueur: cu1, bloque: cu2, block: blc, isSeeDetails: true});
              })
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


  seeDeatilsArea(elem: any){   
    this.isSeeDetails = false;
    elem.isSeeDetails = false;
  }

  debloccage(elem: any){
    elem.block.statut = "Débloqué";
    this.alerteService.unlockLoadeChanges(elem.block).subscribe(res=>{
      console.log(JSON.stringify(res));
    },er=>{console.log(er);});
  }

  chargerBloccage(elem:any){
    this.alerteService.blockLoadeChanges(elem.block).subscribe(res=>{
      console.log(JSON.stringify("lep nice"));
    },er=>{console.log(er);});
    this.isSeeDetails = true; elem.isSeeDetails = true;
  }

  goToBlock(){
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{        
      this.router.navigate(['/folder/blocages/newblocagealerte']);
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });
  }










}
