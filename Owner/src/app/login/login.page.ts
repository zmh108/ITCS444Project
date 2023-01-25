import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireBaseService } from '../fire-base.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

declare var dynamics: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{


  password:any;
  email:any;
  userId:any;
  user:any;
  showMessage=false;
  constructor(public fbAuth:AngularFireAuth, public nav:Router,public fb:FireBaseService, public storage:Storage) {
    this.storage.create();
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
            this.nav.navigateByUrl("tabs");
          
         
        })
      }else{
        
        this.showMessage = true
      }


     })
   
    }).catch(err=>{
      this.animateCard();
      this.showMessage = true
    })
  }



  animateCard(){
    var elem= document.getElementById("myCard")
    dynamics.animate(elem, {
      //scaleY: -0.8,
      rotateZ: 20,
      scale: 1, 
      opacity: 1
    }, {
      type: dynamics.spring, 
      frequency: 700,
      friction: 200, 
      duration: 5000,
      complete: this.verticalBounce
    })
  }
  verticalBounce(){
    var elem= document.getElementById("myCard")
    dynamics.animate(elem, {
      scaleY: 0.8
    }, {
      type: dynamics.bounce,
      duration: 800,
      bouciness: 0
    })

    dynamics.animate(elem, {
      translateY: -60
    } , {
      type: dynamics.forceWithGravity,
      bouciness: 0,
      duration: 500,
      delay: 10
    })

    dynamics.animate(elem, {
      translateY: 0.8
    }, {
      type: dynamics.bounce,
      duration: 800,
      bouciness: 600,
      delay: 10,
      complete: this.animateCard
    })
  }
}
