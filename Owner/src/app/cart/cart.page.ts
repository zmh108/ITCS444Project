import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { Storage } from '@ionic/storage';

import { FireBaseService } from '../fire-base.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-cart',

  templateUrl: './cart.page.html',

  styleUrls: ['./cart.page.scss'],

})

export class CartPage implements OnInit {

   cart:any;

   Qty=1;

   itemprice=0;

   subtotal =0;

   total =0;

   numberItems=0;

   deliveryCharge = 0.500;

   orderNumber=1;

   orderStatus= "Processing"

   cartProductIds:any[]=[];

   supplierId:any="";

 

   constructor(public storage:Storage,public router:Router, public data:DataService,public fs:FireBaseService,public nav:Router,public activatedRoute:ActivatedRoute) {

    this.supplierId = this.activatedRoute.snapshot.paramMap.get('supplierId');

    this.storage.create();

    //---to get cart ------

    this.storage['get']('Cart').then(

    (data: any) => {this.cart= data;

        this.numberItems= this.cart.length            

        }).then(()=>{  this.calculateCart()})



    }



   async ngOnInit() {

    (await this.fs.getLrgestOrderNumber()).subscribe((a:any)=>{

      if(a)

      {

        this.orderNumber = a[0].OrderNo + 1;

        console.log(this.orderNumber)

      }

    })

   }




   removeItem(id:string){

    let currentItem= this.cart.find((element:any)=>element.itemId==id)

    let indexCurrentItem= this.cart.indexOf(currentItem);

    this.cart.splice(indexCurrentItem,1)

    this.storage.set("Cart",this.cart)

    this.calculateCart();

   }



   decrementQty(i:number,id:string){

    let currentItem= this.cart.find((element:any)=>element.itemId==id)

    let indexCurrentItem= this.cart.indexOf(currentItem);

    if(this.cart[indexCurrentItem].qty >0)

    {

    this.cart[indexCurrentItem].qty--;

    this.storage.set("Cart",this.cart)  

    }

    this.calculateCart()

   }



  async calculateCart(){

    this.total =0;

    for (let index = 0; index < this.cart.length; index++) {

      const element = this.cart[index];

      this.total+=element.price * element.qty;

    }

    this.subtotal =+this.total.toFixed(3);

    this.total = +(this.subtotal + this.deliveryCharge).toFixed(3)

   }



  async incrementQty(i:number, id:string){

      let currentItem= this.cart.find((element:any)=>element.itemId==id)

      let indexCurrentItem= this.cart.indexOf(currentItem);

      this.cart[indexCurrentItem].qty++;

      this.storage.set("Cart",this.cart)

      this.calculateCart()

   }



  async checkOut(){

    try {



 

  for (let index = 0; index < this.cart.length; index++) {

      const element = this.cart[index];

      let productData ={

        id:element.itemId,

        qty:element.qty

      }

      this.cartProductIds.push(productData);

    }

    this.supplierId = await this.storage.get("supplierId")

    let data ={

      Date: new Date(),

      OrderNo: this.orderNumber,

      OrderStatus:this.orderStatus,

      OrderTotal: this.total,

      OrderProducts:this.cartProductIds,

      supplierId:this.supplierId,

      Favorite: false

    }



    await this.fs.addOrder(data).then((x)=>{

      this.storage.remove("Cart");

      this.nav.navigateByUrl("/tabs/tab2");



    });

    } catch (error) {

      console.log(error)

    }

   

   

  }

}
