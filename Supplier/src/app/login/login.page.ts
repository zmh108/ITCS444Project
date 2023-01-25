import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireBaseService } from '../fire-base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password:any;
  email:any;
  userId:any;
  user:any;
  showMessage=false;
  constructor(public fbAuth:AngularFireAuth, public nav:Router,public fb:FireBaseService, public storage:Storage) {
    this.storage.create();
  }

  ngOnInit() {
  }
  async login(){
    this.fbAuth.signInWithEmailAndPassword(this.email,this.password).then(x=>{
     this.fbAuth.authState.subscribe(async loggedInUser=>{
      if(loggedInUser){
        await this.storage.remove("loggedInUser")
        this.userId = loggedInUser.uid;
         (await this.fb.getUserById(this.userId)).subscribe(user=>{
          this.user = user.data();
          this.user.id = this.userId
          console.log(this.user)
          this.storage.set("loggedInUser",this.user)
          if(this.user.Type=="supplier")
          {
           
            this.nav.navigateByUrl("/home");
            this.storage.set("supplierId",this.userId)
          }

        })
      }else{
        this.showMessage = true
      }


     })
   
    }).catch(err=>{
      this.showMessage = true
    })
  }
}
