import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AlerteService } from 'src/app/services/alerte.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { StorageService } from 'src/app/services/storage.service';
import { Alerte, Utilisateur, Coordonnees, PieceJointe, Suivi_Alerte_Group, Suivi_Alerte_Localite, Suivi_Alerte_Agence, Suivi_Alerte_Perso, Groupe, Localite, Article, Suivi_Article_Agence } from 'src/app/types';
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
  selector: 'app-articledetails',
  templateUrl: './articledetails.page.html',
  styleUrls: ['./articledetails.page.scss'],
})
export class ArticledetailsPage implements OnInit {

  // ======================================================================================
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;
// ======================================================================================

  url= '../../../assets/map.png'; urlaudio= '../../../assets/audio.png'; urlvideo= '../../../assets/video.png';
  base:string = environment.apiUrl;

  backPage:string = ""; from:string = ""; type: string = "";
  isPublication:boolean = false;  isGestionnaire:boolean = false;  isSent:boolean = false;

  articleDetails : Article;                     isArticleDetails: boolean = false;
  auteur: Utilisateur;                          isAuteur: boolean = false;
  pieces: PieceJointe[];                        isPieces: boolean = false;
  agencesFollower: any[] = [];;       isAgencesFollower: boolean = false;  isAgencesView: boolean = false;
  articleLocalite: Localite;


  constructor(private authService: AuthService, public alerteService : AlerteService, public piecesService : PiecesService,
    public storageService : StorageService, private router: Router, private activatedRoute: ActivatedRoute,
    private modalController: ModalController, public actionSheetCtrl: ActionSheetController,
    private camera:Camera, private mediaCapture:MediaCapture, private file: File, private filePath: FilePath,
    private transfer: FileTransfer, private streamingMedia: StreamingMedia, private photoViewer: PhotoViewer,
    public sanitizer: DomSanitizer, private videoPlayer: VideoPlayer, private toastService : ToastService,
    public fileChooser:FileChooser, private contacts: Contacts, private callNumber: CallNumber,
    private sms: SMS, public platform: Platform, public geolocation: Geolocation,
    public articleService : ArticleService,
// ========================================================================================================
    public navCtrl: NavController, private plt: Platform, private storage: Storage
// ========================================================================================================
    ) { }

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

  ngOnInit() { this.loadData(); }

  async loadData(){
    this.backPage = this.activatedRoute.snapshot.params["backPage"];
    if(this.backPage=="/folder/articles/options/publications"){this.isPublication = true; this.from = "publications";}
    else if(this.backPage=="/folder/articles/options/prearticle"){this.isGestionnaire = true; this.from = "prearticle";}
    else if(this.backPage=="/folder/articles/options/postarticle"){this.isSent = true; this.from = "postarticle";}
    const ARTICLEID = this.activatedRoute.snapshot.params["id"];      
    this.articleService.getArticle(ARTICLEID).subscribe(res1=>{
      this.articleDetails=res1;  if(this.articleDetails){this.isArticleDetails = true;}
      this.authService.getCurrenttUser(res1.auteur).subscribe((res2:any) => {
        this.auteur = res2; this.auteur.photo = environment.apiUrl + this.auteur.photo; this.isAuteur = true;
        if(this.auteur){this.isAuteur = true;}
        this.articleService.getArticlePieces(ARTICLEID).subscribe(res3=>{
          this.pieces = res3; 
          let i=0; for(let elem of this.pieces){ i++;} if(i){this.isPieces = true;}
          this.articleService.getArticleAgences(ARTICLEID).subscribe(res4=>{
            let i=0;
            for(let elem of res4){ 
              i++;
              this.articleService.getAgenceData(elem.agence).subscribe(res5=>{
                this.articleService.getAgenceLocalite(res5.localite).subscribe(res6=>{
                  this.agencesFollower.push({agence:res5, localite: res6});
                  console.log(JSON.stringify(this.agencesFollower));
                },er=>{console.log(er);});
              },er=>{console.log(er);});
            } if(i){this.isAgencesFollower = true;}
            this.articleService.getArticleLocalite(res1.localite).subscribe(res7=>{
              this.articleLocalite = res7; 
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
        },{ text: 'Agence', icon: 'business', 
          handler: () => {  }
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
      params : {article: String(this.articleDetails.id), proprio: "Article", type: type},
      headers: {Connection: "close"},
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = environment.apiUrl +'/wallu/articles/'+ this.articleDetails.id +'/piecesUpload/';
    fileTransfer.upload(localFilePath, url, options).then(data => {
      console.log("upload successful"); this.loadData();
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

  async selectAFile() {
    this.fileChooser.open().then(fileURI => {
      this.filePath.resolveNativePath(fileURI).then(filePathUrl => {
        let fileName = filePathUrl.substr(filePathUrl.lastIndexOf('/') + 1);
        this.uploadSelectAFile(filePathUrl, fileName);
      });
    }).catch(error => {}); 
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
                params: { article: String(this.articleDetails.id), proprio: "Article", type: this.type },
                headers: { Connection: "close" },
              };
              const fileTransfer: FileTransferObject = this.transfer.create();
              const url = environment.apiUrl + '/wallu/articles/' + this.articleDetails.id + '/piecesUpload/';
              fileTransfer.upload(filePathUrl, url, options).then(data => {
                console.log("upload successful"); this.loadData();
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
                params: { article: String(this.articleDetails.id), proprio: "Article", type: this.type },
                headers: { Connection: "close" },
              };
              const fileTransfer: FileTransferObject = this.transfer.create();
              const url = environment.apiUrl + '/wallu/articles/' + this.articleDetails.id + '/piecesUpload/';
              fileTransfer.upload(filePathUrl, url, options).then(data => {
                console.log("upload successful"); this.loadData();
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
                params: { article: String(this.articleDetails.id), proprio: "Article", type: this.type },
                headers: { Connection: "close" },
              };
              const fileTransfer: FileTransferObject = this.transfer.create();
              const url = environment.apiUrl + '/wallu/articles/' + this.articleDetails.id + '/piecesUpload/';
              fileTransfer.upload(filePathUrl, url, options).then(data => {
                console.log("upload successful"); this.loadData();
              }, err => {
                console.log("upload error is inspected", JSON.stringify(err));
              });
              // 
            }
          });
      },err =>{ console.log(err); throw err; return ""; });
  }











}
