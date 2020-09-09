import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Injectable()
export class AuthProvider {
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router

  ) {
  }

  //Create user
  register = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);

  //Login
  login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false
    }
  }
  singOut() {
    this.clearStorage();
    this.router.navigate(['login']);
  }


  salvarStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getStorage() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage empty');
    }
  }
  clearStorage() {
    if (localStorage.getItem('user')) {
      localStorage.clear();
    }
  }
}