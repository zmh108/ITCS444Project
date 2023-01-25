import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { promises } from 'dns';


export interface User{
  id?:string;
  email:string;
  Name:string;
  phone:number;
  Type: string;
  isAdmin: boolean;
}

export interface Shift{
  uid?:string;
  date: string;
  time: string;
  nameEm: string;
  Empid:string;
}
export interface StoreShift{
  id?:string;
  date: string;
  time: string;
  nameEm: string;
  Empid: string;
}

export interface Request{

  id?: string;

  requestID: string; //--> user id

  receiveID: string; //--> selected employee id

  date: string;

  timeReq: string;

  timeRec: string;

  nameEmpl: string;

  requesterName: string;

  storeShiftIDReq:string;

  storeShiftIDRec: string;

}

export interface OwnerRequestChange{
  id?: string;
  requests: Request;
  approve: boolean;
}

export interface OwnerRequest{
  requests: Request;
  approve: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FbService {

  public ownerrequestchanges: Observable<OwnerRequestChange[]>;
  public ownerCollection: AngularFirestoreCollection<OwnerRequestChange>;

   users: Observable<User[]>;
  //private userRef : AngularFirestoreCollection<User>;
   userCollection: AngularFirestoreCollection<User>;
  userCollectionRef: AngularFirestoreCollection<User>;

   private reqs: Observable<Request[]>;
   private reqCollection: AngularFirestoreCollection<Request>;

   public ownerreq: Observable<OwnerRequest[]>;
   private ownerreqCollection: AngularFirestoreCollection<OwnerRequest>;

   public shift: Observable<Shift[]>;
   private shiftCollection: AngularFirestoreCollection<Shift>;
   shiftCollectionRef: AngularFirestoreCollection<Shift>;

   public storeshift: Observable<StoreShift[]>;
   private storeshiftCollection: AngularFirestoreCollection<StoreShift>;
   storeshiftCollectionRef: AngularFirestoreCollection<StoreShift>;

  //  public userarray: User[]=[];
  //  public userid="";
  // // public disuser:User;
  //  public isUserAdmin = true;
  public userid:any;
  public disuser: User = {} as User;
  public isUserAdmin = true;
  public shidtuser:Shift[]=[];

  constructor(private  afs:  AngularFirestore, public alertCtrl:AlertController,
    private  afAuth: AngularFireAuth, public toastCtrl: ToastController
    )  
    {
     // this.userCollection = this.afs.collection<User>('User')
      
     //this.ownerreq: OwnerRequestChange = {} as OwnerRequestChange; 

     this.ownerCollection = this.afs.collection<OwnerRequestChange>('OwnerRequestChanges');

      this.afAuth.authState.subscribe(
        (user)=>{
          if(user){
          this.userid = user.uid;  //it should be id not uid
          this.afs.collection('User').doc(this.userid).get().forEach(doc=>{
          this.isUserAdmin = doc.get('isAdmin');
          })
        }
        else{
          this.isUserAdmin = false;
        }

        }
      )

      this.afs.collection('User').doc(this.userid).get().forEach(doc=>{
        this.shidtuser = doc.get('')
      })

      // this.afs.collection('User').doc(this.userid).get().forEach(doc=>{
      //   this.getShift
      // })

      this.userCollectionRef = this.afs.collection('User');
      this.users = this.userCollectionRef.valueChanges({idField:'uid'});

      this.shiftCollectionRef = this.afs.collection('Shift');
      this.shift = this.shiftCollectionRef.valueChanges({idField:'id'})

      this.storeshiftCollectionRef = this.afs.collection('Storeshift');
      this.storeshift = this.storeshiftCollectionRef.valueChanges({idField:'id'})


      // this.userCollectionRef = this.afs.collection('User');
      // this.users = this.userCollectionRef.valueChanges({idField: 'uid'})

      // this.afAuth.authState.subscribe(
      //   (user)=>{
      //     if(user){ //signed in
      //      this.userid = user.uid;
      //       console.log(this.userid);
      //       this.afs.collection('User').doc(this.userid).get().forEach(doc=>{
      //               console.log(doc.get('isAdmin'));
      //               this.isUserAdmin = doc.get('isAdmin');
      //       }) 
      //    }
      //     else{//not signed-in
      //      this.presentToast();
      //       this.isUserAdmin = false;
      //     //alert("No");
      //    }
      //   }
      // )

      // console.log(this.userid);
   
      //  this.userCollectionRef = this.afs.collection('User');
      
      //  this.users = this.userCollectionRef.valueChanges({idField:'uid'});
      

    this.userCollection  =  this.afs.collection<User>('User');
    this.users  =  this.userCollection.snapshotChanges().pipe(
      map(actions  =>  {
          return  actions.map(a  =>  {
              const  data  =  a.payload.doc.data();
              const  id  =  a.payload.doc.id;
              return  {  id,  ...data  };
          });
      })
  );


  this.reqCollection= this.afs.collection<Request>('RequestChange');
  this.reqs= this.reqCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );

        this.storeshiftCollection= this.afs.collection<StoreShift>('Storeshift');
        this.storeshift= this.storeshiftCollection.snapshotChanges().pipe(
                map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  });
                })
              );


          this.ownerreqCollection= this.afs.collection<OwnerRequest>('OwnerRequestChange');
          this.ownerreq= this.ownerreqCollection.snapshotChanges().pipe(
                  map(actions => {
                    return actions.map(a => {
                      const data = a.payload.doc.data();
                      const id = a.payload.doc.id;
                      return { id, ...data };
                    });
                  })
                );

                this.shiftCollection= this.afs.collection<Shift>('Shift');
                this.shift= this.shiftCollection.snapshotChanges().pipe(
                        map(actions => {
                          return actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return { id, ...data };
                          });
                        })
                      );
  


}

