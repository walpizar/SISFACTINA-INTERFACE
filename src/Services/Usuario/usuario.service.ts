import { Injectable } from '@angular/core';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
<<<<<<< HEAD
import { TbRoles } from '../../Models/Roles';
=======
import { TbRoles } from 'src/Models/Roles';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  list : TbRoles[];
  perfil; 
  constructor(private fb:FormBuilder, private http: HttpClient) { }

  formModel= this.fb.group({
    //Agregue la variable inicializada
    RolId : ['', Validators.required],
    NombreUsuario:['', Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Passwords:this.fb.group({
      Password:['' , [Validators.required,Validators.minLength(6)] ],
      ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
   
  });
 comparePasswords(fb:FormGroup){

      let confirmPswrdCtrl = fb.get('ConfirmPassword')
      if(confirmPswrdCtrl.errors==null || 'passwordMismatch' in confirmPswrdCtrl.errors ) {
        if (fb.get('Password').value!=confirmPswrdCtrl.value) {
          confirmPswrdCtrl.setErrors({passwordMismatch:true});
         
        } else{
            confirmPswrdCtrl.setErrors(null);
          }


      }

    }

    registro() {
      var body = {
        //declare el valor de la vista a la varible. 
        RolId: this.formModel.value.RolId,
        NombreUsuario: this.formModel.value.NombreUsuario,
        Contraseña: this.formModel.value.Passwords.Contraseña
      };
      return this.http.post('http://localhost:63630/api/Registro', body);
    }

    cargarRoles(){
      this.http.get('http://localhost:63630/api/Registro').toPromise()
      .then(res => this.list = res as TbRoles[]);
    }

    login(formData){
      return this.http.post('http://localhost:63630/api/Login', formData);
    }

     getUserProfile(){
     var tokenHeader = new HttpHeaders({'Authorization':'Bearer' + localStorage.getItem('token')});
     return this.http.get('http://localhost:63630/api/Perfil',{headers:tokenHeader});
    
    }
}
