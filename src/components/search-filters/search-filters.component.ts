import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };
  organizeby: any;
  dishtype: any;

  constructor(private modalCtrl: ModalController) {
  }
  ngOnInit() { }


  get getValues() {
    return {
      organizeby: this.organizeby,
      dishtype: this.dishtype,
      radiusmiles: this.radiusmiles,
      minmaxprice: this.minmaxprice
    }
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

}

