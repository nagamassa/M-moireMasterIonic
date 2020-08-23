import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Suivi_Alerte_Perso, Groupe, Localite } from 'src/app/types';
import { Camera} from '@ionic-native/Camera/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { StreamingMedia} from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, Platform, NavController } from '@ionic/angular';
import { PiecesService } from 'src/app/services/pieces.service';
import { PiecepopupPage } from 'src/app/piecepopup/piecepopup.page';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoPlayer,  } from '@ionic-native/video-player/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { Contacts} from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Plugins } from '@capacitor/core';
// ====================================================================================
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

declare var google;
// ====================================================================================


const { PushNotifications } = Plugins;


@Component({
  selector: 'app-mycoursdetails',
  templateUrl: './mycoursdetails.page.html',
  styleUrls: ['./mycoursdetails.page.scss'],
})
export class MycoursdetailsPage implements OnInit {
// ======================================================================================
@ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
 
  positionSubscription: Subscription;
// ======================================================================================


  marker:any; latitude:any=""; longitude:any="";  timestamp:any=""; deviceToken: string = ""; 
  isPreparation:boolean = false;  isHistorique:boolean = false;  isCours:boolean = false; isBoth:boolean = false;
  isPublic:boolean = false;

  base:string = environment.apiUrl; base64Image:any; 
  newPiece = {id: null,article: null,alerte: null,proprio: '',type: '',titre: '',piece: null, texto: '',datePiece: null}
  url= '../../../assets/map.png'; urlaudio= '../../../assets/audio.png'; urlvideo= '../../../assets/video.png';

  alerteDetalis : Alerte;                     isAlerteDetalis: boolean = false;
  auteur: Utilisateur;                        isAuteur: boolean = false;
  coordonnees: Coordonnees[];                 isCoordonnees: boolean = false;
  pieces: PieceJointe[];                      isPieces: boolean = false;
  groupFollower: Suivi_Alerte_Group[];        isGroupFollower: boolean = false;    isGroupView: boolean = false;
  localiteFollower: Suivi_Alerte_Localite[];  isLocaliteFollower: boolean = false; isLocaliteView: boolean = false;
  agencesFollower: Suivi_Alerte_Agence[];     isAgencesFollower: boolean = false;  isAgencesView: boolean = false;
  pesonnesFollower: Suivi_Alerte_Perso[];     isPesonnesFollower: boolean = false; isPesonnesView: boolean = true;

  fullAgencesFollower: any[] = [];

  usersFollower: Utilisateur[]=[];            nbFollowerRecus: number = 0;         nbFollowerRepondu: number = 0;
  groupFollowerData: Groupe[]=[];             localiteFollowerData: Localite[]=[];
  nbNotYet: number = 0;                       wantAdd: boolean = false;

  textMessage: string = ""; coords : {} = {};  type: string = "";
  isOther: boolean = true;  backPage:string = ""; from:string = "";

