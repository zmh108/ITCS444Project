import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FbService, StoreShift, User } from '../fb.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public disuser:User;
  public shiftuser:StoreShift;
  public storesh: StoreShift;
  empl: StoreShift = {} as StoreShift;


  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router, public auth: AngularFireAuth, private  afs:  AngularFirestore) {
      this.users = this.Srv.getUsers();
      //this.shifts = this.Srv.getShift();
      this.storeshift = this.Srv.getStoreshift();

      this.disuser = {} as User;
      // this.shiftuser = {} as Shift;
      // this.storesh = {} as Shift

      this.shiftuser = {} as StoreShift;
      this.storesh = {} as StoreShift

      console.log("in const "+ this.Srv.userid)
      this.empl = {} as StoreShift;
      // this.empl = this.Srv.getShiftByIndex(this.Srv.userid)
      console.log("names"+this.empl.nameEm)
      console.log("dates"+this.empl.date)


      this.afs.collection('User').doc(this.Srv.userid).get().forEach(doc=>{
        this.disuser.Name = doc.get('Name');
        console.log("about here??"+ this.Srv.userid)
        //console.log()
        this.shiftuser.nameEm = this.disuser.Name;
        this.shiftuser.Empid = this.Srv.userid
        this.storesh.Empid = this.Srv.userid

        console.log(this.shiftuser.Empid)
        console.log("id is "+this.Srv.userid)

        
      })

    }

    public users: Observable<User[]>;
   // public shifts:  Observable<Shift[]>;
    public storeshift: Observable<StoreShift[]>;


    click(){
      this.disuser = {} as User;
   //   this.shiftuser = {} as Shift;
  
        
        console.log("About herezzz "+ this.Srv.userid)
     //   this.empl = {} as Shift;
        // this.empl = this.Srv.getShiftByIndex(this.Srv.userid)
        console.log("names"+this.empl.nameEm)
        console.log("dates"+this.empl.date)
  
  
        this.afs.collection('User').doc(this.Srv.userid).get().forEach(doc=>{
          this.disuser.Name = doc.get('Name');
          console.log("User ID: " + this.Srv.userid)
          this.shiftuser.nameEm = this.disuser.Name;
  
          console.log(this.shiftuser.Empid)
  
          
        })
       console.log("sure " + this.disuser.Name)
  
    }
  
    reqestTrade(i:any){
      this.navCtrl.navigateRoot('request-trade/' + i)
    }
  

}
