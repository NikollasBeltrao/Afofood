import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  tags:any;
  lista:any[];
  constructor(private formBuilder: FormBuilder, private foodService: FoodService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      imagem: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl([], Validators.required),
    });
    this.foodService.getRequestsByName("coxinha");
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
  onChange(val){
    console.log(this.tags);    
  }
  createFood (form){
    let aux = this.tagArrayToString(form.tags);
    let array = [];
    aux.forEach(element => {
      array.push(element.value.toLowerCase());
    });
    console.log(array);
    
   this.foodService.createFood(form, array);
  }


}
