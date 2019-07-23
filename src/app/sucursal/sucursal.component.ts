import { Component, OnInit } from '@angular/core';
import { DataBarriosService } from 'src/Services/Barrios/barrios.service';
import { DataDistritoService } from 'src/Services/Distrito/distrito.service';
import { DataCantonService } from 'src/Services/Canton/canton.service';
import { DataProvinciaService } from 'src/Services/Provincia/provincia.service';
import { ToastrService } from 'ngx-toastr';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { PersonaTribunalService } from 'src/Services/PersonaTribunal/persona-tribunal.service';
import { TbSucursales } from 'src/Models/Sucursales';
import { SucursalService } from 'src/Services/Sucursal/sucursal.service';
import { EmpresaService } from 'src/Services/Empresas/empresa.service';
import { TbEmpresa } from 'src/Models/Empresa';
import { parse } from 'querystring';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {


  constructor(private service: DataClienteService, private empresaService: EmpresaService, private sucursalService: SucursalService) { }

  ngOnInit() {
    this.getListProvincias();
    this.getListDistritos();
    this.getListCantones();
    this.getListBarrios();
    this.getListTipoId();

    this.getEmpresas();

  }
  //Listas

  listaProvincia = new Array();
  ListaSuc:Array<TbSucursales> = Array<TbSucursales>();
  subirSucurasales:Array<TbSucursales> = Array<TbSucursales>();
  listaSucursales: Array<TbSucursales>;
  listaSucursalesSubir: Array<TbSucursales>;
  listaDistritos = new Array();
  listaCantones = new Array();
  listaBarrios = new Array();
  listaTipoId = new Array();
  listaEmpresa = Array<TbEmpresa>();
  Telefono: number;
  agregar: boolean = false;

  comboProvincias = new Array();
  comboDistritos = new Array();
  comboCantones = new Array();
  comboBarrios = new Array();

  eliminaIdEmpresa: string;
  Provincia: string;
  Nombre: string;
  Distrito: string;
  Canton: string;
  Direccion: string;
  eliminaNombreSucursal: string;
  empresaId: string;
  empresaTipoId: string;

  IdSuc: number = 0;

  sucursal: TbSucursales = new TbSucursales();
  empresa: TbEmpresa = new TbEmpresa();

  limpiarCAgregar() {
    this.Nombre = "";
    this.Provincia = ""
    this.Canton = ""
    this.Distrito = "";
    this.Direccion = "";
    this.Telefono = null;
    this.sucursal = new TbSucursales();
  }

  get(empresa: string) {
    this.empresaTipoId = empresa.substring(30, 31);
    this.empresaId = empresa.substring(0, 30);
    this.sucursalService.get(empresa.substring(0, 30), empresa.substring(30, 31)).subscribe(data => {
      this.listaSucursales = data;
      this.listaSucursalesSubir = data;

      this.direccionParaSucursales();
    });

  }

  direccionParaSucursales() {

    for (let x = 0; this.listaSucursales.length > x; x++) {

      if (this.listaSucursales[x].Direccion == null || this.listaSucursales[x].Direccion == "") {

        this.listaSucursales[x].Direccion = "";
      }

      this.listaSucursales[x].Direccion += ", " + this.listaSucursales[x].TbDistrito.Nombre + ", ";
      this.listaSucursales[x].Direccion += this.listaSucursales[x].TbDistrito.TbCanton.Nombre + ", ";

      for (let i = 0; this.listaProvincia.length > i; i++) {
        if (this.listaSucursales[x].Provincia == this.listaProvincia[i].Cod) {

          this.listaSucursales[x].Direccion += this.listaProvincia[i].Nombre;
          break;
        }

      }

    }

  }

  buscarProvincia(prov) {

    for (let i = 0; this.listaProvincia.length > i; i++) {

      if (prov == this.listaProvincia[i].Id) {
        return this.listaProvincia[i].Nombre;
      }
    }
  }

  buscarCanton() {
    for (let i = 0; this.listaProvincia.length > i; i++) {

      if (this.Provincia == this.listaProvincia[i].Cod) {
        for (let x = 0; this.listaCantones.length > x; x++) {

          if (this.Canton == this.listaCantones[x].cod) {
            return this.listaCantones[x].Nombre;
          }
        }
      }
    }
  }

  agregarSucursal() {
    /*IdSuc la utilizo para llevar el control de cual sucursal es cual y el Id lo manejo 
    en negativo por que si por A o B motivo la tengo que eliminar se elimine la que quiero y no otra*/
    this.IdSuc--;
    this.sucursal.Id = this.IdSuc;
    //
    this.sucursal.IdTipoEmpresa = parseInt(this.empresaTipoId);
    this.sucursal.Nombre = this.Nombre;
    this.sucursal.IdEmpresa = this.empresaId;
    this.sucursal.Provincia = this.Provincia;
    this.sucursal.Canton = this.Canton;
    this.sucursal.Distrito = this.Distrito;
    this.sucursal.Direccion = this.Direccion;
    this.sucursal.Telefono = this.Telefono;
    this.sucursal.UsuarioCrea = "yo";
    this.sucursal.UsuarioUltMod = "yo";

    this.subirSucurasales.push(this.sucursal)

    console.log(this.subirSucurasales)
    this.ListaSuc.push(this.sucursal)
    
    for (let i = 0; this.listaProvincia.length > i; i++) {

      if (this.sucursal.Provincia == this.listaProvincia[i].Cod) {

        for (let z = 0; this.listaCantones.length > z; z++) {

          if (this.sucursal.Canton == this.listaCantones[z].Canton && this.sucursal.Provincia == this.listaCantones[z].Provincia) {
            for (let y = 0; this.listaDistritos.length > y; y++) {

              if (this.sucursal.Distrito == this.listaDistritos[y].Distrito && this.sucursal.Canton == this.listaDistritos[y].Canton && this.sucursal.Provincia == this.listaDistritos[y].Provincia) {


                this.sucursal.TbDistrito = this.listaDistritos[y];
                break;
              }

            }

            this.sucursal.TbDistrito.TbCanton = this.listaCantones[z]

            break;
          }
        }
        this.sucursal.TbDistrito.TbCanton.ProvinciaNavigation = this.listaProvincia[i];

        break;

      }
    }

    this.listaSucursalesSubir.push(this.sucursal);
    
    this.sucursal = new TbSucursales();
    this.agregar = true;

  }

  getEmpresas() {
    this.empresaService.get().subscribe(data => {
      this.listaEmpresa = data;
    });
  }

  validarBotonAgregar() {
    for (let i = 0; this.listaSucursalesSubir.length > i; i++) {

      if (this.listaSucursalesSubir[i].FechaCrea == null) {

        this.agregar = true;
        return;
      } else {

        this.agregar = false;
      }

    }

  }

  delete() {

    if (this.sucursal.Id != undefined && this.sucursal.Id > 0) {
      alert("Ajá")
      this.sucursalService.delete(this.sucursal.Id, this.sucursal.IdEmpresa.trim(), this.sucursal.IdTipoEmpresa).subscribe(data => {
        data;
      });
    }

    for (let i = 0; this.listaSucursales.length > i; i++) {

      if (this.listaSucursales[i].Id == this.sucursal.Id) {

        this.listaSucursales.splice(i, 1);

      }

    }
    for (let i = 0; this.listaSucursalesSubir.length > i; i++) {

      if (this.listaSucursalesSubir[i].Id == this.sucursal.Id) {

        this.listaSucursalesSubir.splice(i, 1);

      }
    }
    this.validarBotonAgregar();

    this.sucursal = new TbSucursales();


  }

  post() {
    for (let i = 0; i < this.subirSucurasales.length; i++) {
      this.subirSucurasales[i].TbDistrito=null;
      
    }
    this.sucursalService.post(this.subirSucurasales).subscribe(data => {
      data;
    });
    location.reload();
  }



  EnviaDatoEliminar(suc) {
    this.sucursal = new TbSucursales();
    this.sucursal = suc;
    this.Nombre = this.sucursal.Nombre
  }

  // obterner la lista de provincias en el servico
  getListProvincias() {
    this.service.getProvincias().subscribe(data => {
      this.listaProvincia = data;

    });
  }
  // obtener lista de Distritos
  getListDistritos() {
    this.service.getDistritos().subscribe(data => {
      this.listaDistritos = data;
    });
  }
  // obtener lista de cantones
  getListCantones() {
    this.service.getCantones().subscribe(data => {
      this.listaCantones = data;
    });
  }
  // obtener lista barrios
  getListBarrios() {
    this.service.getBarrios().subscribe(data => {
      this.listaBarrios = data;
    });
  }
  // obtener lista de tipos Id
  getListTipoId() {
    this.service.getTiposId().subscribe(data => {
      this.listaTipoId = data;
    });
  }

  // cambiar combos
  onChangeProvincia(ID) {
    this.Provincia = ID;
    this.Canton = null;
    this.ChangeCanton(ID);
    this.ChangeDistrito("1")
  }

  onChangeCanton(ID) {
    this.Canton = ID;
    this.Distrito = ID;
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
}
