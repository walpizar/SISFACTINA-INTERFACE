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
  ListaSuc = Array<TbSucursales>();
  listaSucursales: Array<TbSucursales>;
  listaSucursalesSubir: Array<TbSucursales>;
  listaDistritos = new Array();
  listaCantones = new Array();
  listaBarrios = new Array();
  listaTipoId = new Array();
  listaEmpresa = Array<TbEmpresa>();

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
  eliminaIdTipoEmpresa: number
  eliminaIdSucursal: number;

  sucursal: TbSucursales = new TbSucursales();
  empresa: TbEmpresa = new TbEmpresa();

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
      
      if(this.listaSucursales[x].Direccion==null || this.listaSucursales[x].Direccion==""){
        this.listaSucursales[x].Direccion="";
      }
      this.listaSucursales[x].Direccion += ", "+this.listaSucursales[x].TbDistrito.Nombre + ", ";
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

  agregarSucursal() {

    this.sucursal.IdTipoEmpresa = parseInt( this.empresaTipoId);
    this.sucursal.Nombre = this.Nombre;
    this.sucursal.IdEmpresa = this.empresaId;
    this.sucursal.Provincia = this.Provincia;
    this.sucursal.Canton = this.Canton;
    this.sucursal.Distrito = this.Distrito;
    this.sucursal.Direccion = this.Direccion;
    this.sucursal.UsuarioCrea = "yo"
    this.sucursal.UsuarioUltMod = "yo"
    this.listaSucursalesSubir.push(this.sucursal);
    this.ListaSuc.push(this.sucursal)
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
    
    if (this.eliminaIdSucursal != undefined) {
      this.sucursalService.delete(this.eliminaIdSucursal, this.eliminaIdTipoEmpresa, this.eliminaIdEmpresa).subscribe(data => {
        data;
      });
    }


    for (let i = 0; this.listaSucursales.length > i; i++) {

      if (this.listaSucursales[i].Id == this.eliminaIdSucursal) {

        this.listaSucursales.splice(i, 1);

      }

    }
    for (let i = 0; this.listaSucursalesSubir.length > i; i++) {

      if (this.listaSucursalesSubir[i].Id == this.eliminaIdSucursal) {

        this.listaSucursalesSubir.splice(i, 1);

      }
    }
    this.validarBotonAgregar();

    this.eliminaIdSucursal = 0;
    this.eliminaNombreSucursal = "";
    this.eliminaIdEmpresa = "";
    this.eliminaIdTipoEmpresa = 0;


  }
  post() {

    this.sucursalService.post(this.ListaSuc).subscribe(data => {
      data;
    });
    location.reload();
  }
  EnviaDatoEliminar(suc) {

    this.eliminaIdSucursal = suc.Id;
    this.eliminaNombreSucursal = "hola";
    this.eliminaIdEmpresa = suc.IdEmpresa;
    this.eliminaIdTipoEmpresa = 1;
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
