import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FireBaseService } from '../fire-base.service';
import { ItemsService } from '../items.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {

  suppliers:any[]=[];
  searchTerm: "";



  constructor( public fb:FireBaseService,public fbAuth:AngularFireAuth, public router:Router,public activatedRoute:ActivatedRoute,public storage:Storage,public DataSrv: ItemsService, private firestore: AngularFirestore, public route: Router) {




   this.storage.create();

 

  }

  async ngOnInit() {

      (await this.fb.getSuppliersUsers()).subscribe(x=>{

      console.log(x)

      this.suppliers = x

    })

  }

 async goCategory(i: any){

  this.storage.set("supplierId",i)

   this.router.navigateByUrl('add-order')



  }

 



  async logout(){

     await this.fbAuth.signOut().then(async()=>{

      this.route.navigateByUrl("")

      await this.storage.remove("loggedInUser")

     }).catch()

  }

}
