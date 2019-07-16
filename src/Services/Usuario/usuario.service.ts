import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { TbRoles } from '../../Models/Roles';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbProvincia } from 'src/Models/Provincia';
import { TbCanton } from 'src/Models/Canton';
import { TbDistrito } from 'src/Models/Distrito';
import { TbBarrios } from 'src/Models/Barrios';
import { TbTipoId } from 'src/Models/TipoId';
import { TbUsuarios } from 'src/Models/Usuarios';
import { TbEmpresa } from 'src/Models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  //usuario = new TbUsuarios;


  perfil;
  constructor(/*private fb: FormBuilder,*/ private http: HttpClient, private serviceGeneric: ServiceGeneric) { }

  /*formModel = this.fb.group({
    Contraseñas: this.fb.group({
      Contraseña: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  comparePasswords(fb: FormGroup) {

    let confirmPswrdCtrl = fb.get('ConfirmPassword')
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Contraseña').value != confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });

      } else {
        confirmPswrdCtrl.setErrors(null);
      }


    }

  }*/

  registro(usuario: TbUsuarios) {
  
   // this.usuario.Contraseña = this.formModel.value.Passwords.Contraseña

    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbUsuarios>(this.serviceGeneric.getURL() +'/Registro',usuario,{headers});
  }

  getRoles() {
    return this.http.get<TbRoles[]>(this.serviceGeneric.getURL() + '/roles')//.toPromise().then(res => this.listaRol = res as TbRoles[]);
  }

  login(formData) {
    return this.http.post(this.serviceGeneric.getURL() + '/Login', formData);
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer' + localStorage.getItem('token') });
    return this.http.get(this.serviceGeneric.getURL() + '/Perfil', { headers: tokenHeader });

  }
  getProvincias(id?: number) {
    return this.http.get<TbProvincia[]>(this.serviceGeneric.getURL() + '/provincia')//.toPromise().then(res => this.listaProvincia = res as TbProvincia[]);

  }
  getCantones() {
    return this.http.get<TbCanton[]>(this.serviceGeneric.getURL() + '/canton')//.toPromise().then(res => this.listaCantones = res as TbCanton[]);

  }
  getDistritos(id?: number) {
    return this.http.get<TbDistrito[]>(this.serviceGeneric.getURL() + '/distrito')//.toPromise().then(res => this.listaDistritos = res as TbDistrito[]);
  }
  getBarrios() {
    return this.http.get<TbBarrios[]>(this.serviceGeneric.getURL() + '/barrio')//.toPromise().then(res => this.listaBarrios = res as TbBarrios[]);
  }
  getTiposId() {
    return this.http.get<TbTipoId[]>(this.serviceGeneric.getURL() + '/tipoid')//.toPromise().then(res => this.listaTipoId = res as TbTipoId[]);
  }
  getEmpresas() {
    return this.http.get<TbEmpresa[]>(this.serviceGeneric.getURL() + '/empresa')//.toPromise().then(res => this.listaBarrios = res as TbBarrios[]);
  }
}
