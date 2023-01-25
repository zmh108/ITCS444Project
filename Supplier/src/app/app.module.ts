import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicStorageModule } from '@ionic/storage-angular';


const firebaseConfig = {
  apiKey: "AIzaSyCf214PbuzvG4KxSGw7qDSA6PbuIET1dgA",
  authDomain: "starcoldstore-b5d26.firebaseapp.com",
  projectId: "starcoldstore-b5d26",
  storageBucket: "starcoldstore-b5d26.appspot.com",
  messagingSenderId: "649245280066",
  appId: "1:649245280066:web:1c2c4dd6f8e7d881446adb",
  measurementId: "G-GPGV5LNM7W"
};



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
