import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.page.html',
  styleUrls: ['./perfil-restaurante.page.scss'],
})
export class PerfilRestaurantePage implements OnInit {
  idRes;
  constructor(private active: ActivatedRoute) { }

  ngOnInit() {
    this.active.params.subscribe(parametros => {
      this.idRes = parametros['id'];
    });
  }
  
}
