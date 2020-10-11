import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/userCrud.service';

@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.page.html',
  styleUrls: ['./perfil-restaurante.page.scss'],
})
export class PerfilRestaurantePage implements OnInit {
  idRes;
  user:User;
  constructor(private active: ActivatedRoute, public usuarioService: UserService) { 
    this.user = new User();
  }

  ngOnInit() {
    this.active.params.subscribe(parametros => {
      this.idRes = parametros['id'];
      this.usuarioService.getUser(this.idRes).then(res => {
        this.user = res;
      })
    });
  }
  
}
