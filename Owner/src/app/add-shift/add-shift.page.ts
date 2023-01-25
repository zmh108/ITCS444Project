
  import { Component, OnInit } from '@angular/core';

  import { Observable } from 'rxjs';
  
  import { FbService, User, Request, Shift, StoreShift } from '../fb.service';
  
  import { lastValueFrom } from 'rxjs';
  
  import { DocumentReference } from '@angular/fire/compat/firestore';
  
  import { AngularFirestore} from '@angular/fire/compat/firestore';
  
  import * as firebase from 'firebase/app';
  
  import "firebase/auth";
  
  import "firebase/firestore";
  
  import { ActivatedRoute, Router } from '@angular/router';
  
  import { NavController } from '@ionic/angular';
  
  import { AngularFireAuth } from '@angular/fire/compat/auth';
  
  

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.page.html',
  styleUrls: ['./add-shift.page.scss'],
})







export class AddShiftPage implements OnInit {

  
  
    id: any;
  
  
  
    constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
  
      public navCtrl:NavController, public router: Router, public auth: AngularFireAuth, private  afs:  AngularFirestore) {
  
       this.users = this.Srv.getUsers();
  
      this.reqs = this.Srv.getRequest();
  
      this.shifts = this.Srv.getShift();
  
      this.storeshift = this.Srv.getStoreshift();
  
  
  
  
     
  
     }
  
     date="";
  
    public users: Observable<User[]>;
  
    public reqs: Observable<Request[]>;
  
    public shifts:  Observable<Shift[]>;
  
    public storeshift: Observable<StoreShift[]>;
  
  
  
  
    ngOnInit() {
  
     
  
    }
  
  
  
    
  
  
    public shi: Shift = {} as Shift;
  

  
   disuser:any;

  
    public storesh: StoreShift = {
  
      date:"", time:"", nameEm:"", Empid:""
  
    }
  
  
  
   
  
    idreques={};
  
    show=false;
  
  
   choose = {
  
    nameEm: "",
  
    id:""
  
   }
  
  
  
  
  
   public duser:  User = {} as User;
  
   showing=false;
  
  
  
   showTime(){
  
    this.showing = !this.showing
  
   }

   /*
   Free Time Slots
   showtime=false;
  showed(){
    this.showtime = this.showtime
  }

  seValue=""

  handleChange(selectedValue:any){
    console.log("selected" + selectedValue)
    this.seValue = selectedValue;

    
  }
  */
  
  
  
  
   

  
    addShift(){
  
     
  
    let EmpSplit= this.storesh.Empid.split("_");
  
     let nameE = EmpSplit[0];
  
     let nameI = EmpSplit[1];
  
  
    this.Srv.addStoreShift(this.storesh.date, this.storesh.time, nameE, nameI)
  
      .then((res)=>{
  
        this.Srv.Msg("Added", "The shift is assigned successfully");
  
        this.shi = {} as Shift;
  
      })
  
      console.log("gggg"+this.storesh.date)
  
      console.log("the time is " + this.storesh.time)
  
      console.log("name is" + nameE)
  
      console.log("id is" + nameI)
  
  
  
   
  
    }
  
  
  
  
  }