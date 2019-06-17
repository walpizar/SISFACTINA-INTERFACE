import { Component, OnInit, HostListener } from '@angular/core';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';
import { ToastrService } from 'ngx-toastr';
import { TbClientes } from 'src/Models/Cliente';
import { stringify } from '@angular/core/src/util';
import { TbTipoClientes } from 'src/Models/TipoCliente';

@Component({
  selector: 'app-lista-cli',
  templateUrl: './lista-cli.component.html',
  styleUrls: ['./lista-cli.component.css']
})
export class ListaCliComponent implements OnInit {

  listaClientes = new Array();
  listaTipoCli = new Array();
  searchText: string = '';
  previous: string;
  CliSelect: TbClientes;

  headElements = ['Nombre', 'ID','Tipo Cliente'];

  constructor(private service: DataClienteService, private alerta: ToastrService) { }

  ngOnInit() {
    this.getListaCli();
    this.gettipoClientes();
  }

  // obtener tipos clientes
  gettipoClientes(){
    this.service.gettipoClientes().subscribe(data => {
      this.listaTipoCli = data;
    });
  }

  // obtener clientes
  getListaCli() {
    this.service.getClientes().subscribe(data => {
      this.listaClientes = data;
      console.log(this.listaClientes);
    });
    // btn renovar tambien llama a esta funcion por lo tanto reinicia el string de searchText
    this.searchText = '';
  }

  CliActual(per) {
    this.service.detalleCli = per;
    this.CliSelect = per;
  }

  EliminarCli() {
    // console.log(this.CliSelect);
    this.service.deleteCliente(this.CliSelect).subscribe(
      res => { this.alerta.success('El cliente se ha eliminado') },
      err => { this.alerta.error('Error al elminar el cliente') }
    );
    setTimeout(this.reFresh,2400,'refresh');
  }

  reFresh() {
    location.reload()
  }

  //  metodo para buscar todos los elementos por string
  searchItems() {

    // this.searchText accedo a la palabra buscar
    if (this.searchText == null) {
      this.getListaCli();
    }

    if (this.searchText != null) {

      let cli = new TbClientes();
      for (let index = 0; index < this.listaClientes.length; index++) {
        cli = this.listaClientes[index]

        if (cli.Id.trim().toString() == this.searchText.toString()) {
          this.listaClientes = new Array();
          this.listaClientes.push(cli);
        }

        if (cli.TbPersona.Nombre.trim().toUpperCase() == this.searchText.trim().toUpperCase()) {
          this.listaClientes = new Array();
          this.listaClientes.push(cli);
        }

      }

    }
  }


}
