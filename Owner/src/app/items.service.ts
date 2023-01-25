import { Injectable } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/compat/firestore';

import{ AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import{ DocumentReference }from '@angular/fire/compat/firestore';


import { map, take} from 'rxjs/operators'


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


  export interface Category{
    Category: string;
    Name: string;
    Img: string;
    id?: string,
    name: string,
    img: string;
    };

    export interface User{
      email: string;
      password: string;
      phone: string;
      Name: string;
      Img: string;
      Phone: string,
      id?: any;
      Email: string, 
      Password: string,
      name: string,
      img: string;
      };

  
  

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public items: Observable<Item[]>;
  public itemCollection: AngularFirestoreCollection<Item>;
  //public item: Item = {} as Item;

  public categories: Observable<Category[]>;
  public categoryCollection: AngularFirestoreCollection<Category>;

  public users: Observable<User[]>;
  public userCollection: AngularFirestoreCollection<User>;

  

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) { 
    this.itemCollection = this.firestore.collection<Item>('Items');
    this.items = this.itemCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
    });
    })
    );

    this.categoryCollection = this.firestore.collection<Category>('Categories');
    this.categories = this.categoryCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
    });
    })
    );

    
    this.userCollection = this.firestore.collection<User>('Users');
    this.users = this.userCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
    });
    })
    );

  }
  
  /*this.itemCollection = this.firestore.collection<Item>('items');
  this.items = this.itemCollection.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return { id, ...data };
  });
  })
  );*/
  getIdeas(): Observable<Item[]>{
    return this.items;
 }

 getCat(): Observable<Category[]>{
  return this.categories;
}

  item: Item = {} as Item;
  getItemByIndex(index:any): Item{
    this.items.subscribe((data)=>{
      this.item.id = data[index].id;
      this.item.name = data[index].Name;
      this.item.desc = data[index].Desc;
      this.item.img = data[index].Img;
      this.item.price= data[index].Price;
      this.item.quantity= data[index].Quantity;
      this.item.category= data[index].Category;
      this.item.threshold= data[index].Threshold;
  
    })
    return this.item
  }

  category: Category = {} as Category;
  getCatByIndex(index:any): Category{
    this.categories.subscribe((data)=>{
      this.category.id = data[index].id;
      this.category.name = data[index].Category;
      this.category.img = data[index].Img;
    })
    return this.category
  }

  user: User = {} as User;
  getUserByIndex(index:any): User{
    this.users.subscribe((data)=>{
      this.user.id = data[index].id;
      this.user.name = data[index].Name;
      this.user.img = data[index].Img;
      this.user.phone = data[index].Phone;
      this.user.email = data[index].Email;
      this.user.password = data[index].Password;
    })
    return this.user
  }





/*getIdea(id: string): Observable<Item | undefined>{
  return this.itemCollection.doc<Item>(id).valueChanges().pipe(
    map(idea => {
      if(idea)
      idea.id = id;
      return idea
    })
  );
}*/


addIdea(idea: Item): Promise<DocumentReference>{
  return this.itemCollection.add(idea);
}

/*updateIdea(idea: Idea): Promise<void>{
  return this.ideaCollection.doc(idea.id).update({name: idea.name, notes: idea.notes});
}*/

deleteIdea(id: string): Promise<void>{
  return this.itemCollection.doc(id).delete();
}

/*insert(){
  this.itemCollection.add(this.items).then((res)=>{
    alert('Inserted Successfully');
 } );}*/


}

























/*export class ItemDetailsPage implements OnInit {
  myId:any ;
  /*Name !: string;
  Desc!: string;
  Quantity!: number;
  Price!: number;
  Img!: string;

  

  public items: Observable<Item[]>;
  private itemCollection: AngularFirestoreCollection<Item>;
  public item: Item = {} as Item;


  getItembyIndex(index: any):Item{
    this.items.subscribe((data) => { 
      this.item.id = data[index].id;
      this.item.name = data[index].name;
      this.item.desc = data[index].desc;
      this.item.img = data[index].img;
      this.item.price= data[index].price;
      this.item.quantity= data[index].quantity;
  
    })
    return this.item;
  }
  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) {
    /*this.firestore
    .collection('Items')
    .valueChanges({idField: 'id'})
    .subscribe((Items) => {
      this.Items = Items;
      console.log(Items);
    });

    this.itemCollection = this.firestore.collection<Item>('items');
    this.items = this.itemCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
    });
    })
    );

   }

   getIdeas(): Observable<Item[]>{
    return this.items;
  }

  /*getIdea(id: string): Observable<Item | undefined>{
    return this.itemCollection.doc<Item>(id).valueChanges().pipe(
      map(idea => {
        if(idea)
        idea.id = id;
        return idea
      })
    );
  }


  addIdea(idea: Item): Promise<DocumentReference>{
    return this.itemCollection.add(idea);
  }

  /*updateIdea(idea: Idea): Promise<void>{
    return this.ideaCollection.doc(idea.id).update({name: idea.name, notes: idea.notes});
  }

  deleteIdea(id: string): Promise<void>{
    return this.itemCollection.doc(id).delete();
  }

  insert(){
    this.itemCollection.add(this.item).then((res)=>{
      alert('Inserted Successfully');
   } );}

  ngOnInit() {

    this.myId = this.activatedRoute.snapshot.paramMap.get('id'); 
    
    /*this.Name= this.Items[this.myId].Name;
    this.Desc=this.Items[this.myId].Desc;
    this.Quantity=this.Items[this.myId].Quantity;
    this.Price=this.Items[this.myId].Price;
    this.Img=this.Items[this.myId].Img;
    
    
  }

}*/

