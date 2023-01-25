import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FireBaseService, Order } from '../fire-base.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  neworder:any;
 
  constructor(public fb:FireBaseService) { }
    
   orders:any[]=[];
    async ngOnInit() {
      await this.getOrders();
     }

     async getOrders(){


      (await this.fb.getAllOrders()).subscribe(async orders=>{
        this.orders=[]
       for (let index = 0; index < orders.length; index++) {
         const order = orders[index];
         if(order){
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
      }})
     }

   async AddToFav(orderid:string,){
     await this.fb.addToFav(orderid)
     let orderIndex = this.orders.indexOf(this.orders.find(f=>f.id== orderid));
     this.orders[orderIndex].Favorite = true;
     }

     async  removeFromFav(orderid:string){
      await this.fb.removeFromFav(orderid)
      let orderIndex = this.orders.indexOf(this.orders.find(f=>f.id== orderid));
      this.orders[orderIndex].Favorite = false;
      }

  
}
