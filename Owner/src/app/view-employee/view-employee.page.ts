import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FbService, Shift, StoreShift, User } from '../fb.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.page.html',
  styleUrls: ['./view-employee.page.scss'],
})
export class ViewEmployeePage implements OnInit {

  id=-1;
  emp: Shift = {} as Shift
  public shid=0;

  constructor(public Srv: FbService, public activatedRoute: ActivatedRoute,
    public navCtrl:NavController, public router: Router) {
      this.users = this.Srv.getUsers();
      this.shifts = this.Srv.getShift();
      this.storeshift = this.Srv.getStoreshift();


      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.emp = {} as StoreShift;
   this.emp = this.Srv.getShiftByIndex(this.id);

   console.log("fff "+this.emp.nameEm)

     }

     public users: Observable<User[]>;
     public shifts:  Observable<Shift[]>;
     public storeshift:  Observable<StoreShift[]>;


  ngOnInit() {
   //  let t = this.Srv.getUser('id');
    // console.log("dd"+t);

  }
  //public t =
  
  

}