  constructor(private authService: AuthService, public articleService : ArticleService, public alerteService : AlerteService, public piecesService : PiecesService,
    public storageService : StorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetCtrl: ActionSheetController,
    private camera:Camera, private mediaCapture:MediaCapture, private file: File, private filePath: FilePath,
    private transfer: FileTransfer, private streamingMedia: StreamingMedia, private photoViewer: PhotoViewer,
    public sanitizer: DomSanitizer, private videoPlayer: VideoPlayer, private toastService : ToastService,
    public fileChooser:FileChooser, private contacts: Contacts, private callNumber: CallNumber,
    private sms: SMS, public platform: Platform, public geolocation: Geolocation,
// ========================================================================================================
    public navCtrl: NavController, private plt: Platform, private storage: Storage
// ========================================================================================================
    ){ }


config = { spaceBetween: 0, centeredSlides: true, slidesPerView: 1.4, loop:true, autplay: false }

async piecemodal(pc:PieceJointe){
  pc.piece = environment.apiUrl + pc.piece;
  if(pc.type=="Vidéo" || pc.type=="Audio"){ 
    const modal = this.modalController.create({component: PiecepopupPage, cssClass: 'my-modal-css', componentProps: {piece: pc}});
    this.loadData();
    return (await modal).present();
  }
  else if(pc.type=="Texte" || pc.type=="Photo"){ 
    const modal = this.modalController.create({component: PiecepopupPage,cssClass: 'my-modal-css2', componentProps: {piece: pc}});
    this.loadData();
    return (await modal).present();
  } 
}

ngOnInit() { this.loadData(); this.ionViewDidLoad(); }

resetBadgeCount() {
  PushNotifications.removeAllDeliveredNotifications();
}

async loadData(){
  this.backPage = this.activatedRoute.snapshot.params["backPage"];
  if(this.backPage=="/folder/alertes/options/coursalerte"){this.isCours = true; this.from = "coursalerte"; this.isBoth = true;}
  else if(this.backPage=="/folder/alertes/options/prealerte"){this.isPreparation = true; this.from = "prealerte"; this.isBoth = true;}
  else if(this.backPage=="/folder/alertes/options/histalerte"){this.isHistorique = true; this.from = "histalerte"; this.isBoth = false;}
  const ALERTEID = this.activatedRoute.snapshot.params["id"];      
  this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
    this.alerteDetalis=res1;  if(this.alerteDetalis){this.isAlerteDetalis = true;}
    if(this.alerteDetalis.profil == "Anonyme"){this.isPublic = false;}
    else if(this.alerteDetalis.profil == "Public"){this.isPublic = true;}
    this.alerteService.getAlerteAuteur(ALERTEID).subscribe(res2=>{
      this.auteur = res2; this.auteur.photo = environment.apiUrl + this.auteur.photo; this.isAuteur = true;
      if(this.auteur){this.isAuteur = true;}
      this.alerteService.getAlerteCoordonnees(ALERTEID).subscribe(res3=>{
        this.coordonnees = res3; this.isCoordonnees = true; 
        this.coords = {'latitude': this.coordonnees[this.coordonnees.length-1]?.latitude, 'longitude': this.coordonnees[this.coordonnees.length-1]?.longitude}
        let i=0; for(let elem of this.coordonnees){ i++;} if(i){this.isCoordonnees = true;}
        this.alerteService.getAlertePieces(ALERTEID).subscribe(res4=>{
          this.pieces = []; this.pieces = res4; 
          let i=0; for(let elem of this.pieces){ i++;} if(i){this.isPieces = true;}             
          this.alerteService.getAlerteGroups(ALERTEID).subscribe(res5=>{
            this.groupFollower = res5; 
            let i=0; for(let elem of this.groupFollower){ i++;} if(i){this.isGroupFollower = true;}
            this.alerteService.getAlerteLocalites(ALERTEID).subscribe(res6=>{
              this.localiteFollower = res6; 
              let i=0; for(let elem of this.localiteFollower){ i++;} if(i){this.isLocaliteFollower = true;}
              this.alerteService.getAlerteAgences(ALERTEID).subscribe(res7=>{
                this.agencesFollower = res7; 
                let i=0; for(let elem of this.agencesFollower){ 
                  i++;
                  // 
                  this.articleService.getAgenceData(elem.agence).subscribe(re=>{
                    this.articleService.getAgenceLocalite(re.localite).subscribe(re2=>{
                      this.fullAgencesFollower.push({suivi_agence: elem, agence:re, localite: re2});
                      console.log(JSON.stringify(this.fullAgencesFollower));
                    },er=>{console.log(er);});
                  },er=>{console.log(er);});
                  // 
                } if(i){this.isAgencesFollower = true;}
                this.alerteService.getAlerteFollower(ALERTEID).subscribe(res8=>{
                  this.pesonnesFollower = res8;
                  this.nbFollowerRepondu=0; this.nbFollowerRecus=0; this.nbNotYet=0;
                  let i=0; for(let elem of this.pesonnesFollower){
                    i++;  
                    if(elem.reponse=="Vrai"){this.nbFollowerRepondu=this.nbFollowerRepondu+1; this.nbFollowerRecus=this.nbFollowerRecus+1;}
                    else if(elem.reception=="Vrai"){this.nbFollowerRecus=this.nbFollowerRecus+1;}
                    else if(elem.reception=="Faux"){this.nbNotYet=this.nbNotYet+1;}                    
                  } if(i){this.isPesonnesFollower = true;}
                  this.storageService.get(AuthConstants.AUTHDATA).then(res9 =>{
                    if(res9.id == this.alerteDetalis.auteur){ this.isOther=false}
                    this.alerteService.getAlerteUsersFollower(ALERTEID).subscribe(res10=>{
                      for(let sf of this.pesonnesFollower){ for(let f of res10){ if(sf.follower==f.id){this.usersFollower.push(f); this.usersFollower[this.usersFollower.length-1].photo = environment.apiUrl + this.usersFollower[this.usersFollower.length-1].photo;}}} 
                      this.alerteService.getAlerteGroupsData(ALERTEID).subscribe(res11=>{
                        for(let sg of this.groupFollower){for(let g of res11){ if(sg.groupe==g.id){this.groupFollowerData.push(g);}}}
                        this.alerteService.getAlerteLocalitesData(ALERTEID).subscribe(res12=>{
                          for(let sl of this.localiteFollower){for(let l of res12){ if(sl.localite==l.id){this.localiteFollowerData.push(l);}}}
                        },er=>{console.log(er);})
                      },er=>{console.log(er);})
                    },er=>{console.log(er);})
                  },er=>{console.log(er);})
                },er=>{console.log(er);})
              },er=>{console.log(er);})
            },er=>{console.log(er);});                
          },er=>{console.log(er);});
        },er=>{console.log(er);});
      },er=>{console.log(er);});
    },er=>{console.log(er);});
  },er=>{console.log(er);});
}

