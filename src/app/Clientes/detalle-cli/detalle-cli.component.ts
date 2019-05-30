import { Component, OnInit } from '@angular/core';
import { TbClientes } from 'src/Models/Cliente';
import { DataClienteService } from 'src/Services/Cliente/data-cliente.service';

@Component({
  selector: 'app-detalle-cli',
  templateUrl: './detalle-cli.component.html',
  styleUrls: ['./detalle-cli.component.css']
})
export class DetalleCliComponent implements OnInit {

  public CliActual: TbClientes;

  constructor(private service : DataClienteService) { }

  ngOnInit() {
    this.obtenerClienteDetalle();
  }

  obtenerClienteDetalle() {
    this.CliActual = this.service.detalleCli;
  }


}
