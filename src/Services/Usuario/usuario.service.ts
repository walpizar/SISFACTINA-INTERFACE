import { Injectable } from '@angular/core';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Rol } from '../Models/Rol';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  list : Rol[];
  perfil; 
  constructor(private fb:FormBuilder, private http: HttpClient) { }

  formModel= this.fb.group({
    //Agregue la variable inicializada
    RolId : ['', Validators.required],
    UserName:['', Validators.required],
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
        UserName: this.formModel.value.UserName,
        Email: this.formModel.value.Email,
        FullName: this.formModel.value.FullName,
        Password: this.formModel.value.Passwords.Password
      };
      return this.http.post('http://localhost:52130/api/Registro', body);
    }

    cargarRoles(){
      this.http.get('http://localhost:52130/api/Registro').toPromise()
      .then(res => this.list = res as Rol[]);
    }

    login(formData){
      return this.http.post('http://localhost:52130/api/Login', formData);
    }

     getUserProfile(){
     var tokenHeader = new HttpHeaders({'Authorization':'Bearer' + localStorage.getItem('token')});
     return this.http.get('http://localhost:52130/api/Perfil',{headers:tokenHeader});
    
    }
}
