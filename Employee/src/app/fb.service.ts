import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { promises } from 'dns';


export interface User {
  id?: string;
  Name: string,
  email: string,
  Type:string,
  Phone: string,
  Image:any;
  isUserAdmin:boolean;

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

export interface OwnerRequest{
  id?: string;
  requests: Request;
  //  requestID:string;
  //  receiveID: string;
  //  date: string;
  //  time: string;
  //  nameEmpl: string;
  //  requesterName: string;
  // approve: boolean;
}




@Injectable({
  providedIn: 'root'
})
export class FbService {
  users: Observable<User[]>;
  //private userRef : AngularFirestoreCollection<User>;
   userCollection: AngularFirestoreCollection<User>;
  userCollectionRef: AngularFirestoreCollection<User>;

  public reqs: Observable<Request[]>;
  public reqCollection: AngularFirestoreCollection<Request>;
  reqCollectionRef: AngularFirestoreCollection<Request>;
   
   public ownerreq: Observable<OwnerRequest[]>;
   private ownerreqCollection: AngularFirestoreCollection<OwnerRequest>;

   public storeshift: Observable<StoreShift[]>;
   private storeshiftCollection: AngularFirestoreCollection<StoreShift>;
   storeshiftCollectionRef: AngularFirestoreCollection<StoreShift>;






  
    public userid:any;
    public disuser: User = {} as User;
    public isUserAdmin = true;
    public shidtuser:StoreShift[]=[];

  constructor(private  afs:  AngularFirestore, public alertCtrl:AlertController,
    private  afAuth: AngularFireAuth) {

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


      this.userCollectionRef = this.afs.collection('User');
      this.users = this.userCollectionRef.valueChanges({idField:'uid'});

      this.userCollectionRef = this.afs.collection('User');
      this.users = this.userCollectionRef.valueChanges({idField:'uid'});

      this.storeshiftCollectionRef = this.afs.collection('Storeshift');
      this.storeshift = this.storeshiftCollectionRef.valueChanges({idField:'id'})

      this.reqCollectionRef = this.afs.collection('Storeshift');
      this.reqs = this.reqCollectionRef.valueChanges({idField:'id'})



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
      
  

                

    


     }


  async getUserById(id:string){
    console.log(id)
          return  this.afs.collection<User>('User').doc(id).get()   
     }



     async Msg(header: string, msg: string){
      let alert =await this.alertCtrl.create({
        header: header,
        message: msg,
        buttons: ['OK']
      });
      alert.present();
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
    return this.reqCollection.doc(id).delete();
}

rejectedOwner(id:any): Promise<void>{
  return this.ownerreqCollection.doc(id).delete();
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
