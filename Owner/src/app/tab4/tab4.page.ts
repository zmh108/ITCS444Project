import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, retry } from 'rxjs';
import { FbService, OwnerRequest, StoreShift, User } from '../fb.service';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {
  public disuser:User;
  public ownreq: OwnerRequest;
  emp: StoreShift = {} as StoreShift;
  requsting: Request = {} as Request;
 // reques: Promise<any[]>;
 // requesList: any[] = [];

  //public reqs:Request;


  ownerrequestschanges : any;
  ownerrequestchange: any;
  OwnerRequestChange: any;


  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router, public auth: AngularFireAuth, private  afs:  AngularFirestore, public db: AngularFireDatabase) {
      this.users = this.Srv.getUsers();
      this.storeshift = this.Srv.getStoreshift();
     // this.reqs = this.Srv.getRequest();
      this.ownerreq = this.Srv.getOwnerRequest();

      this.disuser = {} as User;
      this.requsting = {} as Request;  
      this.ownreq = {} as OwnerRequest;
      this.emp = {} as StoreShift;


      this.afs
      .collection('OwnerRequestChange')
      .valueChanges({idField: 'id'})
      .subscribe((OwnerRequestChange) => {
        this.OwnerRequestChange = OwnerRequestChange;
        console.log(OwnerRequestChange);
        if(OwnerRequestChange){
        this.ownerrequestchange = OwnerRequestChange;
        }
      });
  

     }
    //  id:any
    //  getReq(){
    //   this.bookingRef = this.db.object('/OwnerRequest');
    //   return this.bookingRef;
    //  }
    //  getReqData(){
    //   var getRrqData = this.db.collection('OwnerRequest').doc('')
    //  }


     public users: Observable<User[]>;
   //  public reqs: Observable<Request[]>;
     public storeshift: Observable<StoreShift[]>;
     public ownerreq: Observable<OwnerRequest[]>;

  ngOnInit() {
    
  }

  approved(id:any,request:any){
    this.Srv.approved(id,request, true)
  }
  updateShift(id:any, request:any){
    console.log("The request" + request)
    this.Srv.updateShift(request)
    console.log("Dd")
  }


 // public reqs: OwnerRequest = {} as OwnerRequest;
  rejected(id:any){
    this.Srv.rejectedOwner(id);
    this.Srv.Msg("Reject", "Thanks");

  }
  

}