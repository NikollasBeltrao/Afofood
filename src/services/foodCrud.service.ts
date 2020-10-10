import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Food } from 'src/models/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private snapshotChangesSubscription: any;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
   }

  createFood(value, array) {
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Foods').add({   
        nome: value.nome,
        preco: value.preco,
        resId: currentUser.uid,
        desc: value.desc,
        tags: value.tags,
        imagem: value.imagem
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  getRequestsByName(nome){
    new Observable<any>(() => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('Foods', res => res.where("tags", "array-contains", nome)).snapshotChanges();
        }
      })
    })
  }
}
