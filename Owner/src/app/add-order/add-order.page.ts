import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FireBaseService } from '../fire-base.service';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {


  searchTerm:string = "";

  public index: any;

  categories:any[] =[]


  constructor( public fb:FireBaseService, public router:Router,public activatedRoute:ActivatedRoute) {



    this.categories =[]

  }

   async ngOnInit() {
     this.categories =[];
     //get all ownerProducts
      (await this.fb.getSupplierCategories()).subscribe(async x=>{
        console.log(x)
         this.categories = x
     
     
    })
  
       
    }
  
    goToItems(category: string){
          this.router.navigate(['supplier-items',{category:category}]);
  
    }
  
  }


