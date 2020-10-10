import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Message } from "../../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  usuariomensagem:string;
  mensagem:Message;
  usuario:string;
  listamensagens:Observable<Message[]>;
  lista:Observable<Message[]>;
  nomeuser:string;

  editorMsg = '';

  constructor(public afAuth:AngularFireAuth,public nav:NavController, public fbauth:AngularFireAuth,public acrroute:ActivatedRoute,public fbstore:AngularFirestore) { 
      
    this.mensagem = new Message();

    this.acrroute.paramMap.subscribe((params:ParamMap)=>
    {
      console.log(params);
      this.usuariomensagem=params.get('id')
       
    })
    this.GetUser();

    this.VerificarLogin();

    this.ListarMensagens();

  }

  ngOnInit() {
    this.VerificarLogin();
    this.GetUser();
    this.ListarMensagens();
  }

  GetUser(){
    this.afAuth.user.subscribe(currentUser => {
      if (currentUser) {
        this.usuario = currentUser.uid;
      }
    });
  }

  ListarMensagens(){
    
    this.lista=this.fbstore.collection<Message>("messages",ref=>{ return ref.limit(300).orderBy("data")}).valueChanges()//.where("de","==",res.uid)}).valueChanges()
    console.log(this.lista);
    if(this.lista){
      this.lista.subscribe(res => {
        this.applyFilters(res)
      })    
    }
  }
 
  private applyFilters(res) {    
    console.log(res)
    console.log(this.usuario)
    console.log(this.usuariomensagem)
    this.listamensagens = res.filter(t=>(t.de==this.usuario && t.para==this.usuariomensagem) || (t.para==this.usuario && t.de==this.usuariomensagem));
  }
 

  PostMessage(texto){
    console.log(this.mensagem);
    this.mensagem.de=this.usuario;
    this.mensagem.para=this.usuariomensagem;
    this.mensagem.date=new Date();
    console.log(this.mensagem);
    let mensagens=this.fbstore.collection("messages").add({
      de: this.mensagem.de,
      para:this.mensagem.para,
      texto: texto,
      data: this.mensagem.date
    }).then(res=>{console.log(res)}).catch(c=>{console.log(c)});
  }
  


  VerificarLogin(){
    this.fbauth.authState.subscribe(user=>{
      if (user){
          this.usuario=user.uid
          console.log(this.usuario)
          console.log()
      }
      else
      {
        console.log("nao autenticado")
      }
    })
  }
}
