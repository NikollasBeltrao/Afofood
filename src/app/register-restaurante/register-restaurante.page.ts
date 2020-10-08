import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth';
import { FirebaseProvider } from 'src/providers/firebase';

@Component({
  selector: 'app-register-restaurante',
  templateUrl: './register-restaurante.page.html',
  styleUrls: ['./register-restaurante.page.scss'],
})
export class RegisterRestaurantePage implements OnInit {
  registerForm = {
    name: '',
    email: '',
    password: '',
    imagem: '',
    tipo: 1
  }
  constructor(private router: Router, private active: ActivatedRoute, private auth: AuthProvider, private firebase: FirebaseProvider, 
    private menu: MenuController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }
  openLogin() {
    this.router.navigate(['login']);
  }
  cadastar(){
    
    this.auth.register(this.registerForm);
  }
}