changerProfil(profil:string){
  this.alerteDetalis.profil = profil;
  if(this.isPublic == false){ 
    this.alerteService.changeAlerteInfos(this.alerteDetalis).subscribe(res1=>{
      this.isPublic = true;   console.log(JSON.stringify(this.alerteDetalis));
    },er=>{console.log(er);});
  }
  else if(this.isPublic == true){ 
    this.alerteService.changeAlerteInfos(this.alerteDetalis).subscribe(res1=>{
      this.isPublic = false;  console.log(JSON.stringify(this.alerteDetalis));
    },er=>{console.log(er);});
  }
}

// Début des actionsheets
async presentActionSheet() {
  const actionSheet =await this.actionSheetCtrl.create({    
    buttons: [
      { text: 'Enregistrer', icon: 'mic',
        handler: () => { this.recordAudio() }
      },
      { text: 'Filmer', icon: 'videocam',
        handler: () => { this.recordVideo() }
      },{ text: 'prendre photo', icon: 'camera',
        handler: () => { this.captureImage() }
      },{ text: 'Mémoire Interne', icon: 'folder-open',
        handler: () => { this.selectAFile() }
      },
    ]
  });
  actionSheet.present();
} 

async presentCiblesSheet() {
  const actionSheet =await this.actionSheetCtrl.create({    
    buttons: [
      { text: 'Groupe', icon: 'people-circle',
        handler: () => { this.newGroupeFollower(); }
      },
      { text: 'Localite', icon: 'map', 
        handler: () => { this.newLocaliteFollower(); }
      },{ text: 'Agence', icon: 'business', 
        handler: () => { this.loadAgences(); }
      },{ text: 'Contact', icon: 'person-circle', 
        handler: () => { this.loadContact(); }
      },
    ]
  });
  actionSheet.present();
}
// Fin des actionsheets

// Debut des fonctions called par les actionsheets

recordAudio(){
  this.mediaCapture.captureAudio().then(
    (data: MediaFile[]) => {
      if(data.length > 0) {
        this.addPiece(data[0], "Audio"); 
      }
    },
    (err: CaptureError) => { console.error(err); }
  );
}

