import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Suivi_Alerte_Perso } from 'src/app/types';
import { Observable } from 'rxjs';
import {Camera, CameraOptions} from '@ionic-native/Camera/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { PiecesService } from 'src/app/services/pieces.service';
import { PiecepopupPage } from 'src/app/piecepopup/piecepopup.page';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VideoPlayer, VideoOptions  } from '@ionic-native/video-player/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';




@Component({
  selector: 'app-mycoursdetails',
  templateUrl: './mycoursdetails.page.html',
  styleUrls: ['./mycoursdetails.page.scss'],
})
export class MycoursdetailsPage implements OnInit {
  base:string = environment.apiUrl; base64Image:any; 
  newPiece = {id: null,article: null,alerte: null,proprio: '',type: '',titre: '',piece: null, texto: '',datePiece: null}
  url= '../../../assets/map.png'; urlaudio= '../../../assets/audio.png'; urlvideo= '../../../assets/video.png';

  alerteDetalis : Alerte;                     isAlerteDetalis: boolean = false;
  auteur: Utilisateur;                        isAuteur: boolean = false;
  coordonnees: Coordonnees[];                 isCoordonnees: boolean = false;
  pieces: PieceJointe[];                      isPieces: boolean = false;
  groupFollower: Suivi_Alerte_Group[];        isGroupFollower: boolean = false;
  localiteFollower: Suivi_Alerte_Localite[];  isLocaliteFollower: boolean = false;
  agencesFollower: Suivi_Alerte_Agence[];     isAgencesFollower: boolean = false;
  pesonnesFollower: Suivi_Alerte_Perso[];      isPesonnesFollower: boolean = false;
  
  textMessage: string = ""; coords : {} = {};  type: string = "";

  isOther: boolean = true;

