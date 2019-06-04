import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/Services/Usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

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

  Provincia: string;
  Distrito: string;
  Canton: string;

  constructor(public service: UsuarioService, private toastr: ToastrService) { }
 
  ngOnInit() {
    this.service.cargarRoles();
    this.service.getBarrios();
    this.service.getCantones();
    this.service.getProvincias();
    this.service.getTiposId();
    
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
    //onSubmit() Este metodo nos permite mostrar notificaciones de error o exito al ingresar un usuario 
  //en base a los mensajes mostrados en consola como errors [] o succeeded .
  onSubmit() {
    this.service.registro().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
