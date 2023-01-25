import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Console } from 'console';
import { ItemsService } from '../items.service';

export interface Item{
  threshold: string;
  Threshold: string;
  Category: string;
  Img: string;
  Price: number;
  Quantity: number;
  Desc: string;
  Name: string;
  id?: string,
  name: string,
  desc: string,
  price: number,
  quantity: number,
  category: string,
  img: string;
  };

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage {
  public index: any;
  public item: Item = {} as Item;
  id=-1;

  Item: any = {
    Name: '',
    Desc: '',
    Quantity: 0,
    Price: 0,
    Img: '',
    Category: '',
    Threshold: 0
  };
  
  constructor(public DataSrv: ItemsService, public activatedRoute: ActivatedRoute, public route: Router, public firestore: AngularFirestore) {
    
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.item = {} as Item;
   this.item = this.DataSrv.getItemByIndex(this.id);
   console.log(this.item.id);

   this.firestore
   .collection('Items')
   .valueChanges({idField: 'id'})
   .subscribe((Items) => {
     this.Item = Items;
     console.log(Items);
     console.log(this.item.id);
     
   });
    /*this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['item']){
        this.item = JSON.parse(params['item'])
        console.log("Item: ", this.item)
      }
    });
  }*/

}}