  constructor(private authService: AuthService, public alerteService : AlerteService, public piecesService : PiecesService,
    public storageService : StorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetCtrl: ActionSheetController,
    private camera:Camera, private mediaCapture:MediaCapture, private file: File, private filePath: FilePath,
    private transfer: FileTransfer, private streamingMedia: StreamingMedia, private photoViewer: PhotoViewer,
    public sanitizer: DomSanitizer, private videoPlayer: VideoPlayer, private toastService : ToastService,
    public fileChooser:FileChooser, private contacts: Contacts, private callNumber: CallNumber,
    private sms: SMS, 
    ){  }

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

ngOnInit() { 
  this.loadData();
}

async loadData(){
  const ALERTEID = this.activatedRoute.snapshot.params["id"];      
  this.alerteService.getAlerte(ALERTEID).subscribe(res1=>{
    this.alerteDetalis=res1;  if(this.alerteDetalis){this.isAlerteDetalis = true;}
    this.alerteService.getAlerteAuteur(ALERTEID).subscribe(res2=>{
      this.auteur = res2; this.auteur.photo = environment.apiUrl + this.auteur.photo; this.isAuteur = true;
      if(this.auteur){this.isAuteur = true;}
      this.alerteService.getAlerteCoordonnees(ALERTEID).subscribe(res3=>{
        this.coordonnees = res3; this.isCoordonnees = true;
        this.coords = {'latitude': this.coordonnees[this.coordonnees.length-1]?.latitude, 'longitude': this.coordonnees[this.coordonnees.length-1]?.longitude}
        let i=0; for(let elem of this.coordonnees){ i++;} if(i){this.isCoordonnees = true;}
        this.alerteService.getAlertePieces(ALERTEID).subscribe(res4=>{
          this.pieces = res4; 
          let i=0; for(let elem of this.pieces){ i++;} if(i){this.isPieces = true;}             
          this.alerteService.getAlerteGroups(ALERTEID).subscribe(res5=>{
            this.groupFollower = res5; 
            let i=0; for(let elem of this.groupFollower){ i++;} if(i){this.isGroupFollower = true;}
            this.alerteService.getAlerteLocalites(ALERTEID).subscribe(res6=>{
              this.localiteFollower = res6; 
              let i=0; for(let elem of this.localiteFollower){ i++;} if(i){this.isLocaliteFollower = true;}
              this.alerteService.getAlerteAgences(ALERTEID).subscribe(res7=>{
                this.agencesFollower = res7; 
                let i=0; for(let elem of this.agencesFollower){ i++;} if(i){this.isAgencesFollower = true;}
                this.alerteService.getAlerteFollower(ALERTEID).subscribe(res8=>{
                  this.pesonnesFollower = res8;
                  let i=0; for(let elem of this.pesonnesFollower){ i++;} if(i){this.isPesonnesFollower = true;}
                  this.storageService.get(AuthConstants.AUTHDATA).then(res9 =>{
                    if(res9.id == this.alerteDetalis.auteur){ this.isOther=false}
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
        handler: () => {  }
      },
      { text: 'Localite', icon: 'map', 
        handler: () => {  }
      },{ text: 'Agence', icon: 'business', 
        handler: () => {  }
      },{ text: 'Contact', icon: 'person-circle', 
        handler: () => { this.loadContact(); }
      },
    ]
  });
  actionSheet.present();
}
// Fin des actionsheets

// Debut des fonctions called par les actionsheets
openCamera(){
  const options : CameraOptions = { quality : 100, targetHeight:500, targetWidth:500,
     destinationType:this.camera.DestinationType.DATA_URL, encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData)=>{ this.base64Image = 'data:image/jpeg;base64,' + imageData;},
  (err)=>{  });
}

openGallery(){
  const options : CameraOptions = { quality : 100, targetHeight:500, targetWidth:500,
     sourceType:this.camera.PictureSourceType.PHOTOLIBRARY, destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG, mediaType:this.camera.MediaType.PICTURE,
  }
  this.camera.getPicture(options).then((imageData)=>{ this.base64Image = 'data:image/jpeg;base64,' + imageData;},
  (err)=>{ });
}

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
    // httpMethod: 'PUT',
    // headers: {'Authorization':'Bearer ' + val, 'Content-Type': 'application/x-www-form-urlencoded'}
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
    // const audioFile: MediaObject = this.media.create(path);
    this.streamingMedia.playAudio(path);
  }else if(data.type == "Vidéo"){
    this.piecemodal(data);
    // let options: StreamingVideoOptions = { successCallback: ()=>{console.log();}, errorCallback : ()=>{console.log();}, orientation : 'portrait' }
    // this.streamingMedia.playVideo(path, options );    
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
  this.router.navigate(['/folder/alertes/options/coursalerte/contactsalerte', this.alerteDetalis.id]);    
}



// Fin fonction d'ajout de piece





}




// selectFile(){
//   let file
//       this.fileChooser.open().then((uri) => {
//        this.filePath.resolveNativePath(uri).then((fileentry) => {
//          let filename = this.eventsdata.getfilename(fileentry);
//          let fileext = this.eventsdata.getfileext(fileentry);
        
//          if(fileext == "pdf"){
//             this.eventsdata.makeFileIntoBlob(fileentry, fileext,"application/pdf").then((fileblob) => {
//               file={
//                  blob : fileblob,
//                 type: "application/pdf",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//         })
//          }
//            if(fileext == "docx"){
//             this.eventsdata.makeFileIntoBlob(fileentry, fileext,"application/vnd.openxmlformats-officedocument.wordprocessingml.document").then((fileblob) => {
//          file={
//                  blob : fileblob,
//                 type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//         })
//          } 
//            if(fileext == "doc"){
//             this.eventsdata.makeFileIntoBlob(fileentry, fileext,"application/msword").then((fileblob) => {
//               file={
//                  blob : fileblob,
//                 type: "application/msword",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//           })
//          }
//          if(fileext == "epub"){
//             this.eventsdata.makeFileIntoBlob(fileentry, fileext,"application/octet-stream").then((fileblob) => {
//            file={
//                  blob : fileblob,
//                 type: "application/octet-stream",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//           })
//          }
//             if(fileext == "accdb"){
//             this.eventsdata.makeFileIntoBlob(fileentry, filename,"application/msaccess").then((fileblob) => {
//            file={
//                  blob : fileblob,
//                 type: "application/msaccess",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//           })
//          }
//            if(fileext == "xlsx"){
//             this.eventsdata.makeFileIntoBlob(fileentry, filename,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").then((fileblob) => {
//            file={
//                  blob : fileblob,
//                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                 fileext: fileext,
//                 filename: filename
//               }
//               this.eventsdata.addAssignmentFile(this.sbaid.sbaid, file)
//           })
//          }
  
//          else if (fileext!="doc"||"epub"||"xlsx"||"pdf"||"accdb"||"docx" ){
//            alert("Can't add "+  filename)
//          }
        
//         })
//       })
//   }