import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  Item: any = {
    Name: '',
    Desc: '',
    Quantity: 0,
    Price: 0,
    Img: '',
    Category: '',
    Threshold: 0
  };

  itemId: string = 'new';

  public index: any;
  public item: Item = {} as Item; 
  
  id=-1;
  Items: { id: string; }[];
  

  constructor(public navCtrl: NavController, public DataSrv: ItemsService, public activatedRoute: ActivatedRoute, public route: Router, private alertCtrl: AlertController, public firestore: AngularFirestore) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.item = {} as Item;
   this.item = this.DataSrv.getItemByIndex(this.id);

   //this.Item.Name=this.item.name;


   this.firestore
   .collection('Items')
   .valueChanges({idField: 'id'})
   .subscribe((Items) => {
     this.Items = Items;
     console.log(Items);
     console.log(this.item.id);
     
   });
   
   
   }

  ngOnInit() {

  }

  updateItem(){
       return this.firestore.collection("Items").doc(this.item.id)
       .update({
        Name: this.item.name,
        Desc: this.item.desc,
        Img: this.item.img,
        Price: this.item.price,
        Quantity: this.item.quantity,
        Category: this.item.category,
        Threshold: this.item.threshold
       })
       //const budgets = this.budgetProvider.createBudgets(JSON.parse(JSON.stringify(data.budgetList)), projectId);
       //.update(Object.assign({}, this.Items))
       .then(() => {
       this.showAlert();
       //this.item = {} as Item;
       //this.navCtrl.navigateRoot('item-details/'+this.item.id);
    });
    

  }

  async showAlert(){
    await this.alertCtrl.create({
      header: "Item Updated Successfully!",
      buttons: [
        {text: "Ok", handler: (res)=>{
          this.navCtrl.back();
        }}
      ]
    })
    .then(res=> res.present()
    
    )
  }

}
