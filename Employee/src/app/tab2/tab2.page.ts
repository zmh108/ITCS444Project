import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FbService, OwnerRequest, StoreShift, User, Request } from '../fb.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
   //public MyRequest = [];
   public phone=0;
   public name = "";
   user: any;
  // userid=0;
  // public reqs=[];
  public disuser:User;
  //public reqq : Request;
  public ownreq: OwnerRequest;
  emp: StoreShift = {} as StoreShift
  requsting: Request = {} as Request;
 

  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router, public auth: AngularFireAuth, private  afs:  AngularFirestore) {

      this.users = this.Srv.getUsers();
      // this.shifts = this.Srv.getShift();
       this.storeshift = this.Srv.getStoreshift();
       this.reqs = this.Srv.getRequest();
       this.ownerreq = this.Srv.getOwnerRequest();
   
       this.disuser = {} as User;
       this.requsting = {} as Request;  
       this.ownreq = {} as OwnerRequest;
       this.emp = {} as StoreShift;
   
   
       this.afs.collection('User').doc(this.Srv.userid).get().forEach(doc=>{
         this.disuser.Name = doc.get('Name');
         console.log("userName:" + this.disuser.Name)
         this.disuser.id = this.Srv.userid;
         console.log("the id " + this.disuser.id)
         
   
         //  console.log("here?" + this.Srv.userid)
   
        // this.reqq.nameEmpl = this.disuser.Name;
       //  console.log("about herez?" + this.reqq.nameEmpl)
       //  this.reqq.receiveID = this.Srv.userid
       //  console.log("the req " + this.reqq.receiveID)
         
       })
   
       // this.afs.collection('User').doc(this.Srv.userid).get().forEach(doc=>{
       //   this.disuser.Name = doc.get('Name');
       //   console.log("suring"+this.Srv.userid)
       //   //console.log("what?? "+ this.ownerreq)
       // })
   
       
   
       // this.Srv.getRequests().subscribe(val=>{
       //   this.MyRequest=[];
       //   val.forEach(element => {
       //    // console.log(element.receiveID, this.phone);
       //    // if(element.receiveID == this.phone){
       //      // this.MyRequest.push(element);
       //   //  }
       //   })
       // });
   

    }

    public users: Observable<User[]>;
  public reqs: Observable<Request[]>;
  public storeshift: Observable<StoreShift[]>;
  public ownerreq: Observable<OwnerRequest[]>;

  approved(id:any,request:any){
    this.Srv.approved(id,request, true)
  }

 // public reqs: OwnerRequest = {} as OwnerRequest;
  rejected(id:any){
    this.Srv.rejected(id);
    this.Srv.Msg("Reject", "Thanks");
  }





}
