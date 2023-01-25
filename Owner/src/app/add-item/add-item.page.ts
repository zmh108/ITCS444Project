import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ItemsService } from '../items.service';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
 
})
export class AddItemPage implements OnInit {
  Categories: any;
  
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

  
  constructor(private alertCtrl: AlertController, private ItemSrv:ItemsService, private firestore: AngularFirestore, private router: Router, private activatedRoute: ActivatedRoute) {
    this.firestore
    .collection('Categories')
    .valueChanges({idField: 'id'})
    .subscribe((Categories) => {
      this.Categories = Categories;
  });
   }
  //Item=this.ItemSrv.Items;
  ngOnInit() {
    //this.itemId = this.activatedRoute.snapshot.params.itemId || 'new;'
    
    /*if (this.itemId !== 'new'){
      this.firestore
      .doc('Items/${this.itemId}')
      .valueChanges()
      .subscribe(Items: any) => (this.Item = Item));
    }*/
  
  
  
  }


  addItem(){
    //if (this.itemId === 'new'){

    
    this.firestore.collection('Items').add(this.Item)
    .then(() =>{
      this.Item = null;
      this.showAlert();
      (null);
    });
  /*}else{
    this.firestore.doc('Items/${this.itemId}').update(this.Item)
    .then(() =>{
      this.Item = null;
      this.showAlert();
  });
  }*/
}



  async showAlert(){
    await this.alertCtrl.create({
      header: "Item Added Successfully!",
      buttons: [
        {text: "Ok", handler: (res)=>{
          console.log(res)
        }}
      ]
    }).then(res=> res.present())
  }
}
