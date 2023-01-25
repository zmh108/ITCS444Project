import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface User{
  id?:string;
  email:string;
  Name:string;
  phone:any;
  type: string;
  password: string;
}

export interface Orders{
  id?: any,
  OrderNo: number,
  OrderProducts: any,
  Date:any,
  OrderStatus: string;
}

export interface SupProduct{
  id?: string;
  Name: string;
}

export interface SupplierProducts{
  id?: any;
  Name: string;
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  [x: string]: any;
  public user: Observable<User[]>;
  public UserCollection: AngularFirestoreCollection<User>;


  public orders: Observable<Orders[]>;
  private OwnerOrdersCollection: AngularFirestoreCollection<Orders>;

  public Pro: Observable<SupProduct[]>;
  private SupplierProductCollection: AngularFirestoreCollection<SupProduct>;

  
  constructor(private  afs:  AngularFirestore, private  afAuth: AngularFireAuth) {
    this.UserCollection  =  this.afs.collection<User>('User');
    this.user  =  this.UserCollection.snapshotChanges().pipe(
      map(actions  =>  {
          return  actions.map(a  =>  {
              const  data  =  a.payload.doc.data();
              const  id  =  a.payload.doc.id;
              return  {  id,  ...data  };
          });
      })
  );

    this.OwnerOrdersCollection  =  this.afs.collection<Orders>('OwnerOrders');
            this.orders  =  this.OwnerOrdersCollection.snapshotChanges().pipe(
                map(actions  =>  {
                    return  actions.map(a  =>  {
                        const  data  =  a.payload.doc.data();
                        const  id  =  a.payload.doc.id;
                        return  {  id,  ...data  };
                    });
                })
            );


            this.SupplierProductCollection  =  this.afs.collection<SupProduct>('SupplierProduct');
            this.Pro  =  this.SupplierProductCollection.snapshotChanges().pipe(
                map(actions  =>  {
                    return  actions.map(a  =>  {
                        const  data  =  a.payload.doc.data();
                        const  id  =  a.payload.doc.id;
                        return  {  id,  ...data  };
                    });
                })
            );
   }
   /*getorders():  Observable<Orders[]>  {
    return  this.orders;

}*/







/*getSupplierProduct():  Observable<SupProduct[]>  {
  return  this.Pro;

}*/

useri: User= {} as User;
getUserByIndex(index:any): User{
  this.user.subscribe((data)=>{
    this.useri.id = data[index].id;
    this.useri.email = data[index].email;
    this.useri.Name = data[index].Name;
    this.useri.phone = data[index].phone;
    this.useri.type= data[index].type;
    this.useri.password= data[index].password;
  });
  return this.useri;
}


async getSupplierOrder(){
  return this.afs
  .collection<Orders>('OwnerOrders').snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) =>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  )
}

async getProductbyid(id:string){
  console.log(id);
  return this.afs
  .collection<SupplierProducts>('SupplierProduct').doc(id).get();
}


getUser():  Observable<User[]>  {
  return  this.user;

}

deleteUser(id: any): Promise<void> {
      return this.UserCollection.doc(id).delete();
    }


  updateUser(id: any, data:any): Promise<void> {
        return this.UserCollection.doc(id).update(data);
      }


    updateOrder(id: string, data: any): Promise<void> {
          return this.OwnerOrdersCollection.doc(id).update(data);
        }
      updateOnHand(id: string, data: any): Promise<void> {
            return this.SupplierProductCollection.doc(id).update(data);
          }


  

  getusr(id: string): Observable<User> {
        return this.UserCollection.doc<any>(id).valueChanges().pipe(
          map(usr => {
            usr.id = id;
            return usr
          })
        );
      }

    addusr(user: User): Promise<DocumentReference> {
            return this.UserCollection.add(user); 
        }
    
  
  

}
