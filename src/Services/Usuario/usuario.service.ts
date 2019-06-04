import { Injectable } from '@angular/core';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { TbRoles } from '../../Models/Roles';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbProvincia } from 'src/Models/Provincia';
import { TbCanton } from 'src/Models/Canton';
import { TbDistrito } from 'src/Models/Distrito';
import { TbBarrios } from 'src/Models/Barrios';
import { TbTipoId } from 'src/Models/TipoId';
import { TbUsuarios } from 'src/Models/Usuarios';
import { TbPersona } from 'src/Models/Personas';
import { TbEmpresa } from 'src/Models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  list : TbRoles[];
  usuario: TbUsuarios;
  persona : TbPersona;
  empresa :TbEmpresa;
  rol : TbRoles;

  perfil; 
  constructor(private fb:FormBuilder, private http: HttpClient, private serviceGeneric: ServiceGeneric ) { }

  formModel= this.fb.group({
    //Agregue la variable inicializada
    IdRol : ['', Validators.required],
    NombreUsuario:['', Validators.required],
    TipoId:[''],
    Id:['',Validators.required],
    Contraseñas:this.fb.group({
      Contraseña:['' , [Validators.required,Validators.minLength(4)] ],
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
      
        //declare el valor de la vista a la varible. 
        this.usuario.Id= this.formModel.value.Id,
        this.usuario.TipoId= this.formModel.value.TipoId,
        this.usuario.IdRol= this.formModel.value.RolId,
        this.usuario.NombreUsuario= this.formModel.value.NombreUsuario,
        this.usuario.Contraseña= this.formModel.value.Passwords.Contraseña,
        this.usuario.IdNavigation = this.empresa,
        this.usuario.IdRolNavigation = this.rol,
        this.usuario.TbPersona = this.persona

      return this.http.post(this.serviceGeneric.getURL()+'/Registro', this.usuario);
    }

    cargarRoles(){
      this.http.get(this.serviceGeneric.getURL()+'/Registro').toPromise()
      .then(res => this.list = res as TbRoles[]);
    }

    login(formData){
      return this.http.post(this.serviceGeneric.getURL()+'/Login', formData);
    }

     getUserProfile(){
     var tokenHeader = new HttpHeaders({'Authorization':'Bearer' + localStorage.getItem('token')});
     return this.http.get(this.serviceGeneric.getURL()+'/Perfil',{headers:tokenHeader});
    
     }
      getProvincias(id?: number) {
        return this.http.get<TbProvincia[]>('http://localhost:63630/api/provincia');
      }
      getCantones() {
        return this.http.get<TbCanton[]>('http://localhost:63630/api/canton');
      }
      getDistritos(id?: number) {
        return this.http.get<TbDistrito[]>('http://localhost:63630/api/distrito');
      }
      getBarrios() {
        return this.http.get<TbBarrios[]>('http://localhost:63630/api/barrio');
      }
      getTiposId() {
        return this.http.get<TbTipoId[]>('http://localhost:63630/api/tipoid');
      }
}