// getRequests(){
//     return this.reqs;
// }

addOwnerRequest(requestApprove: OwnerRequest): Promise<DocumentReference>{
  return this.ownerreqCollection.add({requests:requestApprove.requests, approve:requestApprove.approve});
}

approved(id:string, request:Request, approve: boolean){

  this.afs.collection('OwnerRequestChange').add({'storeShiftIDReq':request.storeShiftIDReq,'storeShiftIDRec':request.storeShiftIDRec,'requestID': request.requestID, 'receiveID': request.receiveID, 'nameEmpl':request.nameEmpl, 'date': request.date, 'timeReq': request.timeReq,'timeRec': request.timeRec, 'requesterName':request.requesterName})

  .then(()=>{

    this.Msg("Approve", "Your msg sent to admin");

    this.afs.collection('RequestChange').doc(id).delete();

  })

}

updateShift(request:Request): Promise<void>{
  console.log("value",request.storeShiftIDReq)
  const str = request.storeShiftIDReq;
  const result = str.trim();
  const str2 = request.storeShiftIDRec
  const result2 = str2.trim();

  return this.storeshiftCollection.doc(result).update({Empid: request.requestID, date: request.date,nameEm: request.requesterName, time: request.timeReq })
  .then(() => {
    return this.storeshiftCollection.doc(result2).update({Empid: request.receiveID, date: request.date, nameEm: request.nameEmpl, time: request.timeRec})
    .then(()=>{
    //console.log("value"+ request.id)
      this.Msg("Updated", "The shift is updated");
      this.afs.collection('OwnerRequestChange').doc(request.id).delete();

    });
    });
  
}

rejected(id:any): Promise<void>{
    return this.ownerreqCollection.doc(id).delete();
}

rejectedOwner(id:any): Promise<void>{
  return this.ownerreqCollection.doc(id).delete();
}

addShift(shift: Shift): Promise<DocumentReference>{
  return this.shiftCollection.add(shift);
}

addStoreShift(date:string, time:string, nameEm:string, Empid:string ): Promise<DocumentReference>{

  return this.storeshiftCollection.add({'date': date, 'time': time, 'nameEm':nameEm, 'Empid':Empid});

}


