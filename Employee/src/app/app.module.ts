import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
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
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot(),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
