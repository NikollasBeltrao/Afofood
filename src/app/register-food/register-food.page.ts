import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { Food } from 'src/models/food';
import { FoodService } from 'src/services/foodCrud.service';
import { RequestsService } from 'src/services/requests.service';

@Component({
  selector: 'app-register-food',
  templateUrl: './register-food.page.html',
  styleUrls: ['./register-food.page.scss'],
})
export class RegisterFoodPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  tags: any;
  lista: Observable<Food>[];
  constructor(private formBuilder: FormBuilder, private foodService: FoodService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+,[0-9-]+$')
      ])),
      imagem: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl([], Validators.required),
    });

  }
  upload(form) {
    console.log(form.tags);
    form.tags = this.tagArrayToString(form.tags);
    console.log(form.tags);
  }

  tagArrayToString(tagArray: string[]): any {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      return tagArray;
    } else {
      return [];
    }
  }
  onChange(val) {
    console.log(this.tags);
  }
  createFood(form) {
    let aux = this.tagArrayToString(form.tags);
    let array = [];
    form.preco = parseFloat(form.preco);
    aux.forEach(element => {
      array.push(element.value.toLowerCase());
    });
    form.tags = array;

    this.foodService.createFood(form, array);
  }


}
