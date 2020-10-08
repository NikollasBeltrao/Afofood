import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/services/requests.service';

@Component({
  selector: 'app-do-request',
  templateUrl: './do-request.page.html',
  styleUrls: ['./do-request.page.scss'],
})
export class DoRequestPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private requestService: RequestsService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      adress: new FormControl('', Validators.required),
      foodId: new FormControl('', Validators.required),
      restaurantId: new FormControl('', Validators.required),
      pedinteId: new FormControl('', Validators.required)
    });
  }
  doRequest(form){
    this.requestService.createRequest(form);
  }

}
