import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/services/userCrud.service';
import { User } from 'src/models/user';
@Injectable()
export class AuthProvider {
  private usuario: User;
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private userService: UserService
  ) {

  }

  //Create user
  register(data) {
    this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(res => {
      this.usuario = new User();
      this.usuario.email = res.user.email;
      this.usuario.userid = res.user.uid;
      this.usuario.nome = data.name;
      this.usuario.tipo = data.tipo;
      this.usuario.imagem = data.imagem;
      res.user.updateProfile({
        displayName: data.name,
        photoURL: data.imagem,        
      })
      this.userService.createUser(this.usuario).then(()=>{
        //this.login({email: data.email,password: data.password});
        //let valor = {email: value.email, password: value.password};
        //let user = firebase.auth().currentUser;
        //user.sendEmailVerification();
        //this.doLogin(valor);
        this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
      });
      
      
    });
  }


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