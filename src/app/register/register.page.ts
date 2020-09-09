import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthProvider } from 'src/providers/auth';
import { FirebaseProvider } from 'src/providers/firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private router: Router, private active: ActivatedRoute, private auth: AuthProvider, private firebase: FirebaseProvider) { }
  id;
  ngOnInit() {
    this.active.params.subscribe( parametros => {
      this.id = parametros['id'];
    });
  }
  openLogin() {
    this.router.navigate(['login']);
  }
  cadastar(){
    this.auth.register(this.registerForm)
    .then((res) => {
      console.log(res);
      let uid = res.user.uid;

      let data = {
        uid: uid,
        id: uid,
        name: this.registerForm.name,
        email: this.registerForm.email
      };
      this.firebase.postUser(data)
      .then(() => {
        console.log("sucesso");  
      })
    })
    .catch((err) => {
      console.log(err)      
    })
  }
}
