import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/Services/Usuario/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
formModel = {
  NombreUsuario : '',
  contraseña : ''
}

  constructor(private service:UsuarioService, private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token')!= null)
      this.router.navigateByUrl('/inicio');
  }

  //Para enviar info del login
  onSubmit(form:NgForm){
this.service.login(form.value).subscribe(
  (res:any)=> {
    localStorage.setItem('token',res.token);
    this.router.navigateByUrl('/inicio');
  }, 
   err => {
     if(err.status == 400)
     this.toastr.error('usuario o contraseña incorrecta.','Autenticacion fallida');
     else 
      console.log(err)
   }
);
  }
}
