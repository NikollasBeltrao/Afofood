import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private snapshotChangesSubscription: any;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
   }
  getAllUsers(){
    return this.snapshotChangesSubscription = this.afs.collectionGroup('Users');         
  }
  getUsers() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('Users').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getUser(id) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<User>('Users/' + id).valueChanges().
          subscribe(snapshots => {resolve(snapshots);}, err => {reject(err)})
        }
      })
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(key, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Users').doc(key).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteRequest(key) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Users').doc(key).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  createUser(value) {
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Users').doc(value.userid).set({   
        userid: value.userid,     
        nome: value.nome,
        email: value.email,
        tipo: value.tipo,
        image: value.imagem
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  getAll() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.afs.collection('Users').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
}
