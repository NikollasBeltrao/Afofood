import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private snapshotChangesSubscription: any;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){}

  getRequests(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('requests').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getTask(taskId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('requests/' + taskId).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(key, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('requests').doc(key).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteRequest(key){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('requests').doc(key).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createRequest(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('requests').add({
        adress: value.adress,      
        foodId: value.foodId,
        restaurantId: value.restaurantId,
        pedinteId: value.pedinteId
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

   getAll(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.afs.collection('requests').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
}
