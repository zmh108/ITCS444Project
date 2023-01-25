import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from '../fire-base.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fav-orders',
  templateUrl: './fav-orders.page.html',
  styleUrls: ['./fav-orders.page.scss'],
})
export class FavOrdersPage  {


  constructor( public fb:FireBaseService,private storage: Storage, private router:Router) {
    this.storage.create()
   }
  orders:any[]=[];
  async ngOnInit() {
  
    await this.getOrders();
  }


  async getOrders(){

    (await this.fb.getFavoriteOrder()).subscribe(async orders=>{
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
           order.OrderProducts[index].Name = data["Name"]
           order.OrderProducts[index].Img = data["Img"]
           order.OrderProducts[index].price = data["Price"]
       
           }
          });
        
       }
       this.orders.push(order)
     }
     console.log(this.orders)
    })
   }



  async AddToFav(orderid:string,){
    await this.fb.addToFav(orderid)
    }
 async removeFromFav(orderid:string){
    await this.fb.removeFromFav(orderid)
  }


  Reorder(orderId:string){
    let cart:any =[];
    let order = this.orders.find(f=>f.id == orderId)
    console.log(order)
    for (let index = 0; index < order.OrderProducts.length; index++) {
      const element = order.OrderProducts[index];
      let data= {
        itemId:element.id,
        name:element.Name,
        price:element.price,
        qty:element.qty
      }
      cart.push(data);
    }
this.storage.set("Cart",cart)
this.router.navigateByUrl("/cart")
  }

}





