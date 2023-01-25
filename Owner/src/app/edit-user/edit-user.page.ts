import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  uName:any;
  utype:any;
  uemail:any;
  uphone:any;
  upassword:any;
  public index:any;
  public user = {} as User;
  public i = -1;
  useri:any = [];
  public usr = {} as User;
  constructor(public ActRoute:ActivatedRoute, public fb: UsersService, 
    public router: Router, private toastCtrl: ToastController) { 
     
    
  }
 ngOnInit() {
    /*this.index = this.ActRoute.snapshot.paramMap.get("i");
    this.usr = {} as User;
    this.usr = this.fb.getUserByIndex(this.index);*/
      this.index = this.ActRoute.snapshot.paramMap.get('i');
      this.fb.user.subscribe(useri=> {
        useri.forEach(usr =>{
          if(usr.id==this.index){
          this.uName=usr.Name;
          this.utype=usr.type;
          this.uemail=usr.email;
          this.uphone=usr.phone;
          this.upassword=usr.password;
        }
        }
          )
      })
      
  }
    

  updateuser(id:any) {
    let data = {
      Name: this.user.Name,
      email: this.user.email,
      phone: this.user.phone,
      type: this.user.type,
      password: this.user.password

    };
    if (id){
        this.fb.updateUser(id, this.user).then(() => {
          this.showToast('User updated');
        }, err => {
          this.showToast('There was a problem updating user');
        });
      }
  }
  
     
      showToast(msg:any) {
        this.toastCtrl.create({
          message: msg,
          duration: 2000
        }).then(toast => toast.present());
      }
    }
