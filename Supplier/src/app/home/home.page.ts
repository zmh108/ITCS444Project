import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from '../fire-base.service';
import { Storage } from '@ionic/storage';

import { ModalController } from '@ionic/angular';
//import { LoginPageModule } from '../login/login.module';
import { LoginPage } from '../login/login.page';
import { AlertController } from '@ionic/angular';
import { Orders, FbService, SupProduct , SupplierProducts} from '../fb.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  order: Orders = {
    OrderNo: 0,
    OrderProducts: '',
    Date: '',
    OrderStatus: '', 
  };
  status = "Processing";
  x = this.fb.orders;
  orders:any=  [];
  supplierId:string="";
  constructor(public ModalCtrl:ModalController, public alertCtrl: AlertController, public fb: FbService,
    public router: Router, private toastCtrl: ToastController,public storage:Storage,public firebase:FireBaseService) {
      this.storage.create();
    }

  async presentModal() {
    const modal = await this.ModalCtrl.create({
      component: LoginPage,
   backdropDismiss: true
    });
    return await modal.present();
  }


  async ngOnInit() {
    let user = await this.storage.get('supplierId');
    this.supplierId = user;
     (await this.fb.getSupplierOrder2(this.supplierId)).subscribe(async orders=>{
      this.orders=[]
      for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
        let orderDate = new Date(order.Date.seconds*1000)
        orderDate.setTime(orderDate.getTime()+ (3*60*60*1000))
        order.Date = orderDate
        for (let index = 0; index < order.OrderProducts.length; index++) {
          let product = order.OrderProducts[index];
     
          (await this.fb.getProductbyid(product.id)).subscribe(x=>{
   
            let data = x.data();
            if(data){
            order.OrderProducts[index].Name = data["Name"];
            order.OrderProducts.qty = data["qty"];

            }
    
           }
           );
        }
        this.orders.push(order);
      }
      console.log(this.orders)
     })
     
   
     

     }
  

approve(id:any){
  if (id){
  this.fb.updateOrderStatus(id, {OrderStatus: 'Approved'}).then(() => {
          this.showToast('Order Status updated');
        }, err => {
          this.showToast('There was a problem updating order status');
        });
  }
   
 this.firebase.getOnHand(this.supplierId,id);

}

reject(id:any){

  if (id){
    this.fb.updateOrderStatus(id, {OrderStatus: 'Rejected'}).then(() => {
            this.showToast('Order Status updated');
          }, err => {
            this.showToast('There was a problem updating order status');
          });
    }

}

 showToast(msg:any) {
      this.toastCtrl.create({
        message: msg,
        duration: 2000
      }).then(toast => toast.present());
    }

}
