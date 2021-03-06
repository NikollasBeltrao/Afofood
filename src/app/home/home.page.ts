import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseProvider } from 'src/providers/firebase';
import { AuthProvider } from 'src/providers/auth';
import { MenuController, LoadingController } from '@ionic/angular';
import { PostsService } from 'src/services/postsCrud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    uid: '',
    name: '',
    email: '',
    avatar: ''
  }

  pubs = [];
  pubsC = [];
  data;
  constructor(private active: ActivatedRoute, private firebase: FirebaseProvider, public postService: PostsService,
     private auth: AuthProvider, public router: Router, private menu: MenuController, public loading: LoadingController) { }
  async ngOnInit() {
    let load = await this.loading.create({
      message: 'Loading',

    });
    load.present();
    await this.firebase.getPubs().then((res) => {
      this.pubs.push(res);
      this.pubs[0].forEach(p => {
        let rest;
        let pub;
        this.firebase.getUser(p.restaurantId).then((r) => {
          rest = r.data();
          console.log(res);
          pub = {
            resId: p.restaurantId,
            resAvatar: rest.image,
            resName: rest.nome,
            pubImg: p.imagem,
            pubDesc: p.desc                        
          }
          
          this.pubsC.push(pub);
        })
      });
    })
    this.active.params.subscribe(parametros => {
      this.user.uid = parametros['id'];
    });
    if(this.auth.isLoggedIn()){
      this.user.uid = this.auth.getStorage().uid;
    }
    else{
      load.dismiss();
      this.router.navigate(['login']);
    }  
    this.firebase.getUser(this.user.uid)
      .then((res) => {
        this.user.name = res.data().name;
        this.user.email = res.data().email;
        this.user.avatar = res.data().avatar;
      })
      .catch((err) => {
        console.log(err);
      }) 
      load.dismiss();     
  }

  sair(){
    this.auth.singOut();
  }

  goRest(id){
    this.router.navigate(['perfil-restaurante', { id: id }]);
  }

  goRequst(){
    this.router.navigate(['do-request']);
  }
}
