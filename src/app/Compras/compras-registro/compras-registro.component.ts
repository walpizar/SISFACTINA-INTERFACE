import { Component, OnInit } from '@angular/core';
import { TbDocumento } from 'src/Models/Documento';
import { ComprasService } from 'src/Services/Compras/compras.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compras-registro',
  templateUrl: './compras-registro.component.html',
  styleUrls: ['./compras-registro.component.css']
})
export class ComprasRegistroComponent implements OnInit {

  constructor(private service: ComprasService, private Alert: ToastrService) { }

  // variables y arreglos
  listaFacturas = new Array();
  listaProveedores = new Array();
  listaProductos = new Array();
  FacturaCompras = new TbDocumento();

  headElements = ['Cantidad', 'Nombre', 'total'];

  ngOnInit() {
  }

  // get Providers
  // obtener provedores
  getProviders() {
    this.service.getProviders().subscribe( data => {
      this.listaProveedores = data;
    });
  }

  // get Invoices type:6
  // obtener facturas tipo: 6
  getInvoices() {
    this.service.getInvoices().subscribe( data => {
      this.listaFacturas = data;
    });
  }

  // get Products
  // obtener productos
  getProducts() {
    this.service.getProducts().subscribe( data => {
      this.listaProductos = data;
    });
  }

  // filter invoice by id
  // filtrar factura por id
  InvoiceById(Id) {

    if (Id != null) {
      let idFact;
      idFact = this.listaFacturas.filter(x => x.Id === Id.trim());
      if (idFact != null) {
        this.FacturaCompras.Id = idFact;
      }
    }

  }

  // filter Providers by Id
  // filtrar proveedores por id
  ProviderById(Id) {

    if (Id != null) {
      let idFact;
      idFact = this.listaProveedores.filter(x => x.Id === Id.trim());
      if (idFact != null) {
        this.FacturaCompras.IdEmpresa = idFact;
      }
    }

  }

  // pendiente! buscar producto?
  // cuando encuentro el id lo visualizo en pantalla y en pantalla agregro el resultado  a la lista
  ProductById(Id) {

    if (Id != null) {
      let idFact;
      idFact = this.listaProductos.filter(x => x.Id === Id.trim());
    }
  }

}
