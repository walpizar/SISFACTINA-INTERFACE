import { Component, OnInit } from '@angular/core';
import { TbClientes } from 'src/Models/Cliente';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { TbProvincia } from 'src/Models/Provincia';

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
  listaTipoId = new Array();
  listaExo = new Array();

  public CliActual: TbClientes;
  sexo: string;
  Provincia:any;

  constructor(private service: DataClienteService) { }

  ngOnInit() {
    this.obtenerClienteDetalle();
    this.getListProvincias();
    this.getListDistritos();
    this.getListCantones();
    this.getListBarrios();
    this.getListTipoId();
    this.cambios();
  }

  cambios(){
    this.changeCli();
  }

  obtenerClienteDetalle() {
    this.CliActual = this.service.detalleCli;
  }

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
  // exoneraciones
  getExo() {
    this.service.getIdExoneracion().subscribe(data => {
      this.listaExo = data
    });
  }

  changeCli(){

    if (this.CliActual.TbPersona.Sexo != null) {

      if (this.CliActual.TbPersona.Sexo == 1) {
        this.sexo = 'Masculino';
      }
      else {
        this.sexo = 'Femenino';
      }

      // resultado = this.service.list.filter(x => x.Id == doc.Id);
      let resultado: TbProvincia;
      let cod = this.CliActual.TbPersona.Provincia;
      if(this.CliActual.TbPersona.Provincia != null){

        for (const iterator of this.listaProvincia) {
          resultado = iterator;
          if (resultado.Cod == this.CliActual.TbPersona.Provincia) {
            this.Provincia = resultado.Nombre;
          }
        }
      }
      // la lista esta vacia



    }

  }


}
