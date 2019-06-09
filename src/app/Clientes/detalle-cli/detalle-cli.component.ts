import { Component, OnInit } from '@angular/core';
import { TbClientes } from 'src/Models/Cliente';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { TbProvincia } from 'src/Models/Provincia';
import { TbCanton } from 'src/Models/Canton';
import { TbDistrito } from 'src/Models/Distrito';
import { TbBarrios } from 'src/Models/Barrios';
import { TbTipoClientes } from 'src/Models/TipoCliente';

@Component({
  selector: 'app-detalle-cli',
  templateUrl: './detalle-cli.component.html',
  styleUrls: ['./detalle-cli.component.css']
})
export class DetalleCliComponent implements OnInit {

  // variables
  listaProvincia = new Array();
  listaDistritos = new Array();
  listaCantones = new Array();
  listaBarrios = new Array();
  listaTipoCli = new Array();
  listaTipoId = new Array();
  listaExo = new Array();

  public CliActual: TbClientes;
  Distrito: string;
  Provincia: any;
  Canton: string;
  Barrio: string;
  sexo: string;

  constructor(private service: DataClienteService) { }

  ngOnInit() {
    this.obtenerClienteDetalle();
    this.getListProvincias();
    this.getListDistritos();
    this.getListCantones();
    this.gettipoClientes();
    this.getListBarrios();
    this.getListTipoId();
    this.changeSex();
    this.getExo();
    this.changeTipoCli();
  }

  obtenerClienteDetalle() {
    this.CliActual = this.service.detalleCli;
  }

  getListProvincias() {
    this.service.getProvincias().subscribe(data => {
      this.listaProvincia = data;
      // obtener nombre de prov
      this.changeProv();
    });
  }
  // obtener lista de Distritos
  getListDistritos() {
    this.service.getDistritos().subscribe(data => {
      this.listaDistritos = data;
      // obtener distritos
      this.changeDist();
    });
  }
  // obtener lista de cantones
  getListCantones() {
    this.service.getCantones().subscribe(data => {
      this.listaCantones = data;
      // obtener cantones
      this.changeCant();
    });
  }
  // obtener lista barrios
  getListBarrios() {
    this.service.getBarrios().subscribe(data => {
      this.listaBarrios = data;
      this.changeBarr();
    });
  }
  // obtener lista de tipos Id
  getListTipoId() {
    this.service.getTiposId().subscribe(data => {
      this.listaTipoId = data;
    });
  }
  // exoneraciones
  getExo() {
    this.service.getIdExoneracion().subscribe(data => {
      this.listaExo = data;
    });
  }

  // obtener tipos clientes
  gettipoClientes() {
    this.service.gettipoClientes().subscribe(data => {
      this.listaTipoCli = data;
    });
  }

  // obtener nombre del tipo cliente
  changeTipoCli() {
    let TipoCli: TbTipoClientes[];
    TipoCli = this.listaTipoCli.filter(x => x.Cod != null && x.Cod == this.CliActual.TipoCliente);
  }

  // obtener nombre del sexo
  changeSex() {

    if (this.CliActual.TbPersona.Sexo != null) {

      if (this.CliActual.TbPersona.Sexo == 1) {
        this.sexo = 'Masculino';
      } else {
        this.sexo = 'Femenino';
      }
    }
  }

  changeProv() {
    if (this.CliActual.TbPersona.Provincia != null) {
      for (const iterator of this.listaProvincia) {
        const resultado: TbProvincia = iterator;
        if (resultado.Cod == this.CliActual.TbPersona.Provincia) {
          this.Provincia = resultado.Nombre;
        }
      }
    }
  }

  changeCant() {
    if (this.CliActual.TbPersona.Canton != null) {
      for (const iterator of this.listaCantones) {
        const resultado: TbCanton = iterator;
        if (resultado.Canton == this.CliActual.TbPersona.Canton && resultado.Provincia == this.CliActual.TbPersona.Provincia) {
          this.Canton = resultado.Nombre;
        }
      }
    }
  }

  changeDist(){
    if (this.CliActual.TbPersona.Distrito != null) {
      for (const iterator of this.listaDistritos) {
        const resultado: TbDistrito = iterator;
        if (resultado.Distrito == this.CliActual.TbPersona.Distrito && resultado.Canton == this.CliActual.TbPersona.Canton
          && resultado.Provincia == this.CliActual.TbPersona.Provincia) {
          this.Distrito = resultado.Nombre;
        }
      }
    }
  }

  changeBarr(){
    if (this.CliActual.TbPersona.Barrio != null) {
      for (const iterator of this.listaBarrios) {
        const resultado: TbBarrios = iterator;
        if (resultado.Barrio == this.CliActual.TbPersona.Barrio && resultado.Distrito == this.CliActual.TbPersona.Distrito
        && resultado.Canton == this.CliActual.TbPersona.Canton && resultado.Provincia == this.CliActual.TbPersona.Provincia) {
          this.Barrio = resultado.Nombre;
        }
      }
    }
  }


}
