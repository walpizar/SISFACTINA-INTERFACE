import { Component, OnInit } from '@angular/core';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';

@Component({
  selector: 'app-lista-cli',
  templateUrl: './lista-cli.component.html',
  styleUrls: ['./lista-cli.component.css']
})
export class ListaCliComponent implements OnInit {

  listaClientes = new Array();
  searchText: string = '';
  previous: string;

  headElements = ['ID', 'Nombre', ' Tipo ID', 'Tipo Cliente'];

  constructor(private service: DataClienteService) { }

  ngOnInit() {
    this.getListaCli();
  }

  // obtener clientes
  getListaCli() {
    this.service.getClientes().subscribe(data => {
      this.listaClientes = data;
    });
  }

  searchItems() {
    // const prev = this.service.getClientes();
    // aun falta agregar buscador general
    // convertir todas las variables a string para 
    // buscar por cualquier dato
  }

  CliActual(per) {
    this.service.detalleCli = per;
  }

}
