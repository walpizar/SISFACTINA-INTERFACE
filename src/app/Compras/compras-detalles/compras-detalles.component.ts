import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/Services/Compras/compras.service';
import { TbDocumento } from 'src/Models/Documento';

@Component({
  selector: 'app-compras-detalles',
  templateUrl: './compras-detalles.component.html',
  styleUrls: ['./compras-detalles.component.css']
})
export class ComprasDetallesComponent implements OnInit {

  constructor(private service: ComprasService) { }

  // variables
  DocActual = new TbDocumento();

  ngOnInit() {
    this.Purchase();
  }


  Purchase() {
    this.DocActual = this.service.currentPurchase;
  }



}
