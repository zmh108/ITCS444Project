


import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { LoginPageModule } from '../login/login.module';
import { LoginPage } from '../login/login.page';
import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User, UsersService } from '../users.service';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {


  user: User = {
        Name: '',
        type: '',
        phone: +397,
        email: '',
        password: '',
      };

  constructor(public ModalCtrl:ModalController, public alertCtrl: AlertController, public fb: UsersService,
        public router: Router, private toastCtrl: ToastController) {}


  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: LoginPage,
   backdropDismiss: true
    });
    return await modal.present();
  }

  showToast(msg:any) {
        this.toastCtrl.create({
          message: msg,
          duration: 2000
        }).then(toast => toast.present());
      }


    deleteusr(id: any){
          this.fb.deleteUser(id).then(() => {
            //this.router.navigateByUrl('/');
            this.showToast('User deleted');
          }, err => {
            this.showToast('There was a problem deleting user ..');
          });
    }



}
