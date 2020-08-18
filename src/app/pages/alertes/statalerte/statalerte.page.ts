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

declare var google;
// ====================================================================================


@Component({
  selector: 'app-statalerte',
  templateUrl: './statalerte.page.html',
  styleUrls: ['./statalerte.page.scss'],
})
export class StatalertePage implements OnInit {

  // ======================================================================================
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;
  // ======================================================================================

  constructor(private authService: AuthService, public alerteService : AlerteService, public piecesService : PiecesService,
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
    ) { }

  ngOnInit() {this.loadData(); this.ionViewDidLoad();}

  async loadData(){}

  ionViewDidLoad() {
    // 
    this.geolocation.getCurrentPosition().then(pos => {
      let coordsI: any = {};
      coordsI.latitude = pos.coords.latitude; coordsI.longitude = pos.coords.longitude;
      this.plt.ready().then(() => {
        let mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let latLng1 = new google.maps.LatLng(coordsI?.latitude, coordsI?.longitude);
        this.map.setCenter(latLng1);
        this.map.setZoom(12);
        let marker1 = new google.maps.Marker({ 
          map : this.map,
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png",
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          // icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          
          icon:{
            path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
            fillColor: 'green',
            strokeColor: 'geen',
          },
          label: "Me",
          position: latLng1
        })
        // 
        this.alerteService.getAllAlerteCoordonnees().subscribe(res3=>{
          for(let elem of res3){ 
            let latLng = new google.maps.LatLng(elem?.latitude, elem?.longitude);
            let marker = new google.maps.Marker({ map : this.map, position: latLng})
          }
        },er=>{console.log(er);});
        // 
      });
    }).catch((error) => {console.log('Error getting location', error);});
    // 
  }








}
