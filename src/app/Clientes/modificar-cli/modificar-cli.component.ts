import { Component, OnInit } from '@angular/core';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { TbClientes } from 'src/Models/Cliente';
import { TbPersona } from 'src/Models/Personas';

@Component({
  selector: 'app-modificar-cli',
  templateUrl: './modificar-cli.component.html',
  styleUrls: ['./modificar-cli.component.css']
})
export class ModificarCliComponent implements OnInit {

  // variables
  listaProvincia = new Array();
  listaDistritos = new Array();
  listaCantones = new Array();
  listaBarrios = new Array();
  listaTipoId = new Array();
  listaExo = new Array();

  comboProvincias = new Array();
  comboDistritos = new Array();
  comboCantones = new Array();
  comboBarrios = new Array();

  Provincia: string;
  Distrito: string;
  Canton: string;

  Cliente = new TbClientes();
  Persona = new TbPersona();

  constructor(private service: DataClienteService) { }

  ngOnInit() {
    this.getListProvincias();
    this.getListDistritos();
    this.getListCantones();
    this.getListBarrios();
    this.getListTipoId();
    this.getClienteModif();
  }

  getClienteModif() {
    this.Cliente = this.service.detalleCli;
    this.Persona = this.service.detalleCli.TbPersona;
  }

  // metodos
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
  // exoneraciones
  getExo() {
    this.service.getIdExoneracion().subscribe(data => {
      this.listaExo = data
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

  ModificarCli(Cliente: TbClientes,Persona: TbPersona){
    Cliente.TbPersona = Persona;
    this.service.putCliente(Cliente);
  }

}
