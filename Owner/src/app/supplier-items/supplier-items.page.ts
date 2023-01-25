import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Route, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { DataService } from '../data.service';

import { Category, FireBaseService, SubCategory, SupplierProduct, } from '../fire-base.service';
@Component({
  selector: 'app-supplier-items',
  templateUrl: './supplier-items.page.html',
  styleUrls: ['./supplier-items.page.scss'],
})
export class SupplierItemsPage implements OnInit {

  category:any

  supplierId:any

  searchTerm:string = "";

  SubCateg:any;

  subcat="";

  items:any[]=[];

  showNoItems = true;

  NoOfItems=0;

  cart:any;

  userType:string='';

  supplierName:string="";



  constructor(public activatedRoute:ActivatedRoute, public fb:FireBaseService, public data:DataService,private storage: Storage, public router:Router) {

     this.category = this.activatedRoute.snapshot.paramMap.get('category');

 

     this.storage.create();

   }



   async ngOnInit() {

    this.storage['get']('Cart').then(

      (data: any) => {this.cart= data;

          this.NoOfItems= this.cart.length            

          })

 

    await this.getItems(this.category)

    let supplierId = await this.storage.get("supplierId");

   (await this.fb.getUserById(supplierId)).subscribe(x=>{

    let data:any = x.data();;

    this.supplierName = data['Name'];  

    })

   

  }



 

 async getItems(category:string){

    this.items =[];



    await this.fb.getsubcategoryItems(category).subscribe((items:any)=>{

   

      console.log(items)

      this.items = items;

      if(items.length>0)

      {

        this.showNoItems = true

      }else{

        this.showNoItems = false

      }

    })



  }



  //---------------------Adding items to cart--------------------

  async addToCart(id:string,name:string,Price:number){

 

   

    this.storage.create();

    let data= {

      itemId:id,

      name:name,

      price:Price,

      qty:1

    }

   let cartData:any = await this.storage.get("Cart")

   if(cartData){

    let currentItem = cartData.find((f:any)=> f.itemId == id);

    let indexOfCurrentItem = cartData.indexOf(currentItem)

    console.log(currentItem)

    if(currentItem){

      currentItem.qty++

      cartData[indexOfCurrentItem]= currentItem;

    }else{

      this.NoOfItems++;

      cartData.push(data);

    }

    await this.storage.set("Cart",cartData)

   }else{

    this.NoOfItems++;

    let arr = [];

    arr.push(data);

    await this.storage.set("Cart",arr)

   }

  }



  checkOut(){

   

  }



  goToCart(){

    this.router.navigate(['/cart', { supplierId: this.supplierId }]);

  }
}
