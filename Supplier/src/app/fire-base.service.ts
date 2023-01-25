import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Injectable } from '@angular/core';
//import { th } from 'date-fns/locale';

//interface for Product Category
export interface Category {
  id?: string;
  Img: string;
  Name: string;
}
// interface for supplierCategory 
export interface supplierCatgory {
  Category:string,
  Img:string
}

//interface for  product subCategory
export interface SubCategory {
  id?: string;
  CategoryID: string;
  Name:string;
}
//interface for SupplierProduct

export interface SupplierProduct {
  [x: string]: any;
  id?: string;
  SupplierID: string;
  SubcategoryID: string;
  Name: string;
  Price: Number;
  OnHand: Number;
  Img: string;
}
// interface for order
export interface Order {
  [x: string]: any;
  Favorite:boolean,
  id?: string;
  Date: any,
  OrderNo: number,
  OrderStatus:string,
  OrderTotal: number,
  OrderProducts:any
}
export interface User {

  id?: string;
  Name: string,
  Email: string,
  Type:string,
  Phone: string,
  Image:any
}
//interface for SupplierCategory 
export interface suppliercategory {

  id?: string;
  CategoryID: string,
  SupplierID: string,
}


@Injectable({
  providedIn: 'root',
})
export class FireBaseService {

//----------------- for Owner---------------------------------------------------------------------//
  // ----------Supplier Prdouct Table-------------//
  public SupProduct: Observable<SupplierProduct[]>;
  public SupplierProductCollection: AngularFirestoreCollection<SupplierProduct>;

  //-------------Category Table------------------//
  public productCategory: Observable<Category[]>;
  public CategoryCollection: AngularFirestoreCollection<Category>;

  //-------------SubCategory Table--------------//
  public ItemSubCategory: Observable<SubCategory[]>;
  public ProductSubCategoryCollection: AngularFirestoreCollection<SubCategory>;


  //--------------- OwnerOrders Table ---------//
  public OwenrOrder: Observable<Order[]>;
  public OwnerOrdersCollection: AngularFirestoreCollection<Order>;

  // ----------Supplier Category Table-------------//
    public SupplierCategory: Observable<suppliercategory[]>;
    public SupplierCategoryCollection: AngularFirestoreCollection<suppliercategory>;


  constructor(public afs: AngularFirestore) {

      //----------Category Table---------------------------------//
      this.CategoryCollection = this.afs.collection<Category>('Category');
      this.productCategory = this.CategoryCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      console.log(this.productCategory);
  
      //-------- SubCategory Table------------------------------//
      this.ProductSubCategoryCollection =
        this.afs.collection<SubCategory>('ProductSubCategory');
      this.ItemSubCategory =
        this.ProductSubCategoryCollection.snapshotChanges().pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
      console.log(this.ItemSubCategory);

    //-----------Supplier Prdouct Table--------------------------//
    this.SupplierProductCollection =
      this.afs.collection<SupplierProduct>('SupplierProduct');
    this.SupProduct = this.SupplierProductCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    console.log(this.SupProduct);

  //-----------Orders Table-------------------------------------//
  this.OwnerOrdersCollection=this.afs.collection<Order>('OwnerOrders');
  this.OwenrOrder=this.OwnerOrdersCollection.snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  )

  //-----------Supplier Category Table-----------------------------------//
   
  this.SupplierCategoryCollection=this.afs.collection<suppliercategory>('SupplierCategory');
  this.SupplierCategory=this.SupplierCategoryCollection.snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  )

  }

  // ------------------get the Subcategory of specific Category---------//

  getsubcategoryFB(CategoryID: string) {
    return  this.afs
    .collection<SubCategory>('ProductSubCategory', (ref) =>
      ref.where('CategoryID', '==', CategoryID)
    )
    .snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  }

// ------------------get the items of specific SubCategory-------//

  getsubcategoryItems( category:string) {
    return  this.afs
    .collection<SubCategory>('Items', (ref) =>
      ref.where('Category', '==', category)
    )
    .snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  }
  
  // ------- Orders--------------------------------------//
 async getLrgestOrderNumber(){
   
      return  this.afs
      .collection<SubCategory>('OwnerOrders', (ref) =>
        ref.orderBy("OrderNo").limit(1)
      )
      .snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    }

async addOrder(data:Order){
  return this.afs.collection("OwnerOrders").add(data);
}


// ------------------get suppliers -------//

getSuppliersFB(SupplierID: string) {
  return  this.afs
  .collection<SupplierProduct>('SupplierProduct', (ref) =>
    ref.where('SupplierID', '==', SupplierID)
  )
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
);
}

// ---------get the orderproduct from supplier collection-------
getOrderProdcutFB(id: string) {
  this.afs.collection('OwnerProducts', ref => ref.where(
    'OrderProducts', 
    'array-contains',
     { id: id}))
}


async getSuppliersUsers(){
  return  this.afs
  .collection<User>('User', (ref) =>
    ref.where('type', '==', "Supplier")
  )
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
);
}

supplierCatgeories:any[]=[];
async getSupplierCategories(){

  return  this.afs
  .collection<supplierCatgory>('Categories')
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
)
}

async getAllOrders(){
  return  this.afs
  .collection<Order>('OwnerOrders')
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
)
}

async getEmployees(){
  return  this.afs
  .collection<Order>('User',(ref)=>ref.where("Type","==","Employee"))
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
)
}

async getCategory(id:string){

          return  this.afs
 .collection<Category>('Category').doc(id).get()
      
    
}

async getProductbyid(id:string){
console.log(id)
           return  this.afs
  .collection<SupplierProduct>('Items').doc(id).get()
       
     
 }

 async getUserById(id:string){
  console.log(id)
             return  this.afs
    .collection<User>('User').doc(id).get()
         
       
   }
  
 async getFavoriteOrder(){
  return  this.afs
  .collection<Order>('OwnerOrders', (ref) =>
    ref.where('Favorite', '==', true)
  )
  .snapshotChanges().pipe(
  map((actions) => {
    return actions.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  })
)

}
     



   async addToFav(orderID:string){
    this.afs.collection(`OwnerOrders`).doc(`/${orderID}`).update({Favorite:true})
   }

   async  removeFromFav(orderid:string){ 
    this.afs.collection(`OwnerOrders`).doc(`/${orderid}`).update({Favorite:false})
 
   }

   async  addUser(id:string,User:any){ 
    this.afs.collection(`User`).doc(id).set(User).then(x=>{

    }).catch((err)=>{

    })
 

   
   }

   async getOnHand( supplierid:string ,id:string ){
    return  this.afs
    .collection<SupplierProduct>('OnHand', (ref) =>
      ref.where('SupplierID', '==', supplierid)
    )
    .snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  )
  
  }



  

   }

 
































