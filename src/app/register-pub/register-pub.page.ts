import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/models/Posts';
import { PostsService } from 'src/services/postsCrud.service';

@Component({
  selector: 'app-register-pub',
  templateUrl: './register-pub.page.html',
  styleUrls: ['./register-pub.page.scss'],
})
export class RegisterPubPage implements OnInit {
  validations_form: FormGroup;
  constructor(private formBuilder: FormBuilder, public postservice: PostsService) {
    this.validations_form = this.formBuilder.group({
      imagem: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }
  createPubus(form) {    
    this.postservice.createPost(form);
  }
}