recordVideo(){
  this.mediaCapture.captureVideo().then(
     (data: MediaFile[]) => {
      if(data.length > 0) {
        this.addPiece(data[0], "Vidéo");          
      }
    },
    (err: CaptureError) => { console.log("Mangui nii 2", JSON.stringify(err)); }
  ); 
}

captureImage(){
  this.mediaCapture.captureImage().then(
    (data: MediaFile[]) => {
      if(data.length > 0) {
        this.addPiece(data[0], "Photo");  
      }
    },
    (err: CaptureError) => { console.error(err); }
  );
}
// Fin des fonctions called par les actionsheets

// Debut fonction d'ajout de piece
addPiece(data:any, type: string){
  let capturedFile = data;
        let localFilePath = capturedFile.fullPath;
        let directoryPath = localFilePath.substr(0, localFilePath.lastIndexOf('/'));
        let fileName = localFilePath.substr(localFilePath.lastIndexOf('/') + 1);
  var options = { fileKey: "piece", fileName: fileName, chunkedMode: false,   mimeType: "multipart/form-data",
    params : {alerte: String(this.alerteDetalis.id), proprio: "Alerte", type: type},
    headers: {Connection: "close"},
  };
  const fileTransfer: FileTransferObject = this.transfer.create();
  const url = environment.apiUrl +'/wallu/alertes/'+ this.alerteDetalis.id +'/piecesUpload/';
  fileTransfer.upload(localFilePath, url, options).then(data => {
    console.log("upload successful"); this.loadData(); this.textMessage = "";
  }, err => {
    console.log("upload error is inspected", JSON.stringify(err));            
  });
}

openFile(data:PieceJointe){
  const path = environment.apiUrl + data.piece;
  if(data.type == "Audio"){    
    this.streamingMedia.playAudio(path);
  }else if(data.type == "Vidéo"){
    this.piecemodal(data);   
  }else if(data.type == "Photo"){
    this.photoViewer.show(path, 'Mon image');
  }else if(data.type == "Texte"){ }
}

addTexte(){
  let formData: FormData = new FormData();
    formData.append('alerte', String(this.alerteDetalis.id)); formData.append('proprio', "Alerte");
    formData.append('type', "Texte"); formData.append('texto', this.textMessage); this.textMessage = "";
  this.alerteService.uploadPiece(formData, this.alerteDetalis.id).subscribe(data =>{
    this.toastService.presentToast("Votre texte a été bien ajouté");
    this.loadData();
  }, 
  (error: any) => { console.log("Error add texte", JSON.stringify(error)); });

}

async selectAFile() {
  this.fileChooser.open().then(fileURI => {
    this.filePath.resolveNativePath(fileURI).then(filePathUrl => {
      let fileName = filePathUrl.substr(filePathUrl.lastIndexOf('/') + 1);
      this.uploadSelectAFile(filePathUrl, fileName);
      
      // 
    });
}).catch(error => {
  
});

}

