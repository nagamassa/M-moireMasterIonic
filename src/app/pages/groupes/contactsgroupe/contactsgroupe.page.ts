import { Component, OnInit } from '@angular/core';
import { AlerteService } from 'src/app/services/alerte.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Groupe, Membre, Suivi_Alerte_Perso } from 'src/app/types';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-contactsgroupe',
  templateUrl: './contactsgroupe.page.html',
  styleUrls: ['./contactsgroupe.page.scss'],
})
export class ContactsgroupePage implements OnInit {

  groupeDetalis : Groupe;  MesContacts: Contact[] = []; listContacts: Contact[] = []; selectedContact: any[] = [];
  newMembre = {user_member: "0", groupe: "0", isAdmin: "Faux", isFondateur: "Faux"};
  pesonnesFollower: Suivi_Alerte_Perso[];

  constructor(public alerteService : AlerteService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastService : ToastService, private contacts: Contacts, private callNumber: CallNumber,
    private sms: SMS, 
  ) { }

  ngOnInit() { this.loadInfos(); }

  async loadInfos(){
    const GROUPEID = this.activatedRoute.snapshot.params["id"];      
    this.alerteService.getGroupe(GROUPEID).subscribe(res1=>{
      this.groupeDetalis=res1;
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
            this.listContacts.push(this.MesContacts[i]); this.selectedContact.push({realID: res1.id,id:this.listContacts.length-1,slt:'Faux',num:Number(phoneString)});
            console.log("Les electionnés sont", JSON.stringify(this.selectedContact)); 
          },er=>{console.log("Erreur test: ",JSON.stringify(er));});
        }         
      // 
    },
     er => {console.log("Error getting contacts ", JSON.stringify(er));  } 
    );
  }

   
  ajouterCible(cibles, selectedgroupe){ 
    this.alerteService.getGroupeMembresUsers(selectedgroupe.id).subscribe(res8=>{
      this.pesonnesFollower = res8;    let notLinkedUser = 0; 
      for (let i = 0; i < cibles.length; i++) {
        notLinkedUser = 0; 
        for(let f of this.pesonnesFollower){if(cibles[i].realID==f.follower){notLinkedUser += 1;}} 
        if(cibles[i].slt == "Vrai" && notLinkedUser == 0){ 
          this.alerteService.findByPhone(cibles[i].num).subscribe(target=>{
            this.newMembre.groupe = selectedgroupe.id; this.newMembre.user_member = target.id; 
            this.alerteService.addNewMembre(this.newMembre).subscribe(res=>{
              console.log("cible personne bien ajouté", JSON.stringify(res));               
            },er=>{console.log("Error add membre: ",JSON.stringify(er));});
          },er=>{console.log("Erreur test: ",JSON.stringify(er));});
        } else{ console.log("membre is follower"); }
        notLinkedUser = 0; 
      }
    },er=>{console.log(er);})
    this.router.navigate(['/folder/groupes/groupedetails/',selectedgroupe.id]);
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