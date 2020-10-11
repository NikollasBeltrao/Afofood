import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ImagePage } from 'src/modal/image/image.page';
import { NotificationsComponent } from 'src/components/notifications/notifications.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Food } from 'src/models/food';
import { SearchFilterPage } from 'src/components/search-filter/search-filter.page';
import { SearchFiltersComponent } from 'src/components/search-filters/search-filters.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/imgs/default_image.png';
  items: Array<any>;
  address: any;

  usuariomensagem: string;
  food: Food;
  usuario: string;
  listaFood: Observable<Food[]>;
  lista: Observable<Food[]>;
  nomeuser: string;
  public publicacoes: Observable<any>;
  public list: Array<any> = [];
  public publicacoess: Array<any> = [];

  constructor(public popoverCtrl: PopoverController, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public modalCtrl: ModalController,
    public afAuth: AngularFireAuth, public nav: NavController, public fbauth: AngularFireAuth, public acrroute: ActivatedRoute,
    public fbstore: AngularFirestore) {
    
    this.food = new Food();
    
    this.GetUser();


  }

  ngOnInit() {
    this.GetUser();
    this.ListarFoods();
  }

  GetUser() {
    this.afAuth.user.subscribe(currentUser => {
      if (currentUser) {
        this.usuario = currentUser.uid;
      }
    });
  }

  ListarFoods() {
    console.log(SearchFiltersComponent);

    this.lista = this.fbstore.collection<Food>("Foods", ref => { return ref.limit(300).orderBy("nome_lower")
    .startAt(this.searchKey.toLowerCase()).endAt(this.searchKey.toLowerCase()+"\uf8ff") }).valueChanges()//.where("de","==",res.uid)}).valueChanges()
    console.log(this.lista);
    if (this.lista) {
      this.lista.subscribe(res => {
        this.applyFilters(res)
      })
    }
  }

  private applyFilters(res) {
    console.log(res)
    console.log(this.usuario)
    this.listaFood = res.filter(t => (t.nome == t.nome));
  }


///////////////////////////
async alertLocation() {
  const changeLocation = await this.alertCtrl.create({
    header: 'Change Location',
    message: 'Type your Address.',
    inputs: [
      {
        name: 'location',
        placeholder: 'Enter your new Location',
        type: 'text'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Change',
        handler: async (data) => {
          console.log('Change clicked', data);
          this.yourLocation = data.location;
          const toast = await this.toastCtrl.create({
            message: 'Location was change successfully',
            duration: 3000,
            position: 'top',

          });

          toast.present();
        }
      }
    ]
  });
  changeLocation.present();
}

async searchFilter() {
  const modal = await this.modalCtrl.create({
    component: SearchFiltersComponent
  });
  return await modal.present();
}

async presentImage(image: any) {
  const modal = await this.modalCtrl.create({
    component: ImagePage,
    componentProps: { value: image }
  });
  return await modal.present();
}

async notifications(ev: any) {
  const popover = await this.popoverCtrl.create({
    component: NotificationsComponent,
    event: ev,
    animated: true,
    showBackdrop: true
  });
  return await popover.present();
}

onEnter(e){
  this.searchKey = e.target.value;
  this.ListarFoods();
}
}