uploadSelectAFile(filePathUrl, fileName) {
  this.file.resolveLocalFilesystemUrl(filePathUrl).then(fileInfo =>
    {
      let files = fileInfo as FileEntry;
      files.file(success =>
        {
          if(success.type.indexOf('image')!== -1){
            this.type = "Photo"; console.log("Mon type est: ", this.type);
            // 
            var options = {
              fileKey: "piece", fileName: fileName, chunkedMode: false, mimeType: "multipart/form-data",
              params: { alerte: String(this.alerteDetalis.id), proprio: "Alerte", type: this.type },
              headers: { Connection: "close" },
            };
            const fileTransfer: FileTransferObject = this.transfer.create();
            const url = environment.apiUrl + '/wallu/alertes/' + this.alerteDetalis.id + '/piecesUpload/';
            fileTransfer.upload(filePathUrl, url, options).then(data => {
              console.log("upload successful"); this.loadData(); this.textMessage = "";
            }, err => {
              console.log("upload error is inspected", JSON.stringify(err));
            });
            // 
          }
          else if(success.type.indexOf('audio')!== -1){
            this.type = "Audio"; console.log("Mon type est: ", this.type);
            // 
            var options = {
              fileKey: "piece", fileName: fileName, chunkedMode: false, mimeType: "multipart/form-data",
              params: { alerte: String(this.alerteDetalis.id), proprio: "Alerte", type: this.type },
              headers: { Connection: "close" },
            };
            const fileTransfer: FileTransferObject = this.transfer.create();
            const url = environment.apiUrl + '/wallu/alertes/' + this.alerteDetalis.id + '/piecesUpload/';
            fileTransfer.upload(filePathUrl, url, options).then(data => {
              console.log("upload successful"); this.loadData(); this.textMessage = "";
            }, err => {
              console.log("upload error is inspected", JSON.stringify(err));
            });
            // 
          }
          else if(success.type.indexOf('video')!== -1){
            this.type = "Vidéo"; console.log("Mon type est: ", this.type);
            // 
            var options = {
              fileKey: "piece", fileName: fileName, chunkedMode: false, mimeType: "multipart/form-data",
              params: { alerte: String(this.alerteDetalis.id), proprio: "Alerte", type: this.type },
              headers: { Connection: "close" },
            };
            const fileTransfer: FileTransferObject = this.transfer.create();
            const url = environment.apiUrl + '/wallu/alertes/' + this.alerteDetalis.id + '/piecesUpload/';
            fileTransfer.upload(filePathUrl, url, options).then(data => {
              console.log("upload successful"); this.loadData(); this.textMessage = "";
            }, err => {
              console.log("upload error is inspected", JSON.stringify(err));
            });
            // 
          }
        });
    },err =>{ console.log(err); throw err; return ""; });
}

loadContact(){
  this.router.navigate(['/folder/alertes/options/coursalerte/contactsalerte', this.alerteDetalis.id, {"from": this.from}]);    
}

loadAgences(){
  this.router.navigate(['/folder/alertes/options/coursalerte/contactsalerte', this.alerteDetalis.id,'newalerteagencefollower', {"from": this.from}]);    
}

newGroupeFollower(){
  this.router.navigate(['/folder/alertes/options/coursalerte/contactsalerte', this.alerteDetalis.id,'newgroupefollowers', {"from": this.from}]);    
}

newLocaliteFollower(){
  this.router.navigate(['/folder/alertes/options/coursalerte/contactsalerte', this.alerteDetalis.id,'newlocalitefollowers', {"from": this.from}]);    
}

seeFollower(){
  this.isGroupView = false; this.isLocaliteView = false; this.isAgencesView = false; this.isPesonnesView = true;
}
seeGroupFollower(){
  this.isGroupView = true; this.isLocaliteView = false; this.isAgencesView = false; this.isPesonnesView = false;
}
seeLocaliteFollower(){
  this.isGroupView = false; this.isLocaliteView = true; this.isAgencesView = false; this.isPesonnesView = false;
}
seeAgencesFollower(){
  this.isGroupView = false; this.isLocaliteView = false; this.isAgencesView = true; this.isPesonnesView = false;
}

addPieceArea(){
  if(this.wantAdd==true){this.wantAdd=false; this.textMessage = "";}
  else if(this.wantAdd==false){this.wantAdd=true; this.textMessage = "";}
}

stopAlerte(alerte: Alerte){
  alerte.statut = "Inactive";
  this.alerteService.changeAlerteInfos(alerte).subscribe(res1=>{
    this.router.navigate(['/folder/alertes/options/coursalerte']); 
  },er=>{console.log(er); });
}

anulerAlerte(alerteDetalis){
  this.alerteService.killAlerte(alerteDetalis).subscribe(res1=>{
    this.router.navigate(['/folder/alertes/options/prealerte']); 
  },er=>{console.log(er); });
}

killFollower(followerVictime: Suivi_Alerte_Perso){  
  this.alerteService.deleteSuiviAlertePerso(followerVictime).subscribe(res3=>{
    console.log(JSON.stringify(followerVictime)," deleted successfully");
  },er=>{console.log(er); });
}

