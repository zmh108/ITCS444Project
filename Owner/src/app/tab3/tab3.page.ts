import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FbService, User, Request, Shift, StoreShift } from '../fb.service';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {




  id=-1;

  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    //this.id = Number(this.)
    this.users = this.Srv.getUsers();
    this.reqs = this.Srv.getRequest();
    this.shift = this.Srv.getShift();
    this.storeshift = this.Srv.getStoreshift();
   }
   date="";
  public users: Observable<User[]>;
  public reqs: Observable<Request[]>;
  public shift:  Observable<Shift[]>;
  public storeshift:  Observable<StoreShift[]>;

  ngOnInit() {
  }


  /*view(i:any){
    this.navCtrl.navigateRoot('/view-employee/' + i)
  //  for(i=0; )
  }*/

}


