import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private snapshotChangesSubscription: any;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
   }

  createPost(value) {
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Posts').add({   
        likes: 0,
        data: new Date(),
        desc: value.desc,
        restaurantId: currentUser.uid,
        imagem: value.imagem
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
  getPubs(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('Posts').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
  getPostsByName(res){
    return new Observable<any>(() => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('Posts', res => res.where("restaurantId", "==", res)).snapshotChanges();
        }
      })
    })
  }
}
