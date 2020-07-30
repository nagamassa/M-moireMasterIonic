export interface Utilisateur {
    id?: number; last_login?: string; is_superuser: boolean; username: string; first_name?: string; 
    last_name?: string; is_staff: boolean; is_active: boolean; date_joined: string; email: string;
    blocage: string; profil: string; statut: string; alias?: any; idNotification?:string; phone?: any; dateNaissance?: any;
    description?: string; photo?: string; localite?: any;
}

export interface Localite {
    id?: number; region?: string; adresse?: string;
}

export interface Groupe {
    id?: number; nombreMembre?: number; nom?: string; dateCreation?: string;
}

export interface Membre {
    id?: number; user_member?: number; groupe?: number; isAdmin?: string; isFondateur?: string; dateJoined?: string;
}

export interface Alerte {
    id: number; profil: string; statut: string; dateAlerte: string; auteur: number; titre?: string, utilisee?:string, type?: string;
}

export interface PieceJointe {
    id: number; article?: number; alerte?: number; proprio: string; type: string; titre?: string; piece?: string;
    texto?: any; datePiece: string;
}

export interface Suivi_Alerte_Perso {
    id?: number; alerte?: number; follower?: number; reception?: string; reponse?: string; DateReception?: string;
    DateReponse?: string;
}

export interface Suivi_Alerte_Group {
    id?: number; alerte?: number; groupe?: number; nombreReception?: number; nombreReponse?: number;
}

export interface Suivi_Alerte_Localite {
    id?: number; alerte?: number; localite?: number; nombreReception?: number; nombreReponse?: number;
}

export interface Suivi_Alerte_Agence {
    id: number; alerte: number; agence: number; nombreReception: number; nombreReponse: number; dateTransfert?:string;
}
export interface Coordonnees {
    id: number; alerte: number; dateCoordonnees: string; longitude: number; latitude: number;
}