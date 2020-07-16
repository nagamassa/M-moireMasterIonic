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
  public mesGroupes : Groupe[] = [];  public MyOwneGroupes : Groupe[] = [];  public MyLinkGroupes : Groupe[] = [];

  constructor(private alerteService: AlerteService, public storageService: StorageService, private router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit () {    
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myGroupes(res.id).subscribe(res1=>{
        this.mesGroupes = res1; this.MyOwneGroupes = this.mesGroupes;
      },er=>{console.log(er); });
      this.alerteService.myLinkGroupes(res.id).subscribe(res2=>{
        this.mesGroupes = res2; this.MyLinkGroupes = this.mesGroupes;        
      },er=>{console.log(er); });
    },err => { console.log('erreur getting local data', JSON.stringify(err)); });    
  }
  myGroupeDetails(elem){
    this.router.navigate(['/folder/groupes/groupedetails/',elem.id]);    
  }
}