addRequest(request: Request): Promise<DocumentReference>{
  return this.reqCollection.add(request);
}


getUsers():  Observable<User[]>  {
return  this.users;
}

getStoreshift():  Observable<StoreShift[]>  {
  return  this.storeshift;
  }
  

getShift(): Observable<Shift[]>{
  return this.shift;
}

getRequest(): Observable<Request[]>{
  return this.reqs;
}
getOwnerRequest(): Observable<OwnerRequest[]>{
  return this.ownerreq;
}

RequestChange(storeShiftIDReq:string,storeShiftIDRec:string,requestID: string, receiveID: string, date: string, timeReq: string,timeRec:string, nameEmpl: string, requesterName: string){
  return this.afs.collection('RequestChange')
  .add({'storeShiftIDReq':storeShiftIDReq,'storeShiftIDRec':storeShiftIDRec,'requestID':  requestID, 'receiveID': receiveID, 'date': date, 'timeReq': timeReq,'timeRec':timeRec, 'nameEmpl': nameEmpl, 'requesterName':requesterName})
}
      getUser(id:  string):  Observable<User | undefined>  {
        return  this.userCollection.doc<User>(id).valueChanges().pipe(
            map(user  =>  {
              if(user)
                user.id  =  id;
                return  user
            })
        );
      }

      async Msg(header: string, msg: string){
        let alert =await this.alertCtrl.create({
          header: header,
          message: msg,
          buttons: ['OK']
        });
        alert.present();
    }


    SignIn(newEmail: string, newPassword: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword);
    }

    SignOut(): Promise<void> {
      return this.afAuth.signOut();
   }

   getUserRef(id:string){
    return this.afs.collection('User',ref => ref.where('id', '==', id));
   }

   






   getRequests(){
    this.reqCollection= this.afs.collection<Request>('RequestChange')
    this.reqs= this.reqCollection.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
      });
      })
      );
      return this.reqs;
  }
  
  deleteRequest(id: string):Promise<void>{
    return this.reqCollection.doc(id).delete();
  }
  
  
  // approveRequest(request:Request, date){
  //   //let date = new Date();
  //     if(request.date > balance){
  //       this.presentAlert("insufficient Balance !")
  //     }
  //     else{
  //         total = balance - request.amount;
  //         this.userCollection.doc(request.recieverID).update({ balance:total}).then(()=>
  //         {
  //           this.afs.collection('Transactions').add({'amount': request.amount, 'date': date, 'sender': request.recieverID, 'reciever': request.requesterID})
  //         }
  //         ).then(()=>{
  //           this.deleteRequest(request.id).then(()=>{
  //             this.presentAlert("Request had been Approved")
  //           })
  //         })
  //       }
  // }

  approveRequest(request: string){
    let date = new Date();
    this.Msg("approved", "The request is approved");
    this.afs.collection('RequestChange')
  .add({'request:' :request})

  }

  approving(request: string, approve: boolean){
    this.Msg("Approve", "The request is sent to the admin");
    this.afs.collection('OwnerRequestChange').add({'request': request, 'approve:' : approve})

  }

  // shifting: Shift = {} as Shift;
  // getShiftByIndex(index:any): Shift{
  //   this.shift.subscribe((data)=>{
  //     this.shifting.uid = data[index].uid;
  //     this.shifting.date = data[index].date;
  //     this.shifting.time = data[index].time;
  //     this.shifting.nameEm = data[index].nameEm;
  //     return this.shifting;
  //   })
  //   return this.shifting
  // }


  shifting: StoreShift = {} as StoreShift;
  getShiftByIndex(index:any): StoreShift{
    this.storeshift.subscribe((data)=>{
      this.shifting.id = data[index].id;
      this.shifting.date = data[index].date;
      this.shifting.time = data[index].time;
      this.shifting.nameEm = data[index].nameEm;
      return this.shifting;
    })
    return this.shifting
  }


 

}
