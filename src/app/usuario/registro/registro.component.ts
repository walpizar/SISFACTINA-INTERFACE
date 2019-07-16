import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/Services/Usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { TbUsuarios } from 'src/Models/Usuarios';
import { TbPersona } from 'src/Models/Personas';
import { TbRoles } from 'src/Models/Roles';
import { TbEmpresa } from 'src/Models/Empresa';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  listaEmpresa = new Array();
  listaRol = new Array();
  listaProvincia = new Array();
  listaDistritos = new Array();
  listaCantones = new Array();
  listaBarrios = new Array();
  listaTipoId = new Array();

  comboProvincias = new Array();
  comboDistritos = new Array();
  comboCantones = new Array();
  comboBarrios = new Array();

  Usuario = new TbUsuarios();
  Empresa = new TbEmpresa();
  Rol = new TbRoles();
  Persona = new TbPersona();
  Provincia: string;
  Distrito: string;
  Canton: string;

  PasswordMismatch: boolean;
  
  constructor(public service: UsuarioService, private toastr: ToastrService, private router: Router) { }
 
  ngOnInit() {
    
    this.getListRoles();
    this.getListProvincias();
    this.getListCantones();
    this.getListDistritos();
    this.getListBarrios();
    this.getListTipoId();
    this.getListaEmpresa();
    
  }

  getListProvincias() {
    this.service.getProvincias().subscribe(data => {
      this.listaProvincia = data;
    });
  }
  getListDistritos() {
    this.service.getDistritos().subscribe(data => {
      this.listaDistritos = data;
    });
  }
  getListCantones() {
    this.service.getCantones().subscribe(data => {
      this.listaCantones = data;
    });
  }
  getListBarrios() {
    this.service.getBarrios().subscribe(data => {
      this.listaBarrios = data;
    });
  }
  getListTipoId() {
    this.service.getTiposId().subscribe(data => {
      this.listaTipoId = data;
    });
  }
  getListaEmpresa() {
    this.service.getEmpresas().subscribe(data => {
      this.listaEmpresa = data;
    });
  }
  getListRoles() {
    this.service.getRoles().subscribe(data => {
      this.listaRol = data;
    });
  }


   // cambiar combos
   onChangeProvincia(ID) {
    this.Provincia = ID;
    this.ChangeCanton(ID);
  }

  onChangeCanton(ID) {
    this.Canton = ID;
    this.ChangeDistrito(ID);
  }

  onChangeDistrito(ID) {
    this.Distrito = ID;
    this.ChangeBarrio(ID);
  }

  ChangeCanton(X: string) {
    this.comboCantones = new Array();
    for (const i of this.listaCantones) {
      if (i.Provincia == X) {
        this.comboCantones.push(i);
      }
    }
  }

  ChangeDistrito(X: string) {
    this.comboDistritos = new Array();
    for (const i of this.listaDistritos) {
      if (i.Canton == X && i.Provincia == this.Provincia) {
        this.comboDistritos.push(i);
      }
    }
  }

  ChangeBarrio(X) {
    this.comboBarrios = new Array();
    for (const i of this.listaBarrios) {
      if (i.Provincia == this.Provincia && i.Canton == this.Canton && i.Distrito == X) {
        this.comboBarrios.push(i);
      }
    }
  }
   
  onsubmit(usuario:TbUsuarios){
    usuario.TbPersona = this.Persona;
    usuario.IdNavigation = this.Empresa;
    usuario.IdRolNavigation = this.Rol
    this.service.registro(usuario).subscribe(
        res => { this.toastr.success("Creado"), this.router.onSameUrlNavigation = 'reload'},
        err => { this.toastr.error("Error al crear Usuario")}
    );
  }
}
