import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/Services/Compras/compras.service';
import { ToastrService } from 'ngx-toastr';
import { TbDocumento } from 'src/Models/Documento';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.css']
})
export class ComprasListComponent implements OnInit {

  // variables
  shoppingList: TbDocumento[];
  searchText = '';

  constructor(private service: ComprasService, private Alert: ToastrService) { }

  headElements = ['ID', 'ID Empresa', 'Documento ', 'Fecha'];


  ngOnInit() {
    this.getShoppingList();
  }

  // obtiene y asigna una lista de compras desde el servico
  // get & assign a shopping list from service
  getShoppingList(): void {
    this.service.getInvoices().subscribe(data => {
      this.shoppingList = data;
    });
  }

  // obtener la compras actual que se desea ver los detalles
  // see details of the current purchase
  currentPurchase(purchase) {
    this.service.currentPurchase = purchase;
  }



  // metodo de busqueda, para visualizar en la tabla
  // search Items from the table
  //  metodo para buscar todos los elementos por string
  searchItems() {

    // this.searchText accedo a la palabra buscar
    if (this.searchText == null) {
      this.getShoppingList();
    }

    if (this.searchText != null) {

      let inv = new TbDocumento;
      for (let index = 0; index < this.shoppingList.length; index++) {
        inv = this.shoppingList[index]

        if (inv.Id.toString().trim() == this.searchText.toString()) {
          this.shoppingList.length = 0;
          this.shoppingList.push(inv);
        }

        if (inv.IdEmpresa.trim().toUpperCase() == this.searchText.trim().toUpperCase()) {
          this.shoppingList.length = 0;
          this.shoppingList.push(inv);
        }

      }

    }
  }

  refresh() {
    this.getShoppingList();
  }



}
