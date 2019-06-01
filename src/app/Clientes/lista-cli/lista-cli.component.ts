import { Component, OnInit } from '@angular/core';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { ToastrService } from 'ngx-toastr';
import { TbClientes } from 'src/Models/Cliente';

@Component({
  selector: 'app-lista-cli',
  templateUrl: './lista-cli.component.html',
  styleUrls: ['./lista-cli.component.css']
})
export class ListaCliComponent implements OnInit {

  listaClientes = new Array();
  searchText: string = '';
  previous: string;
  CliSelect: TbClientes;

  headElements = ['ID', 'Nombre','Tipo Cliente'];

  constructor(private service: DataClienteService, private alerta: ToastrService) { }

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
    this.CliSelect = per;
  }

  EliminarCli(){
    // console.log(this.CliSelect);
    this.service.deleteCliente(this.CliSelect).subscribe(
      res=> {this.alerta.success('El cliente se ha eliminado')},
      err=> {this.alerta.error('Error al elminar el cliente')}
    );
  }

}
