import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthProvider } from 'src/providers/auth';
import { User } from 'src/models/user';
import { UserService } from 'src/services/userCrud.service';
import { AngularFireAuth } from 'angularfire2/auth';

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
      title: 'Perfil',
      url: '/perfil-restaurante',
      icon: 'mail'
    },
    {
      title: 'Historico',
      url: '/folder/Outbox',
      icon: 'paper-plane'
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
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Configurações',
      url: '/folder/Spam',
      icon: 'warning'
    }    
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fireAuth: AuthProvider,
    private afAuth: AngularFireAuth,
    private useService: UserService,
  ) {
    this.user = new User();
    //this.user.imagem = "./assets/imgs/default-avatar.jpg";
    this.initializeApp();    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.afAuth.user.subscribe(user => {
        if(user){
          this.useService.getUser(user.uid).then(res => {
            this.user = res;
          });
          this.user.imagem = user.photoURL;
          this.user.nome = user.displayName;
          this.user.email = user.email;
          this.carregarPagesRes(user.uid);       
        }
      });
    });    
  }
 
  carregarPagesRes(id){
    this.appPagesRes  = [
      {
        title: 'Perfil',
        url: '/perfil-restaurante',
        icon: 'mail'
      },
      {
        title: 'Historico',
        url: '/folder/Outbox',
        icon: 'paper-plane'
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
        url: '/folder/Trash',
        icon: 'trash'
      },
      {
        title: 'Configurações',
        url: '/folder/Spam',
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
