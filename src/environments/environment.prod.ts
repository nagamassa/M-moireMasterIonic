export const environment = {
  production: true,
  apiUrl: 'http://192.168.43.240:8000'
};

// Dans Android Studio effectuer ces actions suivantes

//  Dans les repertoires:
// C:\Users\Barhama-Niass\3D Objects\MEMOIRE DE FIN D'ETUDE M2\PROGRAMMATION\TEST\test3\node_modules\@capacitor\android\capacitor\src\main>
// C:\Users\Barhama-Niass\3D Objects\MEMOIRE DE FIN D'ETUDE M2\PROGRAMMATION\TEST\test3\android\app\src\main

//  ajouter ces lignes dans le fichier AndroidManifest.xml
// <application android:usesCleartextTraffic="true"   android:networkSecurityConfig="@xml/network_security_config">
// <uses-library android:name="org.apache.http.legacy" android:required="false"/>

//  Dans le repertoire:
//  C:\Users\Barhama-Niass\3D Objects\MEMOIRE DE FIN D'ETUDE M2\PROGRAMMATION\TEST\test3\android\app\src\main\res\xml
//  Créer le fichier network_security_config.xml ajoutez y ces lignes
// <?xml version="1.0" encoding="utf-8"?>
// <network-security-config>
//     <base-config cleartextTrafficPermitted="true" />
// </network-security-config>