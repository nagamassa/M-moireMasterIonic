import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { PieceJointe } from '../types';

@Component({
  selector: 'app-piecepopup',
  templateUrl: './piecepopup.page.html',
  styleUrls: ['./piecepopup.page.scss'],
})
export class PiecepopupPage implements OnInit {
  @Input()
  urlSafe: SafeResourceUrl
  isPhoto:boolean = false; isVideo:boolean = false; isAudio:boolean = false; isTexte:boolean = false;

  constructor(private modalController: ModalController, public sanitizer: DomSanitizer) { }
  piece: PieceJointe;

  ngOnInit() {    
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.piece.piece);

    if(this.piece.type == "Photo"){ this.isPhoto = true; this.isVideo = false; this.isAudio = false; this.isTexte = false;}
    else if(this.piece.type == "Vidéo"){ this.isPhoto = false; this.isVideo = true; this.isAudio = false; this.isTexte = false;}
    else if(this.piece.type == "Audio"){ this.isPhoto = false; this.isVideo = false; this.isAudio = true; this.isTexte = false;}
    else if(this.piece.type == "Texte"){ this.isPhoto = false; this.isVideo = false; this.isAudio = false; this.isTexte = true;}
  }

}