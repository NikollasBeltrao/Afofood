import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MenuController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth';
import { FirebaseProvider } from 'src/providers/firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  registerForm = {
    name: '',
    email: '',
    password: '',
    tipo: 0,
    imagem: 'src/assets/imgs/default-avatar.jpg'
  }
  
  constructor(private router: Router, private active: ActivatedRoute, private auth: AuthProvider, private firebase: FirebaseProvider,private menu: MenuController) { 

  }

  id;
  
  ngOnInit() {
    this.active.params.subscribe( parametros => {
      this.id = parametros['id'];
    });
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
