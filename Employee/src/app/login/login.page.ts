import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FbService } from '../fb.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // password:any;
  // email:any;
  // userId:any;
  // user:any;
  // showMessage=false;
  public username="";
  public password="";



  constructor(public fbAuth:AngularFireAuth, public navCtrl:NavController,public nav:Router, public fb: FbService) {
    
   }


  ngOnInit() {
  }

  // async login(){
  //   this.fbAuth.signInWithEmailAndPassword(this.email,this.password).then(x=>{
  //    this.fbAuth.authState.subscribe(async loggedInUser=>{
  //     if(loggedInUser){
  //       await this.storage.remove("loggedInUser")
  //       this.userId = loggedInUser.uid;
  //        (await this.fb.getUserById(this.userId)).subscribe(user=>{
  //         this.user = user.data();
  //         this.user.id = this.userId
  //         console.log(this.user)
  //         this.storage.set("loggedInUser",this.user)
  //           this.nav.navigateByUrl("tabs");
          
         
  //       })
  //     }else{
  //       this.showMessage = true
  //     }


  //    })
   
  //   }).catch(err=>{
  //     this.showMessage = true
  //   })
  // }

  SignIn(){
    this.fb.SignIn(this.username,this.password)
    .then( ()=>{
        this.fb.Msg("SignIn","Welcome "+ this.username);
        this.nav.navigateByUrl("tabs/tab1");
       // this.navCtrl.navigateRoot("tabs")

    })
    .catch( ()=>{
      this.fb.Msg("SignIn","Incorrect username or password");
    });
}

SignOut(){
  
}

}
