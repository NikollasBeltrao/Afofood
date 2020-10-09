import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { SearchFilterPage } from 'src/modal/search-filter/search-filter.page';
import { Observable } from 'rxjs';
import { ImagePage } from 'src/modal/image/image.page';
import { NotificationsComponent } from 'src/components/notifications/notifications.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchKey;
  yourLocation = '123 Test Street';
  themeCover = 'assets/imgs/default_image.png';
  items: Array<any>;
  address:any;
  lista:any;

  public publicacoes: Observable<any>;
  public list: Array<any> = [];
  public publicacoess: Array<any> = [];
  
  constructor(public popoverCtrl: PopoverController, public alertCtrl: AlertController, public toastCtrl: ToastController, public modalCtrl: ModalController) { 

  }

  ngOnInit() {
  }
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

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
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


}
