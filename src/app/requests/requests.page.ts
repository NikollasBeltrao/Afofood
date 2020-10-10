import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  items:  Array<any>;
  viagem: Array<Object>;
  public vars = [{}];
  lista: Observable<any>;
  idRestaurant;

  constructor(public loadingCtrl: LoadingController, private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe((params:ParamMap)=>
    {
      this.idRestaurant=params.get('id')  
    });
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        console.log(data);
        loading.dismiss();
        this.items = data;        
        this.applyFilters(this.items);
      })
    })
  }

  private applyFilters(res) {
    this.items = res.filter(t=>(t.payload.doc.data().restaurantId==this.idRestaurant)); 
    console.log(res);
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

}