import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

export interface User{
  id?:string;
  email:string;
  Name:string;
  phone:number;
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
export class FbService {
  public user: Observable<User[]>;
  public UserCollection: AngularFirestoreCollection<User>;

users:any=[];
private reqCollection: AngularFirestoreCollection<Request>;
 reqs:any;
  public orders: Observable<Orders[]>;
  private OwnerOrdersCollection: AngularFirestoreCollection<Orders>;

  public Pro: Observable<SupProduct[]>;
  private SupplierProductCollection: AngularFirestoreCollection<SupProduct>;

  
  constructor(private  afs:  AngularFirestore, private  afAuth: AngularFireAuth,public alertCtrl:AlertController) {
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
            this.reqCollection= this.afs.collection<Request>('RequestChange');
             
            this.reqs=  this.reqCollection.snapshotChanges().pipe(
              map(actions  =>  {
                  return  actions.map(a  =>  {
                      const  data  =  a.payload.doc.data();
                      const  id  =  a.payload.doc.id;
                      return  {  id,  ...data  };
                  });
              }))

            this.users  =  this.UserCollection.snapshotChanges().pipe(
              map(actions  =>  {
                  return  actions.map(a  =>  {
                      const  data  =  a.payload.doc.data();
                      const  id  =  a.payload.doc.id;
                      return  {  id,  ...data  };
                  });
              }))

        
   }
   /*getorders():  Observable<Orders[]>  {
    return  this.orders;

}*/







/*getSupplierProduct():  Observable<SupProduct[]>  {
  return  this.Pro;

}*/
getRequest(): Observable<Request[]>{
  return this.reqs;
}
async Msg(header: string, msg: string){
  let alert =await this.alertCtrl.create({
    header: header,
    message: msg,
    buttons: ['OK']
  });
  alert.present();
}
RequestChange(requestID: string, receiveID: string, date: string, time: string, Name: string){
  return this.afs.collection('RequestChange')
  .add({'requesterID':  requestID, 'recieverID': receiveID, 'date': date, 'time': time, 'requesterName': Name})
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
  return  this.UserCollection.snapshotChanges().pipe(
              map(actions  =>  {
                  return  actions.map(a  =>  {
                      const  data  =  a.payload.doc.data();
                      const  id  =  a.payload.doc.id;
                      return  {  id,  ...data  };
                  });
              }))

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
    


      addRequest(request: Request): Promise<DocumentReference>{
        return this.reqCollection.add(request);
      }
      
      
      getUsers():  Observable<User[]>  {
      return  this.users;
      }


      async getSupplierOrder2(id:string){
        return this.afs
        .collection<Orders>('OwnerOrders',(ref)=>ref.where("OrderStatus","==",'Processing').where("supplierId","==",id)).snapshotChanges().pipe(
          map((actions) => {
            return actions.map((a) =>{
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            });
          })
        )
      }
  
  async updateOrderStatus(id:string, data:any ){
    return this.afs.collection('OwnerOrders').doc(id).update(data)
  }

}
