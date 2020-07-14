import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte } from 'src/app/types';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-coursalerte',
  templateUrl: './coursalerte.page.html',
  styleUrls: ['./coursalerte.page.scss'],
})
export class CoursalertePage implements OnInit {
  public mesAlerte : Alerte[] = [];
  public mesListEnCours : Alerte[] = [];
  public autreListEnCours : Alerte[] = [];

  constructor(private authService: AuthService, public alerteService : AlerteService,
              public storageService : StorageService, private router: Router,) { }

  ngOnInit () {    
    this.storageService.get(AuthConstants.AUTHDATA).then(res =>{
      this.alerteService.myAlertes(res.id).subscribe(res1=>{
        this.mesAlerte = res1;
        for(let alrt of this.mesAlerte){
          if(alrt.statut=="Active"){ this.mesListEnCours.push(alrt); }          
        }
      },er=>{console.log(er); });

      this.alerteService.myLinkAlertes(res.id).subscribe(res2=>{
        this.mesAlerte = res2;
        for(let alrt of this.mesAlerte){
          if(alrt.statut=="Active"){ this.autreListEnCours.push(alrt); }          
        }
      },er=>{console.log(er); });

    },err => { console.log('erreur getting local data', JSON.stringify(err)); });    
  }

  myCoursDetails(elem){
    this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',elem.id]);    
  }


}
