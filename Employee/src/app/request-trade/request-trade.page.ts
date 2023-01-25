import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FbService, StoreShift, User, Request } from '../fb.service';

@Component({
  selector: 'app-request-trade',
  templateUrl: './request-trade.page.html',
  styleUrls: ['./request-trade.page.scss'],
})
export class RequestTradePage implements OnInit {

  public disuser:User;
  public shiftuser:StoreShift;
  public storesh: StoreShift;
  emp: StoreShift = {} as StoreShift
  requsting: Request = {} as Request;

  id=-1;


  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router, public auth: AngularFireAuth, private  afs:  AngularFirestore) {
      
      this.users = this.Srv.getUsers();
      //   this.shifts = this.Srv.getShift();
         this.storeshift = this.Srv.getStoreshift();
        // this.reqs = this.Srv.getRequest();
       // this.reqs = this.Srv.getRequest();
        this.reqs = this.Srv.getRequest();
         this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
   
         this.disuser = {} as User;
         // this.shiftuser = {} as Shift;
         // this.storesh = {} as Shift
   
         this.shiftuser = {} as StoreShift;
         this.storesh = {} as StoreShift
         this.requsting = {} as Request;
         
   
   
         this.emp = {} as StoreShift;
         this.emp = this.Srv.getShiftByIndex(this.id);
   
         this.afs.collection('User').doc(this.Srv.userid).get().forEach(doc=>{
           this.requsting.requestID = this.Srv.userid;
           this.disuser.Name= doc.get('Name');
           this.requsting.requesterName = this.disuser.Name;
         })
   
   
     }
     public users: Observable<User[]>;
     // public shifts:  Observable<Shift[]>;
      public storeshift: Observable<StoreShift[]>;
      public reqs: Observable<Request[]>;

  ngOnInit() {
  }

  showing=false;
  timeSlot=['morning', 'afternoon','night'];

  hidingShift(){
    console.log(this.emp.time + "fff")
    if (this.emp.time == "morning"){
      this.showing = this.showing;
    }
    else if(this.emp.time == "afternoon"){
      this.showing = this.showing;

    }
    else{
      this.showing = this.showing;
    }

  }
  card="";
  seValue=""

  handleChange(selectedValue:any){
    console.log("selected" + selectedValue)
    this.seValue = selectedValue;

    
  }

  

  addRequest(){
    console.log("f" + this.requsting.storeShiftIDReq)
    console.log("REQUESTING ID" + this.requsting.storeShiftIDReq);

    console.log("id req" + this.requsting.requestID);

   // console.log("get" + this.get)
   console.log("rece" + this.requsting.receiveID)

    let EmpSpliting = this.requsting.receiveID.split("_");
    let nameE = EmpSpliting[0];
    let nameI = EmpSpliting[1];
    let storeId= EmpSpliting[2];

    console.log("store id " + this.requsting.storeShiftIDReq)

    console.log("req id " + this.requsting.requestID);
    console.log("name id " + nameI);
    console.log("emp date "+ this.emp.date);
    console.log("time " + this.seValue);
    console.log("name employee " + nameE);
    console.log("reqName" + this.requsting.requesterName)
    console.log("emp time" + this.emp.time) //should be saved now as rec
    console.log("receicved storeshift id" + storeId); //should be saved now as rec
    

    this.Srv.RequestChange(this.requsting.storeShiftIDReq,storeId,this.requsting.requestID, nameI, this.emp.date, this.seValue,this.emp.time, nameE,this.requsting.requesterName)
    .then((res)=>{
      this.Srv.Msg("Request" , "Your request is sent")
      this.navCtrl.navigateRoot("tabs/tab1")

    })

    console.log("store id  " + this.requsting.storeShiftIDReq)

    console.log("req id " + this.requsting.requestID);
    console.log("name id " + nameI);
    console.log("emp date "+ this.emp.date);
    console.log("time " + this.seValue);
    console.log("name employee " + nameE);
    console.log("reqName" + this.requsting.requesterName)




  }
  requestChange(){
  }

  // addRequest(){
  // }


}
