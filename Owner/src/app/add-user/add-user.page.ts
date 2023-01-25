import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  user: User = {
        Name: '',
        type: '',
        phone: +397,
        email: '',
        password: '',
        
      };
    
  constructor(public ActRoute:ActivatedRoute, public fb: UsersService, public router: Router,
    private toastCtrl: ToastController) { 
  }


  ngOnInit() {
  }

  adduser(){

    this.fb.addusr(this.user).then(() => {
            this.showToast('User added');
            this.router.navigateByUrl('/tabs/tab3');
          }, err => {
            this.showToast('There was a problem adding user :(');
          });
      


  }


  showToast(msg:any) {
        this.toastCtrl.create({
          message: msg,
          duration: 2000
        }).then(toast => toast.present());
      }
    

}
