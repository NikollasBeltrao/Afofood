import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthProvider } from 'src/providers/auth';
import { User } from 'src/models/user';
import { UserService } from 'src/services/userCrud.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: User;   
  public selectedIndex = 0;
  public appPagesRes;
  public appPagesCliente = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil-restaurante',
      icon: 'person-circle'
    },
    {
      title: 'Historico',
      url: '/historico',
      icon: 'alarm'
    },
    {
      title: 'Promoções',
      url: '/folder/Favorites',
      icon: 'star-half'
    },
    {
      title: 'Favoritos',
      url: '/folder/Archived',
      icon: 'heart'
    },
    {
      title: 'Pesquisar',
      url: '/search',
      icon: 'search'
    },
    {
      title: 'Configurações',
      url: '/config',
      icon: 'build'
    }    
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireAuth: AuthProvider,
    private afAuth: AngularFireAuth,
    private useService: UserService,
    private router: Router
  ) {
    this.user = new User();
    //this.user.imagem = "./assets/imgs/default-avatar.jpg";
    this.initializeApp();   
    this.useService.getAllUsers().subscribe(res => {
      console.log(res);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if(user){
          this.useService.getUser(user.uid).then(res => {
            this.user = res;
          });
          this.user.imagem = user.photoURL;
          this.user.nome = user.displayName;
          this.user.email = user.email;
          this.carregarPagesRes(user.uid);       
        }else{
          this.router.navigate(["/login"]);
        }
      }, err => {
        this.router.navigate(["/login"]);
      }, () => {
        this.splashScreen.hide();
      });
      this.statusBar.styleDefault();
    });    
  }
 
  carregarPagesRes(id){
    this.appPagesRes  = [
      {
        title: 'Home',
        url: '/',
        icon: 'mail'
      },
      {
        title: 'Historico',
        url: '/historico',
        icon: 'paper-plane'
      },
      {
        title: 'Cadastar Comida',
        url: '/register-food',
        icon: 'archive'
      },
      {
        title: 'Publicar',
        url: '/register-pub',
        icon: 'heart'
      },
      {
        title: 'Promoções',
        url: '/folder/Favorites',
        icon: 'heart'
      },
      {
        title: 'Favoritos',
        url: '/folder/Archived',
        icon: 'archive'
      },
      {
        title: 'Pesquisar',
        url: '/search',
        icon: 'trash'
      },
      {
        title: 'Configurações',
        url: '/config',
        icon: 'warning'
      },
      {
        title: 'Pedidos',
        url: '/requests/' + id,
        icon: 'warning'
      }   
    ];
  }

  sair(){
    this.fireAuth.singOut();
  }

}
