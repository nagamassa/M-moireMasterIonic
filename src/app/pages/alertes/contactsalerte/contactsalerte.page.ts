import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Alerte, Suivi_Alerte_Perso } from 'src/app/types';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-contactsalerte',
  templateUrl: './contactsalerte.page.html',
  styleUrls: ['./contactsalerte.page.scss'],
})
export class ContactsalertePage implements OnInit {

  alerteDetalis : Alerte;  MesContacts: Contact[] = []; listContacts: Contact[] = []; selectedContact: any[] = []
  suiviAlertePerso: Suivi_Alerte_Perso = {alerte: null, follower: null, reception: "Faux",
  reponse: "Faux", DateReception: null, DateReponse: null};
  
  constructor(public alerteService : AlerteService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private contacts: Contacts, private callNumber: CallNumber,
    private sms: SMS, 
  ) { }

  ngOnInit() { this.loadInfos(); }

  async loadInfos(){
    const ALERTEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
      this.alerteDetalis=res1;
    },er=>{console.log(er);});
    let options = { filter: '', multiple: true, hasPhoneNumber: true };
    this.contacts.find(['*'], options)?.then( (contacts:Contact[]) =>{
      this.MesContacts = contacts;
      // 
        for (let i = 0; i < this.MesContacts.length; i++) {            
          let phoneString = ""; phoneString = this.MesContacts[i].phoneNumbers[0].value;
          phoneString = phoneString.replace(/\s+/g,'').replace(/-/gi,'');
          phoneString = phoneString.substring(phoneString.length-9,phoneString.length);
          this.alerteService.findByPhone(Number(phoneString)).subscribe(res1=>{
            this.listContacts.push(this.MesContacts[i]); this.selectedContact.push({id:this.listContacts.length-1,slt:'Faux',num:Number(phoneString)});
            console.log("Les electionnés sont", JSON.stringify(this.selectedContact)); 
          },er=>{console.log("Erreur test: ",JSON.stringify(er));});
        }         
      // 
    },
     er => {console.log("Error getting contacts ", JSON.stringify(er));  } 
    );
  }
  
  ajouterCible(cibles, selectedAlerte){  
    for (let i = 0; i < cibles.length; i++) { 
      if(cibles[i].slt == "Vrai"){
        this.alerteService.findByPhone(cibles[i].num).subscribe(target=>{
          this.suiviAlertePerso.alerte = selectedAlerte.id; this.suiviAlertePerso.follower = target.id; 
          this.alerteService.ajouterPersonTarget(this.suiviAlertePerso).subscribe(res=>{
            console.log("cible personne bien ajouté", JSON.stringify(res));
            this.router.navigate(['/folder/alertes/options/coursalerte/mycoursdetails',selectedAlerte.id]); 
          },er=>{console.log("Erreur ajout de cible personne: ",JSON.stringify(er));});
          console.log(" ", JSON.stringify("")); 
        },er=>{console.log("Erreur test: ",JSON.stringify(er));});
      }
    }
  }

  loadSelected(selectedElem){
    if(selectedElem.slt == 'Vrai'){selectedElem.slt = 'Faux'; console.log("changé en ", selectedElem.slt); }      
    else if(selectedElem.slt == 'Faux'){selectedElem.slt = 'Vrai'; console.log("changé en ", selectedElem.slt);}    
  }

  sendSms(contact:Contact, message:string){
    this.sms.send(contact.phoneNumbers[0].value, message);
  }

  call(contact:Contact){
    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
  }

  createContact(nom:string, prenom:string, phoneNumber:string){
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, prenom, nom);
    contact.phoneNumbers = [new ContactField('mobile',phoneNumber)];
    contact.save().then( async () => {this.toastService.presentToast("Contact ajouté avec succés"); }
    ,er => { console.log("Erreur d'enregistrement du contact", JSON.stringify(er));}
    );
  }





}
