import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router'
import { AuthProvider } from 'src/providers/auth';
import { LoadingController, MenuController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = {
    email: '',
    password: ''
  }
  constructor(private nativePageTransitions: NativePageTransitions, private router: Router, private auth: AuthProvider,
    public loading: LoadingController, private menu: MenuController) { }

  ngOnInit() {

  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }
  openRegisterUser() {
    this.router.navigate(['register']);
  }
  openRegisterRes(){
    this.router.navigate(['register-restaurante']);
  }
  async fazerlogin() {
    let load = await this.loading.create({
      message: 'Loading',

    });
    load.present();
    this.auth.login(this.loginForm)
      .then((res) => { 
        this.auth.salvarStorage(res.user);      
        load.dismiss();
        this.router.navigate(['home', { id: res.user.uid }]);
      })
      .catch((err) => {
        console.log(err)
        load.dismiss();
      })
      
  }
}
