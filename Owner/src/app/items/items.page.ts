import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Category, Item, ItemsService } from '../items.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage{
  searchTerm:string = "";

  ITEMS: any;

  show=true;

  myId:any ;
  Name !: string;
  Desc!: string;
  Quantity!: number;
  Price!: number;
  Img!: string;
  Category!: string;

  public index: any;
  public category: Category = {} as Category;
  id=-1;
  
  public item: Item = {} as Item;

  Items: any;
  myid: any;
  Threshold: any;
  public th= 99;

  constructor(public DataSrv: ItemsService, public activatedRoute: ActivatedRoute, public route: Router, private firestore: AngularFirestore) { 
    this.firestore
    .collection('Items')
    .valueChanges({idField: 'id'})
    .subscribe((Items) => {
      this.Items = Items;
      console.log(Items);
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('myId'));
    this.item = {} as Item;
   this.item = this.DataSrv.getItemByIndex(this.myId);
   console.log(this.item.name);

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.category = {} as Category;
   this.category = this.DataSrv.getCatByIndex(this.id);
   console.log(this.category.name);
  }

  ngOnInit() {
    
    this.myId = this.activatedRoute.snapshot.paramMap.get('id'); 
    console.log(this.Name=this.ITEMS[this.myId].Name);
    this.Desc=this.ITEMS[this.myId].Desc;
    this.Quantity=this.ITEMS[this.myId].Quantity;
    this.Price=this.ITEMS[this.myId].Price;
    this.Img=this.ITEMS[this.myId].Img;
    this.Category=this.ITEMS[this.myId].Category;
    this.Threshold=this.ITEMS[this.myId].Threshold;
    console.log(this.Name);
  }

}