killPiece(piece: PieceJointe){  
  this.alerteService.killPiece(piece).subscribe(res3=>{
    console.log(JSON.stringify(piece)," deleted successfully");
  },er=>{console.log(er); });
}

killGroupFollower(groupeFollowerVictime: Suivi_Alerte_Group){
  this.alerteService.deleteGroupeTarget(groupeFollowerVictime).subscribe(res=>{
    console.log(JSON.stringify(groupeFollowerVictime)," deleted successfully");
    this.alerteService.getGroupeMembres(groupeFollowerVictime.groupe).subscribe(res2=>{
      let membres = res2;
        for(let m of membres){
          let followerVictime: Suivi_Alerte_Perso={"alerte": groupeFollowerVictime.alerte, "follower":m.user_member};
          this.alerteService.getSuiviAlertePersoFilter(followerVictime).subscribe(res3=>{            
            // 
            this.killFollower(res3);
            // 
          },er=>{console.log(er); });            
        }              
    },er=>{console.log(er);});
  },er=>{console.log("Erreur killing cible groupe: ",JSON.stringify(er));});
}

killLocaliteFollower(localiteFollowerVictime: Suivi_Alerte_Localite){
  this.alerteService.deleteLocaliteTarget(localiteFollowerVictime).subscribe(res=>{
    console.log(JSON.stringify(localiteFollowerVictime)," deleted successfully");
    this.alerteService.getLocaliteUsers(localiteFollowerVictime.localite).subscribe(res2=>{
      for(let m of res2){ 
        let followerVictime: Suivi_Alerte_Perso={"alerte": localiteFollowerVictime.alerte, "follower":m.id};
        this.alerteService.getSuiviAlertePersoFilter(followerVictime).subscribe(res3=>{            
          // 
          this.killFollower(res3);
          // 
        },er=>{console.log(er); });
      }
    },er=>{console.log(er);});
  },er=>{console.log("Erreur killing cible localite: ",JSON.stringify(er));});
}

killAgenceFollower(AgenceFollowerVictime: Suivi_Alerte_Agence){
  this.alerteService.deleteAgenceTarget(AgenceFollowerVictime).subscribe(res=>{
    console.log(JSON.stringify(AgenceFollowerVictime)," deleted successfully");
  },er=>{console.log("Erreur killing cible localite: ",JSON.stringify(er));});
}


// =========================================================================================================
ionViewDidLoad() {
  const ALERTEID = this.activatedRoute.snapshot.params["id"];
  this.alerteService.getAlerteCoordonnees(ALERTEID).subscribe(res3=>{
    let coords = res3[res3.length-1];

    this.plt.ready().then(() => {
      // this.loadHistoricRoutes();
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let latLng = new google.maps.LatLng(coords?.latitude, coords?.longitude);
      this.map.setCenter(latLng);
      this.map.setZoom(12);

      let marker1 = new google.maps.Marker({ map : this.map, position: latLng})
    });
  },er=>{console.log(er);});
}

loadHistoricRoutes() {
  this.storage.get('routes').then(data => {
    if (data) {
      this.previousTracks = data;
    }
  });
}

startTracking() {
  this.isTracking = true;
  this.trackedRoute = [];

  this.positionSubscription = this.geolocation.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) //Filter Out Errors
    )
    .subscribe(data => {
      setTimeout(() => {
        this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
        this.redrawPath(this.trackedRoute);
      }, 0);
    });

}

redrawPath(path) {
  if (this.currentMapTrack) {
    this.currentMapTrack.setMap(null);
  }

  if (path.length > 1) {
    this.currentMapTrack = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#ff00ff',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    this.currentMapTrack.setMap(this.map);
  }
}

stopTracking() {
  let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
  this.previousTracks.push(newRoute);
  this.storage.set('routes', this.previousTracks);
 
  this.isTracking = false;
  this.positionSubscription.unsubscribe();
  this.currentMapTrack.setMap(null);
}
 
showHistoryRoute(route) {
  this.redrawPath(route);
}
// =========================================================================================================




}